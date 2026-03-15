import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { StepNav } from "./StepNav";

export function Layout() {
  return (
    <div style={{ background: "#0B0C15", minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <StepNav />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
