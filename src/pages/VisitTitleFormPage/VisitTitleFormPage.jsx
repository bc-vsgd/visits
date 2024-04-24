import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VisitTitleFormPage = ({ url, userToken }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const visitSubmit = async (event) => {
    event.preventDefault();
    if (title) {
      try {
        const data = await axios.post(
          `${url}/visits/visit/create`,
          { title, city, city_details: details },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        // console.log("visit form page, data: ", data);
        const id = data.data.visit._id;
        navigate(`/visit/form/${id}/spots`, {
          state: { title, city, details },
        });
      } catch (error) {
        console.log("Visit form page, error: ", error);
      }
    } else {
      setErrorMessage("Title required");
    }
  };

  return !userToken ? (
    <div>Not userToken</div>
  ) : (
    <main>
      <div>
        <h1>New visit</h1>
        <div>
          <form onSubmit={visitSubmit}>
            <input
              type="text"
              placeholder="Visit title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorMessage("");
              }}
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="City details ..."
              value={details}
              onChange={(event) => {
                setDetails(event.target.value);
              }}
            />
            <button>Record visit title</button>
            <div>{errorMessage}</div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default VisitTitleFormPage;
