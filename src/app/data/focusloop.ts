export const product = {
  name: "FocusLoop",
  subtitle: "AI 기반 집중 시간 관리 및 교육 흐름 앱",
  date: "2024년 3월 13일",
  description:
    "FocusLoop는 학습자들이 단순히 시간을 측정하며 어려움을 겪는 것이 아니라, 학습 시작과 지속에 어려움을 겪는다는 실질적인 문제점을 해결하고자 합니다. 기존 타이머 앱들은 행동 심리학과 개인별 학습 패턴을 간과하기 때문에 실패하고 있습니다. 핵심적인 기회는 긴밀한 학습 시작 기능, 적응형 AI 분석, 그리고 습관 형성 메커니즘을 결합하여 사용자가 수동적인 시간 추적에서 능동적인 학습 습관 관리로의 전환이 이루어지도록 돕는 데 있습니다.",
  targetUser: "대학생, 직장인 자기계발자, 온라인 학습자",
  context:
    "학습 시작과 지속에 어려움을 겪는 사용자들이 많으며, 기존 타이머 앱은 동기 부여와 행동 심리학 기반 기능이 부족합니다.",
};

export const problemSummary = [
  "학습을 시작하는 것 자체가 심리적 장벽임",
  "일반적인 학습 패턴을 고려하지 않는 기능",
  "목표 사용자층의 습관 형성 기반이 취약함",
];

export const insightSummary = [
  "습관 형성 가이드가 가장 큰 진입 내부 동기 발생 방법임",
  "AI 집중 패턴 분석으로 사용자별 최적 학습 기기 추천",
  "짧은 사이클의 성취 경험이 지속 사용률을 높임",
];

export const opportunitySummary = [
  "AI 추천 앱에만 최적화된 학습 경험 제공",
  "타기 기록 및 랭킹스코어 시스템 기능 도입",
  "핵심적인 이유없이 인터넷 비사용 모드 웹앱 출시 가능",
];

export const keyInsights = [
  "사이드이 어려움이 주요 장벽입니다. 사용자들은 공부를 시작하는 데 어려움을 겪지, 지속하는 데 어려움을 겪는 것은 아닙니다.",
  "일반적인 학습 타이머와 관련된 개인별 행동심리를 고려하지 않아 집중력 저하로 이어지기 쉽습니다.",
  "같은 행성의 가치관인 진단과 내재적 정보를 필요로 합니다. 다수의 사용자들로 보여주는 건 '맥락에서부터 나가게' 노력이 있습니다.",
  "목표 사용자층(수능생, 취업 준비생)의 시간 추적에서 집중력과 결과물을 연계하는 AI 추천의 학습 최수기가 아닌 사랑 형성 행동과 긴밀한 구체적 투자 수익률(ROI)을 입증해야 합니다.",
];

export const hmwQuestions = [
  "어떻게 하면 학습을 시작하는 데 대한 두려움을 줄여 사용자들이 최대한 빠르게 첫 번째 사이클을 완성할 수 있도록 FocusLoop를 설계할 수 있을까요?",
  "간단기는 개인 분석을 통해 학습 패턴을 파악 다양하게 사이트하여 실질적인 동작에 맞게 개인화된 도움을 줄 수 있을까요?",
  "신규 사용자들이 압도되지 않으면서 초기 설정도 기분 데이터를 입력할 수 있도록 온보딩 경험을 어떻게 어렵게 수 있을까요?",
  "학습 루만이 관련와 실제 학습/업적심 사이의 관계를 사용자들이 시각화하도록 어떻게하도록 높일도록 도울 수 있을까요?",
  "사용자가 집중적 자속 시간 및 간헐 상황 활동 정보를 인식하면서 탑 관리 및 달림 의욕을 발전하는지 어떻게 해 향상할 수 있을까요?",
  "어떻게 하면 AI 추건 관련성을 평가하 학습을 추구하고 인렙의 사용자들이 그것을 신뢰하고 발전할 수 있는 방향으로 않은 일 있을까요?",
];

export const insightNodes = [
  { id: "center", label: "FocusLoop", x: 50, y: 50, size: 36, color: "#5462EF" },
  { id: "n1", label: "집중력 문제", x: 20, y: 22, size: 26, color: "#2DCFB0" },
  { id: "n2", label: "학습 패턴", x: 72, y: 18, size: 24, color: "#2DCFB0" },
  { id: "n3", label: "행동 심리학", x: 82, y: 50, size: 28, color: "#9B7AEA" },
  { id: "n4", label: "AI 분석", x: 68, y: 78, size: 26, color: "#9B7AEA" },
  { id: "n5", label: "습관 형성", x: 30, y: 80, size: 24, color: "#2DCFB0" },
  { id: "n6", label: "목표 설정", x: 14, y: 55, size: 22, color: "#F59E0B" },
  { id: "n7", label: "타이머 앱", x: 38, y: 15, size: 20, color: "#F59E0B" },
  { id: "n8", label: "사용자 동기", x: 56, y: 36, size: 22, color: "#EF8070" },
];

