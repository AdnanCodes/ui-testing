import { useEffect, useState } from "react";
import axios from "axios";
import SingleCard from "./SingleCard";
import "./cards-mapper.css";

const CardsMapper = () => {
  const [validResponse, setValidResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getAllReviews = async () => {
    setLoading(true);
    try {
      const result = await axios.get("/reviews");

      if (result.status === 200) {
        setData(result.data);
        setValidResponse(true);
      }
      setLoading(false);
    } catch {
      setValidResponse(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllReviews();
  }, []);
  return (
    <div className="cards-mapper">
      {!loading ? (
        validResponse ? (
          data.map(({ rating, publish_date, id, body, author }) => {
            return (
              <SingleCard
                key={id}
                rating={rating}
                publishDate={publish_date}
                body={body}
                author={author}
              />
            );
          })
        ) : (
          <h3>Unable to retrieve Reviews</h3>
        )
      ) : (
        <h3>Loading Reviews</h3>
      )}
    </div>
  );
};

export default CardsMapper;
