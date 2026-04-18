// Tweaks.jsx — floating editor surface (controlled by host)

const { useState: useT, useEffect: useEffT } = React;

function TweaksPanel({ tweaks, setTweaks, visible }) {
  if (!visible) return null;
  const upd = (k, v) => {
    setTweaks(prev => ({ ...prev, [k]: v }));
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
    } catch(e) {}
  };
  return (
    <div style={{
      position: "fixed", right: 16, bottom: 16, zIndex: 200,
      width: 260, background: "#fff", borderRadius: 20,
      boxShadow: "0 20px 40px rgba(92,61,46,0.22), 0 6px 14px rgba(92,61,46,0.08)",
      border: "1px solid rgba(92,61,46,0.08)",
      padding: 16, font: "500 13px/1.5 system-ui", color: "#5C3D2E",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#FF9F7A", boxShadow: "0 0 0 4px rgba(255,159,122,0.2)" }}/>
        <div style={{ font: "700 14px/1 'ZCOOL KuaiLe', system-ui" }}>Tweaks</div>
      </div>
      <TRow label="跳到哪一步">
        <TSeg value={tweaks.initialStep} onChange={v => upd("initialStep", v)}
              options={[["mood","心情"],["draw","抽牌"],["loading","Loading"],["result","结果"]]}/>
      </TRow>
      <TRow label="预选心情">
        <TSeg value={tweaks.initialMood || ""} onChange={v => upd("initialMood", v)}
              options={[["","无"],["happy","美滋滋"],["energetic","元气"],["emo","emo"],["crash","裂开"]]}/>
      </TRow>
      <TRow label="卡牌布局">
        <TSeg value={tweaks.deckLayout} onChange={v => upd("deckLayout", v)}
              options={[["fan","扇形"],["grid","网格"]]}/>
      </TRow>
      <TRow label="背景色调">
        <TSeg value={tweaks.bgVariant} onChange={v => upd("bgVariant", v)}
              options={[["warm","暖橘"],["mint","薄荷"],["pink","柔粉"]]}/>
      </TRow>
    </div>
  );
}

function TRow({ label, children }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ font: "600 11px/1 system-ui", color: "#8A6B5A", marginBottom: 6, letterSpacing: 0.5 }}>{label}</div>
      {children}
    </div>
  );
}
function TSeg({ value, onChange, options }) {
  return (
    <div style={{ display: "flex", background: "#FFF3E3", padding: 3, borderRadius: 999, gap: 2, flexWrap: "wrap" }}>
      {options.map(([v,l]) => (
        <button key={v} onClick={() => onChange(v)} style={{
          flex: 1, minWidth: 40,
          padding: "6px 8px", borderRadius: 999,
          background: value === v ? "#fff" : "transparent",
          boxShadow: value === v ? "0 2px 4px rgba(92,61,46,0.1)" : "none",
          font: "600 11px/1 system-ui", color: value === v ? "#D6694A" : "#8A6B5A",
          transition: "all 160ms var(--ease)",
          whiteSpace: "nowrap",
        }}>{l}</button>
      ))}
    </div>
  );
}

Object.assign(window, { TweaksPanel });
