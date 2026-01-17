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
   Link: https://www.figma.com/proto/RkXpKLWvC9OQynsJGchuag/UI-UX-GEMASTIK
2. ForestMinds Website - Website menggunakan PHP, HTML, CSS, JavaScript
   Link: https://github.com/jokalzz/ForestMinds
3. My Gallery Website - Website menggunakan HTML, CSS, JavaScript, PHP
   Link: https://jokalzz.github.io/TIK2032-Project/
4. Smart-CCTV - Machine Learning menggunakan Python, OpenCV, YOLOv8, Jupyter Notebook
   Link: https://github.com/jokalzz/smart-cctv
5. Green Chatbot - Machine Learning dan Website menggunakan Javascript, Python, HTML, CSS
   Link: https://greenchatbot.vercel.app/

TEKNOLOGI WEBSITE INI (Portfolio Website Jonathan Kaligis):
Bahasa Pemrograman:
- TypeScript - Bahasa utama untuk type safety dan pengembangan yang lebih terstruktur
- JavaScript - Untuk beberapa logic dan interaksi
- HTML5 - Struktur markup
- CSS3 - Styling dengan custom properties dan animasi

Framework & Library:
- React 18.3.1 - Library JavaScript untuk membangun user interface dengan component-based architecture
- Vite 5.4.1 - Build tool dan dev server yang sangat cepat untuk development modern
- React Router - Untuk navigasi single page application (SPA)

3D Graphics & Animation:
- Three.js 0.168.0 - Library 3D JavaScript untuk rendering karakter 3D di landing page
- React Three Fiber 8.17.10 - React renderer untuk Three.js, memungkinkan 3D dengan cara React
- React Three Drei 9.120.4 - Utility dan helpers untuk React Three Fiber
- React Three Rapier 1.5.0 - Physics engine untuk interaksi 3D
- React Three Postprocessing 2.16.3 - Post-processing effects untuk visual 3D yang lebih menarik

Animation & Effects:
- GSAP 3.14.2 - Library animasi profesional untuk scroll-triggered animations dan smooth transitions
- @gsap/react 2.1.1 - React hooks untuk GSAP
- ScrollTrigger - Plugin GSAP untuk animasi berdasarkan scroll position

UI Components & Icons:
- React Icons 5.3.0 - Library icon yang lengkap (Font Awesome, Material Design, dll)
- React Fast Marquee 1.6.5 - Component untuk efek marquee/sliding text

AI Chatbot Integration:
- Groq API - Menggunakan model Llama 3.3 70B Versatile untuk AI chatbot yang responsif
- Custom React hooks untuk state management chatbot
- Real-time streaming responses

Styling & Design:
- CSS Modules - Scoped styling per component
- Custom CSS Variables untuk theming konsisten
- Responsive Design dengan media queries untuk mobile, tablet, dan desktop
- Gradient effects dan glassmorphism untuk modern UI
- Smooth transitions dan hover effects

Development Tools:
- TypeScript 5.5.3 - Type checking dan IntelliSense
- ESLint - Code linting untuk code quality
- Vite Plugin React - Hot Module Replacement (HMR) untuk development cepat

Deployment & Hosting:
- Platform: Kemungkinan Vercel atau Netlify (berdasarkan struktur project dan @vercel/analytics)
- @vercel/analytics 1.4.1 - Analytics untuk tracking visitor dan performance
- Build Command: "npm run build" atau "vite build"
- Output: Static site generation (SSG) dengan optimized bundle
- CI/CD: Automatic deployment dari Git repository
- Custom Domain: Portfolio dapat di-deploy dengan custom domain
- HTTPS: Secure connection default dari platform hosting

Performance Optimizations:
- Code splitting untuk bundle size yang lebih kecil
- Lazy loading untuk components dan images
- Tree shaking untuk menghapus unused code
- Minification dan compression pada production build
- Image optimization untuk loading cepat
- Preloading critical assets

Fitur Khusus Website Ini:
1. Interactive 3D Character - Karakter 3D yang dapat berinteraksi dengan mouse movement
2. Smooth Scroll Animations - Transisi halus antar section dengan GSAP ScrollTrigger
3. Work Carousel - Carousel interaktif untuk menampilkan portfolio projects dengan navigation buttons
4. AI Chatbot - Assistant virtual dengan Groq AI yang dapat menjawab pertanyaan tentang portfolio
5. Responsive Design - Tampilan optimal di semua device (mobile, tablet, desktop)
6. Dark Theme - Design modern dengan dark color scheme dan accent purple
7. Custom Cursor - Cursor animation yang mengikuti gerakan mouse
8. Loading Animation - Smooth loading screen dengan progress indicator
9. Social Media Integration - Link ke berbagai platform social media
10. Contact Form - Form untuk menghubungi langsung

Browser Support:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Memerlukan JavaScript enabled
- WebGL support untuk 3D graphics

Source Code & Repository:
- Kemungkinan tersimpan di GitHub repository pribadi Jonathan Kaligis
- Package manager: npm atau yarn
- Node.js version: Compatible dengan versi LTS terbaru

Cara Menjalankan Locally:
1. Clone repository dari GitHub
2. Install dependencies: npm install
3. Setup environment variables (.env file) dengan VITE_GROQ_API_KEY
4. Run development server: npm run dev
5. Build for production: npm run build
6. Preview production build: npm run preview

Jawab dalam bahasa yang sama dengan pertanyaan pengguna (Indonesia atau Inggris). Berikan jawaban yang singkat, informatif, dan ramah. Ketika ditanya tentang teknologi website, berikan detail yang relevan berdasarkan konteks pertanyaan.
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
