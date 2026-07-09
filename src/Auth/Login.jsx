import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    // 2. Global application logic placeholders
    const handleNavigate = (page) => {
        // Replace with your actual routing library (e.g., useNavigate from react-router-dom)
        console.log(`Navigating to: ${page}`);
    };

    const showToast = (message) => {
        // Replace with your actual notifications system (e.g., react-toastify)
        alert(message);
    };
    const { login } = useAuth();
    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({
                email: identifier,
                password,
            });

            const { token, user } = response.data;

            login(user, token);

            MySwal.fire({
                title: <p style={{ color: '#2563EB', margin: 0 }}>Welcome Back!</p>,
                text: 'Login Successful',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                background: '#ffffff',
            });

            if (user.role === "customer") {
                navigate("/Userdashboard");
            } else {
                navigate("/provider-dashboard");
            }
        } catch (error) {

            MySwal.fire({
                title: <p style={{ color: '#e74c3c', margin: 0 }}>Oops...{error.response?.data?.message}</p>,
                text: 'Please fill in all fields!',
                icon: 'error',
                confirmButtonColor: '#e74c3c'
            });

        }
    };
    const handleGoogleSignIn = () => {
        console.log('Initiating Google Sign-In...');
    };

    return (
        <div id="page-login" className="page">
            <div className="auth-page">

                {/* Left Side: Branding and Illustration */}
                <div className="auth-left">
                    <div className="auth-blob" style={{ width: '300px', height: '300px', top: '-80px', left: '-80px' }}></div>
                    <div className="auth-blob" style={{ width: '200px', height: '200px', bottom: '-50px', right: '-50px' }}></div>

                    <div className="auth-illustration">
                        <div style={{ fontSize: '72px' }}>🛠️</div>
                        <h2>Welcome Back to Seva</h2>
                        <p>India's most trusted local services marketplace</p>

                        <div className="illus-grid">
                            <div className="illus-item"><div className="illus-icon">⚡</div><div className="illus-text">Electricians</div></div>
                            <div className="illus-item"><div className="illus-icon">🚿</div><div className="illus-text">Plumbers</div></div>
                            <div className="illus-item"><div className="illus-icon">❄️</div><div className="illus-text">AC Repair</div></div>
                            <div className="illus-item"><div className="illus-icon">🔧</div><div className="illus-text">Mechanics</div></div>
                            <div className="illus-item"><div className="illus-icon">🪚</div><div className="illus-text">Carpenters</div></div>
                            <div className="illus-item"><div className="illus-icon">🏠</div><div className="illus-text">Appliances</div></div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Authentication Form */}
                <div className="auth-right">
                    <div className="auth-form-wrap">
                        <div className="logo" onClick={() => handleNavigate('home')} style={{ marginBottom: '32px', display: 'flex', justifyContent: 'left' }}>
                            Seva<span>•</span>
                        </div>

                        <h1 style={{ display: 'flex', justifyContent: 'left' }}>Sign in to your account</h1>
                        <p className="sub mt-8" style={{ display: 'flex', justifyContent: 'left' }}>
                            Don't have an account?{' '}
                            <a onClick={() => handleNavigate('signup')} style={{ color: 'var(--blue)', cursor: 'pointer', fontWeight: 600 }}>
                                Create one
                            </a>
                        </p>

                        {/* Wrapping fields in a form element ensures semantic accessibility and handles 'Enter' key submissions */}
                        <form onSubmit={handleSignIn} style={{ marginTop: '32px' }}>

                            <div className="form-group">
                                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>Email or Phone</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    autoComplete="email"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    Password{' '}
                                    <a onClick={() => handleNavigate('forgot-password')} style={{ color: 'var(--blue)', fontWeight: 500, cursor: 'pointer' }}>
                                        Forgot password?
                                    </a>
                                </label>
                                <input
                                    className="form-input"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary mt-8"
                                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
                            >
                                Sign In
                            </button>

                            <div className="divider">or continue with</div>

                            <button type="button" className="btn-google" onClick={handleGoogleSignIn}>
                                <svg width="18" height="18" viewBox="0 0 18 18">
                                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
                                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login
