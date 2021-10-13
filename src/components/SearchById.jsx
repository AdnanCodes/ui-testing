import SingleCard from "./SingleCard";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./search-by-id.css";
import { useState } from "react";

const SearchbyId = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const GetReviewById = async (id) => {
    setLoading(true);
    try {
      const result = await axios.get(`/reviews/${id}`);
      if (result.status === 200) {
        setData(result.data);
        setLoading(false);
        return;
      }
    } catch {
      setData({
        body: "No Review Found with that ID Or No Response from Server",
      });
      setLoading(false);
      return;
    }
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => GetReviewById(data.id);

  return (
    <div className="search-box">
      <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          role="searchbox"
          placeholder="Enter a Review ID (Numbers Only)"
          {...register("id", {})}
        />
        <input type="submit" value="Search" />
      </form>
      {!loading ? (
        <SingleCard
          rating={data.rating}
          publishDate={data.publish_date}
          body={data.body}
          author={data.author}
        />
      ) : (
        <SingleCard body="Loading Review" />
      )}
    </div>
  );
};

export default SearchbyId;
