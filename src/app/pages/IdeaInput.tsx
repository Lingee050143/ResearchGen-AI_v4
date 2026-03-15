import { useState } from "react";
import { useNavigate } from "react-router";
import { Lightbulb, Users, AlertCircle, Sparkles, ChevronRight, Key, Settings } from "lucide-react";
import { Card, PageHeader } from "../components/Card";
import { useResearch } from "../data/ResearchContext";
import { generateResearch } from "../data/AIService";

export function IdeaInput() {
  const navigate = useNavigate();
  const { setData, apiKey, setApiKey, isLoading, setIsLoading } = useResearch();
  
  const [idea, setIdea] = useState(
    "FocusLoop는 AI 기반 집중 시간 관리 및 교육 흐름 앱입니다. 학습자들이 학습을 시작하고 지속하는 데 겪는 어려움을 해결하기 위해, 행동 심리학 기반의 학습 시작 기능과 AI 패턴 분석, 습관 형성 메커니즘을 결합합니다."
  );
  const [target, setTarget] = useState("대학생, 직장인 자기계발자, 온라인 학습자");
  const [context, setContext] = useState(
    "기존 타이머 앱들은 개인별 학습 패턴과 동기 부여를 고려하지 않아 지속 사용률이 낮습니다. 사용자들은 학습 시작 자체를 어려워하며 집중력 유지에도 실패합니다."
  );
  const [showApiSettings, setShowApiSettings] = useState(false);

  const handleAnalyze = async () => {
    if (!apiKey) {
      alert("AI 분석을 위해 OpenAI API Key를 입력해주세요.");
      setShowApiSettings(true);
      return;
    }

    setIsLoading(true);
    try {
      const researchResult = await generateResearch(apiKey, idea, target, context);
      setData(researchResult);
      navigate("/analysis");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "AI 분석 중 오류가 발생했습니다. API 키를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "48px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <PageHeader
          breadcrumb="ResearchGen AI"
          title="아이디어 입력"
          subtitle="제품 아이디어를 입력하면 AI가 UX 리서치 인사이트를 자동으로 생성합니다."
        />
        <button
          onClick={() => setShowApiSettings(!showApiSettings)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid #1C1E30",
            borderRadius: "8px",
            padding: "8px",
            color: "#7A7E9E",
            cursor: "pointer",
            marginTop: "8px",
          }}
          title="API 설정"
        >
          <Settings size={20} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* API Key Input (Toggleable) */}
        {showApiSettings && (
          <Card style={{ border: "1px solid rgba(84,98,239,0.3)", background: "rgba(84,98,239,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "rgba(84,98,239,0.15)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Key size={16} style={{ color: "#5462EF" }} />
              </div>
              <label style={{ color: "#DDE0EE", fontSize: "14px" }}>OpenAI API Key 설정</label>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              style={{
                width: "100%",
                background: "#0E0F19",
                border: "1px solid #1C1E30",
                borderRadius: "8px",
                padding: "12px 14px",
                color: "#DDE0EE",
                fontSize: "14px",
                outline: "none",
                fontFamily: "monospace",
              }}
            />
            <p style={{ color: "#7A7E9E", fontSize: "12px", marginTop: "10px" }}>
              * API Key는 브라우저 로컬 스토리지에만 저장됩니다.
            </p>
          </Card>
        )}

        {/* Product Idea */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "rgba(84,98,239,0.15)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Lightbulb size={16} style={{ color: "#5462EF" }} />
            </div>
            <label style={{ color: "#DDE0EE", fontSize: "14px" }}>제품 아이디어</label>
          </div>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={5}
            placeholder="제품 아이디어를 자유롭게 설명해주세요..."
            style={{
              width: "100%",
              background: "#0E0F19",
              border: "1px solid #1C1E30",
              borderRadius: "8px",
              padding: "14px",
              color: "#DDE0EE",
              fontSize: "14px",
              resize: "vertical",
              outline: "none",
              lineHeight: 1.6,
              fontFamily: "inherit",
            }}
          />
        </Card>

        {/* Target User */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "rgba(45,207,176,0.15)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Users size={16} style={{ color: "#2DCFB0" }} />
            </div>
            <label style={{ color: "#DDE0EE", fontSize: "14px" }}>타깃 사용자</label>
          </div>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="주요 대상 사용자를 입력하세요..."
            style={{
              width: "100%",
              background: "#0E0F19",
              border: "1px solid #1C1E30",
              borderRadius: "8px",
              padding: "12px 14px",
              color: "#DDE0EE",
              fontSize: "14px",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
        </Card>

        {/* Context */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "rgba(155,122,234,0.15)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertCircle size={16} style={{ color: "#9B7AEA" }} />
            </div>
            <label style={{ color: "#DDE0EE", fontSize: "14px" }}>문제 맥락</label>
          </div>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={3}
            placeholder="해결하고자 하는 문제 또는 시장 맥락을 설명해주세요..."
            style={{
              width: "100%",
              background: "#0E0F19",
              border: "1px solid #1C1E30",
              borderRadius: "8px",
              padding: "14px",
              color: "#DDE0EE",
              fontSize: "14px",
              resize: "vertical",
              outline: "none",
              lineHeight: 1.6,
              fontFamily: "inherit",
            }}
          />
        </Card>

        {/* Notice */}
        <div
          style={{
            background: "rgba(84,98,239,0.08)",
            border: "1px solid rgba(84,98,239,0.2)",
            borderRadius: "8px",
            padding: "14px 16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Sparkles size={15} style={{ color: "#5462EF", marginTop: "1px", flexShrink: 0 }} />
          <p style={{ color: "#8890C0", fontSize: "13px", lineHeight: 1.6 }}>
            AI가 입력된 아이디어를 분석하여 인사이트 맵, 페르소나, 기회 지도, UX 보고서를 자동으로 생성합니다. 더 상세한 입력일수록 정확한 결과를 제공합니다.
          </p>
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button
            style={{
              background: "transparent",
              border: "1px solid #1C1E30",
              borderRadius: "8px",
              padding: "11px 20px",
              color: "#7A7E9E",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            임시 저장
          </button>
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            style={{
              background: isLoading ? "#3A43B0" : "#5462EF",
              border: "none",
              borderRadius: "8px",
              padding: "11px 24px",
              color: "#fff",
              fontSize: "14px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.15s",
            }}
          >
            {isLoading ? (
              <>
                <div 
                  style={{ 
                    width: "14px", 
                    height: "14px", 
                    border: "2px solid rgba(255,255,255,0.3)", 
                    borderTopColor: "#fff", 
                    borderRadius: "50%", 
                    animation: "spin 1s linear infinite" 
                  }} 
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <span style={{ opacity: 0.7 }}>AI 리서치 중...</span>
              </>
            ) : (
              <>
                <Sparkles size={15} />
                AI 리서치 시작
                <ChevronRight size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
