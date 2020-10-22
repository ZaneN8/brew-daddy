import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewForm from "../review/ReviewForm";
import CoffeeShopReview from "../review/CoffeeShopReview";
import CoffeeShopForm from "./CoffeeShopForm";
import CoffeeShopRating from "./CoffeeShopRating";
import CoffeeShopQuestions from "../QA/CoffeeShopQuestions";
import CoffeeShopBreakdown from "./CoffeeShopBreakdown";
import styled from "styled-components";
import { Modal } from "react-bootstrap";

const CoffeeShop = ({ match, history }) => {
  const [shop, setShop] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreReviews, setNoMoreReviews] = useState(false);

  const handleClose = () => setShowEditForm(false);
  const handleShow = () => setShowEditForm(true);

  const handleCloseReview = () => setShowReviewForm(false);
  const handleAddReview = () => setShowReviewForm(true);

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
      <StyledShop>
        <StyledImg src={shop.image} />
        <InfoRight>
          <StyledCoffeeShopName>
            {shop.name}
            <button onClick={() => setShowEditForm(!showEditForm)}>
              {showEditForm ? "Cancel" : "Update Coffee Shop"}
            </button>
          </StyledCoffeeShopName>
          <StyledShopBoo>
            Open:{shop.open} Delivery:{shop.delivery} Order Online:
            {shop.order_online} Pick Up:{shop.pick_up}
          </StyledShopBoo>
          <br />
          <StyledDescription>{shop.description}</StyledDescription>
          Menu:
          <a href={shop.menu} target="_blank">
            {shop.name} Menu{"   "}
          </a>
          <br />
          Website:
          <a href={shop.website} target="_blank">
            {shop.name} Website
          </a>
          <h5>Call us at:{shop.contact_info}</h5>
          <h5>
            {shop.state}, {shop.city} {shop.zip}
          </h5>
        </InfoRight>
      </StyledShop>
      <br />
      <>
        {showEditForm && (
          <CoffeeShopForm shopProp={shop} hide={setShowEditForm} />
        )}
      </>
      <h1>
        {shop.name}
        <button onClick={handleShow}>
          <span>&#128295;</span>
        </button>
        <Modal show={showEditForm} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Edit Coffee Shop </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CoffeeShopForm shopProp={shop} hide={handleClose} />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </h1>
      <img src={shop.image} />
      <h5>Call us at:{shop.contact_info}</h5>
      <h5>{shop.address}</h5>
      <h5>
        {shop.state}, {shop.city}-{shop.zip}
      </h5>
      <br />
      Menu:
      <a href={shop.menu} target="_blank">
        {shop.name} Menu{"   "}
      </a>
      <br />
      Website:
      <a href={shop.website} target="_blank">
        {shop.name} Website
      </a>
      <br />
      <p>
        Open:{shop.open} Delivery:{shop.delivery} Order Online:
        {shop.order_online} Pick Up:{shop.pick_up}
      </p>
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
    setReviews([review, ...reviews]);
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
      <StyledPage>
        <StyledInfoContainer>{renderShopInfo()}</StyledInfoContainer>
        {/* <div>{renderAllRating()}</div><hr /> */}
        <CoffeeShopRating match={match} />
        <CoffeeShopBreakdown match={match} />
        <hr />
        <CoffeeShopQuestions questionsShopId={shop.id} />

        <hr />

        <div>{renderReviews()}</div>
        {!noMoreReviews ? (
          <button onClick={nextPage}>More reviews</button>
        ) : (
          <p>No More Reviews</p>
        )}
        <br />
        <button onClick={handleAddReview}> Write Review</button>
        <Modal show={showReviewForm}>
          <Modal.Header closeButton onHide={handleCloseReview}>
            <Modal.Title>Create Review</Modal.Title>.
          </Modal.Header>
          <Modal.Body>
            <ReviewForm
              hide={handleCloseReview}
              add={addReview}
              shopId={shop.id}
            />
            <Modal.Footer>
              <button onClick={handleCloseReview}>Cancel</button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
        <br />
        <hr />

        <button onClick={history.goBack}>BACK</button>
      </StyledPage>
    );
};

const StyledPage = styled.div`
  padding: 3em 4em 1em;
`;

const StyledInfoContainer = styled.div`
  border: 1px solid black; //take out when done
`;

const InfoRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledImg = styled.img`
  border: 2px solid red; //take out when done
  display: flex;
  border-radius: 20%;
`;

const StyledShop = styled.div`
  border: 2px solid green; //take out when done
  display: flex;
`;

const StyledCoffeeShopName = styled.h1`
  display: flex;
  border: 2px solid blue;
  flex-wrap: wrap;
`;

const StyledShopBoo = styled.p`
  display: flex;
`;
// color: ${props =>
// props}
//make so that boolean value changes color
const StyledDescription = styled.p`
  display: flex;
  border: 1 px solid red;
`;

export default CoffeeShop;
