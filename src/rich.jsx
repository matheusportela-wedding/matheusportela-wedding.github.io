// rich.jsx — lets content strings carry a tiny Markdown subset, so prose in
// content.js can include inline formatting. Plain text (no markup) is returned
// unchanged, so every existing string keeps working.
//
//   **bold**            → <strong>
//   _italic_            → <em>
//   [label](https://…)  → <a> (opens in a new tab)
//
// Markup can nest, e.g. **bold with a [link](https://x.com)**.
//
// Usage at a render site:  <p className="lead">{rich(L.couple.p1)}</p>
import React from 'react';

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|_([^_]+)_/g;

export function rich(text) {
  if (typeof text !== 'string' || !/[[*_]/.test(text)) return text;
  const nodes = [];
  let last = 0;
  let key = 0;
  let m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(<a key={key++} className="link" href={m[2]} target="_blank" rel="noreferrer">{m[1]}</a>);
    } else if (m[3] !== undefined) {
      nodes.push(<strong key={key++}>{rich(m[3])}</strong>);
    } else {
      nodes.push(<em key={key++}>{rich(m[4])}</em>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? nodes : text;
}
