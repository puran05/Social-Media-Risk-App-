import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Card from "./component/Card";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/card" element={<Card />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
