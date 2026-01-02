import { useState, useRef, useEffect } from "react";
// 1. Updated imports: removed Loader2, added Dot
import { MessageCircle, X, Send, Dot, Bot } from "lucide-react";
import ProfilePic from "../../assets/syd.jpg";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi there! 👋🏻 Thanks for visiting my website. Feel free to ask me anything about programming, web development, or what do I offer. Let me know how I can help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const systemInstruction = `
      You are Sydney, the owner of this portfolio... (rest of your prompt)
      User query: ${input}
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemInstruction }] }],
          }),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't reach the server.";

      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error connecting to AI service." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 h-14 flex items-center justify-center shadow-lg transition-all duration-300 z-50 bg-primary text-primary-foreground cursor-pointer ${
          isOpen ? "w-14 rounded-full" : "w-auto px-6 rounded-full"
        }`}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="flex items-center gap-2">
            <MessageCircle size={24} />
            <span className="font-semibold whitespace-nowrap">
              Chat with Syd
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden border border-border bg-card text-card-foreground animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-border bg-muted/40">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={ProfilePic}
                  alt="Sydney"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-background"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Chat with Syd</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded-full"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background/50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex flex-col gap-1 max-w-[80%] ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={ProfilePic}
                        alt="Sydney"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-muted-foreground">
                        Sydney
                      </span>
                    </div>
                  )}
                  <div
                    className={`p-3 text-sm leading-relaxed shadow-sm break-words ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-2xl rounded-br-none"
                        : "bg-muted text-foreground rounded-2xl rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {/* --- LOADING STATE --- */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={ProfilePic}
                      alt="Sydney"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-muted-foreground">
                      Sydney
                    </span>
                  </div>
                  <div className="bg-muted px-2 py-1.5 rounded-2xl rounded-bl-none flex items-center">
                    <Dot
                      className="animate-bounce [animation-delay:-0.3s] text-muted-foreground"
                      size={24}
                    />
                    <Dot
                      className="animate-bounce [animation-delay:-0.15s] text-muted-foreground ml-[3.5]"
                      size={24}
                    />
                    <Dot
                      className="animate-bounce text-muted-foreground ml-[3.5]"
                      size={24}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* ----------------------------- */}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask something..."
                className="w-full bg-background text-foreground border border-input rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
