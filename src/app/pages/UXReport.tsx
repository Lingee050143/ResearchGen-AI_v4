import { useNavigate } from "react-router";
import { ChevronLeft, Copy, Download, FileText, ArrowRight } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/Card";
import { useResearch } from "../data/ResearchContext";

const quadrantConfig = {
  "quick-win": { label: "Quick Win", color: "#2DCFB0" },
  strategic: { label: "Strategic", color: "#5462EF" },
  "fill-in": { label: "Fill-in", color: "#F59E0B" },
  avoid: { label: "Avoid", color: "#EF4444" },
};

function MiniNetwork({ nodes, edges }: { nodes: any[], edges: [string, string][] }) {
  const W = 300;
  const H = 220;
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const getCoords = (node: any) => ({
    x: (node.x / 100) * W,
    y: (node.y / 100) * H,
  });
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {edges.map(([a, b], i) => {
        const na = nodeMap[a];
        const nb = nodeMap[b];
        if (!na || !nb) return null;
        const ca = getCoords(na);
        const cb = getCoords(nb);
        return (
          <line key={i} x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y} stroke="rgba(84,98,239,0.2)" strokeWidth={1} />
        );
      })}
      {nodes.map((node) => {
        const { x, y } = getCoords(node);
        const r = node.size / 3;
        return (
          <g key={node.id}>
            <circle cx={x} cy={y} r={r + 3} fill={node.color} opacity={0.1} />
            <circle cx={x} cy={y} r={r} fill={node.color} opacity={0.8} />
            {node.id !== "center" && (
              <text x={x} y={y + r + 9} textAnchor="middle" fill="#6B6F8A" fontSize="8" fontFamily="inherit">
                {node.label.length > 10 ? node.label.slice(0, 8) + "..." : node.label}
              </text>
            )}
            {node.id === "center" && (
              <text x={x} y={y + 3} textAnchor="middle" fill="#fff" fontSize="9" fontFamily="inherit">
                {node.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function MiniMatrix({ opportunities }: { opportunities: any[] }) {
  const W = 280;
  const H = 200;
  const pad = 28;
  const innerW = W - pad * 2;
  const innerH = H - pad * 2;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      <rect x={pad} y={pad} width={innerW / 2} height={innerH / 2} fill="rgba(45,207,176,0.06)" />
      <rect x={pad + innerW / 2} y={pad} width={innerW / 2} height={innerH / 2} fill="rgba(84,98,239,0.06)" />
      <rect x={pad} y={pad + innerH / 2} width={innerW / 2} height={innerH / 2} fill="rgba(245,158,11,0.06)" />
      <rect x={pad + innerW / 2} y={pad + innerH / 2} width={innerW / 2} height={innerH / 2} fill="rgba(239,68,68,0.06)" />
      <line x1={pad} y1={pad + innerH / 2} x2={W - pad} y2={pad + innerH / 2} stroke="#1C1E30" strokeWidth={1} />
      <line x1={pad + innerW / 2} y1={pad} x2={pad + innerW / 2} y2={H - pad} stroke="#1C1E30" strokeWidth={1} />
      <text x={pad + 6} y={pad + 12} fill="#2DCFB0" fontSize="8" fontFamily="inherit">Quick Win</text>
      <text x={pad + innerW / 2 + 6} y={pad + 12} fill="#5462EF" fontSize="8" fontFamily="inherit">Strategic</text>
      <text x={pad + 6} y={pad + innerH / 2 + 12} fill="#F59E0B" fontSize="8" fontFamily="inherit">Fill-in</text>
      <text x={pad + innerW / 2 + 6} y={pad + innerH / 2 + 12} fill="#EF4444" fontSize="8" fontFamily="inherit">Avoid</text>
      {opportunities.map((op) => {
        const qc = quadrantConfig[op.quadrant as keyof typeof quadrantConfig] || quadrantConfig.avoid;
        const x = pad + (op.effort / 100) * innerW;
        const y = pad + ((100 - op.impact) / 100) * innerH;
        const r = op.size / 3;
        return (
          <g key={op.id}>
            <circle cx={x} cy={y} r={r + 2} fill={qc.color} opacity={0.15} />
            <circle cx={x} cy={y} r={r} fill={qc.color} opacity={0.8} />
          </g>
        );
      })}
    </svg>
  );
}

export function UXReport() {
  const navigate = useNavigate();
  const { data } = useResearch();
  
  const {
    product,
    problemSummary,
    insightSummary,
    opportunitySummary,
    keyInsights,
    hmwQuestions,
    insightNodes,
    insightEdges,
    personas,
    opportunities,
    implementationPlan,
  } = data;

  const summaryCards = [
    { title: "문제 요약", items: problemSummary, color: "#EF8070", bg: "rgba(239,128,112,0.1)" },
    { title: "핵심 인사이트 요약", items: insightSummary, color: "#2DCFB0", bg: "rgba(45,207,176,0.1)" },
    { title: "제품 기회 요약", items: opportunitySummary, color: "#5462EF", bg: "rgba(84,98,239,0.1)" },
  ];

  const handleCopyJSON = () => {
    const json = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(json);
    alert("보고서 데이터가 JSON으로 복사되었습니다.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      {/* Scrollable Content */}
      <div style={{ flex: 1, padding: "48px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <PageHeader
          breadcrumb="기회 지도 / UX 보고서"
          title="UX 연구 보고서"
          subtitle="전체 연구 보고서 — JSON 형식으로 내보내기 클립보드에 복사할 수 있습니다."
        />

        {/* Report Title Card */}
        <div
          style={{
            background: "#0E1020",
            border: "1px solid #1C1E30",
            borderRadius: "10px",
            padding: "20px 24px",
            marginBottom: "32px",
          }}
        >
          <p style={{ color: "#5462EF", fontSize: "11px", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            UX 연구 보고서 · {product.date}
          </p>
          <h3 style={{ color: "#DDE0EE", marginBottom: "6px" }}>
            {product.name} — {product.subtitle}
          </h3>
          <p style={{ color: "#7A7E9E", fontSize: "13px" }}>
            대상: {product.targetUser}
          </p>
        </div>

        {/* Research Context */}
        <Card style={{ marginBottom: "24px" }}>
          <SectionHeader title="연구 배경" />
          <p style={{ color: "#9A9EC0", fontSize: "14px", lineHeight: 1.7 }}>
            {product.description}
          </p>
        </Card>

        {/* 3-column Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {summaryCards.map((sc) => (
            <Card key={sc.title}>
              <div style={{ width: "28px", height: "28px", background: sc.bg, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                <div style={{ width: "7px", height: "7px", background: sc.color, borderRadius: "50%" }} />
              </div>
              <h4 style={{ color: "#DDE0EE", marginBottom: "10px" }}>{sc.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
                {sc.items.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "7px", alignItems: "flex-start" }}>
                    <span style={{ color: sc.color, fontSize: "11px", marginTop: "2px" }}>▸</span>
                    <span style={{ color: "#9A9EC0", fontSize: "12px", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Key Insights */}
        <Card style={{ marginBottom: "24px" }}>
          <SectionHeader title="핵심 인사이트" />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {keyInsights.map((insight, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", padding: "10px", background: "#0E0F19", borderRadius: "8px", border: "1px solid #1C1E30" }}>
                <div style={{ width: "20px", height: "20px", background: "rgba(84,98,239,0.15)", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#5462EF", fontSize: "10px" }}>{i + 1}</span>
                </div>
                <p style={{ color: "#9A9EC0", fontSize: "13px", lineHeight: 1.6 }}>{insight}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* HMW */}
        <Card style={{ marginBottom: "24px" }}>
          <SectionHeader title="우리는 어떻게... 할 수 있을까? (HMW)" />
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {hmwQuestions.map((q, i) => (
              <div key={i} style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                <div style={{ width: "22px", height: "22px", background: "#0E0F19", border: "1px solid #1C1E30", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ArrowRight size={10} style={{ color: "#5462EF" }} />
                </div>
                <p style={{ color: "#9A9EC0", fontSize: "12px", lineHeight: 1.6 }}>{q}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Insight Map Section */}
        <Card style={{ marginBottom: "24px" }}>
          <SectionHeader title="인사이트 맵" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ background: "#0A0B12", borderRadius: "8px", padding: "16px", border: "1px solid #1A1C2E" }}>
              <MiniNetwork nodes={insightNodes} edges={insightEdges as [string, string][]} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <p style={{ color: "#4A4F6A", fontSize: "11px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>인사이트 분석</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
                  {keyInsights.slice(0, 3).map((insight, i) => (
                    <li key={i} style={{ display: "flex", gap: "7px" }}>
                      <span style={{ color: "#2DCFB0", fontSize: "11px" }}>▸</span>
                      <span style={{ color: "#9A9EC0", fontSize: "12px", lineHeight: 1.5 }}>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: "12px" }}>
                <p style={{ color: "#4A4F6A", fontSize: "11px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>UX 경험 클러스터</p>
                {insightNodes.filter(n => n.id !== "center").slice(0, 4).map((node) => (
                  <div key={node.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ color: "#7A7E9E", fontSize: "11px", minWidth: "120px" }}>{node.label}</span>
                    <div style={{ flex: 1, height: "4px", background: "#1C1E30", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: `${node.size}%`, height: "100%", background: node.color, borderRadius: "2px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Persona Section */}
        <Card style={{ marginBottom: "24px" }}>
          <SectionHeader title="페르소나" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <p style={{ color: "#4A4F6A", fontSize: "11px", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>페르소나 매트릭스</p>
              <div style={{ background: "#0A0B12", borderRadius: "8px", padding: "10px", border: "1px solid #1A1C2E", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="220" height="150" viewBox="0 0 220 150">
                  <line x1={20} y1={75} x2={200} y2={75} stroke="#1C1E30" strokeWidth={1} />
                  <line x1={110} y1={10} x2={110} y2={140} stroke="#1C1E30" strokeWidth={1} />
                  <text x={110} y={8} textAnchor="middle" fill="#3A3E5A" fontSize="8">High Adoption</text>
                  <text x={110} y={148} textAnchor="middle" fill="#3A3E5A" fontSize="8">Low Adoption</text>
                  {personas.map((p) => {
                    const x = 20 + (p.x / 100) * 180;
                    const y = 10 + (p.y / 100) * 130;
                    return (
                      <g key={p.id}>
                        <circle cx={x} cy={y} r={12} fill={p.color} opacity={0.8} />
                        <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize="8">{p.id}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ color: "#4A4F6A", fontSize: "11px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>페르소나 특성</p>
              {personas.map((p) => (
                <div key={p.id} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `${p.color}20`, border: `1.5px solid ${p.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: p.color, fontSize: "11px" }}>{p.id}</span>
                  </div>
                  <div>
                    <p style={{ color: "#DDE0EE", fontSize: "12px", marginBottom: "2px" }}>{p.name}</p>
                    <p style={{ color: "#5462EF", fontSize: "10px", marginBottom: "4px" }}>{p.role}</p>
                    <p style={{ color: "#7A7E9E", fontSize: "11px", lineHeight: 1.5 }}>{p.goals}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Opportunity Map Section */}
        <Card style={{ marginBottom: "24px" }}>
          <SectionHeader title="기회 지도" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <p style={{ color: "#4A4F6A", fontSize: "11px", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>기회 지도 시각화</p>
              <div style={{ background: "#0A0B12", borderRadius: "8px", padding: "12px", border: "1px solid #1A1C2E" }}>
                <MiniMatrix opportunities={opportunities} />
              </div>
            </div>
            <div>
              <p style={{ color: "#4A4F6A", fontSize: "11px", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>전략 해석</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {Object.entries(quadrantConfig).map(([key, qc]) => {
                  const items = opportunities.filter((o) => o.quadrant === key);
                  return (
                    <div
                      key={key}
                      style={{ padding: "10px", background: "#0E0F19", border: "1px solid #1C1E30", borderRadius: "6px", borderTop: `2px solid ${qc.color}` }}
                    >
                      <p style={{ color: qc.color, fontSize: "10px", marginBottom: "6px" }}>{qc.label}</p>
                      {items.map((item) => (
                        <div key={item.id} style={{ display: "flex", gap: "5px", marginBottom: "4px" }}>
                          <span style={{ color: qc.color, fontSize: "9px" }}>▸</span>
                          <span style={{ color: "#7A7E9E", fontSize: "11px" }}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* Implementation Plan */}
        <Card style={{ marginBottom: "40px" }}>
          <SectionHeader title="권장 실행 계획" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {[
              { label: "단기 전략", color: "#2DCFB0", timeline: "0~4주", items: implementationPlan.shortTerm },
              { label: "중기 전략", color: "#5462EF", timeline: "1~3개월", items: implementationPlan.midTerm },
              { label: "장기 전략", color: "#9B7AEA", timeline: "3~6개월", items: implementationPlan.longTerm },
            ].map((col) => (
              <div key={col.label}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h4 style={{ color: col.color }}>{col.label}</h4>
                  <span style={{ color: "#4A4F6A", fontSize: "11px" }}>{col.timeline}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "12px",
                        background: "#0E0F19",
                        border: "1px solid #1C1E30",
                        borderRadius: "8px",
                        borderLeft: `3px solid ${col.color}`,
                      }}
                    >
                      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
                        <div style={{ width: "18px", height: "18px", background: `${col.color}20`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: col.color, fontSize: "10px" }}>{i + 1}</span>
                        </div>
                        <p style={{ color: "#DDE0EE", fontSize: "12px", lineHeight: 1.4 }}>{item.title}</p>
                      </div>
                      <p style={{ color: "#7A7E9E", fontSize: "11px", lineHeight: 1.5, paddingLeft: "26px" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sticky Bottom Bar */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "#0E0F19",
          borderTop: "1px solid #1C1E30",
          padding: "12px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => navigate("/opportunity-map")}
          style={{
            background: "transparent",
            border: "1px solid #1C1E30",
            borderRadius: "8px",
            padding: "9px 16px",
            color: "#7A7E9E",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "inherit",
          }}
        >
          <ChevronLeft size={14} /> 기회지도
        </button>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleCopyJSON}
            style={{
              background: "transparent",
              border: "1px solid #1C1E30",
              borderRadius: "8px",
              padding: "9px 16px",
              color: "#7A7E9E",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "inherit",
            }}
          >
            <Copy size={13} /> JSON 복사
          </button>
          <button
            style={{
              background: "transparent",
              border: "1px solid #1C1E30",
              borderRadius: "8px",
              padding: "9px 16px",
              color: "#7A7E9E",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "inherit",
            }}
          >
            <Download size={13} /> JSON 다운로드
          </button>
          <button
            style={{
              background: "#5462EF",
              border: "none",
              borderRadius: "8px",
              padding: "9px 18px",
              color: "#fff",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "inherit",
            }}
          >
            <FileText size={13} /> 다운로드(PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
