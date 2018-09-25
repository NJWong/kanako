// Difficulty: 1
const aLine = ["あ", "い", "う", "え", "お"];

// Difficulty: 2
const kaLine = ["か", "き", "く", "け", "こ"];
const gaLine = ["が", "ぎ", "ぐ", "げ", "ご"];

// Difficulty: 3
const saLine = ["さ", "し", "す", "せ", "そ"];
const zaLine = ["ざ", "じ", "ず", "ぜ", "ぞ"];

// Difficulty: 4
const taLine = ["た", "ち", "つ", "て", "と"];
const daLine = ["だ", "ぢ", "づ", "で", "ど"];

// Difficulty: 5
const naLine = ["な", "に", "ぬ", "ね", "の"];

// Difficulty: 6
const haLine = ["は", "ひ", "ふ", "へ", "ほ"];
const baLine = ["ば", "び", "ぶ", "べ", "ぼ"];
const paLine = ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];

// Difficulty: 7
const maLine = ["ま", "み", "む", "め", "も"];

// Difficulty: 8
const yaLine = ["や", "ゆ", "よ"];

// Difficulty: 9
const raLine = ["ら", "り", "る", "れ", "ろ"];

// Difficulty: 10
const waLine = ["わ", "を", "ん"];

// Difficulty: 11
const digraph_1 = ["きゃ", "きゅ", "きょ", "ぎゃ", "ぎゅ", "ぎょ"];

// Difficulty: 12
const digraph_2 = ["しゃ", "しゅ", "しょ", "じゃ", "じゅ", "じょ"];

// Difficulty: 13
const digraph_3 = ["ちゃ", "ちゅ", "ちょ", "にゃ", "にゅ", "にょ"];

// Difficulty: 14
const digraph_4 = ["ひゃ", "ひゅ", "ひょ", "びゃ", "びゅ", "びょ"];

// Difficulty: 15
const digraph_5 = ["ぴゃ", "ぴゅ", "ぴょ", "みゃ", "みゅ", "みょ"];

// Difficulty: 16
const digraph_6 = ["りゃ", "りゅ", "りょ"];

export function generateKanaList(difficulty) {
  switch (difficulty) {
    case 1:
      return [].concat(aLine);
    case 2:
      return [].concat(kaLine);
    case 3:
      return [].concat(saLine);
    case 4:
      return [].concat(taLine);
    case 5:
      return [].concat(aLine, kaLine, saLine, taLine);
    default:
      console.error("Error: Unknown level -", difficulty);
  }
}

export default {
  aLine: aLine,
  kaLine: kaLine,
  gaLine: gaLine,
  saLine: saLine,
  zaLine: zaLine,
  taLine: taLine,
  daLine: daLine,
  naLine: naLine,
  haLine: haLine,
  baLine: baLine,
  paLine: paLine,
  maLine: maLine,
  yaLine: yaLine,
  raLine: raLine,
  waLine: waLine,
  digraph_1: digraph_1,
  digraph_2: digraph_2,
  digraph_3: digraph_3,
  digraph_4: digraph_4,
  digraph_5: digraph_5,
  digraph_6: digraph_6
};