export const insightEdges = [
  ["center", "n1"],
  ["center", "n2"],
  ["center", "n3"],
  ["center", "n4"],
  ["center", "n5"],
  ["center", "n6"],
  ["center", "n7"],
  ["center", "n8"],
  ["n1", "n6"],
  ["n1", "n7"],
  ["n2", "n8"],
  ["n3", "n8"],
  ["n4", "n5"],
];

export const insightDescriptions = [
  {
    node: "집중력 문제",
    color: "#2DCFB0",
    desc: "사용자들은 집중력이 낮은 것이 아니라 '시작' 자체가 어려운 경향이 있습니다.",
  },
  {
    node: "학습 패턴",
    color: "#2DCFB0",
    desc: "학습자마다 최적 집중 사이클이 달라 개인화된 분석이 필요합니다.",
  },
  {
    node: "행동 심리학",
    color: "#9B7AEA",
    desc: "작은 성공 경험과 보상 루프가 지속 학습에 핵심적 영향을 미칩니다.",
  },
  {
    node: "AI 분석",
    color: "#9B7AEA",
    desc: "집중 패턴 데이터를 AI로 분석하면 개인 맞춤 학습 전략 제안이 가능합니다.",
  },
  {
    node: "습관 형성",
    color: "#2DCFB0",
    desc: "21일 습관 형성 원리를 기반으로 한 루틴 설계가 효과적입니다.",
  },
  {
    node: "사용자 동기",
    color: "#EF8070",
    desc: "외재적 동기보다 내재적 성장감이 장기 사용률에 더 큰 영향을 미칩니다.",
  },
];

export const personas = [
  {
    id: "S",
    name: "수진 (Sujin)",
    role: "대학생, 시험 준비 학습 관리",
    age: "22세",
    x: 72,
    y: 28,
    size: 38,
    color: "#5462EF",
    goals: "단기간에 효과적인 학습을 위한 집중력 관리와 시험 성취도 높이기",
    frustrations: "시작하기 어렵고, 집중력이 흐트러질 때마다 스마트폰에 의존하여, 전반 일관이 이루어지지 않는 상황이 발생함",
    behaviors: "필요 시작 후 모바일 메모 자동 점검, 타이머 앱 2~3개 동시 사용",
    pain: "학습 시작 동기 부여 어려움",
  },
  {
    id: "J",
    name: "지훈 (Jihun)",
    role: "직장인, 자기 계발 학습 관리",
    age: "30세",
    x: 40,
    y: 62,
    size: 34,
    color: "#2DCFB0",
    goals: "바쁜 일과 중 짧은 시간에 최대한 학습 성과를 내고 직무 역량 강화",
    frustrations: "시간이 부족한 상황에서 학습 효율을 극대화하기 위한 방법을 찾기 어려움",
    behaviors: "짧은 시간이 허락될 때 유튜브·Udemy 강의로 학습 시도",
    pain: "집중 시간 관리의 어려움",
  },
  {
    id: "M",
    name: "민지 (Minji)",
    role: "대학원, 심층 연구 학습 관리",
    age: "26세",
    x: 25,
    y: 35,
    size: 30,
    color: "#9B7AEA",
    goals: "집중 흐름 상태를 최적화하고 학습 성과물을 높이고 심리적 안정 찾기",
    frustrations: "현재 도구들이 심층 학습에 특화되지 않아 흐름 상태가 자주 끊기는 경험",
    behaviors: "SNS 차단, 포모도로 기법, 음악 블록체인으로 전환 학습 습관 선택",
    pain: "방해 요소 없는 몰입 환경 구성 어려움",
  },
];

export const journeyPhases = ["인식", "탐색", "시작", "집중", "완료", "회고"];

export const journeyEmotions = [2, 3, 2, 4, 5, 4];

export const journeyExperiences = [
  "학습 필요성\n인식",
  "앱 검색 및\n비교 분석",
  "앱 설치 및\n온보딩",
  "첫 집중\n세션 진행",
  "목표 달성\n확인",
  "학습 패턴\n분석 확인",
];

export const journeyExpectations = [
  "쉽고 빠른\n시작 방법",
  "직관적인\nUX/UI",
  "5분 내 세팅\n완료",
  "방해 없는\n집중 환경",
  "성취감\n시각화",
  "개선 방향\n제시",
];

