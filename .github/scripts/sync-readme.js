const fs = require('fs');
const { Client } = require('@notionhq/client');
const { markdownToBlocks } = require('@tryfabric/martian');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const pageId = process.env.NOTION_PAGE_ID;

const rawBase  = 'https://raw.githubusercontent.com/JQInanophotonics/QuickStartGit/main/';
const blobBase = 'https://github.com/JQInanophotonics/QuickStartGit/blob/main/';

let md = fs.readFileSync('README.md', 'utf8');

// 1. Drop shields.io badge lines (clusters of [![...](...)](...) on their own line)
md = md.replace(/^(?:\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)\s*)+$/gm, '');

// 2. Images: relative srcs -> raw.githubusercontent.com (actual file bytes,
//    so Notion can render them as image blocks). Banners stay as images.
md = md.replace(/(!\[[^\]]*\]\()(?!https?:\/\/)(?:\.\/)?([^)]+)\)/g, `$1${rawBase}$2)`);

// 3. Regular links: relative -> absolute GitHub blob URLs.
//    (?<!!) ensures image syntax from step 2 is not re-touched.
md = md.replace(/(?<!!)(\[[^\]]*\]\()(?!https?:\/\/|#)(?:\.\/)?([^)]+)\)/g, `$1${blobBase}$2)`);

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
