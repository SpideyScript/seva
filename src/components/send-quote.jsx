import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Send } from "lucide-react";
import API from "../api/axios";

const SendQuote = () => {
  const { id } = useParams(); // This is the serviceRequest ID from the URL
  const navigate = useNavigate();
  
  // State variables
  const [request, setRequest] = useState(null); // Changed to null instead of [] for clean conditional checks
  const [price, setPrice] = useState("");
  const [arrivalTime, setArrivalTime] = useState("Within 30 minutes");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch Service Request Details on Mount
  const fetchRequestDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get(`request/${id}`);
      
      if (response.data && response.data.success) {
        setRequest(response.data.request || null);
      }
    } catch (err) {
      console.error("Error loading request details:", err);
      setError("Could not load the problem profile. It may have been removed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  // Handle Form Submission to Backend API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser behavior if wrapped in a form
    
    if (!price || !arrivalTime || !message.trim()) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      
      // Sending payload according to your backend route expectations
      const response = await API.post("quotes/create", {
        serviceRequest: id,
        estimatedPrice: Number(price),
        estimatedArrivalTime: arrivalTime,
        message: message
      });

      if (response.data.success) {
        alert("Quote submitted successfully!");
        navigate("/providerdashboard/my-jobs");
      }
    } catch (err) {
      console.error("Error submitting quote:", err);
      alert(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // State feedback states rendering
  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading request details...</div>;
  if (error) return <div style={{ padding: "20px", color: "var(--red)", textAlign: "center" }}>{error}</div>;
  if (!request) return <div style={{ padding: "20px", textAlign: "center" }}>No request found.</div>;

  return (
    <>
      {/* Back Button */}
      <button
        className="btn btn-ghost"
        style={{
          padding: "8px 12px",
          marginBottom: "16px",
        }}
        onClick={() => navigate("/providerdashboard/nearby-requests")}
      >
        <ArrowLeft size={16} />
        Back to requests
      </button>

      {/* Request Summary */}
      <div
        className="card"
        style={{
          borderLeft: "4px solid var(--red)",
          borderRadius: "var(--radius-xs)",
        }}
      >
        <div
          className="card-body"
          style={{
            padding: "16px",
          }}
        >
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
                fontSize: "18px",
              }}
            >
              ⚡
            </div>

            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                {request.title}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "var(--gray)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "4px"
                }}
              >
                <MapPin size={12} /> 1.2 km · {request.address} ·{" "}
                <span className="badge badge-red">
                  {request.urgency}
                </span>
              </div>

              <div
                style={{
                  fontSize: "13px",
                  marginTop: "8px",
                }}
              >
                {request.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form */}
      <div className="card mt-20">
        <div className="card-body">
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Submit Your Quote
          </h3>

          {/* Price */}
          <div className="form-group">
            <label className="form-label">Estimated Price (₹)</label>

            <div className="flex gap-8 mt-8">
              {[200, 500, 1000, 1500].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="price-btn"
                  style={{
                    // Optional conditional look styling:
                    backgroundColor: Number(price) === amount ? "var(--primary-dark, #1e40af)" : "",
                    color: Number(price) === amount ? "#fff" : ""
                  }}
                  onClick={() => setPrice(amount)}
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            <input
              className="form-input mt-12"
              type="number"
              placeholder="Or enter custom amount"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Arrival Time */}
          <div className="form-group">
            <label className="form-label">Estimated Arrival Time</label>
            <select 
              className="form-input"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
            >
              <option value="Within 30 minutes">Within 30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="2 hours">2 hours</option>
              <option value="Half day">Half day</option>
            </select>
          </div>

          {/* Message */}
          <div className="form-group">
            <label className="form-label">Message to Customer</label>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Briefly describe what you'll do, any materials needed, and why they should hire you..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Tip */}
          <div
            style={{
              background: "var(--amber-light)",
              borderRadius: "var(--radius-xs)",
              padding: "12px",
              fontSize: "13px",
              color: "#92400E",
              marginBottom: "16px",
            }}
          >
            ⚡ <strong>Quick tip:</strong> Quotes sent within the first 5
            minutes have 3x higher acceptance rates!
          </div>

          {/* Submit Button */}
          <button
            className="btn btn-primary"
            disabled={submitting}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "14px",
              fontSize: "15px",
              opacity: submitting ? 0.7 : 1,
              cursor: submitting ? "not-allowed" : "pointer"
            }}
            onClick={handleSubmit}
          >
            <Send size={18} />
            {submitting ? "Submitting Quote..." : "Submit Quote"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SendQuote;