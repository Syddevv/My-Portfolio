import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const chatSchema = new mongoose.Schema({
  message: String,
  response: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

app.post("/chat-log", async (req, res) => {
  const { message, response } = req.body;

  const chat = new Chat({
    message,
    response,
  });

  await chat.save();

  res.json({ success: true });
});

app.get("/chat-log", async (req, res) => {
  const logs = await Chat.find().sort({ createdAt: -1 });
  res.json(logs);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
