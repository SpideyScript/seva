import { Leaf } from 'lucide-react';
import React from 'react'

const Footer = () => {
    const footerSections = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
  },
  {
    title: "Services",
    links: ["For Customers", "For Providers", "Enterprise", "API"],
  },
  {
    title: "Support",
    links: ["Help Center", "Safety", "Privacy", "Terms"],
  },
];
  return (
   <footer>
      <div className="footer-inner" style={{textAlign:'left'}}>
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              Seva<span style={{ color: "var(--amber)" }}>•</span>
            </div>

            <div className="footer-desc">
              India's most trusted local services marketplace. Connecting
              skilled professionals with customers who need them.
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <div className="footer-h">{section.title}</div>

              <div className="footer-links">
                {section.links.map((link) => (
                  <a key={link} href="#">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Seva Technologies Pvt. Ltd.
          </span>

          <span>🇮🇳 Made in India</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
