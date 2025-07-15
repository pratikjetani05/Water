import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import HeheHydratesPage from "./components/SubmitForm";
import "./App.css";
import NameBadges from "./components/NameBadges";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/names" element={<NameBadges />} />
        <Route path="/submit" element={<HeheHydratesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
