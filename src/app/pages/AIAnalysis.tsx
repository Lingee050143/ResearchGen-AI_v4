import { useNavigate } from "react-router";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { Card, PageHeader, SectionHeader } from "../components/Card";
import { useResearch } from "../data/ResearchContext";

export function AIAnalysis() {
  const navigate = useNavigate();
  const { data } = useResearch();
  const { product, problemSummary, insightSummary, opportunitySummary, keyInsights, hmwQuestions } = data;

  const summaryCards = [
    { title: "문제 요약", items: problemSummary, color: "#EF8070", bg: "rgba(239,128,112,0.1)" },
    { title: "핵심 인사이트 요약", items: insightSummary, color: "#2DCFB0", bg: "rgba(45,207,176,0.1)" },
    { title: "제품 기회 요약", items: opportunitySummary, color: "#5462EF", bg: "rgba(84,98,239,0.1)" },
  ];

  return (
    <div style={{ padding: "48px", maxWidth: "1100px", margin: "0 auto" }}>
      <PageHeader
        breadcrumb="아이디어 입력 / AI 분석"
        title="AI 분석"
        subtitle={`${product.name} 제품 아이디어에 대한 AI 분석 결과입니다.`}
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
          AI 분석 보고서 · {product.date}
        </p>
        <h3 style={{ color: "#DDE0EE", marginBottom: "6px" }}>
          {product.name} — {product.subtitle}
        </h3>
        <p style={{ color: "#7A7E9E", fontSize: "13px" }}>
          대상 사용자: {product.targetUser} · 분석 완료
        </p>
      </div>

      {/* Research Context */}
      <Card style={{ marginBottom: "24px" }}>
        <SectionHeader title="연구 배경" />
        <p style={{ color: "#9A9EC0", fontSize: "14px", lineHeight: 1.7 }}>
          {product.description}
        </p>
      </Card>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {summaryCards.map((sc) => (
          <Card key={sc.title}>
            <div
              style={{
                width: "30px",
                height: "30px",
                background: sc.bg,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <div style={{ width: "8px", height: "8px", background: sc.color, borderRadius: "50%" }} />
            </div>
            <h4 style={{ color: "#DDE0EE", marginBottom: "12px" }}>{sc.title}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {sc.items.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: sc.color, fontSize: "12px", marginTop: "2px" }}>▸</span>
                  <span style={{ color: "#9A9EC0", fontSize: "13px", lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Key Insights */}
      <Card style={{ marginBottom: "24px" }}>
        <SectionHeader title="핵심 인사이트" />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {keyInsights.map((insight, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                background: "#0E0F19",
                borderRadius: "8px",
                border: "1px solid #1C1E30",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  background: "rgba(84,98,239,0.15)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#5462EF", fontSize: "11px" }}>{i + 1}</span>
              </div>
              <p style={{ color: "#9A9EC0", fontSize: "13px", lineHeight: 1.6 }}>{insight}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* HMW Questions */}
      <Card style={{ marginBottom: "40px" }}>
        <SectionHeader title="우리는 어떻게... 할 수 있을까?" subtitle="How Might We Questions" />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {hmwQuestions.map((q, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  background: "#0E0F19",
                  border: "1px solid #1C1E30",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ArrowRight size={11} style={{ color: "#5462EF" }} />
              </div>
              <p style={{ color: "#9A9EC0", fontSize: "13px", lineHeight: 1.6 }}>{q}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer Nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "24px",
          borderTop: "1px solid #1C1E30",
        }}
      >
        <button
          onClick={() => navigate("/")}
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
          <ChevronLeft size={14} /> 아이디어 입력
        </button>
        <button
          onClick={() => navigate("/insight-map")}
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
          인사이트 맵 <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
