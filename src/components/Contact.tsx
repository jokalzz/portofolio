import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:jokakalzz@gmail.com" data-cursor="disable">
                jokakalzz@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+6281243661212" data-cursor="disable">
                +62-812-4366-1212
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/jokalzz"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/jokaligis"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/jokaligis"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Jonathan Kaligis</span>
            </h2>
            <h5>
              <MdCopyright /> 2026 Jonathan Kaligis. All rights reserved.
            </h5>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;
