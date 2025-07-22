import React from "react";
import "./footer.css";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__section">
          <h1 className="footer__title">MERN Stack Blog</h1>
        </div>
        <div className="footer__section">
          <ul className="footer__list">
            <li>
              <a href="#home" className="footer__link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="footer__link">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="footer__link">
                Contact
              </a>
            </li>
            <li>
              <a href="#write" className="footer__link">
                Write
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <div className="footer__social">
            <a
              href="https://www.instagram.com/aakash22raj"
              className="footer__social-link"
              target="_blank"
              aria-label="Instagram"
            >
              <AiFillInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/aakash22raj"
              className="footer__social-link"
              target="_blank"
              aria-label="LinkedIn"
            >
              <AiFillLinkedin />
            </a>
            <a
              href="https://www.github.com/aakash22raj"
              className="footer__social-link"
              target="_blank"
              aria-label="GitHub"
            >
              <AiFillGithub />
            </a>
            <a
              href="https://www.twitter.com/aakash22raj"
              className="footer__social-link"
              target="_blank"
              aria-label="Twitter"
            >
              <AiFillTwitterCircle />
            </a>
            <a
              href="https://www.youtube.com/"
              className="footer__social-link"
              target="_blank"
              aria-label="YouTube"
            >
              <AiFillYoutube />
            </a>
          </div>
        </div>
        <div className="footer__section">
          <span className="footer__copy">
            © 2024 MERN Stack Blog. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;