import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewImageUpload from "./ReviewImageUpload";
import { Modal } from "react-bootstrap";
import Rater from "react-rater";
import 'react-rater/lib/react-rater.css';
import { AuthContext } from "../../providers/AuthProvider";

const CoffeeShopReview = ({ review, shopId, deleteReview, editReview }) => {
  const { user } = useContext(AuthContext);
  const [reviewUser, setReviewUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [reviewPics, setReviewPics] = useState([]);
  const [page, setPage] = useState(1);
  const [noMoreReviewPics, setNoMoreReviewPics] = useState(false);
  const handleClose = () => setShowEditForm(false);
  const handleShow = () => setShowEditForm(true);
  const reviewOwnedByUser = user && review && user.id === review.user_id;

  useEffect(() => {
    axios

      .get(`/api/users/${review.user_id}`)
      .then((res) => setReviewUser(res.data))
      .catch(console.log);
  }, []);

  const getReviewImages = async () => {
    try {
      const params = { params: { page } };
      let res = await axios.get(
        `/api/reviews/${review.id}/review_pics`,
        params
      )
      setReviewPics(res.data);
    } catch (err) {
      alert("Error: CoffeeShopReview, failed to get review pics");
    }
  };

  const addImage = (newImage) => {
    setReviewPics([newImage, ...reviewPics]);
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
        {reviewUser && reviewUser.first_name + " " + reviewUser.last_name}
      </Link>
      <h2>{review.title}</h2>
      <h5>{review.body}</h5>
      <p>{review.image}</p>
      <p>Total rating: <Rater total={5} interactive={false} rating={`${review.rating}`} /></p>
      <p>Coffee rating:<Rater total={5} interactive={false} rating={`${review.coffee}`} /></p>
      <p>Work friendly:<Rater total={5} interactive={false} rating={`${review.work_friendly}`} /></p>
      <p>Food:<Rater total={5} interactive={false} rating={`${review.food}`} /></p>
      <p>Noise:<Rater total={5} interactive={false} rating={`${review.noise_level}`} /></p>

      <p>{renderReviewImages()}</p>
      {!noMoreReviewPics ? (
        <button onClick={morePics}>Load More</button>
      ) : (
        <p>No more pictures</p>
      )}
      {reviewOwnedByUser && (
      <ReviewImageUpload reviewProp={review} afterCreate={addImage} />
      )}

      {reviewOwnedByUser && (
      <button onClick={handleShow}>Edit Review</button>
      )}
      <Modal show={showEditForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>.
        </Modal.Header>
        <Modal.Body>
          <ReviewForm
            shopId={shopId}
            afterUpdate={editReview}
            review={review}
            hide={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      {reviewOwnedByUser && (
      <button onClick={() => deleteReview(review.id)}>Delete</button>
      )}
    </div>
  );
};

export default CoffeeShopReview;
