import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { BASE_URL } from "../utils.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg("password dan konfirmasi password tidak cocok");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        {
          username,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.data) {
        navigate("/login");
      }
    } catch (error) {
      let errMsg = "registrasi gagal. coba lagi yuk.";
      if (error.response && error.response.data && error.response.data.msg) {
        errMsg = error.response.data.msg;
      }
      setMsg(errMsg);
    }
  };

  return (
    <section className="section is-fullheight">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-4-desktop">
            <div className="box">
              <h2 className="title is-4 has-text-centered">Register</h2>
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
              <form onSubmit={handleRegister}>
                <div className="field">
                  <label htmlFor="username" className="label">Username</label>
                  <div className="control">
                    <input
                      type="text"
                      id="username"
                      className="input"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="password" className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      id="password"
                      className="input"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="confirmPassword" className="label">Konfirmasi Password</label>
                  <div className="control">
                    <input
                      type="password"
                      id="confirmPassword"
                      className="input"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                        background: "#2575fc",
                        color: "white",
                        marginTop: "10px"
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>

              <p style={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#FFD700",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#FFC300"}
                  onMouseLeave={e => e.currentTarget.style.color = "#FFD700"}
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;