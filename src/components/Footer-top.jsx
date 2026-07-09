import React from 'react'
import { MoveRight } from 'lucide-react';

const FooterTop = () => {
  return (
     <div className="cta-section">
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2>Are You a Skilled Professional?</h2>

        <p>
          Join 8,000+ service providers earning more with Seva. Get leads in
          your area instantly.
        </p>

        <button
          className="btn mt-24"
          style={{
            background: "var(--white)",
            color: "var(--amber)",
            fontSize: "16px",
            padding: "14px 32px",
            fontWeight: 700,
            margin: "24px auto 0",
            display: "flex",
          }}
          onClick={() => navigate("signup")}
        >
          Join as a Provider
         <MoveRight />
        </button>
      </div>
    </div>
  );
  
}

export default FooterTop
