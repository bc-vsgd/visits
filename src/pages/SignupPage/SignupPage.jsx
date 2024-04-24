import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ url, setUserToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (username && email && password && password2) {
        if (password === password2) {
          // Create author account
          try {
            const response = await axios.post(`${url}/visits/author/signup`, {
              username,
              email,
              password,
            });
            // console.log("sign up page, response: ", response);
            const userToken = response.data.author.token;
            Cookies.set("userToken", userToken);
            setUserToken(userToken);
          } catch (error) {
            console.log("Sign up page, error: ", error);
            setErrorMessage("This email already exists");
          }
        } else {
          setErrorMessage("Passwords must be identical");
        }
      } else {
        setErrorMessage("All fields must be filled");
      }
    } catch (error) {
      console.log("Sign up page, error: ", error);
    }
  };
  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setErrorMessage("");
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage("");
            }}
          />
          <input
            type="text"
            placeholder="Confirm password"
            value={password2}
            onChange={(event) => {
              setPassword2(event.target.value);
              setErrorMessage("");
            }}
          />
          <button>Sign up</button>
          <div>{errorMessage}</div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
