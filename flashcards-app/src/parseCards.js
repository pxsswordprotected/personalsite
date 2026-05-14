const METADATA_LINE = /^\s*(?:ID|Tags|TD|Note)\s*:/i;

export function parseCards(rawText, source = '') {
  const text = rawText.replace(/\r\n/g, '\n').trim();
  if (!text) return [];
  const blocks = text.split(/\n\s*\n+/);
  const cards = [];
  for (const block of blocks) {
    const m = block.trim().match(/^\s*Q:\s*([\s\S]*?)\n\s*A:\s*([\s\S]*)$/);
    if (!m) continue;
    const q = m[1].trim();
    const aLines = m[2].split('\n');
    while (aLines.length && METADATA_LINE.test(aLines[aLines.length - 1])) {
      aLines.pop();
    }
    const a = aLines.join('\n').trim();
    if (!q || !a) continue;
    cards.push({ q, a, source });
  }
  return cards;
}
