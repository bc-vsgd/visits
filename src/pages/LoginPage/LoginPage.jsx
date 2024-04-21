import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage = ({ url, setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email && password) {
        const { data } = await axios.post(`${url}/visits/author/login`, {
          email,
          password,
        });
        console.log("log in, data", data);
        const userToken = data.author.token;
        setUserToken(userToken);
        Cookies.set("userToken", userToken);
      } else {
        setErrorMessage("All fields must be filled");
      }
    } catch (error) {
      console.log("Log in page, error: ", error);
      setErrorMessage("This account does not exist");
    }
  };
  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button>Log in</button>
          <div>{errorMessage}</div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
