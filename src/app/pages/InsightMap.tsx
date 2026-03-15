import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/Card";
import { useResearch } from "../data/ResearchContext";

function NetworkGraph({ nodes, edges }: { nodes: any[], edges: string[][] }) {
  const W = 520;
  const H = 400;

  const getCoords = (node: any) => ({
    x: (node.x / 100) * W,
    y: (node.y / 100) * H,
  });

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {/* Edges */}
      {edges.map(([a, b], i) => {
        const na = nodeMap[a];
        const nb = nodeMap[b];
        if (!na || !nb) return null;
        const ca = getCoords(na);
        const cb = getCoords(nb);
        return (
          <line
            key={i}
            x1={ca.x}
            y1={ca.y}
            x2={cb.x}
            y2={cb.y}
            stroke="rgba(84,98,239,0.2)"
            strokeWidth={1}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const { x, y } = getCoords(node);
        const r = node.size / 2;
        return (
          <g key={node.id}>
            <circle
              cx={x}
              cy={y}
              r={r + 4}
              fill={node.color}
              opacity={0.12}
            />
            <circle cx={x} cy={y} r={r} fill={node.color} opacity={0.85} />
            <text
              x={x}
              y={y + r + 14}
              textAnchor="middle"
              fill="#9A9EC0"
              fontSize="11"
              fontFamily="inherit"
            >
              {node.label}
            </text>
            {node.id === "center" && (
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="#fff"
                fontSize="11"
                fontFamily="inherit"
              >
                {node.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function InsightMap() {
  const navigate = useNavigate();
  const { data } = useResearch();
  const { insightNodes, insightEdges, insightDescriptions } = data;

  return (
    <div style={{ padding: "48px", maxWidth: "1100px", margin: "0 auto" }}>
      <PageHeader
        breadcrumb="AI 분석 / 인사이트 맵"
        title="인사이트 맵"
        subtitle="제품 아이디어의 핵심 인사이트 간 관계를 네트워크로 시각화합니다."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
        {/* Network Graph */}
        <Card noPadding style={{ padding: "24px" }}>
          <SectionHeader title="인사이트 네트워크" subtitle="노드 간 연결은 개념적 연관성을 나타냅니다." />
          <div
            style={{
              background: "#0A0B12",
              borderRadius: "8px",
              padding: "16px",
              border: "1px solid #1A1C2E",
            }}
          >
            <NetworkGraph nodes={insightNodes} edges={insightEdges} />
          </div>
          {/* Legend */}
          <div style={{ display: "flex", gap: "16px", marginTop: "16px", flexWrap: "wrap" }}>
            {[
              { color: "#5462EF", label: "핵심 개념" },
              { color: "#2DCFB0", label: "사용자 행동" },
              { color: "#9B7AEA", label: "기술 영역" },
              { color: "#F59E0B", label: "시장 요소" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color }} />
                <span style={{ color: "#7A7E9E", fontSize: "11px" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Insight Descriptions */}
        <Card>
          <SectionHeader title="인사이트 설명" />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {insightDescriptions.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: "12px",
                  background: "#0E0F19",
                  border: "1px solid #1C1E30",
                  borderRadius: "8px",
                  borderLeft: `3px solid ${d.color}`,
                }}
              >
                <p style={{ color: "#DDE0EE", fontSize: "12px", marginBottom: "6px" }}>{d.node}</p>
                <p style={{ color: "#7A7E9E", fontSize: "12px", lineHeight: 1.5 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cluster Summary - Semi-dynamic from insightNodes */}
      <Card style={{ marginBottom: "40px" }}>
        <SectionHeader title="주제별 그룹화" subtitle="분석된 인사이트의 주요 영역입니다." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[
            { color: "#5462EF", label: "핵심 개념" },
            { color: "#2DCFB0", label: "사용자 행동" },
            { color: "#9B7AEA", label: "기술 영역" },
            { color: "#F59E0B", label: "시장 요소" },
          ].map((cluster) => {
            const clusterNodes = insightNodes.filter(n => n.color === cluster.color && n.id !== "center");
            if (clusterNodes.length === 0) return null;
            
            return (
              <div
                key={cluster.label}
                style={{
                  padding: "16px",
                  background: "#0E0F19",
                  border: "1px solid #1C1E30",
                  borderRadius: "8px",
                }}
              >
                <p style={{ color: cluster.color, fontSize: "12px", fontWeight: "bold", marginBottom: "12px" }}>{cluster.label}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {clusterNodes.map(n => (
                    <div key={n.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: cluster.color }} />
                      <span style={{ color: "#DDE0EE", fontSize: "11px" }}>{n.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Footer Nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "24px",
          borderTop: "1px solid #1C1E30",
        }}
      >
        <button
          onClick={() => navigate("/analysis")}
          style={{
            background: "transparent",
            border: "1px solid #1C1E30",
            borderRadius: "8px",
            padding: "10px 18px",
            color: "#7A7E9E",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "inherit",
          }}
        >
          <ChevronLeft size={14} /> AI 분석
        </button>
        <button
          onClick={() => navigate("/persona")}
          style={{
            background: "#5462EF",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            color: "#fff",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "inherit",
          }}
        >
          페르소나 <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
