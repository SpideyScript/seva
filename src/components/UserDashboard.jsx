import React from 'react'
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Zap,
  CheckCircle,
  FileText,
  Heart,
} from "lucide-react";

const UserDashboard = () => {
     const navigate = useNavigate();
  return (
    <>
      <div className="flex-between">
        <div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            Good morning, Rahul 👋
          </h2>

          <p
            className="text-gray"
            style={{
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            Here's what's happening with your requests
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/Userdashboard/post-problem")
          }
        >
          <Plus size={18} />
          Post New Problem
        </button>
      </div>

      {/* Stats Cards */}

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
            <Zap size={20} />
          </div>

          <div className="stat-value mt-12">3</div>
          <div className="stat-label">
            Active Requests
          </div>
          <div className="stat-change up">
            ↑ 1 new today
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
            <CheckCircle size={20} />
          </div>

          <div className="stat-value mt-12">12</div>
          <div className="stat-label">
            Completed Jobs
          </div>
          <div className="stat-change up">
            ↑ 3 this month
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
            <FileText size={20} />
          </div>

          <div className="stat-value mt-12">7</div>
          <div className="stat-label">
            Pending Quotes
          </div>
          <div className="stat-change up">
            ↑ 4 new quotes
          </div>
        </div>

        <div className="stat-card">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "#F3F4F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--gray)",
            }}
          >
            <Heart size={20} />
          </div>

          <div className="stat-value mt-12">5</div>
          <div className="stat-label">
            Saved Providers
          </div>
        </div>
      </div>

      {/* Recent Requests */}

      <div className="mt-32">
        <div className="flex-between">
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            Recent Requests
          </h3>

          <span
            onClick={() =>
              navigate("/Userdashboard/my-requests")
            }
            style={{
              color: "var(--blue)",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            View all →
          </span>
        </div>

        <div className="table-wrap mt-16">
          <table>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Quotes</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div
                    style={{ fontWeight: 600 }}
                  >
                    AC not cooling properly
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--gray)",
                    }}
                  >
                    Jayadev Vihar, Bhubaneswar
                  </div>
                </td>

                <td>
                  <span className="badge badge-blue">
                    AC Repair
                  </span>
                </td>

                <td
                  style={{
                    color: "var(--gray)",
                    fontSize: "13px",
                  }}
                >
                  Today, 9:30 AM
                </td>

                <td>
                  <span className="badge badge-green">
                    ● Open
                  </span>
                </td>

                <td
                  style={{
                    fontWeight: 600,
                    color: "var(--blue)",
                  }}
                >
                  4 quotes
                </td>

                <td>
                  <button
                    className="btn btn-outline"
                    style={{
                      fontSize: "12px",
                      padding: "6px 14px",
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div
                    style={{ fontWeight: 600 }}
                  >
                    Water pipe leaking under sink
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--gray)",
                    }}
                  >
                    Sahid Nagar, Bhubaneswar
                  </div>
                </td>

                <td>
                  <span className="badge badge-blue">
                    Plumbing
                  </span>
                </td>

                <td
                  style={{
                    color: "var(--gray)",
                    fontSize: "13px",
                  }}
                >
                  Yesterday
                </td>

                <td>
                  <span className="badge badge-amber">
                    ● Quoted
                  </span>
                </td>

                <td
                  style={{
                    fontWeight: 600,
                    color: "var(--blue)",
                  }}
                >
                  2 quotes
                </td>

                <td>
                  <button
                    className="btn btn-outline"
                    style={{
                      fontSize: "12px",
                      padding: "6px 14px",
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div
                    style={{ fontWeight: 600 }}
                  >
                    Kitchen chimney making noise
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--gray)",
                    }}
                  >
                    Nayapalli, Bhubaneswar
                  </div>
                </td>

                <td>
                  <span className="badge badge-blue">
                    Appliances
                  </span>
                </td>

                <td
                  style={{
                    color: "var(--gray)",
                    fontSize: "13px",
                  }}
                >
                  3 days ago
                </td>

                <td>
                  <span
                    className="badge"
                    style={{
                      background: "#F3E8FF",
                      color: "#7C3AED",
                    }}
                  >
                    ● Assigned
                  </span>
                </td>

                <td
                  style={{
                    fontWeight: 600,
                    color: "var(--blue)",
                  }}
                >
                  1 accepted
                </td>

                <td>
                  <button
                    className="btn btn-outline"
                    style={{
                      fontSize: "12px",
                      padding: "6px 14px",
                    }}
                  >
                    Track Job
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserDashboard
