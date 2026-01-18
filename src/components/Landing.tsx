import { PropsWithChildren, useState } from "react";
import { createPortal } from "react-dom";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              JONATHAN
              <br />
              <span>KALIGIS</span>
            </h1>
            <button 
              onClick={openModal}
              className="cv-button"
              type="button"
            >
              <span className="cv-button-text">VIEW CV</span>
              <svg 
                className="cv-button-icon" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </button>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Designer</div>
              <div className="landing-h2-2">Developer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Designer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>

      {/* CV Modal Popup */}
      {isModalOpen && createPortal(
        <div className="cv-modal-overlay" onClick={closeModal}>
          <div className="cv-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cv-modal-header">
              <h3>My CV</h3>
              <button className="cv-modal-close" onClick={closeModal} type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="cv-modal-body">
              <iframe
                src="https://drive.google.com/file/d/1SgGuxuyc-kj2PZvxh4fewFxIh_3L26Xs/preview"
                className="cv-iframe"
                title="CV Jonathan Kaligis"
                allow="autoplay"
              />
            </div>
            <div className="cv-modal-footer">
              <a 
                href="https://drive.google.com/file/d/1SgGuxuyc-kj2PZvxh4fewFxIh_3L26Xs/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-footer-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Open in Google Drive
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Landing;
