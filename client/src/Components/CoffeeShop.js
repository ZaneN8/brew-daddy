import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import CoffeeShopReview from "./CoffeeShopReview";
import CoffeeShopForm from "./CoffeeShopForm";
import CoffeeShopQuestions from "./CoffeeShopQuestions";

const CoffeeShop = ({ match, history }) => {
  const [shop, setShop] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);


  useEffect(() => {
    axios
      .get(`/api/coffee_shops/${match.params.id}`)
      .then((res) => setShop(res.data))
      .catch((err) => {
        alert("Error: could not get shop info");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/coffee_shops/${match.params.id}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => {
        alert("ERROR: No reviews");
      });
  }, []);

  const deleteCoffeeShop = (id) => {
    axios
      .delete(`/api/coffee_shops/${id}`, { params: { id: id } })
      .then((res) => {
        setShop(shop.filter((shop) => shop.id !== id));
      });
  };

  const deleteReview = (id) => {
    axios
      .delete(`/api/coffee_shops/${shop.id}/reviews/${id}`)
      .then((res) => {
        setReviews(reviews.filter((review) => review.id !== id));
      })
      .catch(console.log);
  };

 

  const renderShopInfo = () => (
    <div>
      <h1>{shop.name}
          <button onClick={() => setShowEditForm(!showEditForm)}>
            {showEditForm ? "Cancel" : "Update Coffee Shop"}
          </button>
        </h1>
      <img src={shop.image} />

      <h5>Call us at:{shop.contact_info}</h5>
      <h5>
        {shop.state}, {shop.city} {shop.zip}
      </h5>

      <p>
        Open:{shop.open} Delivery:{shop.delivery} Order Online:{shop.order_online} Pick Up:{shop.pick_up}
      </p>
        <>
          {showEditForm && <CoffeeShopForm shopProp={shop} />}
        </>
      <br />
      <button onClick={() => deleteCoffeeShop(shop.id)}>
        {" "}
        Delete Coffee Shop
      </button>
    </div>
  );

  const renderReviews = () => {
    return reviews.map((review) => (
      <CoffeeShopReview
        key={review.id}
        review={review}
        shopId={shop.id}
        deleteReview={deleteReview}
      />
    ));
  };

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   debugger;
  //   // this needs a updated api call
  //   axios.post(`/api/coffee_shop/${match.params.id}/reviews`).then((res) => {
  //     addReview.add(res.data);
  //   });
  // };

  if (!shop) return null;
  else
    return (
      <div>
        <div>{renderShopInfo()}</div>
        <CoffeeShopQuestions questionsShopId={shop.id}/>
        <div>{renderReviews()}</div>
        <>
          {showReviewForm && <ReviewForm hide={setShowReviewForm} add={addReview} shopId={shop.id} />}
          <button onClick={() => setShowReviewForm(!showReviewForm)}>
            {showReviewForm ? "Cancel Review" : "Write Review"}
          </button>
        </>
        <hr />
        <button onClick={history.goBack}>BACK</button>
      </div>
    );
};

export default CoffeeShop;
