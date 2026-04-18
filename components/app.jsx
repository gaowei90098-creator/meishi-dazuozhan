// App.jsx — 美食大作战 interactive prototype (iPhone)
// Mood icons via PNGs (brand-tinted). 22-card tarot flow. Tweaks panel.

const { useState, useEffect, useRef, useMemo } = React;

const MOODS = [
  { id: "happy",     name: "美滋滋",   png: (window.MOOD_IMG && window.MOOD_IMG.happy) || "assets/moods/happy.png",         gradient: "linear-gradient(160deg,#FFF3E3,#FFD89E)", ring: "#F5B041", note: "今天是被生活按头宠爱了" },
  { id: "energetic", name: "元气满满", png: (window.MOOD_IMG && window.MOOD_IMG.energetic) || "assets/moods/energetic.png", gradient: "linear-gradient(160deg,#FFE4EA,#FFAAB9)", ring: "#FF8FA3", note: "可以把地球搬动的状态" },
  { id: "emo",       name: "emo",      png: (window.MOOD_IMG && window.MOOD_IMG.emo) || "assets/moods/emo.png",             gradient: "linear-gradient(160deg,#E8F3EE,#B9DCCF)", ring: "#7AB8A5", note: "今天不想说话只想喂自己" },
  { id: "crash",     name: "裂开",     png: (window.MOOD_IMG && window.MOOD_IMG.crash) || "assets/moods/crash.png",         gradient: "linear-gradient(160deg,#FFE1D4,#FFB694)", ring: "#FF9F7A", note: "发疯文学日 要吃点重的" },
];

// Preset final 3 picks keyed by mood (mapped to MAJOR_ARCANA idx)
const MOOD_PICKS = {
  happy:     [19, 17, 3],
  energetic: [7, 20, 10],
  emo:       [18, 12, 9],
  crash:     [16, 15, 13],
};
const MOOD_READING = {
  happy:     '好家伙，这牌阵写着“阳光落在饭上”——太阳、星星、皇后，三张温柔炸弹。今天就别折腾自己了，选点奶香、甜口、一看就开心的。',
  energetic: '战车+审判+命运之轮，牌阵在吼“冲！”你这元气满满的状态简直刚充满的电动小马达，今天吃不住前冲不对起这手神仙牌，赶紧吃饱了继续开大！',
  emo:       '月亮、倒吊、隐者，这牌面写着“今晚不想见人”。允许你一个人钻进碗里，温柔的、暖的、不用说话就能被抱住那种。',
  crash:     '塔、恶魔、死神这三兄弟上桌了——你这是要原地重启啊？没关系，今天就狠狠吃一顿，把坏心情辣死、腌进火锅底料里。',
};
const MOOD_RECIPES = {
  happy: [
    { medal: "🥇", name: "阳光班尼迪克蛋", reason: "金灿灿的流心蛋黄就是太阳牌本牌。第一口黄油融化的瞬间，今天再糟也能被续命 3 小时。" },
    { medal: "🥈", name: "焦糖奶盖布丁",   reason: "星星牌说要温柔，焦糖脆壳下面那口嫩布丁，就是‘被世界温柔对待’的味道。" },
    { medal: "🥉", name: "奶油蘑菇烩饭",   reason: "皇后牌主打丰盛滋养，奶白色的饭裹着蘑菇香，每一勺都像被妈妈揉了揉头。" },
  ],
  energetic: [
    { medal: "🥇", name: "川味辣子鸡",     reason: "战车正上位是油门焊死的冲劲，配这元气满满的状态必吃它。外焦里嫩辣过上头，像你一路狂飙不踩刹车的狠劲，吃完直接满血开大。" },
    { medal: "🥈", name: "番茄牛腩煲",     reason: "审判牌主打灵魂大扫除，旧账全撕。这元气日子配它刚好，软烂酸甜像给肠胃做 SPA，一口清空疲惫，清爽得想原地吹口哨。" },
    { medal: "🥉", name: "麻辣烤鱼",       reason: "命运之轮一转欧气拉满，这状态必吃它。热油滋啦像好运疯狂打转，鱼肉鲜辣过瘾，吃完感觉连明天班味都被超度了，稳赚。" },
  ],
  emo: [
    { medal: "🥇", name: "味增豆腐锅",     reason: "月亮牌主打‘允许你在情绪里泡会儿’。温温热热的汤，豆腐颤颤巍巍，慢慢喝像有人轻轻拍你后背。" },
    { medal: "🥈", name: "芝士焗饭一人份", reason: "隐者牌写着‘今天属于你自己’。一个人一盘，芝士拉丝的瞬间你不用对任何人笑。" },
    { medal: "🥉", name: "冷泡乌冬沙拉",   reason: "倒吊人反转视角——emo 就配点清冷的。凉丝丝滑进喉咙，像眼泪反过来往里咽的那种爽。" },
  ],
  crash: [
    { medal: "🥇", name: "变态辣火锅",     reason: "塔牌主打‘先把一切炸掉’。辣到流泪的那一刻，今天所有破事都被辣汤烫平了。" },
    { medal: "🥈", name: "啤酒炸鸡",       reason: "恶魔牌说今天允许放纵，就别装健康人了。咔滋咔滋的脆皮能替你骂出你不敢说的那句话。" },
    { medal: "🥉", name: "重口味螺蛳粉",   reason: "死神牌不是结束是重生，这一碗下去，满身汗、满脸红，明天又是敢发朋友圈的东亚战士。" },
  ],
};

