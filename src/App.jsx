import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
// Pages: Create a visit
import VisitTitleFormPage from "./pages/VisitTitleFormPage/VisitTitleFormPage";
import SpotsFormsPage from "./pages/SpotsFormsPage/SpotsFormsPage";
// Pages: See a visit
import VisitPage from "./pages/VisitPage/VisitPage";
// Update a visit
import VisitUpdatePage from "./pages/VisitUpdatePage/VisitUpdatePage";
// Page: Unused
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
          {/* Home */}
          <Route
            path="/"
            element={<HomePage url={url} userToken={userToken} />}
          />
          {/* Sign up */}
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
          {/* Log in */}
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
          {/* Create visit: title form  */}
          <Route
            path="/visit/form"
            element={<VisitTitleFormPage url={url} userToken={userToken} />}
          />
          {/* Unused */}
          <Route
            path="/visit/form/:id/spots"
            element={<SpotsFormsPage url={url} />}
          />
          {/* Display a visit */}
          <Route path="/visit/:id" element={<VisitPage url={url} />} />
          {/* Update a visit */}
          <Route
            path="/visit/:id/update"
            element={<VisitUpdatePage url={url} />}
          />
        </Routes>
        <Footer />
      </Router>
    )
  );
  // );
}

export default App;
