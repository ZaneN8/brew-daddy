import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewForm from "./ReviewForm"

const CoffeeShopReview = ({ review, shopId, deleteReview }) => {
  const [user, setUser] = useState(null);
  const [showEditForm,setShowEditForm] = useState(false)

  // get user on initial render
  useEffect(() => {
    // either make a user show route,
    // or make a route to get the user by the review
    // 'api/users/:id' OR 'api/reviews/:review_id/user'

    axios
      .get(`/api/users/${review.user_id}`)
      .then((res) => setUser(res.data))
      .catch(console.log);
  }, []);

  return (
    <div key={review.id}>
      <Link to={`/users/${review.user_id}`}>
        {user && user.first_name + " " + user.last_name}
      </Link>
      <h2>{review.title}</h2>
      <h5>{review.body}</h5>
      <p>{review.image}</p>
      <p>Total rating:{review.rating}</p>
      <p>Coffee rating:{review.coffee_rating}</p>
      <p>Work friendly:{review.work_friendly}</p>
      <p>Food:{review.food}</p>
      <p>Noise:{review.noise_level}</p>
      
    <button>Add review Picture </button>

      {showEditForm && <ReviewForm  shopId={shopId} review={review}/>}
          <button onClick={() => setShowEditForm(!showEditForm)}>
            {showEditForm ? "Cancel Edit" : "Edit Review"}
            </button>

      <button onClick={() => deleteReview(review.id)}>Delete</button>
    </div>
  );
};

export default CoffeeShopReview;
