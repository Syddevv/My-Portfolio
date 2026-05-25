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
- Name: Sydney Santos
- Location: Bulacan, Philippines
- Age: 20
- Use only masculine pronouns when referring to the developer: he, him, his.
- Email: sydneysantos176@gmail.com
- Open for work: Yes

Portfolio Scope:
- portfolio overview
- projects
- skills and tech stack
- experience and education
- achievements and awards
- services or work-related capabilities
- contact or professional availability

Education:
- Sydney Santos is currently taking BS Information Systems at Bulacan Polytechnic College.
- Study period: 2023 to present.
- Current year level: 3rd Year.

Experience:
- Company: Certicode
- Role: Full-stack Web Developer Intern (OJT)
- Duration: February 2026 to May 2026

Achievements:
- BPC Mini Hackathon Participant
- OOP Class Rank 1
- Web Development Class Rank 6

Known Tech Stack:
- React
- JavaScript
- Node.js
- Express
- MongoDB
- React Native
- TypeScript
- Tailwind CSS
- PHP
- MySQL
- SQLite
- Supabase
- Laravel
- Socket.io
- Git
- GitHub
- AI-assisted development with Codex and v0 by Vercel

Known Projects:
Project Ordering:
- The projects are ordered from most recent to older work.
- The most recent project is the first project in the portfolio data: Eyrie.

Known Projects:
1. Eyrie - An AI-assisted, offline-first personal finance mobile app built with React Native, TypeScript, SQLite, and Supabase. It focuses on expense tracking, budgets, savings, local storage, secure syncing, and a smooth mobile experience.
2. EduTrack - An academic management system for attendance, classes, and reports. It helps teachers and administrators monitor student performance and identify at-risk students.
3. Certicode E-commerce - A full-stack e-commerce web application built during internship work. It includes product listings, a shopping cart, and a responsive shopping experience.
4. SpenSyd - A personal finance tracker with AI integration that helps users manage spending and income more efficiently.
5. Let'em Cook - A community recipe sharing platform for home cooks to publish and explore culinary content.
6. CraftMySite - A template marketplace and custom web services platform for digital products and professional website solutions.
7. Orbit - A modern anonymous chat app designed for serendipitous real-time connections.
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

function normalizeMessage(message) {
  return message.toLowerCase().trim();
}

function isScopeQuestion(message) {
  const normalized = normalizeMessage(message);
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
    "open for work",
    "available",
    "service",
    "services",
    "hire",
    "contact",
    "availability",
    "email",
    "location",
    "age",
    "school",
    "study",
    "studies",
    "student",
    "course",
    "background",
    "achievement",
    "achievements",
    "award",
    "awards",
    "rank",
    "hackathon",
    "ojt",
    "intern",
    "github",
    "resume",
    "cv",
    "internship",
    "college",
    "bulacan",
    "certicode",
    "bpc",
    "information systems",
    "react",
    "node",
    "mongodb",
    "php",
    "mysql",
    "tailwind",
    "typescript",
    "react native",
    "sqlite",
    "supabase",
    "laravel",
    "socket.io",
    "recent",
    "latest",
    "newest",
    "mobile",
    "finance",
    "budget",
    "eyrie",
    "edutrack",
    "spensyd",
    "let'em cook",
    "craftmysite",
    "orbit",
  ];
  return scopedKeywords.some((keyword) => normalized.includes(keyword));
}

function isLikelyFollowUp(message) {
  const normalized = normalizeMessage(message).replace(
    /[^\p{L}\p{N}\s']/gu,
    "",
  );

  const followUpPhrases = [
    "tell me about it",
    "tell me more",
    "what about it",
    "what about him",
    "what does he do",
    "what projects",
    "which project",
    "experience",
    "more",
    "and",
    "why",
    "how so",
    "can you expand",
    "go on",
    "what else",
  ];

  return (
    followUpPhrases.some((phrase) => normalized === phrase) ||
    normalized.split(/\s+/).length <= 4
  );
}

function hasPortfolioContext(history = []) {
  return history.some(
    (entry) =>
      typeof entry?.text === "string" &&
      (isScopeQuestion(entry.text) || entry.role === "bot"),
  );
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
    "I mainly focus on Syd's development work and portfolio. Want to hear about his projects, experience, or tech stack?",
    "That’s a bit outside what I cover here, but I’d be glad to walk you through Syd's apps, background, or skills.",
    "I’m best at helping with Syd's work, projects, and experience. Want a quick overview?",
    "Happy to help with Syd's portfolio and professional background. You can ask about his projects, internship, or tools.",
  ]);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { message, history = [] } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const trimmedMessage = message.trim();
      const safeHistory = Array.isArray(history)
        ? history
            .filter(
              (entry) =>
                entry &&
                (entry.role === "user" || entry.role === "bot") &&
                typeof entry.text === "string",
            )
            .slice(-8)
        : [];
      const canInferFromContext =
        safeHistory.length > 0 &&
        hasPortfolioContext(safeHistory) &&
        isLikelyFollowUp(trimmedMessage);

      let instantReply = null;

      if (isGreeting(trimmedMessage)) {
        instantReply = getGreetingReply(trimmedMessage);
      } else if (isIdentityQuestion(trimmedMessage)) {
        instantReply = getIdentityReply(trimmedMessage);
      } else if (!isScopeQuestion(trimmedMessage) && !canInferFromContext) {
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
- Naturally answer questions about his education, school background, internship/work experience, achievements, awards, technologies, projects, and work availability.
- Never claim to be the real developer.
- If asked whether the user is speaking to Sydney or to an AI, clearly say that you are Sydney Santos's AI assistant.
- Always refer to Sydney Santos using masculine pronouns only: he, him, his.
- For simple greetings, respond warmly first, then naturally guide the conversation toward his portfolio or work.
- Prioritize being helpful before redirecting.
- Infer user intent whenever possible, especially for short or vague follow-up messages.
- Use the recent conversation context to resolve references like "it", "that", "what projects", or "experience?".
- Do not answer unrelated, inappropriate, overly personal, or unprofessional questions.
- If a question is outside scope, redirect naturally and briefly without sounding defensive, repetitive, or robotic.
- Avoid repeating phrases like "I can only help", "I only provide", or "That is outside my scope" unless truly necessary.
- Do not invent facts, personal details, or background information that are not present in the portfolio context.
- If the answer is not available from the provided context, say that you do not have that information and offer help with portfolio-related topics instead.
- Vary sentence structure naturally so replies do not sound copy-pasted.
- Keep answers modern, human-like, and useful.
- Keep replies short to medium length unless the user clearly asks for more detail.
`;
      const conversationContext = safeHistory
        .map(
          (entry) =>
            `${entry.role === "user" ? "User" : "Assistant"}: ${entry.text}`,
        )
        .join("\n");

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
                parts: [
                  {
                    text: conversationContext
                      ? `Recent conversation:\n${conversationContext}\n\nCurrent user message: ${trimmedMessage}`
                      : `Current user message: ${trimmedMessage}`,
                  },
                ],
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
