/* eslint-env node */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!global.mongoose) {
  global.mongoose = mongoose.connect(MONGODB_URI);
}

await global.mongoose;

const ChatSchema = new mongoose.Schema({
  message: String,
  response: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

const portfolioContext = `
Developer:
- Sydney Santos is a Full Stack Web Developer and a 3rd-year BS Information Systems student at Bulacan Polytechnic College.
- Use only masculine pronouns when referring to the developer: he, him, his.

Portfolio Scope:
- portfolio overview
- projects
- skills and tech stack
- experience and education
- services or work-related capabilities
- contact or professional availability

Known Tech Stack:
- React
- JavaScript
- Node.js
- Express
- MongoDB
- Tailwind CSS
- PHP
- MySQL
- Git
- GitHub

Known Projects:
1. EduTrack - Academic management system for attendance, classes, and reports.
2. Certicode E-commerce - Full-stack e-commerce web application.
3. SpenSyd - Personal finance tracker with AI integration.
4. Let'em Cook - Community recipe sharing platform.
5. CraftMySite - Template marketplace and custom web services.
6. Orbit - Modern anonymous chat app.
`;

function isScopeQuestion(message) {
  const normalized = message.toLowerCase();

  const scopedKeywords = [
    "portfolio",
    "project",
    "projects",
    "skill",
    "skills",
    "stack",
    "tech",
    "technology",
    "developer",
    "sydney",
    "syd",
    "experience",
    "education",
    "work",
    "service",
    "services",
    "hire",
    "contact",
    "availability",
    "github",
    "resume",
    "cv",
    "internship",
    "college",
    "bulacan",
    "react",
    "node",
    "mongodb",
    "php",
    "mysql",
    "tailwind",
    "edutrack",
    "certicode",
    "spensyd",
    "let'em cook",
    "craftmysite",
    "orbit",
  ];

  const identityKeywords = [
    "are you",
    "who are you",
    "is this ai",
    "are you ai",
    "are you the developer",
    "am i talking to",
    "is this sydney",
    "is this syd",
  ];

  return (
    scopedKeywords.some((keyword) => normalized.includes(keyword)) ||
    identityKeywords.some((keyword) => normalized.includes(keyword))
  );
}

function getScopedFallback(message) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("are you") ||
    normalized.includes("who are you") ||
    normalized.includes("ai") ||
    normalized.includes("developer")
  ) {
    return "You’re speaking with Sydney Santos’s AI assistant. I can help with his portfolio, projects, skills, experience, and other work-related information.";
  }

  return "I can only help with Sydney Santos’s portfolio, projects, skills, experience, and professional work. If you’d like, ask about his projects, tech stack, or background.";
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!isScopeQuestion(message)) {
        const botReply = getScopedFallback(message);

        const chat = new Chat({
          message,
          response: botReply,
        });

        await chat.save();

        return res.status(200).json({ reply: botReply });
      }

      const systemInstruction = `
You are the AI assistant for Sydney Santos's portfolio website. You are not Sydney Santos.

${portfolioContext}

Behavior Rules:
- Stay strictly focused on Sydney Santos's portfolio, projects, skills, experience, education, and professional work only.
- Never claim to be the real developer.
- If asked whether the user is speaking to Sydney or to an AI, clearly say that you are Sydney Santos's AI assistant.
- Always refer to Sydney Santos using masculine pronouns only: he, him, his.
- Maintain a professional, friendly, and concise tone.
- Do not answer unrelated, inappropriate, overly personal, or unprofessional questions.
- If a question is outside scope, politely explain that you only provide information related to the portfolio and Sydney Santos's work, then redirect to a relevant topic.
- Do not invent facts, personal details, or background information that are not present in the portfolio context.
- If the answer is not available from the provided context, say that you do not have that information and offer help with portfolio-related topics instead.
- Match the user's language where reasonable, but keep the tone professional.

User query: ${message}
`;
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: systemInstruction }],
              },
            ],
          }),
        },
      );

      const data = await geminiResponse.json();

      console.log("Gemini status:", geminiResponse.status);
      console.log("Gemini response:", JSON.stringify(data, null, 2));

      if (!geminiResponse.ok) {
        console.error("Gemini API error:", data);
        throw new Error("Gemini request failed");
      }

      let botReply = "Sorry, I couldn't respond right now.";

      try {
        const candidate = data?.candidates?.[0];
        const parts = candidate?.content?.parts;

        if (parts && parts.length > 0) {
          botReply = parts
            .map((part) => part.text)
            .filter(Boolean)
            .join("");
        }
      } catch (err) {
        console.error("Gemini parsing error:", err);
      }

      if (!botReply || botReply.trim() === "") {
        botReply = "Hi! How can I help you today?";
      }

      const chat = new Chat({
        message,
        response: botReply,
      });

      await chat.save();

      res.status(200).json({ reply: botReply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}
