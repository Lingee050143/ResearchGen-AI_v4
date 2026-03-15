import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { IdeaInput } from "./pages/IdeaInput";
import { AIAnalysis } from "./pages/AIAnalysis";
import { InsightMap } from "./pages/InsightMap";
import { Persona } from "./pages/Persona";
import { JourneyMap } from "./pages/JourneyMap";
import { OpportunityMap } from "./pages/OpportunityMap";
import { UXReport } from "./pages/UXReport";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: IdeaInput },
        { path: "analysis", Component: AIAnalysis },
        { path: "insight-map", Component: InsightMap },
        { path: "persona", Component: Persona },
        { path: "journey-map", Component: JourneyMap },
        { path: "opportunity-map", Component: OpportunityMap },
        { path: "ux-report", Component: UXReport },
      ],
    },
  ],
  {
    basename: "/ResearchGen-AI_v4",
  }
);
