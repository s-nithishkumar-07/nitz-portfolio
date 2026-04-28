const fs = require('fs');

const fileContent = fs.readFileSync('components/sections/PhotoStrip.tsx', 'utf8');

// Match the photos array
const match = fileContent.match(/const photos = \[([\s\S]*?)\];/);
if (!match) {
  console.error("Could not find photos array");
  process.exit(1);
}

// Parse the array
const arrayStr = match[1];
const lines = arrayStr.split('\n').filter(l => l.trim().length > 0);
let parsed = lines.map(line => {
  const m = line.match(/{ id: (\d+), src: '([^']+)', alt: '([^']+)' }/);
  if (m) {
    return { id: parseInt(m[1]), src: m[2], alt: m[3], line: line };
  }
  return null;
}).filter(Boolean);

// Remove specific IDs
const toRemove = [17, 21, 51, 76, 85, 99];
parsed = parsed.filter(p => !toRemove.includes(p.id));

// Group them
const first10 = parsed.filter(p => p.id <= 10);
const above55 = parsed.filter(p => p.id > 55);
const between11and55 = parsed.filter(p => p.id >= 11 && p.id <= 55);

// Reorder: first 10, then above 55, then 11-55
const reordered = [...first10, ...above55, ...between11and55];

const newArrayStr = 'const photos = [\n' + reordered.map((p, idx) => {
  return `  { id: ${p.id}, src: '${p.src}', alt: 'Photo ${p.id}' }` + (idx < reordered.length - 1 ? ',' : '');
}).join('\n') + '\n];';

const newContent = fileContent.replace(/const photos = \[[\s\S]*?\];/, newArrayStr);

fs.writeFileSync('components/sections/PhotoStrip.tsx', newContent);
console.log("Updated PhotoStrip.tsx");
