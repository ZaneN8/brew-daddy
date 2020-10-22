import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewImageUpload from "./ReviewImageUpload";
import { Modal } from "react-bootstrap";

const CoffeeShopReview = ({ review, shopId, deleteReview }) => {
  const [user, setUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [reviewPics, setReviewPics] = useState([]);
  const [page, setPage] = useState(1);
  const [noMoreReviewPics, setNoMoreReviewPics] = useState(false);

  const handleClose = () => setShowEditForm(false);
  const handleShow = () => setShowEditForm(true);

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

  const getReviewImages = async () => {
    try {
      const params = { params: { page } };
      let res = await axios.get(
        `/api/reviews/${review.id}/review_pics`,
        params
      );
      setReviewPics(res.data);
    } catch (err) {
      alert("Error: CoffeeShopReview, failed to get review pics");
    }
  };

  const morePics = () => {
    const params = {
      params: {
        page: page + 1,
      },
    };
    axios
      .get(`/api/reviews/${review.id}/review_pics`, params)
      .then((res) => {
        if (res.data.length < 9) {
          setNoMoreReviewPics(true);
        }
        setReviewPics(reviewPics.concat(res.data));
        setPage(page + 1);
      })
      .catch((err) => {
        alert("ERROR: Review Pictures error");
      });
  };

  const renderReviewImages = () => {
    return reviewPics.map((revPic) => (
      <img key={revPic.id} src={revPic.image} />
    ));
  };

  useEffect(() => {
    getReviewImages();
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

      <p>{renderReviewImages()}</p>
      {!noMoreReviewPics ? (
        <button onClick={morePics}>Load More</button>
      ) : (
        <p>No more pictures</p>
      )}
      <ReviewImageUpload reviewProp={review} />

      <button onClick={handleShow}>Edit Review</button>
      <Modal show={showEditForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>.
        </Modal.Header>
        <Modal.Body>
          <ReviewForm shopId={shopId} review={review} hide={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <button onClick={() => deleteReview(review.id)}>Delete</button>
    </div>
  );
};

export default CoffeeShopReview;
