export interface RetroProject {
  id: string;
  projectName: string;
  genre: string;
  status: string;
  phase: string;
  failureTags: string[];
  oneLineSummary: string;
  insights: string[];
  recommendedReason: string;
  originalRetrospectivePreview: string;
  thumbnailLabel: string;
  period: string;
}

export const retroMockData: RetroProject[] = [
  {
    id: "rf-001",
    projectName: "Merge Runner",
    genre: "Puzzle Runner",
    status: "프로토타입 종료",
    phase: "FTUE Test",
    failureTags: ["온보딩", "조작감 문제", "리텐션 하락"],
    oneLineSummary: "조작 적응이 어렵고 첫 플레이 목표가 불명확해 초반 이탈이 크게 발생한 프로젝트.",
    insights: [
      "드래그와 회피, 합치기 규칙이 동시에 노출되어 FTUE 인지 부담이 높았음.",
      "튜토리얼 없이 이해 가능한 루프가 아니어서 첫 세션 완주율이 낮았음.",
      "핵심 재미에 도달하기 전에 실패 경험이 반복되어 D1 유지율이 하락했음."
    ],
    recommendedReason: "초반 이탈과 조작 적응 실패 패턴이 입력한 상황과 유사함.",
    originalRetrospectivePreview: "초기 테스트에서 유저는 캐릭터 이동과 합치기 규칙을 동시에 이해해야 했다. 조작은 직관적이지 않았고, 실패 원인이 실수인지 시스템 이해 부족인지 구분되지 않았다.",
    thumbnailLabel: "캐릭터 러닝 + 합치기",
    period: "2024 Q1"
  },
  {
    id: "rf-002",
    projectName: "Idle Sushi Line",
    genre: "Idle Tycoon",
    status: "중단",
    phase: "Prototype",
    failureTags: ["차별성 부족", "메타 약함", "콘텐츠 소진"],
    oneLineSummary: "기본 루프는 안정적이었지만 차별점이 약하고 메타 확장이 부족해 반복감이 빠르게 누적된 프로젝트.",
    insights: [
      "초기 재미는 있었지만 기억에 남는 차별 포인트가 부족했음.",
      "업그레이드 구조가 단선적이라 플레이 10분 이후 목표감이 약해졌음.",
      "장기 동기를 만드는 수집/확장 메타가 부족했음."
    ],
    recommendedReason: "차별성 부족과 메타 빈약 패턴이 유사함.",
    originalRetrospectivePreview: "수익 생산과 업그레이드 루프는 작동했지만 독자적인 테마 경험과 장기 목표가 약했다.",
    thumbnailLabel: "스시 컨베이어 벨트",
    period: "2024 Q2"
  },
  {
    id: "rf-003",
    projectName: "Archer Defense",
    genre: "Defense",
    status: "소프트런치 중단",
    phase: "Soft Launch",
    failureTags: ["BM 약함", "경제 불안정", "리텐션 하락"],
    oneLineSummary: "전투 몰입감은 있었지만 성장 경제와 과금 설계가 불안정해 장기 리텐션과 매출 전환에 실패한 프로젝트.",
    insights: [
      "초반 전투 만족도는 높았으나 중반 성장 정체가 심했음.",
      "과금 패키지가 진행 가속보다 벽 해소 수단으로 인식되었음.",
      "전투 외 장기 동기 요소가 부족했음."
    ],
    recommendedReason: "코어 재미는 있으나 경제/BM 구조가 약한 프로젝트와 유사함.",
    originalRetrospectivePreview: "유저는 전투 액션 자체에는 긍정적 반응을 보였지만, 중반 성장 속도 둔화와 과금 반감이 누적되었다.",
    thumbnailLabel: "활 쏘는 성벽 디펜스",
    period: "2024 Q3"
  },
  {
    id: "rf-004",
    projectName: "Color Stack Jam",
    genre: "Hyper Casual Puzzle",
    status: "실패",
    phase: "Creative Test",
    failureTags: ["CPI 리스크", "초반 훅 약함", "비주얼 전달력 약함"],
    oneLineSummary: "광고 크리에이티브 후킹이 약하고 플레이 화면 전달력이 낮아 CPI 경쟁력을 확보하지 못한 프로젝트.",
    insights: [
      "영상만으로 핵심 플레이를 즉시 이해시키기 어려웠음.",
      "색상 규칙과 목표 상태가 시각적으로 명확하지 않았음.",
      "설명이 필요한 구조라 광고 효율이 떨어졌음."
    ],
    recommendedReason: "광고 효율 저하와 설치 전환 문제 패턴이 유사함.",
    originalRetrospectivePreview: "게임 내부 퍼즐 로직은 성립했으나, 3초 안에 이해되는 훅이 약했다.",
    thumbnailLabel: "컬러 블록 정렬",
    period: "2023 Q4"
  },
  {
    id: "rf-005",
    projectName: "Pet Clinic Story",
    genre: "Simulation",
    status: "프로토타입 종료",
    phase: "Internal Review",
    failureTags: ["초반 템포 느림", "초반 훅 약함", "리텐션 하락"],
    oneLineSummary: "소재 호감도는 있었지만 초반 템포가 느리고 핵심 재미 진입이 늦어 설득력이 약했던 프로젝트.",
    insights: [
      "치료, 운영, 꾸미기 요소 중 어떤 재미를 먼저 느껴야 하는지 선명하지 않았음.",
      "대사와 설명 비중이 높아 첫 세션 템포가 느렸음.",
      "실제 플레이 보상감이 늦게 도달했음."
    ],
    recommendedReason: "호감 소재는 있지만 본격 재미 진입 전 이탈하는 프로젝트군과 유사함.",
    originalRetrospectivePreview: "유저 인터뷰에서는 분위기는 좋다는 반응이 있었지만, 계속 플레이해야 할 이유는 약했다.",
    thumbnailLabel: "동물병원 운영",
    period: "2024 Q1"
  },
  {
    id: "rf-006",
    projectName: "Ghost Mall Escape",
    genre: "Action Escape",
    status: "중단",
    phase: "Prototype",
    failureTags: ["조작감 문제", "난이도 곡선 문제", "스트레스 급증"],
    oneLineSummary: "소재와 긴장감은 좋았지만 조작 정밀도와 난이도 상승 곡선이 맞지 않아 스트레스가 과도했던 프로젝트.",
    insights: [
      "회피, 숨기, 경로 선택이 동시에 요구되어 실수 체감이 컸음.",
      "실패 후 재도전 의욕보다 억울함이 먼저 쌓였음.",
      "난이도 상승이 학습 기반이 아니라 패널티 기반으로 느껴졌음."
    ],
    recommendedReason: "조작 난이도 이슈와 스트레스 상승 패턴이 유사함.",
    originalRetrospectivePreview: "유저는 컨셉 자체에는 흥미를 보였지만 플레이를 반복할수록 피로와 짜증이 커졌다.",
    thumbnailLabel: "쇼핑몰 탈출 액션",
    period: "2023 Q3"
  },
  {
    id: "rf-007",
    projectName: "Kingdom Dig",
    genre: "Resource Strategy",
    status: "프로토타입 종료",
    phase: "Internal Test",
    failureTags: ["시스템 복잡도 높음", "온보딩", "초반 훅 약함"],
    oneLineSummary: "자원 순환 구조는 흥미로웠지만 시스템이 복잡해 첫 세션 이해 장벽이 높았던 프로젝트.",
    insights: [
      "채굴, 확장, 방어, 주민 운영이 한 번에 열려 우선순위 파악이 어려웠음.",
      "전략성은 있었지만 첫 5분 내 즉각적 보상 체감이 약했음.",
      "설명 없이는 재미를 느끼기 어렵다는 반응이 많았음."
    ],
    recommendedReason: "초반 시스템 과밀과 이해 장벽 문제 패턴이 유사함.",
    originalRetrospectivePreview: "내부 평가에서는 파고들면 재밌다는 의견이 있었지만 외부 테스트에서는 진입 장벽이 높았다.",
    thumbnailLabel: "지하 왕국 채굴",
    period: "2024 Q1"
  },
  {
    id: "rf-008",
    projectName: "Monster Caravan",
    genre: "Auto Battle Journey",
    status: "소프트런치 중단",
    phase: "Soft Launch",
    failureTags: ["메타 약함", "수집 피로", "리텐션 하락"],
    oneLineSummary: "오토배틀 진입은 쉬웠지만 수집 성장의 의미가 약해 중기 리텐션이 빠르게 꺾인 프로젝트.",
    insights: [
      "수집 대상은 많았지만 조합 차별성과 전략적 의미가 약했음.",
      "성장 결과가 플레이 체감으로 선명하게 이어지지 않았음.",
      "중반 이후 반복 전투 대비 새로 열리는 재미가 부족했음."
    ],
    recommendedReason: "접근성은 좋지만 중기 리텐션과 성장 동기가 약한 사례와 유사함.",
    originalRetrospectivePreview: "첫 세션 진입은 매끄러웠지만 수집과 육성의 전략적 보상이 약했다.",
    thumbnailLabel: "몬스터 카라반 원정",
    period: "2024 Q3"
  }
];

export const searchMapping: Record<string, string[]> = {
  "초반 이탈": ["온보딩", "리텐션 하락", "초반 훅 약함"],
  "조작감 문제": ["조작감 문제", "스트레스 급증"],
  "차별성 부족": ["차별성 부족", "메타 약함"],
  "광고 성과 안 좋음": ["CPI 리스크", "초반 훅 약함", "비주얼 전달력 약함"],
  "BM 문제": ["BM 약함", "경제 불안정"],
  "복잡해서 이해 어려움": ["시스템 복잡도 높음", "온보딩"],
  "중반부터 지루함": ["메타 약함", "콘텐츠 소진", "리텐션 하락"]
};

export const statusFilters = [
  { id: "all", label: "전체 상태" },
  { id: "prototype", label: "프로토타입 종료" },
  { id: "paused", label: "중단" },
  { id: "softlaunch", label: "소프트런치 중단" },
  { id: "failed", label: "실패" }
];
