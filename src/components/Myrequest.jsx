import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin, Clock } from "lucide-react";
import API from "../api/axios"; // Adjust path to map your Axios configuration instance

const MyRequests = () => {
  const navigate = useNavigate();
  
  // State elements to handle asynchronous database synchronization
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Fetch data immediately when the dashboard element mounts
  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        setLoading(true);
        const response = await API.get("/request/my-requests");
        if (response.data && response.data.requests) {
          setRequests(response.data.requests);
        }
      } catch (err) {
        console.error("Error pulling customer job history:", err);
        setError("Could not load your service history requests. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  // Visual helper mapping target category classifications to specific UI emojis
  const getIconForCategory = (category) => {
    switch (category) {
      case "AC Repair": return "❄️";
      case "Plumbing": return "🚿";
      case "Electrician": return "⚡";
      case "Carpentry": return "🔨";
      case "Mechanic": return "🚗";
      case "Appliance Repair": return "📺";
      default: return "🛠️";
    }
  };

  // Maps backend status enums to corresponding UI Badge style configurations
  const getBadgeStyle = (status) => {
    switch (status) {
      case "Open": return { className: "badge badge-green" };
      case "Quoted": return { className: "badge badge-amber" };
      case "Booked": return { className: "badge", style: { background: "#F3E8FF", color: "#7C3AED" } };
      case "Completed": return { className: "badge badge-green", opacity: 0.7, bg: "var(--green-light)" };
      default: return { className: "badge" };
    }
  };

  // Clean date formatter for database createdAt values
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  // Filter and tally handling calculations
  const filterCounts = {
    All: requests.length,
    Open: requests.filter(r => r.status === "Open").length,
    Quoted: requests.filter(r => r.status === "Quoted").length,
    Booked: requests.filter(r => r.status === "Booked").length,
    Completed: requests.filter(r => r.status === "Completed").length,
  };

  const filteredRequests = activeFilter === "All" 
    ? requests 
    : requests.filter(r => r.status === activeFilter);

  if (loading) return <div className="mt-24 text-center text-gray">Loading request portfolio details...</div>;
  if (error) return <div className="mt-24 text-center" style={{ color: "var(--red)" }}>{error}</div>;

  return (
    <>
      <div className="flex-between">
        <h2 style={{ fontSize: "24px", fontWeight: 800 }}>My Requests</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/Userdashboard/post-problem")}
        >
          <Plus size={18} /> New Request
        </button>
      </div>

      <div className="flex gap-12 mt-24">
        <input
          className="form-input"
          placeholder="🔍 Search requests..."
          style={{ maxWidth: "300px" }}
        />

        <div className="filter-chips">
          {Object.keys(filterCounts).map((key) => (
            <div 
              key={key} 
              className={`chip ${activeFilter === key ? "active" : ""}`}
              onClick={() => setActiveFilter(key)}
            >
              {key} ({filterCounts[key]})
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
        {filteredRequests.length === 0 ? (
          <div className="card p-24 text-center text-gray">
            No service profiles currently matching this status layout.
          </div>
        ) : (
          filteredRequests.map((request) => {
            const visualProps = getBadgeStyle(request.status);
            return (
              <div
                key={request._id}
                className="card"
                style={{ opacity: visualProps.opacity || 1 }}
              >
                <div className="card-body" style={{ padding: "20px" }}>
                  <div className="flex-between">
                    <div className="flex gap-12">
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "10px",
                          background: visualProps.bg || "var(--blue-light)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                        }}
                      >
                        {getIconForCategory(request.category)}
                      </div>

                      <div>
                        <div style={{ fontWeight: 700, fontSize: "16px" }}>
                          {request.title}
                        </div>

                        <div
                          style={{
                            fontSize: "13px",
                            color: "var(--gray)",
                            marginTop: "2px",
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <MapPin size={14} />
                          {request.address || request.city}

                          <Clock size={14} />
                          {formatTime(request.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-12 align-center">
                      <span 
                        className={visualProps.className} 
                        style={visualProps.style}
                      >
                        ● {request.status}
                      </span>

                      <span
                        style={{
                          fontSize: "13px",
                          color: request.status === "Completed" ? "var(--gray)" : "var(--blue)",
                          fontWeight: 600,
                          marginRight: "8px"
                        }}
                      >
                        {request.status === "Completed" && request.budget ? `₹${request.budget}` : ""}
                        {request.status === "Open" ? "Awaiting Quotes" : ""}
                        {request.status === "Quoted" ? "Quotes Ready" : ""}
                      </span>

                      <button
                        className={`btn ${request.status === "Open" || request.status === "Quoted" ? "btn-primary" : "btn-outline"}`}
                        style={{ fontSize: "13px", padding: "8px 16px" }}
                        onClick={() => navigate(`/Userdashboard/request-details/${request._id}`)}
                      >
                        {request.status === "Completed" ? "Leave Review" : "View Details"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default MyRequests;   