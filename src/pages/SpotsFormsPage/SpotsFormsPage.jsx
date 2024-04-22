import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// Components
import OneSpotForm from "../../components/OneSpotForm/OneSpotForm";

const SpotsFormsPage = ({ url }) => {
  // id: visit id
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/visit/${id}/spots`);
        console.log("Spots forms page, data: ", data);
      } catch (error) {
        console.log("Spots forms page, error: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <OneSpotForm url={url} id={id} />
    </div>
  );
};

export default SpotsFormsPage;
