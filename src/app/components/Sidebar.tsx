import { NavLink, useLocation } from "react-router";
import {
  Lightbulb,
  BarChart2,
  Network,
  Users,
  Target,
  FileText,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { useResearch } from "../data/ResearchContext";

const navItems = [
  { label: "아이디어 입력", path: "/", icon: Lightbulb },
  { label: "AI 분석", path: "/analysis", icon: BarChart2 },
  { label: "인사이트 맵", path: "/insight-map", icon: Network },
  { label: "페르소나", path: "/persona", icon: Users },
  { label: "기회 지도", path: "/opportunity-map", icon: Target },
  { label: "UX 보고서", path: "/ux-report", icon: FileText },
];

export function Sidebar() {
  const location = useLocation();
  const { data } = useResearch();

  return (
    <aside
      style={{ background: "#0A0B12", borderRight: "1px solid #1A1C2E" }}
      className="w-[220px] min-h-screen flex flex-col shrink-0"
    >
      {/* Logo */}
      <div style={{ borderBottom: "1px solid #1A1C2E" }} className="px-5 py-4 flex items-center gap-2.5">
        <div
          style={{ background: "linear-gradient(135deg, #5462EF, #9B7AEA)" }}
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        >
          <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>R</span>
        </div>
        <span style={{ color: "#DDE0EE", fontSize: "13px", fontWeight: 600, letterSpacing: "-0.01em" }}>
          ResearchGen AI
        </span>
      </div>

      {/* Project Section */}
      <div className="px-4 pt-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span style={{ color: "#4A4F6A", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            프로젝트
          </span>
        </div>
        <div
          style={{ background: "#13151F", border: "1px solid #1A1C2E", borderRadius: "8px" }}
          className="px-3 py-2 flex items-center justify-between mb-1"
        >
          <span style={{ color: "#A0A3BB", fontSize: "12px" }}>{data.product.name}</span>
          <ChevronDown size={13} style={{ color: "#4A4F6A" }} />
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                background: isActive ? "#1A1D30" : "transparent",
                color: isActive ? "#DDE0EE" : "#6B6F8A",
                borderRadius: "7px",
                padding: "7px 10px",
                display: "flex",
                alignItems: "center",
                gap: "9px",
                fontSize: "13px",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              <Icon size={14} style={{ color: isActive ? "#5462EF" : "#4A4F6A" }} />
              {item.label}
              {isActive && (
                <div
                  style={{ background: "#5462EF", borderRadius: "50%", marginLeft: "auto" }}
                  className="w-1.5 h-1.5"
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid #1A1C2E" }} className="px-3 py-4">
        <div
          className="px-3 py-2 flex items-center gap-2.5 rounded-lg cursor-pointer"
          style={{ color: "#6B6F8A", fontSize: "13px" }}
        >
          <MessageSquare size={14} style={{ color: "#4A4F6A" }} />
          대화형 프롬프트
        </div>
      </div>
    </aside>
  );
}
