import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Zap, Wrench } from "lucide-react";
import API from "../api/axios";

const NearbyRequests = () => {
  const navigate = useNavigate();
  // Fixed: Initialize as an empty array to prevent mapping over null/undefined
  const [requests, setRequests] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequestDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/request/browse`);
      // console.log(response);

      if (response.data && response.data.success) {
        // Double-check your backend response: if it's a list, it might be response.data.requests (plural)
        setRequests(response.data.requests || []);
      }
    } catch (err) {
      console.error("Error loading document profile info:", err);
      setError("Could not load the problem profile. It may have been removed.");
    } finally {
      setLoading(false);
    }
  };

  // Fixed: Wrap the API call in useEffect so it runs exactly ONCE when the component mounts
  useEffect(() => {
    fetchRequestDetails();
  }, []);

  if (loading) return <div className="p-16 text-center">Loading requests...</div>;
  if (error) return <div className="p-16 text-center text-red">{error}</div>;

  return (
    <>
      {/* Header */}
      <div className="flex-between">
        <h2 style={{ fontSize: "24px", fontWeight: 800 }}>
          Nearby Requests
        </h2>
        <div className="tabs">
          <div className="tab active">🗺 Map</div>
          <div className="tab">📋 List</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-12 mt-16">
        <div className="filter-chips">
          <div className="chip active">All</div>
          <div className="chip">⚡ Electrician</div>
          <div className="chip">🔴 Urgent</div>
          <div className="chip">&lt; 2 km</div>
          <div className="chip">&lt; 5 km</div>
        </div>
      </div>

      {/* Map */}
      <div className="map-view-mock mt-16">
        <div className="map-pin" style={{ top: "40%", left: "45%" }}>
          <Zap size={16} />
        </div>
        <div className="map-pin" style={{ top: "25%", left: "62%", background: "#F59E0B" }}>
          <Wrench size={16} />
        </div>
        <div className="map-pin" style={{ top: "60%", left: "30%", background: "var(--red)" }}>
          <Zap size={16} />
        </div>
        <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "var(--white)", padding: "8px 14px", borderRadius: "var(--radius-xs)", fontSize: "13px", fontWeight: 600, boxShadow: "var(--shadow-sm)" }}>
          📍 Bhubaneswar
        </div>
        <div style={{ position: "absolute", top: "12px", left: "12px", background: "var(--white)", padding: "8px 14px", borderRadius: "var(--radius-xs)", fontSize: "13px", fontWeight: 600, boxShadow: "var(--shadow-sm)" }}>
          🔵 You are here
        </div>
      </div>

      {/* Request Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
        {requests.length === 0 ? (
          <div className="text-center p-16 text-gray">No nearby requests found.</div>
        ) : (
          requests.map((req) => (
            // Added: Unique key prop for React list rendering tracking
            <div className="card" key={req._id || req.id}>
              <div className="card-body" style={{ padding: "16px" }}>
                <div className="flex-between">
                  <div className="flex gap-12">
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--red-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                      ⚡
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>
                        {req.title}
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--gray)", marginTop: "2px" }}>
                        <MapPin size={12} /> 1.2 km · Sahid Nagar
                      </div>
                      <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                        <span className="badge badge-red">🔴 Urgent</span>
                        <span style={{ fontSize: "12px", color: "var(--gray)" }}>
                          10 mins ago · 0 quotes
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: "13px" }}
                    onClick={() => navigate(`/provider-dashboard/send-quote/${req._id || req.id}`)}
                  >
                    Send Quote
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default NearbyRequests;