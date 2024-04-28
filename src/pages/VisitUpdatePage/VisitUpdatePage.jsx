import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// Components
import OneSpotForm from "../../components/OneSpotForm/OneSpotForm";

const VisitUpdatePage = ({ url }) => {
  const location = useLocation();
  const { id } = useParams();

  // States
  const [visitData, setVisitData] = useState(location.state.visitData);
  const [spotsData, setSpotsData] = useState(location.state.spotsData);
  //
  const [title, setTitle] = useState(visitData.title);
  const [city, setCity] = useState(visitData.city);
  const [details, setDetails] = useState(visitData.city_details);
  const [errorMessage, setErrorMessage] = useState("");

  const visitSubmit = (event) => {
    event.preventDefault();
    console.log("visit submit");
  };

  return (
    <main>
      <div>
        <h1>Update visit</h1>
        {/* Title form component ? */}
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
            {/* <button>Add a spot</button> */}
            <div>{errorMessage}</div>
          </form>
        </div>
        {/* Title form component ? */}
        {/*  */}
        {/* Spots */}
        {spotsData &&
          spotsData.map((spot, index) => {
            return <OneSpotForm key={index} spot={spot} />;
          })}
      </div>
    </main>
  );
};

export default VisitUpdatePage;
