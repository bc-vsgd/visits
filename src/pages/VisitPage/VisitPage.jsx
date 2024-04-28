import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
// Components
import Loader from "../../components/Loader/Loader";
import OneSpotModal from "../../components/OneSpotModal/OneSpotModal";

const VisitPage = ({ url }) => {
  const location = useLocation();
  const { id } = useParams();
  const [userToken, setUserToken] = useState("");
  const [visitData, setVisitData] = useState(null);
  const [spotsData, setSpotsData] = useState(null);
  const [isVisitLoading, setIsVisitLoading] = useState(true);
  const [isSpotsLoading, setIsSpotLoading] = useState(true);
  // Spot modal
  const [isSpotModalVisible, setIsSpotModalVisible] = useState(false);
  const [spotToDisplay, setSpotToDisplay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visits/visit/${id}`);
        // console.log("visit page, data: ", data.data[0].author.token);
        // data.data[0]: found visit
        setVisitData(data.data[0]);
        setUserToken(data.data[0].author.token);
      } catch (error) {
        console.log("Visit page, visit data error: ", error);
      }
      setIsVisitLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visit/${id}/spots`);
        // console.log("visit page, spots: ", data.data);
        //   data.data: array of spots
        setSpotsData(data.data);
      } catch (error) {
        console.log("visit page, spots error: ", error);
        // alert("No spot for this visit ...");
      }
      setIsSpotLoading(false);
    };
    fetchData();
  }, []);

  return isVisitLoading || isSpotsLoading ? (
    <Loader />
  ) : (
    <main className="visit-page">
      <div>{visitData.title}</div>
      <div>
        {spotsData &&
          spotsData.map((spot, index) => {
            return (
              <div key={index}>
                <div
                  onClick={() => {
                    setIsSpotModalVisible(!isSpotModalVisible);
                    // console.log("visit page, clic on spot div, spot: ", spot);
                    setSpotToDisplay(spot);
                  }}
                >
                  <div>{spot.title}</div>
                  {spot.spot_image && (
                    <img src={spot.spot_image.secure_url} alt={spot.title} />
                  )}
                </div>
                {isSpotModalVisible && (
                  <OneSpotModal
                    spot={spotToDisplay}
                    setIsSpotModalVisible={setIsSpotModalVisible}
                  />
                )}
              </div>
            );
          })}
      </div>
      {location.state && location.state.userToken === userToken && (
        <div>
          <Link
            to={`/visit/${id}/update`}
            state={{ visitData: visitData, spotsData: spotsData }}
          >
            Update this visit
          </Link>
        </div>
      )}
      <div>
        <Link to="/visit/form">Create a visit</Link>
      </div>
    </main>
  );
};

export default VisitPage;
