import { Link } from "react-router-dom";

const HomePage = ({ url }) => {
  return (
    <main>
      <p>Home Page</p>
      <div>
        <Link to="/visit/form">
          <p>Create a new visit</p>
        </Link>
        <Link to="/visits">
          <p>See the visits</p>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
