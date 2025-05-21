import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${BASE_URL}/login`, { email, password });

            setAlert({
                show: true,
                type: 'success',
                message: 'login berhasil!'
            });

            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            const message = err.response?.data?.msg || 'login gagal.. periksa kembali data anda.';
            setAlert({
                show: true,
                type: 'error',
                message
            });

            setTimeout(() => {
                setAlert({ show: false, type: '', message: '' });
            }, 3000);
        }
    };

    // Style
    const layoutStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f4f6fa'
    };

    const boxStyle = {
        width: '400px',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)'
    };

    const headingStyle = {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center'
    };

    const fieldStyle = {
        marginBottom: '15px',
        textAlign: 'left'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '6px',
        fontWeight: 'bold',
        color: '#555'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '14px',
        boxSizing: 'border-box'
    };

    const btnPrimary = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#3498db',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px'
    };

    const btnSecondary = {
        ...btnPrimary,
        backgroundColor: '#f1c40f',
        color: '#333'
    };

    const alertStyle = {
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '15px',
        fontWeight: 'bold',
        fontSize: '14px',
        textAlign: 'center',
        color: '#fff'
    };

    const successStyle = {
        ...alertStyle,
        backgroundColor: '#2ecc71'
    };

    const errorStyle = {
        ...alertStyle,
        backgroundColor: '#e74c3c'
    };

    return (
        <div style={layoutStyle}>
            <div style={boxStyle}>
                <h2 style={headingStyle}>Masuk ke My Notes</h2>

                {alert.show && (
                    <div style={alert.type === 'success' ? successStyle : errorStyle}>
                        {alert.message}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Email</label>
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="davidimhut@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>Kata Sandi</label>
                        <input
                            type="password"
                            style={inputStyle}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" style={btnPrimary}>
                      Login
                    </button>

                    <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px', color: '#555', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                      <span>Belum punya akun?</span>
                      <Link to="/register" style={{ textDecoration: 'none' }}>
                      <button type="button" style={btnSecondary}>
                        Daftar
                      </button>
                      </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;