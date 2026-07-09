import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createProfile } from "../api/providerApi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ProviderProfileSetup() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const progress = useMemo(() => {
    const fields = [category, experience, city, description];
    const filled = fields.filter(
      (field) => field && field.toString().trim() !== ""
    ).length;

    return Math.round((filled / fields.length) * 100);
  }, [category, experience, city, description]);

  const previewPhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setPhoto(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    if (
      !category ||
      !experience ||
      !city ||
      !description
    ) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);

      const profileData = {
        serviceCategory: category,
        experience,
        city,
        description,
      };

      const response = await createProfile(profileData);

      console.log(response.data);

      setSaved(true);

      toast.success(
        "Profile created successfully!"
      );


      setTimeout(() => {
        navigate("/provider/dashboard");
      }, 1500);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to create profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sp-root">
      {/* LEFT SIDE */}
      <div className="sp-left">
        <div
          className="blob"
          style={{ width: 220, height: 220, top: -60, left: -60 }}
        />
        <div
          className="blob"
          style={{ width: 160, height: 160, bottom: -40, right: -30 }}
        />
        <div
          className="blob"
          style={{ width: 90, height: 90, top: "45%", left: "55%" }}
        />

        <div className="sp-left-content">
          <div className="sp-hero-icon">🔧</div>

          <h2>Build Your Professional Profile</h2>

          <p>
            Help customers discover your skills and services. A great profile
            means more jobs.
          </p>

          <div className="sp-feature">
            <div className="sp-feat-icon">🎯</div>
            <div>
              <div className="sp-feat-title">Get more local jobs</div>
              <div className="sp-feat-sub">
                Reach customers within 5 km
              </div>
            </div>
          </div>

          <div className="sp-feature">
            <div className="sp-feat-icon">🛡️</div>
            <div>
              <div className="sp-feat-title">Build trust with customers</div>
              <div className="sp-feat-sub">
                Verified badge on your profile
              </div>
            </div>
          </div>

          <div className="sp-feature">
            <div className="sp-feat-icon">📈</div>
            <div>
              <div className="sp-feat-title">Grow your business</div>
              <div className="sp-feat-sub">
                Average ₹28,000/month on Seva
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="sp-right">
        <div className="sp-form-wrap">
          <div className="sp-logo">
            Seva<span>•</span>
          </div>

          <div className="sp-progress">
            <span className="sp-prog-label">
              Profile setup · Step 1 of 1
            </span>

            <div className="sp-prog-track">
              <div
                className="sp-prog-fill"
                style={{
                  width: `${saved ? 100 : progress}%`,
                }}
              />
            </div>
          </div>

          <div className="sp-title">Provider profile setup</div>

          <div className="sp-sub">
            Complete your profile to start receiving service requests.
          </div>

          {/* PHOTO */}
          <div className="sp-avatar-row">
            <div
              className="sp-avatar-circle"
              onClick={() => fileInputRef.current?.click()}
            >
              {photo ? (
                <img
                  src={photo}
                  alt="Profile preview"
                  className="sp-avatar-img"
                />
              ) : (
                <div className="sp-avatar-placeholder">
                  <i className="ti ti-user" />
                  <span>Photo</span>
                </div>
              )}
            </div>

            <div className="sp-upload-info">
              <div className="sp-upload-title">Profile photo</div>

              <div className="sp-upload-sub">
                JPG or PNG · Max 5 MB
              </div>

              <button
                type="button"
                className="sp-upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="ti ti-upload" />
                Choose photo
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={previewPhoto}
            />
          </div>

          {/* CATEGORY */}
          <div className="sp-field">
            <label className="sp-label">Service category</label>

            <select
              className="sp-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select your trade</option>
              <option>Electrician</option>
              <option>Plumber</option>
              <option>Mechanic</option>
              <option>AC Repair</option>
              <option>Carpenter</option>
              <option>Painter</option>
              <option>Appliance Repair</option>
              <option>Computer Repair</option>
            </select>
          </div>

          {/* EXPERIENCE + CITY */}
          <div className="sp-row">
            <div className="sp-field">
              <label className="sp-label">Years of experience</label>

              <input
                className="sp-input"
                type="number"
                min="0"
                max="50"
                placeholder="e.g. 5"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="sp-field">
              <label className="sp-label">City</label>

              <input
                className="sp-input"
                placeholder="e.g. Bhubaneswar"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="sp-field">
            <label className="sp-label">Service description</label>

            <textarea
              className="sp-textarea"
              placeholder="Describe your experience, specialties, and services you offer..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            className="sp-save-btn"
            disabled={loading}
            onClick={saveProfile}
          >
            {loading ? (
              <div className="sp-spinner" />
            ) : saved ? (
              <span>✓ Saved!</span>
            ) : (
              <>
                <i className="ti ti-check" />
                Save profile
              </>
            )}
          </button>
        </div>
      </div>

      {/* TOAST */}
      <div className={`sp-toast ${showToast ? "visible" : ""}`}>
        <i className="ti ti-circle-check" />
        Profile saved — you're ready to receive jobs!
      </div>
    </div>
  );
}