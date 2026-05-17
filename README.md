# HireMate: AI Job Application Assistant

HireMate is an AI-powered job application assistant designed to help candidates land their dream jobs. By leveraging the power of Google's Gemini AI, HireMate analyzes your resume against target job descriptions to provide actionable insights, tailored cover letters, interview preparation, and LinkedIn profile optimizations.

## Features

*   **Resume Optimization (ATS Scoring):** Analyzes your resume against a specific job description, providing an ATS match score, identifying missing keywords, highlighting key strengths, and suggesting stronger bullet point rewrites.
*   **Cover Letter Generation:** Automatically generates a personalized, highly relevant cover letter tailored to your resume and the target job description.
*   **Interview Predictor:** Generates likely behavioral and technical/role-specific interview questions based on the job description, along with ideal approach strategies for each.
*   **LinkedIn Makeover:** Extracts context from your resume to suggest compelling LinkedIn headlines and a professional, engaging 'About' summary.

## Tech Stack

*   **Frontend:** React (TypeScript), Vite, Tailwind CSS, shadcn/ui (Radix UI primitives).
*   **Backend:** Express.js (TypeScript) acting as an API proxy to interact securely with the AI.
*   **AI Models:** Google Gemini AI (`gemini-3.1-pro-preview` for complex reasoning and generating structured outputs, `gemini-3-flash-preview` for faster text summarization).
*   **Icons:** Lucide React.
*   **Animation:** Radix UI and Tailwind CSS animations.

## Setup & Installation

### Prerequisites

*   Node.js (v18 or higher recommended).
*   A Google Gemini API key.

### 1. Clone or Download the Repository

Clone the project to your local machine:
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Install the necessary NPM packages:
```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory (you can copy `.env.example`):
```bash
cp .env.example .env
```

Open the `.env` file and add your Gemini API key:
```env
GEMINI_API_KEY="your_actual_gemini_api_key_here"
APP_URL="http://localhost:3000"
```
*Note: The API key is kept secure on the Express server and is never exposed directly to the browser.*

### 4. Running the Application

Start the development server (this will run the full-stack server using `tsx`):

```bash
npm run dev
```

The application should now be running at `http://localhost:3000`.

### 5. Building for Production

To build the application for production deployment:

```bash
npm run build
```
This command compiles the React frontend via Vite into the `dist` directory and uses `esbuild` to bundle the Express server into `dist/server.cjs`.

To run the production build:
```bash
npm run start
```

## How It Works (Architecture Overview)

1.  **Client-Side Interface:** The React frontend acts as the user interface, collecting the user's resume and target job descriptions.
2.  **API Routes:** When a user requests an AI generation (e.g., "Optimize Resume"), the frontend calls an Express backend route (e.g., `/api/optimize-resume`).
3.  **Server-Side AI Proxy:** The Express backend receives the payload, constructs the specific prompt, and securely calls the Google Gemini API using the server-stored `GEMINI_API_KEY`.
4.  **Structured JSON Responses:** For features like the ATS scorer and interview predictor, the backend requests strict JSON schemas from Gemini to ensure the UI renders the data predictably.
5.  **Result Rendering:** The backend responds to the frontend with the parsed data, which the UI then displays in an organized and professional manner.

## License

This project is licensed under the Apache 2.0 License.
