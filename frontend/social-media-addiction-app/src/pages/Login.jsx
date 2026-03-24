import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import Signup from "./Signup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      setLoading(false);
      console.error("===Error in Login==");
      console.error("Error type:", err.name);
      console.error("Error message:", err.message);
      console.error("Full error:", err);
    }
  };
  return (
    <>
      <div className="container">
        <div className="content">
          <h2>Login into Your Daily Phone Habit Tracker </h2>
          <form className="card" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button type="submit">Submit</button>

            <div className="emailError">
              <p> Your email and password doesnt match our result </p>
              <span> Please try to sign up using your email </span>
            </div>
          </form>
        </div>
        <div className="signUp">
          <Link to="/signup">
            <button> New User ?</button>
          </Link>
        </div>
      </div>
    </>
  );
}
