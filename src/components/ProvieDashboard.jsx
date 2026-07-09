import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Bell,
  Wrench,
  IndianRupee,
  Star,
  MapPin,
} from "lucide-react";

const ProviderDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}

      <div className="flex-between">
        <div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            Provider Dashboard
          </h2>

          <p className="text-gray mt-8 flex gap-8">
            <span className="badge badge-green">
              ● Online
            </span>

            <span
              style={{
                fontSize: "14px",
              }}
            >
              Ramesh Sharma · Electrician
            </span>
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/providerdashboard/nearby-requests")
          }
        >
          <Zap size={18} />
          Find New Leads
        </button>
      </div>

      {/* Stats */}

      <div className="grid-4 mt-24">
        <div className="stat-card">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--blue-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--blue)",
            }}
          >
            <Bell size={20} />
          </div>

          <div className="stat-value mt-12">8</div>
          <div className="stat-label">
            New Leads Today
          </div>

          <div className="stat-change up">
            ↑ 3 from yesterday
          </div>
        </div>

        <div className="stat-card">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--amber-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--amber)",
            }}
          >
            <Wrench size={20} />
          </div>

          <div className="stat-value mt-12">2</div>
          <div className="stat-label">
            Active Jobs
          </div>
        </div>

        <div className="stat-card">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--green-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--green)",
            }}
          >
            <IndianRupee size={20} />
          </div>

          <div className="stat-value mt-12">
            ₹2,400
          </div>

          <div className="stat-label">
            Earnings Today
          </div>

          <div className="stat-change up">
            ↑ ₹400 from avg
          </div>
        </div>

        <div className="stat-card">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--amber-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--amber)",
            }}
          >
            <Star size={20} />
          </div>

          <div className="stat-value mt-12">4.9</div>

          <div className="stat-label">
            Average Rating
          </div>

          <div className="stat-change up">
            ↑ Top 5% in area
          </div>
        </div>
      </div>

      {/* Nearby Requests */}

      <div className="mt-32">
        <div className="flex-between">
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            Nearby Requests Feed
          </h3>

          <span
            onClick={() =>
              navigate("/providerdashboard/nearby-requests")
            }
            style={{
              color: "var(--blue)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            View map →
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          {/* Request 1 */}

          <div className="card">
            <div
              className="card-body"
              style={{ padding: "16px" }}
            >
              <div className="flex-between">
                <div className="flex gap-12">
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "var(--red-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ⚡
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Short circuit in living room
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--gray)",
                      }}
                    >
                      <MapPin size={12} /> 1.2 km ·
                      Sahid Nagar · 10 mins ago
                    </div>

                    <span className="badge badge-red">
                      🔴 Urgent
                    </span>
                  </div>
                </div>

                <div className="flex gap-8">
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--gray)",
                    }}
                  >
                    0 quotes
                  </span>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate(
                        "/providerdashboard/send-quote"
                      )
                    }
                  >
                    Send Quote
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Request 2 */}

          <div className="card">
            <div
              className="card-body"
              style={{ padding: "16px" }}
            >
              <div className="flex-between">
                <div className="flex gap-12">
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background:
                        "var(--amber-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    💡
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Install new ceiling fan
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--gray)",
                      }}
                    >
                      <MapPin size={12} /> 2.8 km ·
                      Nayapalli · 25 mins ago
                    </div>

                    <span className="badge badge-amber">
                      🟡 Today
                    </span>
                  </div>
                </div>

                <div className="flex gap-8">
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--gray)",
                    }}
                  >
                    2 quotes
                  </span>

                  <button
                    className="btn btn-outline"
                    onClick={() =>
                      navigate(
                        "/providerdashboard/send-quote"
                      )
                    }
                  >
                    View & Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderDashboard;