import React from "react";

function FooterNavbar() {
  return (
    <nav className="footer-navbar">
      <div className="footer-navbar-container">
        <div className="footer-navbar-logo">
          <a href="/">Logo</a>
        </div>
        <ul className="footer-navbar-menu">
          <li className="footer-navbar-item">
            <a href="/">Home</a>
          </li>
          <li className="footer-navbar-item">
            <a href="/">About</a>
          </li>
          <li className="footer-navbar-item">
            <a href="/">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default FooterNavbar;
