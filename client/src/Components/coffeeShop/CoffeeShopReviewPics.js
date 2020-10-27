import React, { useState, useEffect } from "react";
import axios from "axios";

const CoffeeShopReviewPics = ({ shopId }) => {
  const [reviewPics, setReviewPics] = useState([]);

  useEffect(() => {
    // debugger;
    axios
      .get(`/api/coffee_shops/${shopId}/review_pics`)
      .then((res) => setReviewPics(res.data))
      .catch((err) => {
        debugger;
        alert("ERROR: CSRP Getting review pics did not work");
      });
  }, []);

  const renderReviewPics = () => {
    return reviewPics.map((rpic) => <img src={rpic.image} />);
  };

  return (
    <>
      <div>{renderReviewPics()}</div>
    </>
  );
};

export default CoffeeShopReviewPics;
