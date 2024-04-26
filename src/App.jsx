import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VisitTitleFormPage from "./pages/VisitTitleFormPage/VisitTitleFormPage";
import SpotsFormsPage from "./pages/SpotsFormsPage/SpotsFormsPage";
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

  // const [isUserLoading, setIsUserLoading] = useState(true);
  //
  const [userId, setUserId] = useState("");
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = Cookies.get("userToken");
        setUserToken(userToken);
      } catch (error) {}
      setIsTokenLoading(false);
    };
    fetchData();
  }, []);

  return (
    !isTokenLoading && (
      <Router>
        <Header userToken={userToken} setUserToken={setUserToken} />
        <Routes>
          <Route
            path="/"
            element={<HomePage url={url} userToken={userToken} />}
          />
          <Route
            path="/author/signup"
            element={
              <SignupPage
                url={url}
                setUserToken={setUserToken}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="/author/login"
            element={
              <LoginPage
                url={url}
                setUserToken={setUserToken}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="/visit/form"
            element={<VisitTitleFormPage url={url} userToken={userToken} />}
          />
          <Route
            path="visit/form/:id/spots"
            element={<SpotsFormsPage url={url} />}
          />
        </Routes>
        <Footer />
      </Router>
    )
  );
  // );
}

export default App;
