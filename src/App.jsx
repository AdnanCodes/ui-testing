import { useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const getAllReviews = async () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  console.log(process.env);
  axios.defaults.headers.common["x-api-key"] = process.env.REACT_APP_API_KEY;
  const result = await axios.get("/reviews");
  console.log(result);
};

const App = () => {
  useEffect(() => {
    getAllReviews();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
export default App;
