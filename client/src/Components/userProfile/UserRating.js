import React, { useState, useEffect } from "react";
import axios from "axios";

const UserRating = ({ userId }) => {
  const [ratingsData, setRatingsData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}/stats`)
      .then((res) => setRatingsData(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderAllRating = () => {
    return (
      <div>
        <p>
          Average Rating:{" "}
          {ratingsData.total_rating
            ? ratingsData.total_rating.toFixed(1)
            : "NA"}
        </p>
        <p>Total Ratings: {ratingsData && ratingsData.total_count}</p>
      </div>
    );
  };

  return <>{ratingsData && renderAllRating()}</>;
};

export default UserRating;
