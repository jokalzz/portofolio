import { useState, useRef, useEffect } from "react";
import { MdClose, MdSend } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import "./styles/Chatbot.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Portfolio context untuk system prompt
const PORTFOLIO_CONTEXT = `
Kamu adalah asisten AI untuk website portfolio Jonathan Kaligis. Kamu HANYA boleh menjawab pertanyaan yang berkaitan dengan informasi di portfolio ini. Jika ada pertanyaan di luar konteks portfolio, tolak dengan sopan dan arahkan kembali ke topik portfolio.

Informasi Portfolio Jonathan Kaligis:

TENTANG:
- Nama: Jonathan Kaligis
- Status: Mahasiswa Teknik Komputer di Universitas Sam Ratulangi (Angkatan 2023)
- Minat: Machine Learning, Full Stack Web Development, UI/UX Design, dan Creative Editing
- Email: jokakalzz@gmail.com
- Telepon: +62-812-4366-1212
- Github: github.com/jokalzz
- LinkedIn: linkedin.com/in/jokaligis
- Instagram: instagram.com/jokaligis

PENGALAMAN & KARIR:
1. Database Technology Teaching Assistant di Universitas Sam Ratulangi (2025) - Mendukung pengajaran teknologi database dengan fokus pada distributed databases dan studi kasus industri
2. Database Teaching Assistant di Universitas Sam Ratulangi (2025) - Membimbing mahasiswa dalam latihan database dan studi kasus nyata
3. Vice Secretary – UPK Kr. FT. UNSRAT di Universitas Sam Ratulangi (2025) - Membantu tugas administratif, mengorganisir acara, dan mendukung tim kepemimpinan
4. Brand Ambassador Dealls (2024) - Mempromosikan platform karir Dealls melalui konten digital dan engagement kampus
5. Team Leader – Retreat Program di Universitas Sam Ratulangi (2023)

KEAHLIAN:
Development: JavaScript, HTML, CSS, Node.js, PHP, Python, C#, C++, MySQL
Design: Blender, After Effects, UI Design, Motion, Figma, 3D Animation, Adobe Illustrator

PROYEK:
1. Silva Suphaa - UI/UX Design menggunakan Figma & Canva
2. ForestMinds Website - Website menggunakan PHP, HTML, CSS, JavaScript
3. My Gallery Website - Website menggunakan HTML, CSS, JavaScript, PHP
4. Smart-CCTV - Machine Learning menggunakan Python, OpenCV, YOLOv8, Jupyter Notebook
5. Green Chatbot - Machine Learning dan Website menggunakan Javascript, Python, HTML, CSS

Jawab dalam bahasa yang sama dengan pertanyaan pengguna (Indonesia atau Inggris). Berikan jawaban yang singkat, informatif, dan ramah.
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! 👋 Saya asisten virtual untuk portfolio Jonathan Kaligis. Silakan tanyakan apa saja tentang portfolio ini!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
            { role: "user", content: userMessage },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || "Maaf, saya tidak bisa menjawab saat ini.";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container" data-cursor="disable">
      {/* Chat Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? "chatbot-toggle-hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <BsChatDotsFill />
      </button>

      {/* Chat Box */}
      <div className={`chatbot-box ${isOpen ? "chatbot-box-open" : ""}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">JK</div>
            <div>
              <h4>Portfolio Assistant</h4>
              <span>Online</span>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
            <MdClose />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chatbot-message chatbot-message-${message.role}`}>
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message chatbot-message-assistant chatbot-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="chatbot-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tanyakan sesuatu..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message">
            <MdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
