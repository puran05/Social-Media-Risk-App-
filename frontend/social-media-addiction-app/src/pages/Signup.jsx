import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import Login from "./Login";
import LoadingIcons from "react-loading-icons";

export default function Signup() {
  let navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // this delay is set just to check if the loading will work or not

    const payload = {
      first_name: fname,
      last_name: lname,
      username: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (response.ok) {
        setShowSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 90000));

        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setShowError(true);
      console.error("==Error in signup==");
      console.error("Error type:", err.name);
      console.error("Error message:", err.message);
      console.error("Full error:", err);
    }
  };
  if (showSuccess) {
    return (
      <div className="container">
        {" "}
        <div className="content">
          <div className="error-card">
            <h2 className="heading-error"> Registration Success</h2>{" "}
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="98"
                height="98"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#28a745"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </span>
            <p>Redirecting you to login screen</p>
            <p>Please click the button below if it doesnt redirect you.</p>
            <Link to="/">
              <button> Login </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (showError) {
    return (
      <div className="container">
        {" "}
        <div className="content">
          <div className="error-card">
            <h2 className="heading-error">Sign up Failed</h2>{" "}
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="98"
                height="98"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc3545"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </span>
            <p>
              {" "}
              If you have already signup using this credentials. Please try to
              login instead{" "}
            </p>
            <Link to="/">
              <button> Login </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="content">
          <h2>Get Started Checking Your Social Media Usage </h2>
          <form className="card" onSubmit={handleSubmit}>
            <label>
              First Name
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? <LoadingIcons.Bars /> : "Submit"}
            </button>

            <div className="emailError">
              <p> Your email and password doesnt match our result </p>
              <span> Please try to sign up using your email </span>
            </div>
          </form>
        </div>
        <div className="signUp">
          <Link to="/">
            <button> Existing User?</button>
          </Link>
        </div>
      </div>
    </>
  );
}
