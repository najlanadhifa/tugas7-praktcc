import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/login`, { email, password });

      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.msg || 'Login gagal. Periksa kembali data anda.';
      setMsg(message);
    }
  };

  return (
    <section className="section is-fullheight">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-4-desktop">
            <div className="box">
              <h2 className="title is-4 has-text-centered">Login</h2>

              {msg && (
                <p style={{
                  color: "#e74c3c",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  textAlign: "center"
                }}>
                  {msg}
                </p>
              )}

              <form onSubmit={handleLogin}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Kata Sandi</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-primary is-fullwidth"
                      style={{
                        padding: "12px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        fontSize: "16px",
                        background: "#3498db",
                        color: "white",
                        marginTop: "10px"
                      }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>

              <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#f39c12",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  Daftar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
