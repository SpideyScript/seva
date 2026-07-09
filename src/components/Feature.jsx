import React from 'react'

const Feature = () => {
  return (
   <div style={{ background: "var(--white)", padding: "64px 24px" }}>
  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
    <div style={{ textAlign: "center" }}>
      <div className="section-title">How Seva Works</div>
      <p className="section-sub mt-8">
        3 simple steps to get your problem solved
      </p>
    </div>

    <div className="grid-3 mt-40">
      <div className="how-step">
        <div className="step-num">1</div>
        <div className="step-title">Post Your Problem</div>
        <div className="step-desc">
          Describe the issue, add photos, and set your location. Takes under 2
          minutes.
        </div>
      </div>

      <div className="how-step">
        <div
          className="step-num"
          style={{ background: "var(--amber)" }}
        >
          2
        </div>
        <div className="step-title">Receive Quotes</div>
        <div className="step-desc">
          Verified professionals near you will send their best quotes with ETAs.
        </div>
      </div>

      <div className="how-step">
        <div
          className="step-num"
          style={{ background: "var(--green)" }}
        >
          3
        </div>
        <div className="step-title">Hire & Relax</div>
        <div className="step-desc">
          Compare, pick the best fit, and track the job from start to finish.
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Feature
