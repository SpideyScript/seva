import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, MapPin, Send } from "lucide-react";
// Import your API utility function
import { createRequest } from "../api/requestApi";

const PostProblem = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    console.log("Selected files:", files);


    setFormData(prev => ({ ...prev, images: files }));
  };
  const navigate = useNavigate();

  // 1. Set up the component state to manage form fields
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    address: "",
    city: "Default City", // Map target city if extracted from location search
    urgency: "Flexible", // Default active value matching UI
    preferredDate: new Date().toISOString().split("T")[0], // Fallback date string
    budget: 0, // Fallback initial budget
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2. Generic input handler to sync form entries with state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Dedicated handler to manage the button-group selection for urgency
  const handleUrgencyChange = (urgencyValue) => {
    setFormData((prev) => ({
      ...prev,
      urgency: urgencyValue,
    }));
  };

  // 4. Submit logic interacting with the API service
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple client-side validation check
    if (!formData.title || !formData.category || !formData.description || !formData.address) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await createRequest(formData);

      if (response.data?.success || response.status === 201) {
        // Redirect directly upon a successful database entry
        navigate("/Userdashboard/my-requests");
      }
    } catch (err) {
      console.error("Failed to post problem:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-6 p-0">
      <h2
        style={{
          fontSize: "30px",
          fontWeight: 700,
          color: "var(--gray-dark)",
          textAlign: "left",
        }}
      >
        Post a Problem
      </h2>

      <p className="text-gray mt-8" style={{ fontSize: "14px", textAlign: "left" }}>
        Describe your issue and get quotes from verified professionals
      </p>

      {/* Render error alerts if server validation catches anything */}
      {error && (
        <div style={{ color: "var(--red)", marginTop: "12px", fontWeight: 600 }}>
          {error}
        </div>
      )}

      <div className="card mt-24 "style={{width:"700px"}}>
        <div className="card-body " >
          {/* Problem Title */}
          <div className="form-group">
            <label className="form-label">
              Problem Title <span style={{ color: "var(--red)" }}>*</span>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-input"
              placeholder="e.g. AC not cooling, Water pipe leaking..."
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">
              Category <span style={{ color: "var(--red)" }}>*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select a category</option>
              <option value="AC Repair">AC Repair</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Appliance Repair">Appliance Repair</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">
              Describe the Problem <span style={{ color: "var(--red)" }}>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Tell us more: when did it start, what you've already tried, any specific requirements..."
            />
          </div>

          {/* Upload */}
          {/* Upload */}
          <div className="form-group">
            <label className="form-label">
              Upload Photos <span style={{ color: "var(--gray)" }}>(optional)</span>
            </label>

            {/* HIDDEN FILE INPUT */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple // Allows uploading more than one photo
              accept="image/png, image/jpeg" // Matches your JPG, PNG description
              style={{ display: "none" }} // Completely hides it from sight
            />

            <div className="upload-area">
              <UploadCloud size={40} />
              <div style={{ fontWeight: 600, marginTop: "8px" }}>
                Drag & drop photos here
              </div>
              <div style={{ fontSize: "13px", color: "var(--gray)", marginTop: "4px" }}>
                or click to browse (JPG, PNG up to 10MB)
              </div>

              {/* Trigger the hidden input via our ref onClick */}
              <button
                type="button"
                className="btn btn-outline mt-16"
                style={{ fontSize: "13px" }}
                onClick={handleBrowseClick}
              >
                Browse Files
              </button>

              {/* Optional: Show feedback of chosen file names to the user */}
              {selectedFiles.length > 0 && (
                <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--gray-dark)" }}>
                  <strong>Selected:</strong> {selectedFiles.map(f => f.name).join(", ")}
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label">
              Location <span style={{ color: "var(--red)" }}>*</span>
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Search your address or locality"
            />
            <div className="map-placeholder mt-12">
              <MapPin size={18} style={{ marginRight: "8px" }} />
              Click to pin your location on map
            </div>
          </div>

          {/* Urgency */}
          <div className="form-group">
            <label className="form-label">Urgency</label>
            <div className="flex gap-8 mt-8">
              <button
                type="button"
                className={`urgency-btn ${formData.urgency === "Flexible" ? "active" : ""}`}
                onClick={() => handleUrgencyChange("Flexible")}
              >
                🟢 Flexible
              </button>
              <button
                type="button"
                className={`urgency-btn ${formData.urgency === "Today" ? "active" : ""}`}
                onClick={() => handleUrgencyChange("Today")}
              >
                🟡 Today
              </button>
              <button
                type="button"
                className={`urgency-btn ${formData.urgency === "Urgent" ? "active" : ""}`}
                onClick={() => handleUrgencyChange("Urgent")}
              >
                🔴 Urgent (within 2h)
              </button>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              borderTop: "1px solid var(--gray-light)",
              paddingTop: "20px",
              marginTop: "8px",
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              className="btn btn-primary"
              style={{
                padding: "14px 32px",
                fontSize: "15px",
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              <Send size={16} style={{ marginRight: "8px" }} />
              {loading ? "Submitting..." : "Submit Request"}
            </button>

            {/* <button type="button" className="btn btn-ghost" disabled={loading}>
              Save Draft
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProblem;
