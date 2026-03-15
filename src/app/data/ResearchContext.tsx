import React, { createContext, useContext, useState, useEffect } from "react";
import * as staticData from "../data/focusloop";

interface ResearchData {
  product: typeof staticData.product;
  problemSummary: typeof staticData.problemSummary;
  insightSummary: typeof staticData.insightSummary;
  opportunitySummary: typeof staticData.opportunitySummary;
  keyInsights: typeof staticData.keyInsights;
  hmwQuestions: typeof staticData.hmwQuestions;
  insightNodes: typeof staticData.insightNodes;
  insightEdges: typeof staticData.insightEdges;
  insightDescriptions: typeof staticData.insightDescriptions;
  personas: typeof staticData.personas;
  journeyPhases: typeof staticData.journeyPhases;
  journeyEmotions: typeof staticData.journeyEmotions;
  journeyExperiences: typeof staticData.journeyExperiences;
  journeyExpectations: typeof staticData.journeyExpectations;
  journeyInsights: typeof staticData.journeyInsights;
  opportunities: typeof staticData.opportunities;
  implementationPlan: typeof staticData.implementationPlan;
}

interface ResearchContextType {
  data: ResearchData;
  setData: (data: ResearchData) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResearchData>(staticData);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("research_gen_api_key") || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("research_gen_api_key", apiKey);
  }, [apiKey]);

  return (
    <ResearchContext.Provider value={{ data, setData, apiKey, setApiKey, isLoading, setIsLoading }}>
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (context === undefined) {
    throw new Error("useResearch must be used within a ResearchProvider");
  }
  return context;
};
