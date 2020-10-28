import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewImageUpload from "./ReviewImageUpload";
import { Modal } from "react-bootstrap";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { AuthContext } from "../../providers/AuthProvider";
import styled from "styled-components";

const CoffeeShopReview = ({
  review,
  deleteReview,
  editReview,
  displayShop,
}) => {
  const { user } = useContext(AuthContext);
  const [reviewUser, setReviewUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [reviewPics, setReviewPics] = useState([]);
  const [page, setPage] = useState(1);
  const [noMoreReviewPics, setNoMoreReviewPics] = useState(false);
  const [coffeeShop, setCoffeeShop] = useState(null);
  const handleClose = () => setShowEditForm(false);
  const handleShow = () => setShowEditForm(true);
  const reviewOwnedByUser = user && review && user.id === review.user_id;

  useEffect(() => {
    axios
      .get(`/api/users/${review.user_id}`)
      .then((res) => setReviewUser(res.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (displayShop) {
      axios
        .get(`/api/coffee_shops/${review.coffee_shop_id}`)
        .then((res) => setCoffeeShop(res.data))
        .catch(console.log);
    }
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

  const reviewTimeStamp = () => {
    let date = new Date(review.created_at);
    return <>{review && date.toLocaleDateString("en-US")}</>;
  };

  const addImage = (newImage) => {
    setReviewPics([newImage, ...reviewPics]);
  };

  const handleReviewDelete = () => {
    const { id, coffee_shop_id } = review;
    axios
      .delete(`/api/coffee_shops/${coffee_shop_id}/reviews/${id}`)
      .then((res) => {
        if (typeof deleteReview === "function") {
          deleteReview(id);
        }
      })
      .catch(console.log);
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
      <UploadedReviewImage key={revPic.id} src={revPic.image} />
    ));
  };

  useEffect(() => {
    getReviewImages();
  }, []);

  return (
    <>
      <br />
      <div key={review.id}>
        <Row>
          {displayShop && coffeeShop && coffeeShop.name ? (
            <StyledImage src={coffeeShop.image} />
          ) : (
            <StyledImage src={user.image} />
          )}
          {displayShop && coffeeShop && coffeeShop.name ? (
            <StyledReviewName>
              <Link to={`/coffee_shops/${review.coffee_shop_id}`}>
                {coffeeShop && coffeeShop.name}
              </Link>
            </StyledReviewName>
          ) : (
            <StyledReviewName>
              <Link to={`/users/${review.user_id}`}>
                {reviewUser &&
                  reviewUser.first_name + " " + reviewUser.last_name}
              </Link>
            </StyledReviewName>
          )}
          {reviewOwnedByUser && (
            <button onClick={handleShow}>
              <span>&#128295;</span>
            </button>
          )}
        </Row>
        <Row>
          <Rater total={5} interactive={false} rating={`${review.rating}`} />
          <StyledReviewHeader>{review.title}</StyledReviewHeader>
        </Row>
        {/* <StyledTimeStamp>{review.created_at}</StyledTimeStamp> */}
        <StyledTimeStamp>Reviewed on {reviewTimeStamp()}</StyledTimeStamp>
        <StyledReviewName>{review.body}</StyledReviewName>
        <p>{review.image}</p>
        <Row>
          <Column1>
            <StyledRating>
              Coffee rating:
              <Rater
                total={5}
                interactive={false}
                rating={`${review.coffee_rating}`}
              />
            </StyledRating>
          </Column1>
          <Column2>
            <StyledRating>
              Work friendly:
              <Rater
                total={5}
                interactive={false}
                rating={`${review.work_friendly}`}
              />
            </StyledRating>
          </Column2>
        </Row>
        <Row>
          <Column1>
            <StyledRating>
              Food:
              <Rater total={5} interactive={false} rating={`${review.food}`} />
            </StyledRating>
          </Column1>
          <Column2>
            <StyledRating>
              Noise:
              <Rater
                total={5}
                interactive={false}
                rating={`${review.noise_level}`}
              />
            </StyledRating>
          </Column2>
        </Row>
        <Row>
          <p>{renderReviewImages()}</p>
          <p>
            {reviewOwnedByUser && (
              <ReviewImageUpload reviewProp={review} afterCreate={addImage} />
            )}
          </p>
        </Row>
        {!noMoreReviewPics ? (
          <button onClick={morePics}>Load More</button>
        ) : (
          <p>No more pictures</p>
        )}

        <Modal show={showEditForm} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm
              shopId={review.coffee_shop_id}
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
          <button onClick={handleReviewDelete}>Delete</button>
        )}
      </div>
    </>
  );
};

const StyledLayout = styled.div`
  max-width: 1168px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 1em 4em 1em;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 5px;
`;

const Column1 = styled.div`
  flex: 5;
  display: flex;
  flex-directionL column;
`;

const Column2 = styled.div`
  flex: 5;
`;

const StyledImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const StyledReviewName = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
`;

const StyledTimeStamp = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #7b7b7b;
`;

const StyledReviewHeader = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`;

const StyledRating = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
`;

const UploadedReviewImage = styled.img`
  border-radius: 15px;
  width: 100px;
  height: 100px;
`;

export default CoffeeShopReview;
