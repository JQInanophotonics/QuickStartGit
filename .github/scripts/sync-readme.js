const fs = require('fs');
const { Client } = require('@notionhq/client');
const { markdownToBlocks } = require('@tryfabric/martian');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const pageId = process.env.NOTION_PAGE_ID;
const repoBase = 'https://github.com/JQInanophotonics/QuickStartGit/blob/main/';

let md = fs.readFileSync('README.md', 'utf8');

// 1. Banner images -> H2 headings (uses alt text)
md = md.replace(/^!\[(.+?)\]\((?:.*?assets\/banner-[^)]*?\.svg)\)\s*$/gm, '## $1');

// 2. Drop top header.svg and badge line (GitHub chrome)
md = md.replace(/^!\[[^\]]*\]\((?:.*?assets\/header[^)]*)\)\s*$/gm, '');
md = md.replace(/^(?:\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)\s*)+$/gm, '');

// 3. Relative links -> absolute GitHub URLs
md = md.replace(/\]\((?!https?:\/\/|#)([^)]+)\)/g, `](${repoBase}$1)`);

const blocks = markdownToBlocks(md);

(async () => {
  // Clear existing page content
  let cursor;
  const existing = [];
  do {
    const res = await notion.blocks.children.list({ block_id: pageId, start_cursor: cursor });
    existing.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  for (const b of existing) {
    await notion.blocks.delete({ block_id: b.id });
  }

  // Append in chunks (API limit: 100 blocks per request)
  for (let i = 0; i < blocks.length; i += 100) {
    await notion.blocks.children.append({
      block_id: pageId,
      children: blocks.slice(i, i + 100),
    });
  }
  console.log(`Synced ${blocks.length} blocks.`);
})();
