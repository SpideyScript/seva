import React from 'react'

const Professional = () => {
    const professionals = [
  {
    initials: "RS",
    name: "Ramesh Sharma",
    service: "⚡ Electrician",
    rating: "4.9",
    jobs: "127 jobs",
    cover: "linear-gradient(135deg,#F59E0B,#FBBF24)",
    avatarColor: "var(--amber)",
    route: "request-details",
  },
  {
    initials: "PK",
    name: "Priya Kumari",
    service: "🚿 Plumber",
    rating: "4.8",
    jobs: "89 jobs",
    cover: "linear-gradient(135deg,#059669,#10B981)",
    avatarColor: "var(--green)",
    route: "provider-profile",
  },
  {
    initials: "AV",
    name: "Anil Verma",
    service: "❄️ AC Repair",
    rating: "4.9",
    jobs: "203 jobs",
    cover: "linear-gradient(135deg,#7C3AED,#A855F7)",
    avatarColor: "#7C3AED",
    route: "provider-profile",
  },
  {
    initials: "SM",
    name: "Suresh Mishra",
    service: "🔧 Mechanic",
    rating: "4.7",
    jobs: "156 jobs",
    cover: "linear-gradient(135deg,#D97706,#F59E0B)",
    avatarColor: "var(--amber)",
    route: "request-details",
  },
];
  return (
     <div className="section">
      <div className="flex-between">
        <div>
          <h2 className="section-title">Featured Professionals</h2>
          <p className="section-sub" style={{display:'flex',justifyContent:'left'}}>Top-rated experts in your area</p>
        </div>
      </div>

      <div className="grid-4 mt-32">
        {professionals.map((pro) => (
          <div key={pro.name} className="pro-card">
            <div
              className="pro-cover"
              style={{ background: pro.cover }}
            />

            <div className="pro-body">
              <div
                className="pro-avatar"
                style={{ color: pro.avatarColor }}
              >
                {pro.initials}
              </div>

              <div className="pro-name" style={{display:'flex',justifyContent:'left'}}>{pro.name}</div>

              <div className="pro-service" style={{display:'flex',justifyContent:'left'}}>{pro.service}</div>

              <div className="pro-stats">
                <span className="star">★</span>
                <span style={{ fontWeight: 600 }}>
                  {pro.rating}
                </span>

                <span className="text-gray">•</span>

                <span className="text-gray">
                  {pro.jobs}
                </span>
              </div>

              <button
                className="btn btn-outline mt-12"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "13px",
                }}
                onClick={() => navigate(pro.route)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Professional
