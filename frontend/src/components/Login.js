import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Logic untuk autentikasi login
    console.log("Login with", { username, password });
    try {
      const result = await login(username, password); // simpan token ke context & cookie
      if (result) {
        navigate("/list"); // redirect setelah login
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <section className="section is-fullheight">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-4-desktop">
            <div className="box">
              <h2 className="title is-4 has-text-centered">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="field">
                  <label htmlFor="username" className="label">
                    Username
                  </label>
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
                  <label htmlFor="password" className="label">
                    Password
                  </label>
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
                  <div className="control">
                    <button type="submit" className="button is-primary is-fullwidth">
                      Login
                    </button>
                  </div>
                </div>
              </form>

              {error && <p className="has-text-danger">{error}</p>}

              <p className="has-text-centered is-size-7 mt-3">
                Belum punya akun ya?{" "}
                <Link to="/register" className="has-text-link">
                  Daftar disini
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