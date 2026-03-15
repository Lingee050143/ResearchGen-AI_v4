import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, PageHeader, SectionHeader } from "../components/Card";
import { useResearch } from "../data/ResearchContext";

// Custom dot shape to avoid Cell key conflicts
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={14} fill={payload.color} opacity={0.15} />
      <circle cx={cx} cy={cy} r={10} fill={payload.color} opacity={0.85} />
      <text x={cx} y={cy + 4} textAnchor="middle" fill="#fff" fontSize="10" fontFamily="inherit">
        {payload.id}
      </text>
    </g>
  );
};

export function Persona() {
  const navigate = useNavigate();
  const { data } = useResearch();
  const { personas } = data;

  const scatterData = personas.map((p) => ({ 
    x: typeof p.x === 'number' ? p.x : Math.random() * 100, 
    y: typeof p.y === 'number' ? p.y : Math.random() * 100, 
    name: p.name, 
    id: p.id, 
    color: p.color, 
    size: p.size 
  }));

  return (
    <div style={{ padding: "48px", maxWidth: "1100px", margin: "0 auto" }}>
      <PageHeader
        breadcrumb="인사이트 맵 / 페르소나"
        title="페르소나"
        subtitle={`${data.product.name} 타깃 사용자 그룹을 2x2 매트릭스로 시각화합니다.`}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
        {/* Matrix Chart */}
        <Card>
          <SectionHeader title="페르소나 매트릭스" subtitle="학습 동기 강도 × 기술 수용도" />
          <div
            style={{
              background: "#0A0B12",
              borderRadius: "8px",
              padding: "16px",
              border: "1px solid #1A1C2E",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* Axis Labels */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#4A4F6A", fontSize: "10px" }}>← Low Motivation</span>
                <span style={{ color: "#4A4F6A", fontSize: "10px" }}>High Motivation →</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A1C2E" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, 100]}
                    tick={{ fill: "#4A4F6A", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[0, 100]}
                    tick={{ fill: "#4A4F6A", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    reversed
                  />
                  <ReferenceLine x={50} stroke="#1C1E30" strokeWidth={2} />
                  <ReferenceLine y={50} stroke="#1C1E30" strokeWidth={2} />
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div
                          style={{
                            background: "#13151F",
                            border: "1px solid #1C1E30",
                            borderRadius: "6px",
                            padding: "8px 12px",
                            fontSize: "12px",
                            color: "#DDE0EE",
                          }}
                        >
                          {d.name}
                        </div>
                      );
                    }}
                  />
                  <Scatter data={scatterData} shape={<CustomDot />} />
                </ScatterChart>
              </ResponsiveContainer>
              {/* Quadrant Labels */}
              <div style={{ position: "absolute", top: "38px", left: "28px" }}>
                <span style={{ color: "#2A2E48", fontSize: "10px" }}>Low Adoption</span>
              </div>
              <div style={{ position: "absolute", top: "38px", right: "24px" }}>
                <span style={{ color: "#2A2E48", fontSize: "10px" }}>High Adoption</span>
              </div>
            </div>
            {/* Persona dots legend */}
            <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
              {personas.map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: p.color }} />
                  <span style={{ color: "#7A7E9E", fontSize: "11px" }}>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Persona List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {personas.map((p) => (
            <Card key={p.id} style={{ borderLeft: `3px solid ${p.color}` }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: `${p.color}25`,
                    border: `2px solid ${p.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: p.color, fontSize: "13px" }}>{p.id}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: "#DDE0EE", marginBottom: "2px" }}>{p.name}</h4>
                  <p style={{ color: "#5462EF", fontSize: "11px", marginBottom: "8px" }}>{p.role}</p>
                  <p style={{ color: "#7A7E9E", fontSize: "12px", lineHeight: 1.5, marginBottom: "8px" }}>
                    <span style={{ color: "#4A4F6A" }}>목표: </span>{p.goals}
                  </p>
                  <p style={{ color: "#7A7E9E", fontSize: "12px", lineHeight: 1.5 }}>
                    <span style={{ color: "#4A4F6A" }}>불만: </span>{p.frustrations}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Persona Detail Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "40px" }}>
        {personas.map((p) => (
          <Card key={p.id}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: `${p.color}20`,
                  border: `1.5px solid ${p.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: p.color, fontSize: "12px" }}>{p.id}</span>
              </div>
              <div>
                <p style={{ color: "#DDE0EE", fontSize: "13px" }}>{p.name}</p>
                <p style={{ color: "#4A4F6A", fontSize: "11px" }}>{p.age}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <p style={{ color: "#4A4F6A", fontSize: "10px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>행동 패턴</p>
                <p style={{ color: "#7A7E9E", fontSize: "12px", lineHeight: 1.5 }}>{p.behaviors}</p>
              </div>
              <div>
                <p style={{ color: "#4A4F6A", fontSize: "10px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>핵심 불편</p>
                <span
                  style={{
                    background: `${p.color}18`,
                    color: p.color,
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    border: `1px solid ${p.color}30`,
                  }}
                >
                  {p.pain}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "24px", borderTop: "1px solid #1C1E30" }}>
        <button
          onClick={() => navigate("/insight-map")}
          style={{ background: "transparent", border: "1px solid #1C1E30", borderRadius: "8px", padding: "10px 18px", color: "#7A7E9E", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "inherit" }}
        >
          <ChevronLeft size={14} /> 인사이트 맵
        </button>
        <button
          onClick={() => navigate("/journey-map")}
          style={{ background: "#5462EF", border: "none", borderRadius: "8px", padding: "10px 20px", color: "#fff", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "inherit" }}
        >
          여정 맵 <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}