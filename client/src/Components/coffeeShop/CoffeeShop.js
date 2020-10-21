import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "../review/ReviewForm";
import CoffeeShopReview from "../review/CoffeeShopReview";
import CoffeeShopForm from "./CoffeeShopForm";
import CoffeeShopRating from "./CoffeeShopRating";
import CoffeeShopQuestions from "../QA/CoffeeShopQuestions";
import CoffeeShopBreakdown from "./CoffeeShopBreakdown"

const CoffeeShop = ({ match, history }) => {
  const [shop, setShop] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreReviews, setNoMoreReviews] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/coffee_shops/${match.params.id}`)
      .then((res) => setShop(res.data))
      .catch((err) => {
        alert("Error: could not get shop info");
      });
  }, []);

  useEffect(() => {
    const params = { params: { page } };

    axios
      .get(`/api/coffee_shops/${match.params.id}/reviews`, params)
      .then((res) => {
        // if reviews are less than 4, set noMoreReview to true
        if (res.data.length < 4) {
          setNoMoreReviews(true);
        }
        setReviews(res.data);
      })
      .catch((err) => {
        alert("ERROR: No reviews");
      });
  }, []);

  const nextPage = () => {
    const params = {
      params: {
        page: page + 1,
      },
    };

    axios
      .get(`/api/coffee_shops/${match.params.id}/reviews`, params)
      .then((res) => {
        // If there are no more review, hide the button. See line 154 to hide button
        if (res.data.length === 0) {
          setNoMoreReviews(true);
        }
        setReviews(reviews.concat(res.data));
        setPage(page + 1);
      })
      .catch((err) => {
        alert("ERROR: No reviews");
      });
  };

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

  // const renderAllRating = () => {
  // return (
  //   <div>
  //   <b>Overall Rating: {ratingsData.total_rating} </b><br />
  //   Food Quality: {ratingsData.total_food} <br />
  //   Coffee Quality: {ratingsData.total_coffee} <br />
  //   Noise Level: {ratingsData.total_noise_level} <br />
  //   Work Friendly: {ratingsData.total_work_friendly} <br />

  //   </div>)
  // }

  const renderShopInfo = () => (
    <div>
      <h1>
        {shop.name}
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
        Open:{shop.open} Delivery:{shop.delivery} Order Online:
        {shop.order_online} Pick Up:{shop.pick_up}
      </p>
      <>
        {showEditForm && (
          <CoffeeShopForm shopProp={shop} hide={setShowEditForm} />
        )}
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
      <>
        <div>{renderShopInfo()}</div>
        {/* <div>{renderAllRating()}</div><hr /> */}
        <CoffeeShopRating match={match} />
        <CoffeeShopBreakdown match={match} />
        <CoffeeShopQuestions questionsShopId={shop.id} />

        <hr />
       
        <div>{renderReviews()}</div>
        {!noMoreReviews ? (
          <button onClick={nextPage}>More reviews</button>
        ) : (
          <p>No More Reviews</p>
        )}
        <>
          {showReviewForm && (
            <ReviewForm
              hide={setShowReviewForm}
              add={addReview}
              shopId={shop.id}
            />
          )}
          <button onClick={() => setShowReviewForm(!showReviewForm)}>
            {showReviewForm ? "Cancel Review" : "Write Review"}
          </button>
        </>
        <hr />

        <button onClick={history.goBack}>BACK</button>
      </>
    );
};

export default CoffeeShop;
