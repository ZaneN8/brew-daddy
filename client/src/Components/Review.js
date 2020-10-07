import React, { useState } from "react";
import ReviewForm from "./ReviewForm";

const Review = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm && <ReviewForm />}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel Review" : "Write Review"}
      </button>
    </>
  );
};

export default Review;
