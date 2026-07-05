const fs = require('fs');
const { Client } = require('@notionhq/client');
const { markdownToBlocks } = require('@tryfabric/martian');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const pageId = process.env.NOTION_PAGE_ID;

const rawBase  = 'https://raw.githubusercontent.com/JQInanophotonics/QuickStartGit/main/';
const blobBase = 'https://github.com/JQInanophotonics/QuickStartGit/blob/main/';

let md = fs.readFileSync('README.md', 'utf8');

// 1. SVG section/header banners -> H2. Each banner is a <picture> whose <img>
//    src points at a local assets/ file, with alt text set to the exact
//    heading text (README.md keeps alt clean of the "NN — " index prefix
//    shown inside the SVG itself, so no stripping is needed here).
md = md.replace(
  /<picture>(?:(?!<\/picture>)[\s\S])*?<img\s+src="assets\/[^"]*"[^>]*\balt="([^"]*)"[^>]*\/>\s*<\/picture>/g,
  '## $1'
);

// 2. Badge links (small <picture> images pointing at img.shields.io, wrapped
//    in an <a>) carry no content worth syncing to Notion - drop them.
md = md.replace(
  /<a\s+href="[^"]*">(?:(?!<\/a>)[\s\S])*?img\.shields\.io(?:(?!<\/a>)[\s\S])*?<\/a>\n?/g,
  ''
);

// 3. Centering wrapper <div>s around the header banner/badge row - just
//    layout, meaningless once step 1/2 have run.
md = md.replace(/<div align="center">\s*\n?/g, '');
md = md.replace(/<\/div>\s*\n?/g, '');

// 4. In-page anchors (e.g. <a id="pages"></a>, used for GitHub badge links) -
//    Notion has no use for them.
md = md.replace(/<a\s+id="[^"]*">\s*<\/a>\n?/g, '');

// 5. Images: relative srcs -> raw.githubusercontent.com (actual file bytes,
//    so Notion can render them as image blocks). Any real markdown images
//    left after step 1 (i.e. not banners) get this treatment.
md = md.replace(/(!\[[^\]]*\]\()(?!https?:\/\/)(?:\.\/)?([^)]+)\)/g, `$1${rawBase}$2)`);

// 6. Regular links: relative -> absolute GitHub blob URLs.
//    (?<!!) ensures image syntax from step 5 is not re-touched.
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
