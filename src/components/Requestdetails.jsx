import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // 1. Added useParams to read ID from URL
import { ArrowLeft, MapPin, MessageCircle } from "lucide-react";
import API from "../api/axios"; // Adjust path to map your Axios configuration instance

const RequestDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extracts the unique Mongo _id string directly from the routing track

  // State handles for holding live data and fetching status
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        setLoading(true);
        // Calls the router.get("/:id") backend endpoint we configured earlier
        const response = await API.get(`/request/${id}`);
        if (response.data && response.data.success) {
          setRequest(response.data.request);
        }
      } catch (err) {
        console.error("Error loading document profile info:", err);
        setError("Could not load the problem profile. It may have been removed.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRequestDetails();
    }
  }, [id]);

  // Status mapping to determine colors for badges
  const getBadgeClass = (status) => {
    switch (status) {
      case "Open": return "badge-green";
      case "Quoted": return "badge-amber";
      case "Booked": return "badge-blue";
      default: return "badge-gray";
    }
  };

  if (loading) return <div className="mt-24 text-center text-gray">Fetching service entry specifics...</div>;
  if (error || !request) return <div className="mt-24 text-center" style={{ color: "var(--red)" }}>{error || "Profile not found."}</div>;

  return (
    <>
      <div className="flex gap-8 mb-16" style={{ marginBottom: "16px", alignItems: "center" }}>
        <button
          className="btn btn-ghost"
          style={{ padding: "8px 12px" }}
          onClick={() => navigate("/Userdashboard/my-requests")}
        >
          <ArrowLeft size={18} />
        </button>

        <h2 style={{ fontSize: "22px", fontWeight: 800 }}>
          {request.title}
        </h2>

        <span className={`badge ${getBadgeClass(request.status)}`}>
          ● {request.status}
        </span>
      </div>

      <div className="grid-2" style={{ gap: "24px", textAlign: "left" }}>
        {/* LEFT SIDE: PROBLEM INFORMATION PROFILE */}
        <div>
          <div className="card">
            <div className="card-body">
              <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "16px" }}>
                Problem Details
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <div className="detail-label">Category</div>
                  <div style={{ marginTop: "4px" }}>
                    <span className="badge badge-blue">{request.category}</span>
                  </div>
                </div>

                <div>
                  <div className="detail-label">Description</div>
                  <div style={{ marginTop: "4px", fontSize: "14px", lineHeight: "1.5" }}>
                    {request.description}
                  </div>
                </div>

                <div>
                  <div className="detail-label">Location</div>
                  <div style={{ marginTop: "4px", fontSize: "14px" }}>
                    <MapPin size={14} color="var(--blue)" />{" "}
                    {request.address}
                  </div>
                </div>

                <div>
                  <div className="detail-label">Urgency</div>
                  <div className="badge badge-amber mt-8">
                    {request.urgency === "Urgent" ? "🔴 Urgent" : request.urgency === "Today" ? "🟡 Today" : "🟢 Flexible"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-16">
            <div className="card-body">
              <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "12px" }}>
                Location Map
              </div>
              <div className="map-placeholder">
                <MapPin size={18} />
                &nbsp; {request.city || "Bhubaneswar"}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: TRADESMEN QUOTE PORTFOLIO */}
        <div>
          <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "16px" }}>
            Received Quotes{" "}
            <span className="badge badge-blue" style={{ fontSize: "11px" }}>
              {/* If you add a real quotes subdocument array inside your schema later, replace this with quotes.length */}
              {request.status === "Open" ? "0" : "2"}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {request.status === "Open" ? (
              <div className="card p-24 text-center text-gray" style={{ fontSize: "14px" }}>
                ⌛ Live broadcast alert active. Your dashboard will refresh with bid listings as local technicians review your summary parameters.
              </div>
            ) : (
              <>
                {/* Mock Quote Item 1 (Remains safely visible only if status is not completely empty/Open) */}
                <div className="card" style={{ border: "2px solid var(--blue)" }}>
                  <div className="card-body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div className="flex gap-12">
                        <div className="avatar-initials" style={{ width: "48px", height: "48px", background: "var(--blue-light)", color: "var(--blue)" }}>
                          AV
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>Anil Verma</div>
                          <div style={{ fontSize: "13px", color: "var(--gray)" }}>⭐ 4.9 · 203 jobs</div>
                          <div style={{ fontSize: "12px", color: "var(--green)", marginTop: "2px" }}>✓ Verified Specialist</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--blue)" }}>
                          ₹{request.budget || "650"}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--gray)" }}>ETA: 45 mins</div>
                      </div>
                    </div>
                    <div style={{ background: "var(--gray-lighter)", borderRadius: "8px", padding: "12px", marginTop: "12px", fontSize: "13px" }}>
                      Will check system pressure level, clean internal filters, and inspect compressor operations carefully.
                    </div>
                    <div className="flex gap-8 mt-16">
                      <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>✓ Accept Quote</button>
                      <button className="btn btn-outline" style={{ fontSize: "13px", padding: "8px 14px" }}><MessageCircle size={16} /> Message</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDetails;