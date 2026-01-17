import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Data untuk setiap project - isi sesuai kebutuhan Anda
const projectsData = [
  {
    id: 1,
    title: "Silva Suphaa",
    category: "UI/UX Design",
    tools: "Figma, & Canva",
    image: "/images/my_figma.png",
    link: "https://www.figma.com/proto/RkXpKLWvC9OQynsJGchuag/UI-UX-GEMASTIK?node-id=1-137&starting-point-node-id=1%3A137&t=z534uaiM3YGW2d9I-1", // optional
  },
  {
    id: 2,
    title: "ForestMinds Website",
    category: "Website",
    tools: "PHP, HTML, CSS, JavaScript",
    image: "/images/Forestminds.png",
    link: "https://github.com/jokalzz/ForestMinds",
  },
  {
    id: 3,
    title: "My Gallery Website",
    category: "Website",
    tools: "HTML, CSS, JavaScript, PHP",
    image: "/images/my_website.png",
    link: "https://jokalzz.github.io/TIK2032-Project/",
  },
  {
    id: 4,
    title: "Smart - CCTV",
    category: "Machine Learning",
    tools: "Python, OpenCV, YOLOv8, Jupyter Notebook",
    image: "/images/Smart-CCTV.png",
    link: "https://github.com/jokalzz/smart-cctv",
  },
  {
    id: 5,
    title: "Green - Chatbot",
    category: "Machine Learning, and Website",
    tools: "Javascript, Python, HTML, CSS",
    image: "/images/chatbot.png",
    link: "https://greenchatbot.vercel.app/",
  }
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = projectsData.length;

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        
        <div 
          className="work-carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons */}
          <button 
            className="carousel-btn carousel-btn-left" 
            onClick={goToPrevious}
            aria-label="Previous project"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            className="carousel-btn carousel-btn-right" 
            onClick={goToNext}
            aria-label="Next project"
          >
            <FaChevronRight />
          </button>

          {/* Carousel Track */}
          <div 
            className="work-flex"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projectsData.map((project, index) => (
              <div className="work-box" key={project.id}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                </div>
                <WorkImage image={project.image} alt={project.title} link={project.link} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="carousel-dots">
          {projectsData.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="carousel-counter">
          <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="separator">/</span>
          <span className="total">{String(totalSlides).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
};

export default Work;
