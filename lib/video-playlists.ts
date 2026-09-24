export interface VideoPlaylist {
  id: string;
  title: string;
  educatorChannel: string;
  subject: string;
  category: "Quantitative Aptitude" | "Reasoning" | "English" | "General Studies & GK" | "General Science" | "Telugu State Exams (AP/TS)";
  language: "Hindi / English" | "Telugu";
  targetExams: string[];
  playlistUrl: string;
  channelUrl: string;
  embedPlaylistId?: string;
  description: string;
  verifiedBadges: string[];
}

export const VIDEO_PLAYLISTS: VideoPlaylist[] = [
  // 1. Quantitative Aptitude
  {
    id: "gagan-pratap-maths",
    title: "Complete Quantitative Aptitude & Mathematics — Concepts & Shortcuts",
    educatorChannel: "Gagan Pratap Maths",
    subject: "Quantitative Aptitude / Mathematics",
    category: "Quantitative Aptitude",
    language: "Hindi / English",
    targetExams: ["SSC CGL", "SSC CHSL", "RRB NTPC", "Banking IBPS/SBI", "CDS", "State Exams"],
    playlistUrl: "https://www.youtube.com/@GaganPratapMaths/playlists",
    channelUrl: "https://www.youtube.com/@GaganPratapMaths",
    description: "Comprehensive arithmetic and advanced mathematics classes covering percentage, ratio, algebra, geometry, trigonometry, and previous year question breakdowns.",
    verifiedBadges: ["10M+ Aspirants", "SSC CGL / CHSL Leader", "Formula Tricks"]
  },

  // 2. Reasoning
  {
    id: "piyush-varshney-reasoning",
    title: "Reasoning By Piyush Varshney — 100 Practice Sets (Basics to Advanced)",
    educatorChannel: "Piyush Varshney (Careerwill)",
    subject: "Logical & Analytical Reasoning",
    category: "Reasoning",
    language: "Hindi / English",
    targetExams: ["SSC CGL", "SSC CHSL", "RRB Group D", "RRB NTPC", "State Police", "Delhi Police"],
    playlistUrl: "https://www.youtube.com/playlist?list=PL9zUT-wt5ugpeF2dy46HrDVGgzqZPmacj",
    channelUrl: "https://www.youtube.com/playlist?list=PL9zUT-wt5ugpeF2dy46HrDVGgzqZPmacj",
    embedPlaylistId: "PL9zUT-wt5ugpeF2dy46HrDVGgzqZPmacj",
    description: "Complete 100 Practice Sets covering verbal, non-verbal, syllogism, seating arrangement, coding-decoding, and clock/calendar questions.",
    verifiedBadges: ["100 Full Sets", "Zero to Hero", "SSC & Railway"]
  },

  // 3. English
  {
    id: "rani-maam-english",
    title: "English Grammar, Vocab, Spotting Errors & Comprehension Masterclass",
    educatorChannel: "English With Rani Ma'am",
    subject: "English Language & Comprehension",
    category: "English",
    language: "Hindi / English",
    targetExams: ["SSC CGL", "SSC CPO", "CHSL", "Bank PO / Clerk", "NDA", "CDS"],
    playlistUrl: "https://www.youtube.com/playlist?list=PLM9OY0jASMM0Fz6N1tdM_1ATEY5kh4o2H",
    channelUrl: "https://www.youtube.com/playlist?list=PLM9OY0jASMM0Fz6N1tdM_1ATEY5kh4o2H",
    embedPlaylistId: "PLM9OY0jASMM0Fz6N1tdM_1ATEY5kh4o2H",
    description: "Complete foundation grammar course including Verbs, Nouns, Conjunctions, Spotting Errors, 60 Golden Rules, and high-frequency vocabulary.",
    verifiedBadges: ["60 Golden Rules", "Grammar Foundation", "High Frequency Vocab"]
  },

  // 4. General Awareness / GK
  {
    id: "parmar-ssc-gk",
    title: "SSC GK & General Awareness Full Foundation Playlist",
    educatorChannel: "Parmar SSC",
    subject: "General Awareness / GK",
    category: "General Studies & GK",
    language: "Hindi / English",
    targetExams: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC CPO", "RRB NTPC"],
    playlistUrl: "https://www.youtube.com/@ParmarSSC/playlists",
    channelUrl: "https://www.youtube.com/@ParmarSSC",
    description: "Structured GK/GS series covering high-yield static GK, constitutional articles, modern history, and TCS-pattern recurring questions.",
    verifiedBadges: ["TCS Pattern", "PYQ Analysis", "Exam-Oriented"]
  },

  // 5. Current Affairs
  {
    id: "parmar-adda247-current-affairs",
    title: "Monthly & Daily Current Affairs Digest for Government Exams",
    educatorChannel: "Parmar SSC / Adda247 SSC",
    subject: "Current Affairs",
    category: "General Studies & GK",
    language: "Hindi / English",
    targetExams: ["SSC", "Banking", "Railways", "Defence", "State PSCs"],
    playlistUrl: "https://www.youtube.com/playlist?list=PLg0qMaBWeNGPS70TaB-fg2Bs_y2fbIQ2B",
    channelUrl: "https://www.youtube.com/@ParmarSSC/playlists",
    embedPlaylistId: "PLg0qMaBWeNGPS70TaB-fg2Bs_y2fbIQ2B",
    description: "Monthly compilation of national appointments, sports, summits, government schemes, awards, indices, and defense exercises.",
    verifiedBadges: ["Monthly Revision", "Govt Schemes", "Quick Notes"]
  },

  // 6. General Science
  {
    id: "parmar-general-science",
    title: "Complete General Science (Physics, Chemistry & Biology) for SSC & RRB",
    educatorChannel: "Parmar SSC",
    subject: "General Science (GS)",
    category: "General Science",
    language: "Hindi / English",
    targetExams: ["SSC CGL", "Railway RRB ALP", "Group D", "NTPC", "State Police"],
    playlistUrl: "https://www.youtube.com/@ParmarSSC/playlists",
    channelUrl: "https://www.youtube.com/@ParmarSSC",
    description: "Conceptual NCERT-level General Science playlist covering everyday physics, periodic table, chemical reactions, human physiology, and nutrition.",
    verifiedBadges: ["NCERT Base", "Railway & SSC", "Visual Diagrams"]
  },

  // 7. Indian History
  {
    id: "parmar-indian-history",
    title: "FRB Indian History — Ancient, Medieval & Modern History",
    educatorChannel: "Parmar SSC",
    subject: "Indian History",
    category: "General Studies & GK",
    language: "Hindi / English",
    targetExams: ["SSC CGL", "SSC CHSL", "NDA", "CDS", "State PSCs"],
    playlistUrl: "https://www.youtube.com/playlist?list=PLg0qMaBWeNGOSijNNgzwOjuR3GC_K16IA",
    channelUrl: "https://www.youtube.com/playlist?list=PLg0qMaBWeNGOSijNNgzwOjuR3GC_K16IA",
    embedPlaylistId: "PLg0qMaBWeNGOSijNNgzwOjuR3GC_K16IA",
    description: "Famous 'FRB History' course detailing Indus Valley, Vedic Age, Delhi Sultanate, Mughal Empire, and Freedom Movement (1857-1947).",
    verifiedBadges: ["FRB Series", "Chronological Timelines", "PYQs"]
  },

  // 8. Indian Geography
  {
    id: "parmar-indian-geography",
    title: "FRB Indian & World Geography — River Systems, Climate & Mapping",
    educatorChannel: "Parmar SSC",
    subject: "Indian Geography",
    category: "General Studies & GK",
    language: "Hindi / English",
    targetExams: ["SSC", "Railway NTPC", "UPSC CDS", "State Police"],
    playlistUrl: "https://www.youtube.com/playlist?list=PLg0qMaBWeNGMFDJlfHfWgp-WMZWOXI3EF",
    channelUrl: "https://www.youtube.com/playlist?list=PLg0qMaBWeNGMFDJlfHfWgp-WMZWOXI3EF",
    embedPlaylistId: "PLg0qMaBWeNGMFDJlfHfWgp-WMZWOXI3EF",
    description: "Complete physical and political geography, mountain passes, soil types, river basins, monsoons, and national parks with map visualizers.",
    verifiedBadges: ["Map Work", "River Systems", "Exam Favourite"]
  },

  // 9. General Studies — StudyIQ
  {
    id: "studyiq-general-studies",
    title: "General Studies (GS) Comprehensive Foundation Series",
    educatorChannel: "StudyIQ IAS",
    subject: "General Studies",
    category: "General Studies & GK",
    language: "Hindi / English",
    targetExams: ["UPSC Civil Services", "State PSCs", "SSC CGL", "EPFO", "CAPF"],
    playlistUrl: "https://www.youtube.com/@StudyIQEducation/playlists",
    channelUrl: "https://www.youtube.com/@StudyIQEducation",
    description: "In-depth analytical lectures connecting static syllabus with contemporary governance issues, treaties, and international relations.",
    verifiedBadges: ["UPSC / PSC Grade", "Editorial Context", "Deep Concepts"]
  },

  // 10. Indian Polity — StudyIQ
  {
    id: "studyiq-indian-polity",
    title: "Indian Polity & Constitution — Articles, Schedules & Landmark Judgments",
    educatorChannel: "StudyIQ IAS",
    subject: "Indian Polity & Constitution",
    category: "General Studies & GK",
    language: "Hindi / English",
    targetExams: ["UPSC", "State PSC", "SSC CGL", "Judiciary Exams"],
    playlistUrl: "https://www.youtube.com/@StudyIQEducation/playlists",
    channelUrl: "https://www.youtube.com/@StudyIQEducation",
    description: "Complete constitutional breakdown from Preamble and Fundamental Rights to Parliamentary procedures, President's powers, and Constitutional Bodies.",
    verifiedBadges: ["M. Laxmikanth Aligned", "All Key Articles", "Amendments"]
  },

  // 11. Indian Economy — StudyIQ
  {
    id: "studyiq-indian-economy",
    title: "Indian Economy — Macroeconomics, Budget, Banking & Inflation",
    educatorChannel: "StudyIQ IAS",
    subject: "Indian Economy",
    category: "General Studies & GK",
    language: "Hindi / English",
    targetExams: ["UPSC", "State PSCs", "RBI Grade B", "SSC CGL", "Bank PO"],
    playlistUrl: "https://www.youtube.com/@StudyIQEducation/playlists",
    channelUrl: "https://www.youtube.com/@StudyIQEducation",
    description: "Core economic concepts explained intuitively: GDP, Repo Rates, Fiscal Deficit, Union Budget, Balance of Payments, and Five-Year Plans.",
    verifiedBadges: ["Union Budget", "Monetary Policy", "Economic Survey"]
  },

  // 12. Physics — Physics Wallah
  {
    id: "pw-physics",
    title: "Physics Foundation — Motion, Optics, Electricity & Magnetism",
    educatorChannel: "Physics Wallah",
    subject: "Physics",
    category: "General Science",
    language: "Hindi / English",
    targetExams: ["Railway RRB ALP / Tech", "SSC CGL / CHSL", "NDA", "State Police Constable"],
    playlistUrl: "https://www.youtube.com/@PhysicsWallah/playlists",
    channelUrl: "https://www.youtube.com/@PhysicsWallah",
    description: "Crystal-clear conceptual physics lectures with animations, real-life examples, unit conversions, and solved numerical problems.",
    verifiedBadges: ["Visual Physics", "Zero Fear", "Concept Clear"]
  },

  // 13. Chemistry — Physics Wallah
  {
    id: "pw-chemistry",
    title: "Chemistry Foundation — Periodic Table, Bonding & Chemical Reactions",
    educatorChannel: "Physics Wallah",
    subject: "Chemistry",
    category: "General Science",
    language: "Hindi / English",
    targetExams: ["RRB ALP", "SSC", "Defence CDS / AFCAT", "State Exams"],
    playlistUrl: "https://www.youtube.com/@PhysicsWallah/playlists",
    channelUrl: "https://www.youtube.com/@PhysicsWallah",
    description: "Covers Atomic Structure, Chemical Bonding, Acids/Bases, Metals/Non-metals, Carbon Compounds, and daily-life chemistry.",
    verifiedBadges: ["Periodic Table", "Chemical Formulas", "NCERT 9-12"]
  },

  // 14. Biology — Physics Wallah
  {
    id: "pw-biology",
    title: "Biology Foundation — Cell Biology, Human Body Systems & Diseases",
    educatorChannel: "Physics Wallah",
    subject: "Biology & Life Sciences",
    category: "General Science",
    language: "Hindi / English",
    targetExams: ["SSC CGL", "Railway Group D / NTPC", "State Police SI", "Teaching CTET"],
    playlistUrl: "https://www.youtube.com/@PhysicsWallah/playlists",
    channelUrl: "https://www.youtube.com/@PhysicsWallah",
    description: "High-scoring biology course detailing Circulatory & Nervous systems, Genetics, Plant Kingdom, Vitamins, and Pathogenic Diseases.",
    verifiedBadges: ["High Weightage", "Organ Systems", "Memory Tricks"]
  },

  // 15. Telugu State GK — Adda247 Telugu
  {
    id: "adda247-telugu-state-gk",
    title: "AP & TS State General Knowledge & Welfare Schemes (తెలుగు)",
    educatorChannel: "Adda247 Telugu",
    subject: "State General Knowledge (AP/TS)",
    category: "Telugu State Exams (AP/TS)",
    language: "Telugu",
    targetExams: ["APPSC Group 1/2", "TSPSC Group 1/2/3", "AP Police SI", "TS Police", "DSC / TET"],
    playlistUrl: "https://www.youtube.com/@Adda247Telugu/playlists",
    channelUrl: "https://www.youtube.com/@Adda247Telugu",
    description: "Dedicated Telugu medium lectures for Andhra Pradesh and Telangana district profiles, government welfare schemes, culture, and state symbols.",
    verifiedBadges: ["తెలుగు బోధన", "AP & TS Special", "Navaratnalu & Schemes"]
  },

  // 16. State History — Adda247 Telugu & Hareesh Academy
  {
    id: "adda247-hareesh-telugu-history",
    title: "APPSC Group 2 & TSPSC Indian History and AP History Playlist (తెలుగు)",
    educatorChannel: "Adda247 Telugu / Hareesh Academy",
    subject: "State & Indian History (AP/TS)",
    category: "Telugu State Exams (AP/TS)",
    language: "Telugu",
    targetExams: ["APPSC Group 2", "TSPSC Group 2", "AP Police SI", "VRO / Panchayat Secretary"],
    playlistUrl: "https://www.youtube.com/playlist?list=PLNOSFzLA9zoq9_xMdNKtAp2h8wHJ6qbhR",
    channelUrl: "https://www.youtube.com/@HareeshTheBestAcademy/playlists",
    embedPlaylistId: "PLNOSFzLA9zoq9_xMdNKtAp2h8wHJ6qbhR",
    description: "Specialized history playlist in Telugu: Satavahanas, Kakatiyas, Vijayanagara Empire, Andhra movement, and Telangana armed struggle.",
    verifiedBadges: ["APPSC Group 2", "శాతవాహనులు & కాకతీయులు", "Hareesh Academy"]
  },

  // 17. State Geography — Adda247 Telugu
  {
    id: "adda247-telugu-geography",
    title: "Andhra Pradesh & Telangana Geography, Rivers & Natural Resources (తెలుగు)",
    educatorChannel: "Adda247 Telugu",
    subject: "State Geography (AP/TS)",
    category: "Telugu State Exams (AP/TS)",
    language: "Telugu",
    targetExams: ["APPSC Group 2/4", "TSPSC Group 2/3", "AP SI/Constable", "Forest Department"],
    playlistUrl: "https://www.youtube.com/@Adda247Telugu/playlists",
    channelUrl: "https://www.youtube.com/@Adda247Telugu",
    description: "River systems of Krishna & Godavari, irrigation projects (Polavaram, Kaleshwaram), forests, minerals, and agro-climatic zones in Telugu.",
    verifiedBadges: ["గోదావరి & కృష్ణా", "ప్రాజెక్టులు", "తెలుగు మీడియం"]
  },

  // 18. State Polity — Adda247 Telugu / Hareesh Academy
  {
    id: "telugu-state-polity",
    title: "Indian Polity & AP/TS State Administration Masterclass (తెలుగు)",
    educatorChannel: "Adda247 Telugu / Hareesh The Best Academy",
    subject: "State Polity & Administration",
    category: "Telugu State Exams (AP/TS)",
    language: "Telugu",
    targetExams: ["APPSC Group 1/2", "TSPSC Group 1/2/3", "AP High Court", "Gram Ward Sachivalayam"],
    playlistUrl: "https://www.youtube.com/@HareeshTheBestAcademy/playlists",
    channelUrl: "https://www.youtube.com/@HareeshTheBestAcademy",
    description: "Indian Constitution explained by top Telugu faculties with special emphasis on 73rd/74th amendments, State Legislature, Governor, and High Court.",
    verifiedBadges: ["రాజ్యాంగం", "గ్రూప్స్ స్పెషల్", "హరీష్ అకాడమీ"]
  },

  // 19. State Economy — Adda247 Telugu / Hareesh Academy
  {
    id: "telugu-state-economy",
    title: "AP & TS Economy, State Budgets & Socio-Economic Survey (తెలుగు)",
    educatorChannel: "Adda247 Telugu / Hareesh Academy",
    subject: "State Economy & Survey",
    category: "Telugu State Exams (AP/TS)",
    language: "Telugu",
    targetExams: ["APPSC Group 2 Economy Paper", "TSPSC Group 2 Economy", "AP Panchayat Secretary"],
    playlistUrl: "https://www.youtube.com/@Adda247Telugu/playlists",
    channelUrl: "https://www.youtube.com/@Adda247Telugu",
    description: "Complete coverage of AP Socio-Economic Survey, Telangana Economic Outlook, GSDP growth, Agriculture, Industrial corridors, and State Budgets.",
    verifiedBadges: ["AP సర్వే", "TS అవుట్లుక్", "75 మార్కులు Group 2"]
  }
];