// --------- Tweaks persistence (EDITMODE) ----------
const TWEAKS = /*EDITMODE-BEGIN*/{
  "initialStep": "mood",
  "initialMood": "",
  "buttonStyle": "gradient",
  "bgVariant": "warm",
  "deckLayout": "fan"
}/*EDITMODE-END*/;

// ================================================================
// Step Indicator
// ================================================================
function StepIndicator({ step }) {
  const idx = { mood: 0, draw: 1, loading: 1, result: 2 }[step] ?? 0;
  const labels = ["选心情", "抽牌", "看结果"];
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", padding: "10px 0 4px" }}>
      {labels.map((l, i) => (
        <React.Fragment key={l}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "4px 10px", borderRadius: 999,
            background: i <= idx ? "rgba(255,159,122,0.14)" : "transparent",
            color: i <= idx ? "#D6694A" : "#B69A87",
            font: "600 11px/1 system-ui",
            transition: "all 260ms cubic-bezier(.22,.61,.36,1)",
          }}>
            <span style={{
              width: 16, height: 16, borderRadius: 999,
              background: i <= idx ? "#FF9F7A" : "#E8D7C4",
              color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700,
            }}>{i + 1}</span>
            {l}
          </div>
          {i < 2 && <div style={{ width: 12, height: 1.5, background: i < idx ? "#FF9F7A" : "#E8D7C4", borderRadius: 2 }}/>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ================================================================
// Logo
// ================================================================
function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lm_bowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC9A9"/>
          <stop offset="100%" stopColor="#FF9F7A"/>
        </linearGradient>
        <linearGradient id="lm_soup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF3D6"/>
          <stop offset="100%" stopColor="#FFD89E"/>
        </linearGradient>
      </defs>
      <path d="M28 10 Q28 4 34 4 Q40 4 40 10 Q40 14 36 16 Q33 18 33 22" stroke="#B8D4C8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85"/>
      <circle cx="33" cy="26" r="1.6" fill="#B8D4C8" opacity="0.85"/>
      <path d="M11 6 L12 9 L15 10 L12 11 L11 14 L10 11 L7 10 L10 9 Z" fill="#F5B041" opacity="0.9"/>
      <path d="M53 5 L53.8 7 L55.8 7.8 L53.8 8.6 L53 10.6 L52.2 8.6 L50.2 7.8 L52.2 7 Z" fill="#F5B041" opacity="0.9"/>
      <path d="M24 2 L24.6 3.6 L26.2 4.2 L24.6 4.8 L24 6.4 L23.4 4.8 L21.8 4.2 L23.4 3.6 Z" fill="#7AB8A5" opacity="0.9"/>
      <path d="M10 34 Q10 32 12 32 L52 32 Q54 32 54 34 L54 38 Q54 56 32 58 Q10 56 10 38 Z" fill="url(#lm_bowl)"/>
      <ellipse cx="32" cy="34" rx="20" ry="3" fill="url(#lm_soup)"/>
      <circle cx="25" cy="44" r="1.6" fill="#5C3D2E"/>
      <circle cx="39" cy="44" r="1.6" fill="#5C3D2E"/>
      <path d="M27 49 Q32 53 37 49" stroke="#5C3D2E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <ellipse cx="21" cy="47" rx="2.2" ry="1.4" fill="#FF8FA3" opacity="0.55"/>
      <ellipse cx="43" cy="47" rx="2.2" ry="1.4" fill="#FF8FA3" opacity="0.55"/>
    </svg>
  );
}

// ================================================================
// Header
// ================================================================
function AppHeader() {
  return (
    <div style={{ padding: "14px 20px 6px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: "linear-gradient(160deg,#FFF3E3,#FFE7D0)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "inset 0 0 0 1px rgba(92,61,46,0.08)",
      }}>
        <LogoMark size={30}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ font: "700 20px/1.1 'ZCOOL KuaiLe', system-ui", color: "#5C3D2E" }}>美食大作战</div>
        <div style={{ font: "500 11px/1.3 system-ui", color: "#8A6B5A", marginTop: 2 }}>今天吃什么？让塔罗帮你选 ✦</div>
      </div>
      <button aria-label="more" style={{
        width: 36, height: 36, borderRadius: 999,
        background: "#fff", boxShadow: "var(--sh-sm)", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="3" cy="8" r="1.6" fill="#8A6B5A"/><circle cx="8" cy="8" r="1.6" fill="#8A6B5A"/><circle cx="13" cy="8" r="1.6" fill="#8A6B5A"/></svg>
      </button>
    </div>
  );
}

// ================================================================
// Step 1 — Mood
// ================================================================
function MoodStep({ mood, setMood, onNext }) {
  return (
    <div style={{ padding: "0 20px 20px", animation: "floatUp 420ms cubic-bezier(.22,.61,.36,1)" }}>
      <SectionIntro
        badge="STEP 01"
        title="深呼吸，今天感觉如何？"
        sub="随手选一个，塔罗要看菜下碟"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
        {MOODS.map(m => (
          <MoodCard key={m.id} mood={m} selected={mood === m.id} onClick={() => setMood(m.id)}/>
        ))}
      </div>

      {mood && (
        <div style={{
          marginTop: 14, padding: "12px 14px",
          background: "rgba(255,216,158,0.3)",
          border: "1px dashed #F0C992",
          borderRadius: 16,
          font: "500 13px/1.5 system-ui", color: "#8A6B5A",
          animation: "floatUp 300ms var(--ease)",
        }}>
          <span style={{ fontFamily: "'Ma Shan Zheng', cursive", color: "#D6694A", fontSize: 15 }}>
            // {MOODS.find(x => x.id === mood).note}
          </span>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button className="btn" disabled={!mood} onClick={onNext} style={{ width: "100%", height: 54 }}>
          {mood ? "下一步 · 抽 3 张塔罗牌" : "先选一个心情"}
          {mood && <span style={{ marginLeft: 4 }}>→</span>}
        </button>
      </div>
    </div>
  );
}

function MoodCard({ mood, selected, onClick }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        position: "relative",
        aspectRatio: "1 / 1.08",
        borderRadius: 20,
        background: mood.gradient,
        border: selected ? `2px solid ${mood.ring}` : "2px solid transparent",
        boxShadow: selected
          ? `0 10px 22px ${hexA(mood.ring, 0.28)}, inset 0 0 0 1px rgba(255,255,255,0.5)`
          : "0 3px 8px rgba(92,61,46,0.08), inset 0 0 0 1px rgba(255,255,255,0.5)",
        padding: 12,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 4,
        transform: pressed ? "scale(0.96)" : selected ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 200ms cubic-bezier(.34,1.56,.64,1), box-shadow 200ms var(--ease), border-color 200ms var(--ease)",
        overflow: "hidden",
      }}
    >
      {/* sparkle when selected */}
      {selected && (
        <>
          <span style={{ position: "absolute", top: 10, right: 12, fontSize: 12, color: "#fff", animation: "sparkle 1.6s ease-in-out infinite" }}>✦</span>
          <span style={{ position: "absolute", bottom: 14, left: 10, fontSize: 9, color: "#fff", animation: "sparkle 2s ease-in-out 0.4s infinite" }}>✦</span>
        </>
      )}
      <div style={{
        width: "62%", aspectRatio: "1 / 1",
        background: `url(${mood.png}) center/contain no-repeat`,
        filter: selected ? "none" : "saturate(0.9)",
        transition: "filter 200ms",
      }}/>
      <div style={{
        font: "700 16px/1.1 'ZCOOL KuaiLe', system-ui",
        color: selected ? "#5C3D2E" : "#6B4A38",
        letterSpacing: 0.5,
      }}>{mood.name}</div>
    </button>
  );
}

// ================================================================
// Step 2 — Draw cards
// ================================================================
function DrawStep({ mood, picks, setPicks, onNext, onBack, layout }) {
  const moodObj = MOODS.find(m => m.id === mood);
  const toggle = (i) => {
    setPicks(prev => {
      if (prev.includes(i)) return prev.filter(x => x !== i);
      if (prev.length >= 3) return prev;
      return [...prev, i];
    });
  };
  return (
    <div style={{ padding: "0 20px 20px", animation: "floatUp 420ms cubic-bezier(.22,.61,.36,1)" }}>
      <SectionIntro
        badge="STEP 02"
        title="凭直觉选 3 张"
        sub="不要想，手指最诚实"
        right={
          <div className="chip chip-orange" style={{ padding: "5px 10px" }}>
            <span style={{ opacity: 0.7 }}>心情</span>&nbsp;{moodObj?.name}
          </div>
        }
      />

      {/* counter */}
      <div style={{
        marginTop: 12, display: "flex", gap: 8, justifyContent: "center",
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 40, height: 6, borderRadius: 999,
            background: i < picks.length ? "#FF9F7A" : "#F0E2D0",
            transition: "background 260ms var(--ease)",
          }}/>
        ))}
      </div>
      <div style={{ textAlign: "center", font: "500 12px/1.5 system-ui", color: "#8A6B5A", marginTop: 6 }}>
        已选 <b style={{ color: "#D6694A" }}>{picks.length}</b> / 3
      </div>

      {/* deck */}
      {layout === "fan"
        ? <FanDeck picks={picks} toggle={toggle}/>
        : <GridDeck picks={picks} toggle={toggle}/>}

      {/* picked preview */}
      <div style={{ marginTop: 10, display: "flex", gap: 8, justifyContent: "center", minHeight: 68 }}>
        {[0,1,2].map(slot => {
          const idx = picks[slot];
          return (
            <div key={slot} style={{
              width: 46, height: 68, borderRadius: 8,
              border: idx !== undefined ? "none" : "1.5px dashed #E8D7C4",
              background: idx !== undefined ? "transparent" : "rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#C2A58E", font: "700 14px/1 'ZCOOL KuaiLe', system-ui",
            }}>
              {idx !== undefined
                ? <div style={{ animation: "popIn 320ms var(--ease-back)" }}><TarotBack w={46} h={68}/></div>
                : slot + 1}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <button className="btn btn-ghost" style={{ flex: "0 0 90px", height: 52 }} onClick={onBack}>返回</button>
        <button className="btn" disabled={picks.length !== 3} onClick={onNext} style={{ flex: 1, height: 52 }}>
          {picks.length === 3 ? "翻牌！看塔罗说啥" : `再选 ${3 - picks.length} 张`}
        </button>
      </div>
    </div>
  );
}

function FanDeck({ picks, toggle }) {
  // 22 cards arranged in a gentle arc
  const total = 22;
  const cardW = 44, cardH = 68;
  const radius = 360;
  const spread = 70; // degrees total
  return (
    <div style={{
      position: "relative", height: 200, marginTop: 16,
      display: "flex", alignItems: "flex-start", justifyContent: "center",
    }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {Array.from({ length: total }).map((_, i) => {
          const t = total === 1 ? 0.5 : i / (total - 1);
          const angle = (t - 0.5) * spread;
          const selected = picks.includes(i);
          const selectedSlot = picks.indexOf(i);
          const rad = (angle * Math.PI) / 180;
          const cx = 335 / 2; // approx 375 - 40 padding
          const x = cx + Math.sin(rad) * 130 - cardW / 2;
          const y = (1 - Math.cos(rad)) * 90 + 50;
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              style={{
                position: "absolute",
                left: x, top: selected ? y - 22 : y,
                transform: `rotate(${angle}deg) ${selected ? "translateY(-6px)" : ""}`,
                transformOrigin: "center bottom",
                transition: "top 240ms cubic-bezier(.34,1.56,.64,1), transform 240ms cubic-bezier(.34,1.56,.64,1), filter 180ms",
                filter: selected ? "drop-shadow(0 8px 14px rgba(255,127,80,0.45))" : "none",
                padding: 0, background: "none", border: 0,
                zIndex: selected ? 100 : i,
              }}
            >
              <div style={{ position: "relative" }}>
                <TarotBack w={cardW} h={cardH} flat/>
                {selected && (
                  <div style={{
                    position: "absolute", top: -8, right: -6,
                    width: 22, height: 22, borderRadius: 999,
                    background: "#FF9F7A", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    font: "700 12px/1 'ZCOOL KuaiLe', system-ui",
                    boxShadow: "0 3px 6px rgba(255,127,80,0.4)",
                    animation: "popIn 320ms var(--ease-back)",
                  }}>{selectedSlot + 1}</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GridDeck({ picks, toggle }) {
  return (
    <div style={{
      marginTop: 18, padding: 14, borderRadius: 20,
      background: "rgba(255,255,255,0.55)", border: "1px dashed #E8D7C4",
      display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8,
    }}>
      {Array.from({ length: 22 }).map((_, i) => {
        const selected = picks.includes(i);
        const slot = picks.indexOf(i);
        return (
          <button key={i} onClick={() => toggle(i)} style={{
            position: "relative", aspectRatio: "46/68",
            padding: 0, background: "none", border: 0,
            transform: selected ? "translateY(-6px) scale(1.04)" : "translateY(0)",
            transition: "transform 200ms var(--ease-back)",
            filter: selected ? "drop-shadow(0 6px 12px rgba(255,127,80,0.4))" : "none",
          }}>
            <TarotBack w="100%" h="100%" flat style={{ width: "100%", height: "100%" }}/>
            {selected && (
              <div style={{
                position: "absolute", top: -6, right: -6,
                width: 20, height: 20, borderRadius: 999, background: "#FF9F7A", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                font: "700 11px/1 'ZCOOL KuaiLe', system-ui",
                boxShadow: "0 3px 6px rgba(255,127,80,0.4)",
              }}>{slot + 1}</div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ================================================================
// Loading
// ================================================================
function LoadingScreen() {
  const hints = [
    "塔罗牌正在交头接耳……",
    "把你的心情拌进牌面里……",
    "AI 正在菜单里狂翻……",
    "快了快了，三秒上桌 🍜",
  ];
  const [h, setH] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setH(x => (x + 1) % hints.length), 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ padding: "40px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <LoadingBowl size={140}/>
      <div style={{ font: "700 18px/1.3 'ZCOOL KuaiLe', system-ui", color: "#5C3D2E" }}>塔罗正在点单……</div>
      <div style={{ font: "500 13px/1.6 system-ui", color: "#8A6B5A", minHeight: 22, transition: "opacity 200ms" }}>
        {hints[h]}
      </div>
      {/* dot progress */}
      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width: 8, height: 8, borderRadius: 999,
            background: "#FF9F7A",
            animation: `popIn 800ms ease-in-out ${i*0.15}s infinite alternate`,
          }}/>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// Step 3 — Result
// ================================================================
function ResultStep({ mood, picks, onRestart, onBack }) {
  const safeMood = MOOD_PICKS[mood] ? mood : "happy";
  const finalPicks = picks.length === 3 ? picks : MOOD_PICKS[safeMood];
  const cards = finalPicks.map(i => MAJOR_ARCANA[i]);
  const recipes = MOOD_RECIPES[safeMood];
  const reading = MOOD_READING[safeMood];
  const moodObj = MOODS.find(m => m.id === safeMood);

  const [flipped, setFlipped] = useState([false, false, false]);
  useEffect(() => {
    // Stagger flip animation
    const timers = [0,1,2].map(i =>
      setTimeout(() => setFlipped(prev => prev.map((v, j) => j === i ? true : v)), 180 + i*220)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ padding: "0 20px 28px", animation: "floatUp 420ms var(--ease)" }}>
      <SectionIntro
        badge="STEP 03"
        title="叮~ 塔罗说话了"
        sub={`今日心情：${moodObj?.name}`}
      />

      {/* three flipped cards */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, margin: "16px 0 18px", perspective: 1000 }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            width: 92, height: 140, position: "relative",
            transformStyle: "preserve-3d",
            transform: flipped[i] ? "rotateY(0)" : "rotateY(180deg)",
            transition: "transform 700ms cubic-bezier(.34,1.3,.64,1)",
          }}>
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
              <TarotFace card={c} w={92} h={140}/>
            </div>
            <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <TarotBack w={92} h={140}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 34, marginBottom: 18 }}>
        {cards.map((c, i) => (
          <div key={i} style={{ width: 92, textAlign: "center", font: "500 11px/1.3 system-ui", color: "#8A6B5A" }}>
            {c.name}
          </div>
        ))}
      </div>

      {/* reading bubble */}
      <div style={{
        position: "relative",
        background: "var(--g-card-warm)",
        border: "1px solid rgba(92,61,46,0.06)",
        borderRadius: 24,
        padding: "16px 18px",
        boxShadow: "var(--sh-md)",
      }}>
        <div style={{
          position: "absolute", top: -8, left: 24,
          width: 0, height: 0,
          borderLeft: "10px solid transparent", borderRight: "10px solid transparent",
          borderBottom: "10px solid #FFF3E3",
        }}/>
        <div className="chip chip-orange" style={{ marginBottom: 10 }}>🔮 今日能量解读</div>
        <div style={{ font: "500 14px/1.75 system-ui", color: "#5C3D2E", textWrap: "pretty" }}>
          {reading}
        </div>
      </div>

      {/* recipe list */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ font: "700 18px/1.3 'ZCOOL KuaiLe', system-ui", color: "#5C3D2E" }}>
            🍽️ 今日就吃这 3 样
          </div>
          <div className="chip">塔罗 · 厨房版</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {recipes.map((r, i) => (
            <RecipeRow key={i} r={r} delay={i*80}/>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
        <button className="btn btn-ghost" style={{ flex: 1, height: 52 }} onClick={onBack}>再抽一次</button>
        <button className="btn" style={{ flex: 1, height: 52 }} onClick={onRestart}>换个心情</button>
      </div>

      {/* signature */}
      <div style={{ textAlign: "center", marginTop: 18, font: "500 11px/1.5 'Ma Shan Zheng', cursive", color: "#B69A87" }}>
        占卜仅供娱乐 · 真的饿了还是快去吃饭吧 ✦
      </div>
    </div>
  );
}

function RecipeRow({ r, delay }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(92,61,46,0.06)",
      borderRadius: 18,
      padding: 14,
      boxShadow: "var(--sh-sm)",
      display: "flex", gap: 12,
      animation: `floatUp 400ms var(--ease) both`, animationDelay: `${delay}ms`,
    }}>
      <div style={{
        flex: "0 0 40px", height: 40, borderRadius: 12,
        background: "linear-gradient(160deg,#FFF3E3,#FFE7D0)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22,
      }}>{r.medal}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "700 15px/1.3 'ZCOOL KuaiLe', system-ui", color: "#5C3D2E", marginBottom: 4 }}>
          {r.name}
        </div>
        <div style={{ font: "500 12.5px/1.7 system-ui", color: "#8A6B5A", textWrap: "pretty" }}>
          <span style={{ color: "#D6694A", fontWeight: 600 }}>理由 · </span>
          {r.reason}
        </div>
      </div>
    </div>
  );
}

// ================================================================
// Helpers
// ================================================================
function SectionIntro({ badge, title, sub, right }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ font: "600 10px/1 ui-monospace, menlo", color: "#B69A87", letterSpacing: 2 }}>
          {badge}
        </div>
        {right}
      </div>
      <div style={{ font: "700 22px/1.3 'ZCOOL KuaiLe', system-ui", color: "#5C3D2E", marginTop: 8 }}>
        {title}
      </div>
      {sub && <div style={{ font: "500 13px/1.5 system-ui", color: "#8A6B5A", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function hexA(hex, a) {
  const h = hex.replace("#","");
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

// ================================================================
// App shell (inside iPhone)
// ================================================================
function MeishiApp({ tweaks }) {
  const [step, setStep] = useState(tweaks.initialStep || "mood");
  const [mood, setMood] = useState(tweaks.initialMood || "");
  const [picks, setPicks] = useState([]);

  // Sync if tweaks change
  useEffect(() => { setStep(tweaks.initialStep); }, [tweaks.initialStep]);
  useEffect(() => { if (tweaks.initialMood) setMood(tweaks.initialMood); }, [tweaks.initialMood]);

  const bg = tweaks.bgVariant === "mint"
    ? "radial-gradient(120% 80% at 50% 0%, #E8F3EE 0%, #FFF8F0 55%)"
    : tweaks.bgVariant === "pink"
    ? "radial-gradient(120% 80% at 50% 0%, #FFE4EA 0%, #FFF8F0 55%)"
    : "radial-gradient(120% 80% at 50% 0%, #FFF3E0 0%, #FFF8F0 60%)";

  const goDraw = () => { setPicks([]); setStep("draw"); };
  const goLoading = () => {
    setStep("loading");
    setTimeout(() => setStep("result"), 2200);
  };
  const restart = () => { setMood(""); setPicks([]); setStep("mood"); };

  return (
    <div style={{ background: bg, minHeight: "100%", paddingBottom: 30 }}>
      <AppHeader/>
      <StepIndicator step={step}/>
      {step === "mood"    && <MoodStep mood={mood} setMood={setMood} onNext={goDraw}/>}
      {step === "draw"    && <DrawStep mood={mood} picks={picks} setPicks={setPicks} onNext={goLoading} onBack={() => setStep("mood")} layout={tweaks.deckLayout}/>}
      {step === "loading" && <LoadingScreen/>}
      {step === "result"  && <ResultStep mood={mood} picks={picks} onRestart={restart} onBack={() => setStep("draw")}/>}
    </div>
  );
}

Object.assign(window, { MeishiApp, MOODS, TWEAKS });
