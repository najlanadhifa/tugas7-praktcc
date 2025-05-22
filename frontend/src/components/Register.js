import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { BASE_URL } from "../utils.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      setMsg("password tidak cocok");
      return;
    }
    
    try {
      await axios.post(
        `${BASE_URL}/register`,
        {
          email: email,
          password: password
        });
        navigate("/login");
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
        }
      }
  }

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
              <form onSubmit={Register}>
                <div className="field">
                  <label htmlFor="email" className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      id="email"
                      className="input"
                      placeholder="Masukkan email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      placeholder="Masukkan password"
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
                      placeholder="Masukkan password lagi"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
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
                        background: "#dbba34",
                        color: "black",
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
                  to="/"
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