import { useState } from "react";
import "./App.css";

function App() {
  const [usageHours, setUsageHours] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [platform, setPlatform] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      Avg_Daily_Usage_Hours: Number(usageHours),
      Sleep_Hours_Per_Night: Number(sleepHours),
      Most_Used_Platform: platform,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      setResult(data.Addiction_Level);
    } catch (err) {
      console.error("=== ERROR CAUGHT ===");
      console.error("Error type:", err.name);
      console.error("Error message:", err.message);
      console.error("Full error:", err);
      setResult("Error");
    }

    setLoading(false);
    console.log("=== DONE ===");
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Social Media Addiction Predictor</h1>
        <p className="subtitle">
          Enter your daily habits to see your predicted addiction level
        </p>

        <form className="card" onSubmit={handleSubmit}>
          <label>
            Average Daily Usage (hours)
            <input
              type="number"
              step="0.1"
              min="0"
              max="24"
              value={usageHours}
              onChange={(e) => setUsageHours(e.target.value)}
              required
            />
          </label>

          <label>
            Sleep Hours Per Night
            <input
              type="number"
              step="0.1"
              min="0"
              max="24"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              required
            />
          </label>

          <label>
            Most Used Platform
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              required
            >
              <option value="">Select platform</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="Twitter">Twitter</option>
              <option value="Snapchat">Snapchat</option>
            </select>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict Addiction Level"}
          </button>
        </form>

        {result && (
          <div className="result">
            <h2>Prediction</h2>
            <span className={`badge ${result.toLowerCase()}`}>{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
