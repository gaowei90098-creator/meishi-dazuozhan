// SpecPanel.jsx — Visual system showcase (color / type / spacing / radii / buttons / loading)

function SpecSection({ title, subtitle, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ font: "700 20px/1.3 'ZCOOL KuaiLe', system-ui", color: "#5C3D2E" }}>{title}</div>
        {subtitle && <div style={{ font: "500 13px/1.5 system-ui", color: "#8A6B5A", marginTop: 4 }}>{subtitle}</div>}
      </div>
      <div className="card" style={{ padding: 24 }}>{children}</div>
    </section>
  );
}

function Swatch({ name, hex, gradient, note, ink = "#5C3D2E" }) {
  return (
    <div style={{ width: 140 }}>
      <div style={{
        height: 92, borderRadius: 20,
        background: gradient || hex,
        boxShadow: "inset 0 0 0 1px rgba(92,61,46,0.08), 0 3px 8px rgba(92,61,46,0.08)",
        marginBottom: 10, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", bottom: 8, right: 10,
          font: "500 10px/1 ui-monospace, menlo", color: ink, opacity: 0.5,
        }}>{hex?.toUpperCase()}</div>
      </div>
      <div style={{ font: "600 13px/1.3 'ZCOOL KuaiLe', system-ui", color: "#5C3D2E" }}>{name}</div>
      {note && <div style={{ font: "500 11px/1.4 system-ui", color: "#8A6B5A", marginTop: 2 }}>{note}</div>}
    </div>
  );
}

function ColorsSpec() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
      <Swatch name="主色 · 暖橘"   hex="#FF9F7A" note="主要按钮 / 高亮"/>
      <Swatch name="辅色 · 薄荷"   hex="#7AB8A5" note="塔罗轻量神秘"/>
      <Swatch name="点缀 · 奶油"   hex="#FFD89E" note="背景 / 标签"/>
      <Swatch name="点缀 · 柔粉"   hex="#FF8FA3" note="强调 / 心情"/>
      <Swatch name="背景 · 奶白"   hex="#FFF8F0" note="主背景"/>
      <Swatch name="文字 · 深咖"   hex="#5C3D2E" note="正文"/>
      <Swatch name="主按钮渐变"    hex="FF9F7A→F28560" gradient="linear-gradient(180deg,#FFB694,#FF9F7A 55%,#FB8C64)" note="CTA"/>
      <Swatch name="温暖卡片底"    hex="FFF3E3→FFE7D0" gradient="linear-gradient(160deg,#FFF3E3,#FFE7D0)" note="推荐卡片"/>
    </div>
  );
}

function TypeSpec() {
  const row = (sample, spec, meta) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", alignItems: "baseline",
      padding: "14px 0", borderBottom: "1px dashed #E8D7C4" }}>
      <div style={{ font: spec, color: "#5C3D2E" }}>{sample}</div>
      <div style={{ font: "500 11px/1.4 ui-monospace,menlo", color: "#8A6B5A" }}>{meta}</div>
    </div>
  );
  return (
    <div>
      {row("美食大作战",          "700 28px/1.2 'ZCOOL KuaiLe', system-ui",   "Display · 28/34 · 站酷庆科黄油体")}
      {row("深呼吸，选一个今日心情","700 22px/1.3 'ZCOOL KuaiLe', system-ui",   "H1 · 22/29")}
      {row("今日能量解读",          "600 18px/1.35 'ZCOOL KuaiLe', system-ui",  "H2 · 18/24")}
      {row("川味辣子鸡",            "600 16px/1.4 system-ui",                   "H3 · 16/22")}
      {row("好家伙，今天这牌阵简直是把“油门焊死”写脸上了。", "500 15px/1.65 system-ui", "Body · 15/25")}
      {row("选 3 张卡牌（必选）",    "500 13px/1.6 system-ui",                   "Body-s · 13/21")}
      {row("塔罗 · 轻食版",          "500 12px/1.5 system-ui",                   "Caption · 12/18")}
      {row("STEP 01",               "500 11px/1.4 ui-monospace, menlo",         "Micro · 11 · 等宽")}
    </div>
  );
}

function SpacingSpec() {
  const steps = [4,8,12,16,20,24,32,40,48];
  return (
    <div>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 18 }}>
        {steps.map(n => (
          <div key={n} style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: n, background: "linear-gradient(180deg,#FFC9A9,#FF9F7A)",
              borderRadius: 4, marginBottom: 6 }}/>
            <div style={{ font: "600 11px/1 ui-monospace, menlo", color: "#5C3D2E" }}>{n}</div>
            <div style={{ font: "500 10px/1 system-ui", color: "#B69A87", marginTop: 3 }}>s-{steps.indexOf(n)+1}</div>
          </div>
        ))}
      </div>
      <div style={{ font: "500 12px/1.5 system-ui", color: "#8A6B5A" }}>
        4px 基准 · 卡片内边距用 20–24 · 区块间距 32–40 · 移动端外边距 20
      </div>
    </div>
  );
}

function RadiiSpec() {
  const radii = [
    { name: "xs", val: 8, use: "小标签" },
    { name: "sm", val: 12, use: "输入框" },
    { name: "md", val: 16, use: "小卡片" },
    { name: "lg", val: 20, use: "心情卡" },
    { name: "xl", val: 28, use: "主卡片" },
    { name: "2xl", val: 36, use: "结果气泡" },
    { name: "pill", val: 999, use: "按钮/Chip" },
  ];
  return (
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
      {radii.map(r => (
        <div key={r.name} style={{ width: 90, textAlign: "center" }}>
          <div style={{
            width: 78, height: 78, borderRadius: r.val,
            background: "#FFF3E3", border: "1.5px dashed #E2B897", margin: "0 auto 8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            font: "600 12px/1 ui-monospace, menlo", color: "#8A6B5A",
          }}>{r.val === 999 ? "∞" : r.val}</div>
          <div style={{ font: "600 12px/1.3 'ZCOOL KuaiLe', system-ui", color: "#5C3D2E" }}>r-{r.name}</div>
          <div style={{ font: "500 10px/1.3 system-ui", color: "#B69A87" }}>{r.use}</div>
        </div>
      ))}
    </div>
  );
}

