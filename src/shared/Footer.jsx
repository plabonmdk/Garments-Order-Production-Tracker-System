import React from "react";
import Logo from "../components/logo/Logo";
import {
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside>
        <Logo />
        <p>
          <span className="font-semibold">Plabon Garments Ltd.</span>
          <br />
          Quality Apparel Manufacturing Since 2018
        </p>

        {/* Social Links */}
        <div className="flex gap-4 mt-4 text-2xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FaFacebook />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600"
          >
            <FaYoutube />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500"
          >
            <FaTwitter />
          </a>

          <a
            href="https://github.com/plabonmdk/Garments-Order-Production-Tracker-System.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <FaLinkedin />
          </a>
        </div>
      </aside>

      <nav>
        <h6 className="footer-title">Our Services</h6>
        <a className="link link-hover">Garments Manufacturing</a>
        <a className="link link-hover">Custom Apparel</a>
        <a className="link link-hover">Bulk Production</a>
        <a className="link link-hover">Export & Supply</a>
      </nav>

      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Our Factory</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Contact</a>
      </nav>

      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms & Conditions</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Compliance</a>
      </nav>
    </footer>
  );
};

export default Footer;
