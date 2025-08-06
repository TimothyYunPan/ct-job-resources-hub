export const BUSINESS_STATUS_CODE = {
  ERROR: 0,
  SUCCESS: 1,
  WARNING: 2,
};

export const DB_NAME = "post_db";

// 職位類型分類
export const ROLE_CATEGORIES = {
  SOFTWARE: {
    label: "SWE",
    keywords: ["software engineer", "software engineering", "software developer", "software development", "general swe", "swe", "Software Application Engineer"],
  },
  FRONTEND: {
    label: "Frontend",
    keywords: ["frontend", "front-end", "front end", "front end engineer", "frontend engineer", "ui engineer", "react", "vue", "angular", "javascript", "typescript", "html", "css", "web developer"],
  },
  BACKEND: {
    label: "Backend",
    keywords: ["backend", "back-end", "back end", "backend engineer", "server engineer", "api engineer", "java", "python", "node.js", "spring", "django", "express", "database", "sql"],
  },
  FULLSTACK: {
    label: "Full Stack",
    keywords: ["fullstack", "full-stack", "full stack", "fullstack engineer", "full stack engineer", "full-stack engineer"],
  },
  MOBILE: {
    label: "Mobile",
    keywords: ["mobile developer", "mobile development", "ios", "android", "react native", "flutter", "mobile engineer"],
  },
  DEVOPS: {
    label: "DevOps",
    keywords: ["devops", "dev ops", "infrastructure", "cloud engineer", "site reliability", "sre", "aws", "azure", "kubernetes"],
  },
  DATA: {
    label: "DS",
    keywords: ["data scientist", "data science", "data engineer", "data engineering", "analytics"],
  },
  ML: {
    label: "ML",
    keywords: ["machine learning", "\\bml\\b", "\\bai\\b", "artificial intelligence", "deep learning", "ml engineer", "ai engineer", "ml scientist", "ai scientist"],
  },
  PRODUCT: {
    label: "PM",
    keywords: ["product manager", "product management", "\\bpm\\b"],
  },
  OTHER: {
    label: "Other",
    keywords: ["intern", "internship", "student", "graduate"],
  },
};
