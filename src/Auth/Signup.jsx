import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { registerUser } from "../api/authApi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
  try {
    setLoading(true);

    await registerUser({
      ...formData,
      role: selectedRole,
    });

    toast.success(
      "🎉 Account created successfully!"
    );

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Signup failed"
    );
  } finally {
    setLoading(false);
  }
};
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("customer");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }

  const showToast = (message) => {
    console.log(message);
  };

  const features = [
    {
      icon: "✅",
      title: "Verified Professionals",
      subtitle: "Background-checked & reviewed",
    },
    {
      icon: "⚡",
      title: "Fast Response",
      subtitle: "Average quote in 15 minutes",
    },
    {
      icon: "🛡️",
      title: "100% Secure Payments",
      subtitle: "Pay only when satisfied",
    },
  ];

  const roles = [
    {
      id: "customer",
      icon: "👤",
      title: "Customer",
      description: "I need services",
    },
    {
      id: "provider",
      icon: "🔧",
      title: "Service Provider",
      description: "I provide services",
    },
  ];

  return (
    <div id="page-signup" className="page">
      <div className="auth-page">
        {/* Left Side */}
        <div className="auth-left">
          <div
            className="auth-blob"
            style={{
              width: "300px",
              height: "300px",
              top: "-80px",
              left: "-80px",
            }}
          />

          <div className="auth-illustration">
            <div style={{ fontSize: "72px" }}>🌟</div>

            <h2>Join 10L+ Indians</h2>

            <p>
              Customers finding help faster. Providers earning more.
            </p>

            <div
              style={{
                marginTop: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {features.map((feature) => (
                <div
                  key={feature.title}
                  style={{
                    background: "rgba(255,255,255,.15)",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>
                    {feature.icon}
                  </span>

                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 600 }}>
                      {feature.title}
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        opacity: 0.8,
                      }}
                    >
                      {feature.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div
          className="auth-right"
          style={{ overflowY: "auto" }}
        >
          <div className="auth-form-wrap">
            <div
              className="logo"
              onClick={() => navigate("/")}
              style={{
                marginBottom: "24px",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              Seva<span>•</span>
            </div>

            <h1 style={{ textAlign: "left" }}>Create your account</h1>

            <p className="sub mt-8" style={{ textAlign: "left" }}>
              Already have one?{" "}
              <span
                onClick={handleLogin}
                style={{
                  color: "var(--blue)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Sign in
              </span>
            </p>

            {/* Role Selection */}
            <div
              className="grid-2 mt-24"
              style={{ gap: "12px" }}
            >
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`role-card ${selectedRole === role.id
                    ? "selected"
                    : ""
                    }`}
                  onClick={() =>
                    setSelectedRole(role.id)
                  }
                >
                  <div className="role-icon">
                    {role.icon}
                  </div>

                  <h3>{role.title}</h3>

                  <p>{role.description}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ marginTop: "24px" }}>
              <div className="form-group">
                <label className="form-label" style={{ textAlign: 'left' }}>
                  Full Name
                </label>
                <input
                  name="name"
                  className="form-input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ textAlign: 'left' }}>
                  Phone Number
                </label>
                <input
                  name="phone"
                  className="form-input"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ textAlign: 'left' }}>
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ textAlign: 'left' }}>
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-input"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btn-primary mt-8"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "14px",
                  fontSize: "15px",
                }}
                onClick={handleSignup}
                 disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <div className="divider">or</div>

              <button className="btn-google">
                {/* Google SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                    fill="#EA4335"
                  />
                </svg>

                Sign up with Google
              </button>

              <p
                style={{
                  fontSize: "12px",
                  color: "var(--gray)",
                  textAlign: "center",
                  marginTop: "16px",
                }}
              >
                By signing up you agree to our{" "}
                <a
                  href="#"
                  style={{ color: "var(--blue)" }}
                >
                  Terms
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  style={{ color: "var(--blue)" }}
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Signup
