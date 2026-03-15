import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/Card";
import { useResearch } from "../data/ResearchContext";

const quadrantConfig = {
  "quick-win": { label: "Quick Win", color: "#2DCFB0", bg: "rgba(45,207,176,0.08)", desc: "즉시 실행 가능하고 높은 효과" },
  strategic: { label: "Strategic", color: "#5462EF", bg: "rgba(84,98,239,0.08)", desc: "중장기 핵심 전략 기능" },
  "fill-in": { label: "Fill-in", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", desc: "여유 시 추가 구현 기능" },
  avoid: { label: "Avoid", color: "#EF4444", bg: "rgba(239,68,68,0.08)", desc: "현재 단계에서 보류" },
};

function Matrix({ opportunities }: { opportunities: any[] }) {
  const W = 460;
  const H = 360;
  const pad = 40;
  const innerW = W - pad * 2;
  const innerH = H - pad * 2;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {/* Background quadrants */}
      <rect x={pad} y={pad} width={innerW / 2} height={innerH / 2} fill="rgba(45,207,176,0.05)" />
      <rect x={pad + innerW / 2} y={pad} width={innerW / 2} height={innerH / 2} fill="rgba(84,98,239,0.05)" />
      <rect x={pad} y={pad + innerH / 2} width={innerW / 2} height={innerH / 2} fill="rgba(245,158,11,0.05)" />
      <rect x={pad + innerW / 2} y={pad + innerH / 2} width={innerW / 2} height={innerH / 2} fill="rgba(239,68,68,0.05)" />

      {/* Axes */}
      <line x1={pad} y1={pad + innerH / 2} x2={W - pad} y2={pad + innerH / 2} stroke="#1C1E30" strokeWidth={1} />
      <line x1={pad + innerW / 2} y1={pad} x2={pad + innerW / 2} y2={H - pad} stroke="#1C1E30" strokeWidth={1} />

      {/* Axis labels */}
      <text x={W / 2} y={16} textAnchor="middle" fill="#4A4F6A" fontSize="10" fontFamily="inherit">High Impact</text>
      <text x={W / 2} y={H - 4} textAnchor="middle" fill="#4A4F6A" fontSize="10" fontFamily="inherit">Low Impact</text>
      <text x={pad - 4} y={H / 2 + 30} textAnchor="middle" fill="#4A4F6A" fontSize="10" fontFamily="inherit" transform={`rotate(-90, ${pad - 4}, ${H / 2})`}>Low Effort</text>
      <text x={W - pad + 14} y={H / 2 + 30} textAnchor="middle" fill="#4A4F6A" fontSize="10" fontFamily="inherit" transform={`rotate(-90, ${W - pad + 14}, ${H / 2})`}>High Effort</text>

      {/* Quadrant labels */}
      <text x={pad + 8} y={pad + 14} fill="#2DCFB0" fontSize="10" fontFamily="inherit">Quick Win</text>
      <text x={pad + innerW / 2 + 8} y={pad + 14} fill="#5462EF" fontSize="10" fontFamily="inherit">Strategic</text>
      <text x={pad + 8} y={pad + innerH / 2 + 14} fill="#F59E0B" fontSize="10" fontFamily="inherit">Fill-in</text>
      <text x={pad + innerW / 2 + 8} y={pad + innerH / 2 + 14} fill="#EF4444" fontSize="10" fontFamily="inherit">Avoid</text>

      {/* Opportunity nodes */}
      {opportunities.map((op) => {
        const qConfig = quadrantConfig[op.quadrant as keyof typeof quadrantConfig] || quadrantConfig.avoid;
        const x = pad + (op.effort / 100) * innerW;
        const y = pad + ((100 - op.impact) / 100) * innerH;
        const r = op.size / 2;
        return (
          <g key={op.id}>
            <circle cx={x} cy={y} r={r + 3} fill={qConfig.color} opacity={0.15} />
            <circle cx={x} cy={y} r={r} fill={qConfig.color} opacity={0.85} />
            <text x={x} y={y + r + 12} textAnchor="middle" fill="#7A7E9E" fontSize="9" fontFamily="inherit">
              {op.label.length > 8 ? op.label.slice(0, 7) + "…" : op.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function OpportunityMap() {
  const navigate = useNavigate();
  const { data } = useResearch();
  const { opportunities } = data;

  return (
    <div style={{ padding: "48px", maxWidth: "1100px", margin: "0 auto" }}>
      <PageHeader
        breadcrumb="여정 맵 / 기회 지도"
        title="기회 지도"
        subtitle="Impact vs Effort 매트릭스로 제품 기회를 우선순위화합니다."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
        {/* Matrix */}
        <Card>
          <SectionHeader title="기회 매트릭스" subtitle="Impact(효과) × Effort(노력) 기준 분류" />
          <div style={{ background: "#0A0B12", borderRadius: "8px", padding: "16px", border: "1px solid #1A1C2E" }}>
            <Matrix opportunities={opportunities} />
          </div>
          {/* Legend */}
          <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
            {Object.entries(quadrantConfig).map(([key, qc]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: qc.color }} />
                <span style={{ color: "#7A7E9E", fontSize: "11px" }}>{qc.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quadrant Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {Object.entries(quadrantConfig).map(([key, qc]) => {
            const items = opportunities.filter((o) => o.quadrant === key);
            return (
              <Card key={key} style={{ borderTop: `3px solid ${qc.color}` }}>
                <p style={{ color: qc.color, fontSize: "11px", marginBottom: "8px" }}>{qc.label}</p>
                <p style={{ color: "#4A4F6A", fontSize: "11px", marginBottom: "10px" }}>{qc.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                  {items.map((item) => (
                    <li key={item.id} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <span style={{ color: qc.color, fontSize: "10px" }}>▸</span>
                      <span style={{ color: "#9A9EC0", fontSize: "12px" }}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Opportunity List */}
      <Card style={{ marginBottom: "40px" }}>
        <SectionHeader title="전체 기회 목록" subtitle="우선순위 기준으로 정렬된 제품 기회 항목" />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {["quick-win", "strategic", "fill-in", "avoid"].flatMap((q) =>
            opportunities
              .filter((o) => o.quadrant === q)
              .map((op) => {
                const qc = quadrantConfig[op.quadrant as keyof typeof quadrantConfig] || quadrantConfig.avoid;
                return (
                  <div
                    key={op.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      background: "#0E0F19",
                      border: "1px solid #1C1E30",
                      borderRadius: "8px",
                    }}
                  >
                    <span
                      style={{
                        background: qc.bg,
                        color: qc.color,
                        fontSize: "10px",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        border: `1px solid ${qc.color}30`,
                        whiteSpace: "nowrap",
                        minWidth: "80px",
                        textAlign: "center",
                      }}
                    >
                      {qc.label}
                    </span>
                    <span style={{ color: "#DDE0EE", fontSize: "13px", flex: 1 }}>{op.label}</span>
                    <div style={{ display: "flex", gap: "16px" }}>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ color: "#4A4F6A", fontSize: "10px" }}>Impact</p>
                        <div
                          style={{
                            width: "60px",
                            height: "4px",
                            background: "#1C1E30",
                            borderRadius: "2px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${op.impact}%`,
                              height: "100%",
                              background: qc.color,
                              borderRadius: "2px",
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ color: "#4A4F6A", fontSize: "10px" }}>Effort</p>
                        <div
                          style={{
                            width: "60px",
                            height: "4px",
                            background: "#1C1E30",
                            borderRadius: "2px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${op.effort}%`,
                              height: "100%",
                              background: "#4A4F6A",
                              borderRadius: "2px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </Card>

      {/* Footer Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "24px", borderTop: "1px solid #1C1E30" }}>
        <button
          onClick={() => navigate("/journey-map")}
          style={{ background: "transparent", border: "1px solid #1C1E30", borderRadius: "8px", padding: "10px 18px", color: "#7A7E9E", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "inherit" }}
        >
          <ChevronLeft size={14} /> 여정 맵
        </button>
        <button
          onClick={() => navigate("/ux-report")}
          style={{ background: "#5462EF", border: "none", borderRadius: "8px", padding: "10px 20px", color: "#fff", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "inherit" }}
        >
          UX 보고서 <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
