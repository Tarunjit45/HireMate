# 💼 HireMate — AI-Powered Job Application Assistant

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**HireMate** is a full-stack, AI-powered career copilot engineered to streamline and accelerate the job application process. Utilizing Google's Gemini API, HireMate scores resumes against ATS filters, crafts tailored cover letters, identifies missing keywords, and generates role-specific interview preparation simulations.

---

## ✨ Core Capabilities

* 📄 **ATS Resume Scoring & Audit:** Evaluates resumes against specific job descriptions, calculating match percentages and highlighting missing critical hard/soft skills.
* ✍️ **Tailored Cover Letter Generator:** Crafts highly personalized, persuasive cover letters that align the candidate's achievements with employer requirements.
* 🎯 **Bullet Point Optimizer:** Rewrites weak resume bullet points into impact-driven statements using the Google XYZ formula (*Accomplished [X], as measured by [Y], by doing [Z]*).
* 🎙️ **Interactive Interview Simulator:** Generates likely behavioral and technical interview questions based on the candidate's resume and target job role.

---

## 🛠️ Architecture & Tech Stack

```
+-------------------------------------------------------------+
|                    HireMate React Client                    |
|       (React 18, Vite, Tailwind CSS, Lucide, Motion)        |
+-------------------------------------------------------------+
                              |
                              v  REST API
+-------------------------------------------------------------+
|                    Express Backend (`server.ts`)            |
|       CORS, Input Validation, Secure Token Handling         |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                   Google Gemini AI Engine                   |
|     `@google/genai` Server-Side Prompt Engineering          |
|     Structured ATS JSON & Formatting Output Stream          |
+-------------------------------------------------------------+
```

* **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React, Motion.
* **Backend:** Node.js, Express (`server.ts`), Dotenv.
* **AI Model:** Google Gemini API (`@google/genai`).

---

## 📁 Repository Structure

```text
HireMate/
├── server.ts              # Express API server & server-side Gemini integration
├── index.html             # HTML5 app template with font declarations
├── components/            # UI components (ATS Analyzer, Cover Letter Generator, Interview Prep)
├── lib/                   # Utility helpers and API client functions
├── metadata.json          # Project manifest & capability specifications
├── package.json           # Dependencies and scripts
├── LICENSE                # MIT License
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites
* Node.js 18+
* A [Google Gemini API Key](https://aistudio.google.com/)

### 2. Installation
```bash
git clone https://github.com/Tarunjit45/HireMate.git
cd HireMate

npm install
```

### 3. Environment Configuration
Create a `.env` file in the project root:

```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Running Locally
Run the Express backend and Vite development server:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to start using HireMate.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
