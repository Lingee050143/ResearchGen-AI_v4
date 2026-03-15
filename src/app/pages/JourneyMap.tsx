import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/Card";
import { useResearch } from "../data/ResearchContext";

const EMOJI_MAP: Record<number, string> = {
  1: "😟",
  2: "😐",
  3: "🙂",
  4: "😊",
  5: "😄",
};

function EmotionCurve({ emotions, phases }: { emotions: number[], phases: string[] }) {
  const W = 700;
  const H = 160;
  const padX = 40;
  const padY = 20;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;

  const points = emotions.map((e, i) => ({
    x: padX + (i / (phases.length - 1)) * innerW,
    y: padY + ((5 - e) / 4) * innerH,
    emotion: e,
    phase: phases[i],
  }));

  const smoothD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + p.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${p.y} ${p.x} ${p.y}`;
  }, "");

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => {
        const y = padY + (i / 4) * innerH;
        return (
          <line key={i} x1={padX} y1={y} x2={W - padX} y2={y} stroke="#1A1C2E" strokeWidth={1} strokeDasharray="4,4" />
        );
      })}

      {/* Vertical phase lines */}
      {points.map((p, i) => (
        <line key={i} x1={p.x} y1={padY} x2={p.x} y2={H - padY} stroke="#1A1C2E" strokeWidth={1} strokeDasharray="4,4" />
      ))}

      {/* Gradient fill under curve */}
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5462EF" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#5462EF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d={`${smoothD} L ${points[points.length - 1].x} ${H - padY} L ${padX} ${H - padY} Z`}
        fill="url(#curveGrad)"
      />

      {/* Curve line */}
      <path d={smoothD} stroke="#5462EF" strokeWidth={2} fill="none" />

      {/* Nodes */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={16} fill="#13151F" stroke="#1C1E30" strokeWidth={1.5} />
          <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="14">
            {EMOJI_MAP[p.emotion] || "🙂"}
          </text>
        </g>
      ))}

      {/* Phase labels */}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={H - 2} textAnchor="middle" fill="#4A4F6A" fontSize="11" fontFamily="inherit">
          {p.phase}
        </text>
      ))}
    </svg>
  );
}

export function JourneyMap() {
  const navigate = useNavigate();
  const { data } = useResearch();
  const { 
    journeyPhases, 
    journeyEmotions, 
    journeyExperiences, 
    journeyExpectations, 
    journeyInsights, 
    personas,
    product
  } = data;
  
  const persona = personas[0];

  return (
    <div style={{ padding: "48px", maxWidth: "1100px", margin: "0 auto" }}>
      <PageHeader
        breadcrumb="페르소나 / 여정 맵"
        title="사용자 여정 맵"
        subtitle={`${persona.name} 페르소나의 ${product.name} 사용 경험 여정을 시각화합니다.`}
      />

      {/* Persona Header */}
      <Card style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: `${persona.color}20`,
              border: `2px solid ${persona.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: persona.color, fontSize: "18px" }}>{persona.id}</span>
          </div>
          <div>
            <h3 style={{ color: "#DDE0EE", marginBottom: "4px" }}>{persona.name}</h3>
            <p style={{ color: "#7A7E9E", fontSize: "13px" }}>{persona.role}</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "20px" }}>
            {[
              { label: "시나리오", value: `${product.name} 앱을 통한 문제 해결 시도` },
              { label: "주요 목표", value: persona.goals },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ color: "#4A4F6A", fontSize: "10px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {item.label}
                </p>
                <p style={{ color: "#9A9EC0", fontSize: "12px", maxWidth: "200px" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Emotion Curve */}
      <Card style={{ marginBottom: "20px" }}>
        <SectionHeader title="감정 곡선" subtitle="각 여정 단계별 사용자 감정 변화" />
        <div
          style={{
            background: "#0A0B12",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #1A1C2E",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", marginBottom: "8px" }}>
            {Object.entries(EMOJI_MAP).reverse().map(([k, v]) => (
              <span key={k} style={{ color: "#4A4F6A", fontSize: "11px" }}>{v} {k === "5" ? "긍정" : k === "1" ? "부정" : ""}</span>
            ))}
          </div>
          <EmotionCurve emotions={journeyEmotions} phases={journeyPhases} />
        </div>
      </Card>

      {/* Experience Table */}
      <Card style={{ marginBottom: "20px" }}>
        <SectionHeader title="경험 & 기대 분석" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <td style={{ width: "120px", padding: "8px 12px", color: "#4A4F6A", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  구분
                </td>
                {journeyPhases.map((phase) => (
                  <td key={phase} style={{ padding: "8px 12px", color: "#7A7E9E", fontSize: "12px", textAlign: "center", borderBottom: "1px solid #1C1E30" }}>
                    {phase}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 12px", color: "#2DCFB0", fontSize: "12px", borderBottom: "1px solid #1C1E30" }}>실제 경험</td>
                {journeyExperiences.map((exp, i) => (
                  <td
                    key={i}
                    style={{
                      padding: "10px 12px",
                      color: "#7A7E9E",
                      fontSize: "11px",
                      textAlign: "center",
                      borderBottom: "1px solid #1C1E30",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {exp}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", color: "#9B7AEA", fontSize: "12px" }}>기대 사항</td>
                {journeyExpectations.map((exp, i) => (
                  <td
                    key={i}
                    style={{
                      padding: "10px 12px",
                      color: "#7A7E9E",
                      fontSize: "11px",
                      textAlign: "center",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {exp}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insight Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px", marginBottom: "40px" }}>
        {journeyInsights.map((ins, i) => (
          <Card key={i} style={{ borderLeft: `3px solid ${ins.color}` }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span
                style={{
                  background: `${ins.color}20`,
                  color: ins.color,
                  fontSize: "10px",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  marginTop: "1px",
                }}
              >
                {ins.phase}
              </span>
              <p style={{ color: "#9A9EC0", fontSize: "13px", lineHeight: 1.5 }}>{ins.text}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "24px", borderTop: "1px solid #1C1E30" }}>
        <button
          onClick={() => navigate("/persona")}
          style={{ background: "transparent", border: "1px solid #1C1E30", borderRadius: "8px", padding: "10px 18px", color: "#7A7E9E", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "inherit" }}
        >
          <ChevronLeft size={14} /> 페르소나
        </button>
        <button
          onClick={() => navigate("/opportunity-map")}
          style={{ background: "#5462EF", border: "none", borderRadius: "8px", padding: "10px 20px", color: "#fff", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "inherit" }}
        >
          기회 지도 <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
