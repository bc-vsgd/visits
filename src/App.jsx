import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
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
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const getToken = () => {
      const userToken = Cookies.get("userToken");
      console.log("App, userToken: ", userToken);
      setUserToken(userToken);
    };
    getToken();
  }, []);

  return (
    <Router>
      <Header userToken={userToken} setUserToken={setUserToken} />
      <Routes>
        <Route path="/" element={<HomePage url={url} />} />
        <Route
          path="/author/signup"
          element={<SignupPage url={url} setUserToken={setUserToken} />}
        />
        <Route
          path="/author/login"
          element={<LoginPage url={url} setUserToken={setUserToken} />}
        />
        <Route path="/visit/form" element={<VisitFormPage />} />
        {/* Useful ? */}
        <Route path="/visits" element={<VisitsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
