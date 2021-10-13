import axios from "axios";
import "./app.css";
import CardsMapper from "./components/CardsMapper";
import Container from "@mui/material/Container";
import SearchbyId from "./components/SearchById";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["x-api-key"] = process.env.REACT_APP_API_KEY;
const App = () => {
  return (
    <div className="App">
      <Container maxWidth={false}>
        <h1 className="main-title">Welcome to a Simple Reviews UI</h1>
        <SearchbyId />
        <h1 className="main-title">Check out some of the Reviews</h1>
        <CardsMapper />
      </Container>
    </div>
  );
};
export default App;
