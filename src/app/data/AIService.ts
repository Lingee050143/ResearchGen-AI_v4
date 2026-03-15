export async function generateResearch(apiKey: string, idea: string, target: string, context: string) {
  const prompt = `
You are a UX Research Expert. Based on the following product idea, target audience, and context, generate a comprehensive UX research report in JSON format.
The JSON must strictly follow this structure:

{
  "product": {
    "name": "Product Name",
    "subtitle": "Short tagline",
    "date": "Current Date (e.g., 2024년 3월 13일)",
    "description": "Detailed description of the product and its value proposition.",
    "targetUser": "Detailed target audience description",
    "context": "Context and problem statement"
  },
  "problemSummary": ["Problem 1", "Problem 2", "Problem 3"],
  "insightSummary": ["Insight 1", "Insight 2", "Insight 3"],
  "opportunitySummary": ["Opportunity 1", "Opportunity 2", "Opportunity 3"],
  "keyInsights": ["Detailed Insight 1", "Detailed Insight 2", "Detailed Insight 3", "Detailed Insight 4"],
  "hmwQuestions": ["How Might We Question 1", "HMW 2", "HMW 3", "HMW 4", "HMW 5", "HMW 6"],
  "insightNodes": [
    { "id": "center", "label": "Main Topic", "x": 50, "y": 50, "size": 36, "color": "#5462EF" },
    { "id": "n1", "label": "Node 1", "x": 20, "y": 22, "size": 26, "color": "#2DCFB0" },
    ... (add 8 nodes in total, spread across x: 0-100, y: 0-100)
  ],
  "insightEdges": [["center", "n1"], ["center", "n2"], ...],
  "insightDescriptions": [
    { "node": "Node 1", "color": "#2DCFB0", "desc": "Description for Node 1" },
    ...
  ],
  "personas": [
    {
      "id": "P1",
      "name": "Name",
      "role": "Role",
      "age": "Age",
      "x": 72, "y": 28, "size": 38, "color": "#5462EF",
      "goals": "Goals...",
      "frustrations": "Frustrations...",
      "behaviors": "Behaviors...",
      "pain": "Main Pain Point"
    },
    ... (generate 3 personas)
  ],
  "journeyPhases": ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5", "Phase 6"],
  "journeyEmotions": [3, 2, 4, 3, 5, 4],
  "journeyExperiences": ["Experience 1", "Experience 2", "Experience 3", "Experience 4", "Experience 5", "Experience 6"],
  "journeyExpectations": ["Expectation 1", "Expectation 2", "Expectation 3", "Expectation 4", "Expectation 5", "Expectation 6"],
  "journeyInsights": [
    { "phase": "Phase Name", "text": "Insight text", "color": "#5462EF" },
    ... (generate 4 insights for different phases)
  ],
  "opportunities": [
    { "id": "op1", "label": "Op 1", "impact": 80, "effort": 35, "quadrant": "quick-win", "size": 18 },
    ... (generate 8 opportunities with various quadrants: quick-win, strategic, fill-in, avoid)
  ],
  "implementationPlan": {
    "shortTerm": [{ "title": "Title", "timeline": "0~2주", "desc": "..." }, ...],
    "midTerm": [{ "title": "Title", "timeline": "1~3개월", "desc": "..." }, ...],
    "longTerm": [{ "title": "Title", "timeline": "3~6개월", "desc": "..." }, ...]
  }
}

Respond ONLY with the JSON object. Do not include any markdown formatting or explainations.

Product Idea: ${idea}
Target Audience: ${target}
Context/Problem: ${context}
Language: Korean
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o", // or "gpt-3.5-turbo" if preferred
      messages: [
        { role: "system", content: "You are a UX research expert analyzer. Output only raw JSON." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "AI 분석 중 오류가 발생했습니다.");
  }

  const result = await response.json();
  return JSON.parse(result.choices[0].message.content);
}
