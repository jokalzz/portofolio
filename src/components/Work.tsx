import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`,
      scrub: true,
      pin: true,
      pinSpacing: true,
      id: "work",
      invalidateOnRefresh: true,
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
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
    </div>
  );
};

export default Work;
