import React from 'react'

const Review = () => {
    const reviews = [
  {
    initials: "MG",
    name: "Meena Gupta",
    city: "Bhubaneswar",
    review:
      "AC was leaking badly. Posted on Seva, got 3 quotes in 20 mins. Anil fixed it same day. Amazing!",
    bgColor: "var(--blue-light)",
    textColor: "var(--blue)",
  },
  {
    initials: "RP",
    name: "Rajesh Panda",
    city: "Cuttack",
    review:
      "Water pipe burst at midnight. Priya responded within 30 minutes. Professional and fair pricing.",
    bgColor: "var(--green-light)",
    textColor: "var(--green)",
  },
  {
    initials: "AS",
    name: "Anita Singh",
    city: "Rourkela",
    review:
      "Finally an app that works in smaller cities too. Found a carpenter the same day for my wardrobe.",
    bgColor: "var(--amber-light)",
    textColor: "var(--amber)",
  },
];
  return (
   <section
      style={{
        background: "var(--gray-lighter)",
        padding: "64px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 className="section-title">What Customers Say</h2>
          <p className="section-sub mt-8">
            4.8 average from 12,000+ reviews
          </p>
        </div>

        <div className="grid-3 mt-32">
          {reviews.map((review, index) => (
            <div key={index} className="review-card" >
              <div style={{display:'flex',justifyContent:'left'}}>⭐⭐⭐⭐⭐</div>

              <div className="review-text mt-12">
                "{review.review}"
              </div>

              <div className="review-author">
                <div
                  className="avatar-initials"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: review.bgColor,
                    color: review.textColor,
                  }}
                >
                  {review.initials}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    {review.name}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--gray)",
                    }}
                  >
                    {review.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
}

export default Review
