import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ResearchProvider } from "./data/ResearchContext";

export default function App() {
  return (
    <ResearchProvider>
      <RouterProvider router={router} />
    </ResearchProvider>
  );
}
