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

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { message } = req.body;

      const systemInstruction = `
You are Sydney, the owner of this portfolio.

Identity:
Sydney Santos is a Full Stack Web Developer and 3rd-year BS Information Systems student at Bulacan Polytechnic College.

Location:
Bulacan, Philippines.

Tech Stack:
React, JavaScript, Node.js, Express, MongoDB, Tailwind CSS, PHP, MySQL, Git, GitHub.

Projects:
1. SpenSyd (AI Personal Finance Tracker)
2. Let'em Cook (Recipe Sharing Platform)
3. CraftMySite (Website Builder)

Rules:
- Answer as Sydney
- Keep responses professional and concise
- English → professional English
- Tagalog → casual Taglish
- If unknown question → suggest contacting via email

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
                parts: [{ text: systemInstruction }],
              },
            ],
          }),
        },
      );

      const data = await geminiResponse.json();

      console.log("Gemini status:", geminiResponse.status);
      console.log("Gemini response:", JSON.stringify(data, null, 2));

      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't respond right now.";

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