function ButtonsSpec() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn">开始占卜吃什么</button>
        <button className="btn" style={{ transform: "translateY(1px) scale(0.98)", boxShadow: "var(--sh-btn-a)" }}>按下态</button>
        <button className="btn" disabled>禁用态</button>
        <button className="btn btn-ghost">再抽一次</button>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className="chip">✦ 薄荷</span>
        <span className="chip chip-orange">✦ 暖橘</span>
        <span className="chip chip-cream">✦ 奶油</span>
        <span className="chip chip-pink">✦ 柔粉</span>
      </div>
      <div style={{ font: "500 12px/1.5 system-ui", color: "#8A6B5A" }}>
        按钮高度 52px (手指友好 &gt; 44pt) · 圆角 pill · hover 上移 1px · active 下移 1px + 缩 0.98
      </div>
    </div>
  );
}

function LoadingSpec() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <LoadingBowl size={120}/>
      <div>
        <div style={{ font: "600 14px/1.4 'ZCOOL KuaiLe', system-ui", color: "#5C3D2E" }}>
          🍜 蒸汽小碗
        </div>
        <div style={{ font: "500 12px/1.6 system-ui", color: "#8A6B5A", maxWidth: 320 }}>
          碗体 4s 轻微左右摇晃；蒸汽 3 条交错升起 (2.4s ease-out, 延迟 0/0.6/1.2s)。
          用在 AI 推理、翻牌过场。
        </div>
      </div>
    </div>
  );
}

function LoadingBowl({ size = 96 }) {
  const s = size;
  return (
    <div style={{ position: "relative", width: s, height: s*1.3, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      {/* steam */}
      {[0, 0.6, 1.2].map((d, i) => (
        <div key={i} style={{
          position: "absolute", top: 0, left: "50%",
          width: 10, height: 14, borderRadius: 10,
          background: "rgba(122,184,165,0.55)",
          "--sx": `${(i-1)*8}px`,
          animation: `steamRise 2.4s ease-out ${d}s infinite`,
          transformOrigin: "center bottom",
          marginLeft: (i-1)*14 - 5,
        }}/>
      ))}
      {/* bowl */}
      <div style={{
        width: s, height: s*0.75, position: "relative",
        animation: "bowlBob 3.2s ease-in-out infinite",
      }}>
        <svg viewBox="0 0 100 75" width={s} height={s*0.75}>
          <defs>
            <linearGradient id="bowl2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFC9A9"/>
              <stop offset="1" stopColor="#FF9F7A"/>
            </linearGradient>
            <linearGradient id="soup2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFF3D6"/>
              <stop offset="1" stopColor="#FFD89E"/>
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="26" rx="42" ry="6" fill="url(#soup2)"/>
          <path d="M8 26 Q8 24 12 24 H88 Q92 24 92 26 L88 60 Q72 72 50 72 Q28 72 12 60 Z" fill="url(#bowl2)"/>
          {/* face */}
          <circle cx="38" cy="46" r="2.5" fill="#5C3D2E"/>
          <circle cx="62" cy="46" r="2.5" fill="#5C3D2E"/>
          <path d="M40 54 Q50 60 60 54" stroke="#5C3D2E" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <ellipse cx="30" cy="54" rx="3" ry="2" fill="#FF8FA3" opacity="0.55"/>
          <ellipse cx="70" cy="54" rx="3" ry="2" fill="#FF8FA3" opacity="0.55"/>
        </svg>
      </div>
    </div>
  );
}

function SpecPanel() {
  return (
    <div style={{ padding: "40px 32px 60px", maxWidth: 760 }}>
      <div style={{ marginBottom: 32 }}>
        <div className="chip chip-orange" style={{ marginBottom: 10 }}>DESIGN SYSTEM · v1.0</div>
        <h1 style={{ font: "700 36px/1.15 'ZCOOL KuaiLe', system-ui", margin: 0, color: "#5C3D2E" }}>
          美食大作战 · 视觉规范
        </h1>
        <div style={{ font: "500 14px/1.6 system-ui", color: "#8A6B5A", marginTop: 8, maxWidth: 520 }}>
          早午餐咖啡馆菜单 × 网易云评论区 × 少女心塔罗。温暖治愈、食欲感强，
          一点点神秘但不黑暗。
        </div>
      </div>
      <SpecSection title="01 · 配色" subtitle="主辅 + 点缀 + 渐变 · 主色暖橘贯穿所有 CTA">
        <ColorsSpec/>
      </SpecSection>
      <SpecSection title="02 · 字号层级" subtitle="中文可爱圆润 + 系统字正文 · 8 级"><TypeSpec/></SpecSection>
      <SpecSection title="03 · 间距规则" subtitle="4px 基准 · 1–12 共 9 档"><SpacingSpec/></SpecSection>
      <SpecSection title="04 · 圆角规则" subtitle="从标签到气泡，圆角随尺寸放大"><RadiiSpec/></SpecSection>
      <SpecSection title="05 · 按钮与标签" subtitle="所有按钮 hover/active/disabled 全态"><ButtonsSpec/></SpecSection>
      <SpecSection title="06 · Loading" subtitle="旋转小碗 + 薄荷色蒸汽"><LoadingSpec/></SpecSection>
    </div>
  );
}

Object.assign(window, { SpecPanel, LoadingBowl });
