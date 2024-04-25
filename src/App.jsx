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
  //
  const [userId, setUserId] = useState("");
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const [isUserIdLoading, setIsUserIdLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = Cookies.get("userToken");
        setUserToken(userToken);
      } catch (error) {
        // console.log("App, useEffect 1, error: ", error);
      }
      setIsTokenLoading(false);
    };
    fetchData();
    // console.log("App, user token: ", userToken);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isTokenLoading && userToken) {
          const { data } = await axios.get(`${url}/visits/author/author`, {
            headers: { authorization: userToken },
          });
          setUserId(data.data[0]._id);
        } else {
          setUserId("");
        }
      } catch (error) {
        // console.log("App, useEffect 2, error: ", error);
      }
      setIsUserIdLoading(false);
    };
    fetchData();
  }, [isTokenLoading, userToken]);

  return (
    !isTokenLoading &&
    !isUserIdLoading && (
      <Router>
        <Header userToken={userToken} setUserToken={setUserToken} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage url={url} userToken={userToken} userId={userId} />
            }
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