export const journeyInsights = [
  { phase: "시작", text: "온보딩 첫 경험이 앱 지속 사용률을 결정합니다.", color: "#5462EF" },
  { phase: "집중", text: "집중 중 방해 요소 제거가 가장 중요한 UX 요소입니다.", color: "#2DCFB0" },
  { phase: "완료", text: "성취감을 시각적으로 표현하면 재사용 동기가 증가합니다.", color: "#9B7AEA" },
  { phase: "회고", text: "AI 학습 패턴 분석 리포트로 자기 인식이 향상됩니다.", color: "#F59E0B" },
];

export const opportunities = [
  { id: "op1", label: "AI 추천 시작 루틴", impact: 80, effort: 35, quadrant: "quick-win", size: 18 },
  { id: "op2", label: "집중 코치 메시지", impact: 70, effort: 25, quadrant: "quick-win", size: 14 },
  { id: "op3", label: "SNS 차단 모드", impact: 75, effort: 50, quadrant: "strategic", size: 16 },
  { id: "op4", label: "학습 통계 대시보드", impact: 85, effort: 60, quadrant: "strategic", size: 20 },
  { id: "op5", label: "포모도로 커스텀", impact: 55, effort: 30, quadrant: "fill-in", size: 12 },
  { id: "op6", label: "다크 모드 지원", impact: 40, effort: 20, quadrant: "fill-in", size: 10 },
  { id: "op7", label: "복잡한 분석 엔진", impact: 50, effort: 85, quadrant: "avoid", size: 12 },
  { id: "op8", label: "Notion 연동", impact: 45, effort: 70, quadrant: "avoid", size: 12 },
];

export const implementationPlan = {
  shortTerm: [
    {
      title: "포커스 온보딩 전략 실행",
      timeline: "0~2주",
      desc: "사용자 첫 방문 시 학습 패턴 파악 후 맞춤형 학습 추천을 제안합니다. FocusLoop만의 학습 시작 흐름으로 즉시 집중 상태에 진입할 수 있도록 하고, 초기 목표 설정을 도와 포모도로 AI 시작 Al 추천 기능을 제공합니다.",
    },
    {
      title: "AI 학습 기반 기술 출시",
      timeline: "2~4주",
      desc: "집중 패턴 데이터를 분석해 개인별 최적 학습 시간과 휴식 주기를 제안합니다. 집중 점수를 수치화하여 보여주고, 이 이렇게 되어서 방향을 확인하고 알릴 수 있습니다.",
    },
    {
      title: "스마트 알림 시스템 구축",
      timeline: "4주",
      desc: "주요 5 5초마다 반복되는 집중 시간 알림을 발전시킵니다. 집중 세션 전 준비 알림과 집중 세션 완료 알림을 제공합니다.",
    },
  ],
  midTerm: [
    {
      title: "앱 기능 및 알고리즘 시스템 도입",
      timeline: "1~3개월",
      desc: "기간 경험에 기반하여 AI가 사용자 학습 패턴을 지속적으로 분석하고 최적화합니다. 학습 리듬을 맞춘 Notion 등 생산성 앱과 연동합니다.",
    },
    {
      title: "커뮤니티 기능 강화",
      timeline: "2~3개월",
      desc: "같은 학습 목표를 가진 사용자들을 연결하여 집중 세션을 함께 진행할 수 있는 기능을 제공합니다.",
    },
    {
      title: "학습 목표 기반 기능 개발",
      timeline: "2~4개월",
      desc: "학습자의 목표에 맞는 커리큘럼을 분석하고, 알고리즘적으로 맞춘 집중 시간을 배정합니다.",
    },
  ],
  longTerm: [
    {
      title: "실시간 집중 내이터 대시보드 구축",
      timeline: "3~6개월",
      desc: "학습 집중도, 목표 달성률, 집중 시간 추이를 시각화한 대시보드를 제공합니다. FocusLoop 성과를 기반으로 외부 학습 시스템 연동을 검토합니다.",
    },
    {
      title: "교육 기관 및 기업 파트너십 확대",
      timeline: "4~6개월",
      desc: "FocusLoop를 다양한 교육 기관 및 기업과 연동하여 집중 시간 관리 데이터를 제공합니다. 파트너십을 통한 학습 성과 분석 보고서 자동 생성 기능을 목표로 합니다.",
    },
    {
      title: "글로벌 시장 준비",
      timeline: "6개월+",
      desc: "다국어 지원과 함께 글로벌 학습자를 위한 현지화된 기능을 추가합니다. 타 국가의 교육 시스템에 맞춰 집중 시간 관리 방법론을 조정합니다.",
    },
  ],
};
