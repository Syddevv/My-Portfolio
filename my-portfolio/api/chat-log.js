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

const greetingPatterns = [
  "hello",
  "hi",
  "hey",
  "yo",
  "good morning",
  "good afternoon",
  "good evening",
  "what's up",
  "whats up",
  "sup",
  "kamusta",
];

const identityPatterns = [
  "who are you",
  "are you ai",
  "is this ai",
  "are you the developer",
  "am i talking to",
  "is this sydney",
  "is this syd",
  "is this the developer",
  "are you syd",
  "are you sydney",
];

function isGreeting(message) {
  const normalized = message
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, "")
    .trim();
  return greetingPatterns.some((pattern) => normalized === pattern);
}

function isIdentityQuestion(message) {
  const normalized = message.toLowerCase();
  return identityPatterns.some((pattern) => normalized.includes(pattern));
}

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
  return scopedKeywords.some((keyword) => normalized.includes(keyword));
}

function pickVariant(message, variants) {
  const seed = [...message].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return variants[seed % variants.length];
}

function getGreetingReply(message) {
  return pickVariant(message, [
    "Hey! Feel free to ask about Syd's projects, tech stack, or experience.",
    "Hi! I can help you explore Syd's portfolio and development work.",
    "Hello. Want to know about his apps, skills, or experience?",
    "Hey there. Ask me about Syd's projects, background, or the tools he works with.",
  ]);
}

function getIdentityReply(message) {
  return pickVariant(message, [
    "You're chatting with Syd's AI assistant. I can help you explore his portfolio, projects, skills, and experience.",
    "This is Syd's AI assistant, not Syd himself. I can walk you through his work, stack, and background.",
    "You're speaking with Syd's portfolio assistant. Ask me about his projects, tech stack, or professional experience.",
  ]);
}

function getRedirectReply(message) {
  return pickVariant(message, [
    "I’m here mainly to help with Syd's portfolio and development work. If you'd like, I can tell you about his projects, skills, or experience.",
    "That’s not really what I cover here, but I can help you explore Syd's apps, tech stack, or background.",
    "I’m focused on Syd's work and portfolio. Want a quick overview of his projects or the technologies he uses?",
    "I keep the conversation centered on Syd's portfolio and professional work. Ask me about his projects, experience, or tools.",
  ]);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const trimmedMessage = message.trim();

      let instantReply = null;

      if (isGreeting(trimmedMessage)) {
        instantReply = getGreetingReply(trimmedMessage);
      } else if (isIdentityQuestion(trimmedMessage)) {
        instantReply = getIdentityReply(trimmedMessage);
      } else if (!isScopeQuestion(trimmedMessage)) {
        instantReply = getRedirectReply(trimmedMessage);
      }

      if (instantReply) {

        const chat = new Chat({
          message: trimmedMessage,
          response: instantReply,
        });

        await chat.save();

        return res.status(200).json({ reply: instantReply });
      }

      const systemInstruction = `
You are the AI assistant for Sydney Santos's portfolio website. You are not Sydney Santos.

${portfolioContext}

Behavior Rules:
- Sound friendly, conversational, concise, and professional.
- Stay focused on Sydney Santos's portfolio, projects, skills, experience, education, and professional work.
- Never claim to be the real developer.
- If asked whether the user is speaking to Sydney or to an AI, clearly say that you are Sydney Santos's AI assistant.
- Always refer to Sydney Santos using masculine pronouns only: he, him, his.
- For simple greetings, respond warmly first, then naturally guide the conversation toward his portfolio or work.
- Do not answer unrelated, inappropriate, overly personal, or unprofessional questions.
- If a question is outside scope, redirect naturally and politely without sounding defensive, repetitive, or robotic.
- Avoid repeating phrases like "I can only help", "I only provide", or "That is outside my scope" unless truly necessary.
- Do not invent facts, personal details, or background information that are not present in the portfolio context.
- If the answer is not available from the provided context, say that you do not have that information and offer help with portfolio-related topics instead.
- Vary sentence structure naturally so replies do not sound copy-pasted.
- Keep answers modern, human-like, and useful.
`;
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: trimmedMessage }],
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
        message: trimmedMessage,
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
