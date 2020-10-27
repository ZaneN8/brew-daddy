import React, { useState } from "react";

const CoffeeShopReviewPics = ({ shopId }) => {
  const [reviewPics, setReviewPics] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/coffee_shops/${shopId}/review_pics`)
      .then((res) => setReviewPics(res.data))
      .catch((err) => {
        alert("ERROR: Getting review pics did not work");
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
