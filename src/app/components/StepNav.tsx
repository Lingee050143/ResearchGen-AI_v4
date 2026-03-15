import { Link, useLocation } from "react-router";
import { Lightbulb, BarChart2, Network, Users, Target, FileText, Search, User } from "lucide-react";
import { useResearch } from "../data/ResearchContext";

const steps = [
  { label: "아이디어 입력", path: "/", icon: Lightbulb },
  { label: "AI 분석", path: "/analysis", icon: BarChart2 },
  { label: "인사이트 맵", path: "/insight-map", icon: Network },
  { label: "페르소나", path: "/persona", icon: Users },
  { label: "기회 지도", path: "/opportunity-map", icon: Target },
  { label: "UX 보고서", path: "/ux-report", icon: FileText },
];

export function StepNav() {
  const location = useLocation();
  const { isLoading } = useResearch();

  const getStepStatus = (path: string) => {
    const stepPaths = steps.map((s) => s.path);
    const currentIdx = stepPaths.findIndex((p) =>
      p === "/" ? location.pathname === "/" : location.pathname.startsWith(p)
    );
    const itemIdx = stepPaths.indexOf(path);
    if (itemIdx < currentIdx) return "done";
    if (itemIdx === currentIdx) return "active";
    return "pending";
  };

  return (
    <header
      style={{ background: "#0E0F19", borderBottom: "1px solid #1A1C2E" }}
      className="h-12 flex items-center px-4 gap-0 shrink-0"
    >
      {/* AI status pill */}
      <div
        style={{ background: "#1A1C2E", border: "1px solid #252840", borderRadius: "20px" }}
        className="flex items-center gap-1.5 px-3 py-1 mr-4 shrink-0"
      >
        <div
          style={{ 
            background: isLoading ? "#F59E0B" : "#2DCFB0", 
            borderRadius: "50%", 
            animation: isLoading ? "pulse 1s infinite" : "none" 
          }}
          className="w-1.5 h-1.5"
        />
        <span style={{ color: "#7A7E9E", fontSize: "11px" }}>
          {isLoading ? "AI 분석 중..." : "AI 분석 완료"}
        </span>
      </div>

      {/* Steps */}
      <div className="flex items-center flex-1 gap-1">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const status = getStepStatus(step.path);
          return (
            <Link
              key={step.path}
              to={step.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 10px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "12px",
                background:
                  status === "active"
                    ? "#2A2F5C"
                    : "transparent",
                color:
                  status === "active"
                    ? "#A0ABFF"
                    : status === "done"
                    ? "#5A5F80"
                    : "#3A3E5A",
                transition: "all 0.15s",
              }}
            >
              <Icon
                size={13}
                style={{
                  color:
                    status === "active"
                      ? "#5462EF"
                      : status === "done"
                      ? "#3A3E5A"
                      : "#2A2E48",
                }}
              />
              {step.label}
            </Link>
          );
        })}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-4">
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#6B6F8A",
            padding: "6px",
            borderRadius: "6px",
          }}
        >
          <Search size={15} />
        </button>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #5462EF, #9B7AEA)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <User size={13} style={{ color: "#fff" }} />
        </div>
      </div>
    </header>
  );
}
