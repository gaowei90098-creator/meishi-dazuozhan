// TarotCard.jsx — back + face renderer for 塔罗牌
// Minor-arcana-ish artwork, not any trademarked deck. Uses brand palette.

const MAJOR_ARCANA = [
  { idx: 0,  name: "愚者",   food: "街边关东煮",   icon: "🍢" },
  { idx: 1,  name: "魔术师", food: "铁板炒饭",     icon: "🍳" },
  { idx: 2,  name: "女祭司", food: "白粥咸菜",     icon: "🍚" },
  { idx: 3,  name: "皇后",   food: "奶油烩饭",     icon: "🍲" },
  { idx: 4,  name: "皇帝",   food: "红烧肉盖饭",   icon: "🍖" },
  { idx: 5,  name: "教皇",   food: "寺庙素面",     icon: "🍜" },
  { idx: 6,  name: "恋人",   food: "双人火锅",     icon: "🫕" },
  { idx: 7,  name: "战车",   food: "麻辣香锅",     icon: "🌶" },
  { idx: 8,  name: "力量",   food: "烤肉拼盘",     icon: "🥩" },
  { idx: 9,  name: "隐者",   food: "一人食便当",   icon: "🍱" },
  { idx: 10, name: "命运之轮", food: "盲盒寿司",   icon: "🍣" },
  { idx: 11, name: "正义",   food: "轻食沙拉",     icon: "🥗" },
  { idx: 12, name: "倒吊人", food: "冰镇乌冬",     icon: "🍜" },
  { idx: 13, name: "死神",   food: "重生版螺蛳粉", icon: "🍲" },
  { idx: 14, name: "节制",   food: "养生蒸菜",     icon: "🥟" },
  { idx: 15, name: "恶魔",   food: "炸鸡啤酒",     icon: "🍗" },
  { idx: 16, name: "塔",     food: "变态辣火锅",   icon: "🔥" },
  { idx: 17, name: "星星",   food: "奶油布丁",     icon: "🍮" },
  { idx: 18, name: "月亮",   food: "夜宵烧烤",     icon: "🍢" },
  { idx: 19, name: "太阳",   food: "阳光早午餐",   icon: "🥞" },
  { idx: 20, name: "审判",   food: "昨日剩菜炒饭", icon: "🍚" },
  { idx: 21, name: "世界",   food: "环球自助餐",   icon: "🍽️" },
];

// Card back — a cream envelope stamped with a tiny logo + dotted pattern.
function TarotBack({ w = 72, h = 110, flat = false, style = {} }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 10,
      background: "linear-gradient(150deg, #F28560 0%, #FF9F7A 48%, #FFB593 100%)",
      position: "relative", overflow: "hidden",
      boxShadow: flat ? "none" : "0 4px 10px rgba(196,97,57,0.28), inset 0 0 0 2px rgba(255,255,255,0.25)",
      ...style,
    }}>
      {/* inner frame */}
      <div style={{
        position: "absolute", inset: 4, border: "1px dashed rgba(255,255,255,0.55)",
        borderRadius: 7,
      }} />
      {/* center medallion */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 4, color: "#FFF3E0",
      }}>
        <svg width={w*0.42} height={w*0.42} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="24" r="13" fill="#FFD89E" />
          <ellipse cx="20" cy="19" rx="12" ry="2" fill="#FFF3D6" />
          <circle cx="16" cy="25" r="1.2" fill="#5C3D2E" />
          <circle cx="24" cy="25" r="1.2" fill="#5C3D2E" />
          <path d="M16 29 Q20 32 24 29" stroke="#5C3D2E" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
          <path d="M14 10 Q14 6 17 6 M20 10 Q20 6 23 6 M26 10 Q26 6 29 6" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        </svg>
        <div style={{ fontSize: Math.round(w*0.11), fontWeight: 700, letterSpacing: 1, fontFamily: "'ZCOOL KuaiLe', system-ui" }}>美食大作战</div>
      </div>
      {/* corner pips */}
      {["tl","tr","bl","br"].map(k => (
        <div key={k} style={{
          position: "absolute",
          top: k.startsWith("t") ? 8 : "auto", bottom: k.startsWith("b") ? 8 : "auto",
          left: k.endsWith("l") ? 8 : "auto", right: k.endsWith("r") ? 8 : "auto",
          fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: "serif",
        }}>✦</div>
      ))}
    </div>
  );
}

// Card face — friendly illustration per card, brand-colored
function TarotFace({ card, w = 120, h = 180, style = {} }) {
  const hueByIdx = [
    ["#FFE8BC","#FFD89E"], // cream
    ["#FFD2BD","#FF9F7A"], // orange
    ["#D6EDE3","#7AB8A5"], // mint
    ["#FFD4DC","#FF8FA3"], // pink
  ];
  const pair = hueByIdx[card.idx % 4];
  return (
    <div style={{
      width: w, height: h, borderRadius: 10,
      background: `linear-gradient(180deg, ${pair[0]} 0%, ${pair[1]} 100%)`,
      position: "relative", overflow: "hidden",
      boxShadow: "0 6px 14px rgba(92,61,46,0.18), inset 0 0 0 2px #FFF8F0",
      color: "#5C3D2E",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: 10, ...style,
    }}>
      {/* inner frame */}
      <div style={{
        position: "absolute", inset: 6, border: "1.2px solid rgba(92,61,46,0.25)",
        borderRadius: 7, pointerEvents: "none",
      }} />
      {/* top roman numeral */}
      <div style={{
        fontFamily: "serif", fontSize: Math.round(w*0.1),
        fontWeight: 600, letterSpacing: 1, opacity: 0.7, marginTop: 2,
      }}>
        {toRoman(card.idx)}
      </div>
      {/* big emoji illustration */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: Math.round(w*0.55), lineHeight: 1,
        filter: "drop-shadow(0 3px 4px rgba(92,61,46,0.15))",
      }}>{card.icon}</div>
      {/* card name */}
      <div style={{
        fontFamily: "'ZCOOL KuaiLe', system-ui", fontWeight: 700,
        fontSize: Math.round(w*0.12), letterSpacing: 1, marginBottom: 2,
      }}>{card.name}</div>
      {/* corner pip */}
      <div style={{
        position: "absolute", top: 8, right: 10, fontSize: Math.round(w*0.08),
        color: "rgba(92,61,46,0.5)", fontFamily: "serif",
      }}>✦</div>
      <div style={{
        position: "absolute", bottom: 8, left: 10, fontSize: Math.round(w*0.08),
        color: "rgba(92,61,46,0.5)", fontFamily: "serif",
      }}>✦</div>
    </div>
  );
}

function toRoman(n) {
  if (n === 0) return "0";
  const M = [
    [10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]
  ];
  let out = "", rem = n;
  for (const [v, s] of M) while (rem >= v) { out += s; rem -= v; }
  return out;
}

Object.assign(window, { MAJOR_ARCANA, TarotBack, TarotFace });
