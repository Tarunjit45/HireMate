import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper function to extract JSON from Gemini response if it's wrapped in markdown
  const parseJSON = (text: string) => {
    let raw = text.trim();
    if (raw.startsWith("```json")) {
      raw = raw.slice(7);
      if (raw.endsWith("```")) {
        raw = raw.slice(0, -3);
      }
    }
    return JSON.parse(raw);
  };

  // 1. Resume Optimization Endpoint
  app.post("/api/optimize-resume", async (req, res) => {
    try {
      const { resumeText, jobDescription } = req.body;
      const prompt = `You are an expert ATS (Applicant Tracking System) optimizer and professional recruiter.
Review this resume against the job description. Provide the following:
1. Overall optimization score (0-100).
2. Key strengths.
3. Missing keywords or skills based on the job description.
4. Suggested bullet point rewrites to better match the role.

Return the response in JSON format.

Job Description:
${jobDescription}

Resume:
${resumeText}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER, description: "Optimization score 0-100" },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              rewrites: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING },
                    suggested: { type: Type.STRING, description: "A stronger bullet point" }
                  }
                }
              }
            },
            required: ["score", "strengths", "missingKeywords", "rewrites"]
          }
        }
      });
      res.json(parseJSON(response.text!));
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  // 2. Cover Letter Generator Endpoint
  app.post("/api/generate-cover-letter", async (req, res) => {
    try {
      const { resumeText, jobDescription, tone } = req.body;
      const prompt = `You are an expert career coach. Write a tailored cover letter for this particular job, utilizing the provided resume.
Tone: ${tone || "Professional and confident"}.

Job Description:
${jobDescription}

Resume:
${resumeText}

Output the cover letter as a simple string. Format it nicely with line breaks if appropriate. DO NOT output JSON. Just the plain text covering letter.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt
      });
      res.json({ coverLetter: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  // 3. Interview Questions Endpoint
  app.post("/api/generate-interview", async (req, res) => {
    try {
      const { jobDescription } = req.body;
      const prompt = `Based on this job description, generate 5 behavioral interview questions and 5 technical/role-specific interview questions that the candidate is highly likely to be asked. Provide a brief ideal approach to answer each.

Job Description:
${jobDescription}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              behavioral: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    approach: { type: Type.STRING }
                  }
                }
              },
              technical: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    approach: { type: Type.STRING }
                  }
                }
              }
            },
            required: ["behavioral", "technical"]
          }
        }
      });
      res.json(parseJSON(response.text!));
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  // 4. LinkedIn Improvement Endpoint
  app.post("/api/improve-linkedin", async (req, res) => {
    try {
      const { resumeText } = req.body;
      const prompt = `Based on this resume, generate 3 options for a compelling LinkedIn Headline and 1 optimized LinkedIn Summary/About section that is engaging and highlights their expertise.

Resume:
${resumeText}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headlines: { type: Type.ARRAY, items: { type: Type.STRING } },
              summary: { type: Type.STRING }
            },
            required: ["headlines", "summary"]
          }
        }
      });
      res.json(parseJSON(response.text!));
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
