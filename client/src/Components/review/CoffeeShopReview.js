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
import FontAwesome from "react-fontawesome";

const CoffeeShopReview = ({
  review,
  deleteReview,
  editReview,
  displayShop,
}) => {
  const { user } = useContext(AuthContext);
  const [reviewUser, setReviewUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
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
      <UploadedReviewImage key={revPic.id} url={revPic.image} />
    ));
  };

  const renderShopImage = () => {
    if (displayShop && coffeeShop) {
      return <StyledImage url={coffeeShop.image} />;
    }
    if (reviewUser && reviewUser.image) {
      return <StyledImage url={reviewUser.image} />;
    }
  };

  useEffect(() => {
    getReviewImages();
  }, []);

  return (
    <>
      <div key={review.id}>
        <Row>
          {renderShopImage()}

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
            <button
              style={{ border: "none", background: "none" }}
              onClick={handleShow}
            >
              <span>
                <FontAwesome
                  style={{
                    border: "none",
                    background: "none",
                    color: "#DADADA",
                  }}
                  name="wrench"
                />
              </span>
            </button>
          )}
          {reviewOwnedByUser && (
            <button
              style={{ border: "none", background: "none", color: "#DADADA" }}
              onClick={handleShowDelete}
            >
              <FontAwesome name="trash" />
            </button>
          )}
          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StyledYesButton onClick={handleReviewDelete}>
                Yes, Delete
              </StyledYesButton>
              {"  "}
              <StyledNoButton onClick={handleCloseDelete}>
                No, Keep
              </StyledNoButton>
            </Modal.Body>
          </Modal>
        </Row>
        <Row>
          <StyledRater
            total={5}
            interactive={false}
            rating={`${review.rating}`}
          />
          <StyledReviewHeader>{review.title}</StyledReviewHeader>
        </Row>
        <StyledTimeStamp>Reviewed on {reviewTimeStamp()}</StyledTimeStamp>
        <StyledReviewName>{review.body}</StyledReviewName>
        <p>{review.image}</p>
        <Column1>
          <Row>
            <StyledRater
              total={5}
              interactive={false}
              rating={`${review.work_friendly}`}
            />{" "}
            <StyledRating>Work Friendly</StyledRating>
          </Row>
          <Row>
            <StyledRater
              total={5}
              interactive={false}
              rating={`${review.coffee_rating}`}
            />
            <StyledRating>Coffee Quality </StyledRating>
          </Row>
        </Column1>
        <Column1>
          <Row>
            <StyledRater
              total={5}
              interactive={false}
              rating={`${review.noise_level}`}
            />{" "}
            <StyledRating>Background Noise</StyledRating>
          </Row>
          <Row>
            <StyledRater
              total={5}
              interactive={false}
              rating={`${review.food}`}
            />{" "}
            <StyledRating>Food Quality</StyledRating>
          </Row>
        </Column1>

        <Row>
          <div>{renderReviewImages()}</div>

          {reviewOwnedByUser && (
            <ReviewImageUpload reviewProp={review} afterCreate={addImage} />
          )}
        </Row>
        {!noMoreReviewPics ? (
          <StyledLoadMoreButton onClick={morePics}>
            More Pictures...
          </StyledLoadMoreButton>
        ) : (
          <StyledLoadMoreButton>No more pictures</StyledLoadMoreButton>
        )}
        <Modal show={showEditForm} onHide={handleClose}>
          <Modal.Body>
            <ReviewForm
              shopId={review.coffee_shop_id}
              afterUpdate={editReview}
              review={review}
              hide={handleClose}
            />
          </Modal.Body>
        </Modal>
        <hr />
      </div>
    </>
  );
};

const StyledRater = styled(Rater)`
  display: flex;

  .react-rater-star.is-disabled.is-active {
    color: #e1ccb7 !important;
    background: none:
  }
  .react-rater-star.is-disabled.is-active-half {
    color: #e1ccb7 !important;
    background: none:
  }
`;

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
  padding-right: 20px;
`;

const Column1 = styled.div`
  flex: 5;
  display: flex;
  flex-direction: row;
`;

const Column2 = styled.div`
  flex: 5;
`;

const StyledLoadMoreButton = styled.button`
  color: #2d2721;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const StyledImage = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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

const UploadedReviewImage = styled.div`
  border-radius: 15px;
  margin: 5px;
  width: 50px;
  height: 50px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledYesButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);
  border: 0.16em solid #86945e;
  border-radius: 15px;
  background-color: #86945e;
  opacity: 0.9;
  color: white;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  }
`;
const StyledNoButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);
  border: 0.16em solid #ff6961;
  border-radius: 15px;
  background-color: #ff6961;
  opacity: 0.9;
  color: white;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  }
`;

export default CoffeeShopReview;
