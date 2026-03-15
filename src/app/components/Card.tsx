import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  noPadding?: boolean;
}

export function Card({ children, className = "", style, noPadding }: CardProps) {
  return (
    <div
      style={{
        background: "#13151F",
        border: "1px solid #1C1E30",
        borderRadius: "10px",
        padding: noPadding ? 0 : "24px",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#DDE0EE", marginBottom: subtitle ? "6px" : 0 }}>{title}</h2>
      {subtitle && <p style={{ color: "#7A7E9E", fontSize: "14px" }}>{subtitle}</p>}
    </div>
  );
}

export function PageHeader({
  breadcrumb,
  title,
  subtitle,
}: {
  breadcrumb?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={{ marginBottom: "32px" }}>
      {breadcrumb && (
        <p style={{ color: "#4A4F6A", fontSize: "12px", marginBottom: "8px" }}>{breadcrumb}</p>
      )}
      <h1 style={{ color: "#DDE0EE", marginBottom: subtitle ? "6px" : 0 }}>{title}</h1>
      {subtitle && <p style={{ color: "#7A7E9E", fontSize: "14px" }}>{subtitle}</p>}
    </div>
  );
}
