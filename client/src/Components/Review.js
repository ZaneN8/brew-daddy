import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import axios from "axios";

const Review = () => {
  const [review, setReview] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const addReview = (review) => {
    console.log(review);
  };

  //  const deleteReview

  return (
    <>
      {showForm && <ReviewForm add={addReview} />}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel Review" : "Write Review"}
      </button>
    </>
  );
};

export default Review;
