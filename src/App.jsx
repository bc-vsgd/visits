import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import VisitFormPage from "./pages/VisitFormPage/VisitFormPage";
import VisitsPage from "./pages/VisitsPage/VisitsPage";
// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
//
const url = "http://localhost:3000";
// Style
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage url={url} />} />
        <Route path="/visit/form" element={<VisitFormPage />} />
        <Route path="/visits" element={<VisitsPage />} />
      </Routes>
      <Footer />
    </Router>
  );

  // <HomePage />;
}

export default App;
