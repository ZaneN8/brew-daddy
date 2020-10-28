import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReviewForm from "../review/ReviewForm";
import CoffeeShopReview from "../review/CoffeeShopReview";
import CoffeeShopForm from "./CoffeeShopForm";
import CoffeeShopRating from "./CoffeeShopRating";
import CoffeeShopQuestions from "../QA/CoffeeShopQuestions";
import CoffeeShopBreakdown from "./CoffeeShopBreakdown";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import CoffeeShopReviewPics from "./CoffeeShopReviewPics";
import Rater from "react-rater";
import FontAwesome from "react-fontawesome";

// TODO 1) Add this Context to pull the information from Auth
import { AuthContext } from "../../providers/AuthProvider";

const CoffeeShop = ({ match, history }) => {
  // TODO 2) Add this, make sure useContext is in react
  const { user } = useContext(AuthContext);
  const [shop, setShop] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [page, setPage] = useState(1);
  const [noMoreReviews, setNoMoreReviews] = useState(false);
  const [ratingsData, setRatingsData] = useState({});
  // This is the "smarter" method of verifying if you are the user that own the coffee shop
  const shopOwnedByUser = user && shop && user.id === shop.user_id;
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

  useEffect(() => {
    axios
      .get(`/api/coffee_shops/${match.params.id}/average_stats`)
      .then((res) => setRatingsData(res.data))
      .catch((err) => {
        console.log("ERROR Setting Rating Data");
      });
  }, []);

  const deleteCoffeeShop = (id) => {
    axios
      .delete(`/api/coffee_shops/${id}`, { params: { id: id } })
      .then((res) => {
        // setShop(shop.filter((shop) => shop.id !== id));
        history.push("/search");
      });
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const shopCost = () => {
    const dollars = [];
    for (let i = 0; i < shop.cost; i++) {
      dollars.push(<span>$</span>);
    }
    return dollars;
  };

  const editCoffeeShop = (fig) => {
    setShop(fig);
  };

  const editReview = (newReview) => {
    const newReviews = reviews.map((review) => {
      if (newReview.id === review.id) return newReview;
      else return review;
    });
    setReviews(newReviews);
  };

  const addReview = (review) => {
    setReviews([review, ...reviews]);
  };

  const renderShopInfo = () => (
    <div>
      <StyledShop>
        <ImageBox>
          <StyledImg src={shop.image} />
        </ImageBox>
        <InfoRight>
          <StyledCoffeeShopName>
            {shop.name}
            {shopOwnedByUser && (
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
            {shopOwnedByUser && (
              <button onClick={() => deleteCoffeeShop(shop.id)}>
                {" "}
                Delete Coffee Shop
              </button>
            )}
            <Modal show={showEditForm} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title> Edit Coffee Shop </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CoffeeShopForm
                  shopProp={shop}
                  hide={handleClose}
                  afterUpdate={editCoffeeShop}
                />
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleClose}>Cancel</button>
              </Modal.Footer>
            </Modal>
          </StyledCoffeeShopName>
          <Rater
            total={5}
            interactive={false}
            rating={`${ratingsData.total_rating}`}
          />
          <StyledMoney>{shop.cost && shopCost()}</StyledMoney>
          <BoolenBox>
            <Open open={shop.open}>Open{shop.open}</Open>
            <Delivery delivers={shop.delivery}>
              Delivery{shop.delivery}
            </Delivery>
            <Online online={shop.order_online}>
              Order Online
              {shop.order_online}
            </Online>
            <PickUp pick={shop.pick_up}>Pick Up{shop.pick_up}</PickUp>
          </BoolenBox>
          <StyledDescription>{shop.description}</StyledDescription>
          <LinkContainer>
            <Menu href={shop.menu} target="_blank">
              Menu
            </Menu>
            <Website href={shop.website} target="_blank">
              Website
            </Website>
          </LinkContainer>
          <Contact>
            <b>Contact </b>
            {shop.contact_info}
          </Contact>
          <Contact>
            <b>Address </b>
            <span>{shop.address}</span>
          </Contact>
          <Contact>
            {shop.state}, {shop.city}-{shop.zip}
          </Contact>
          <br />
          <br />
          <br />
          <br />
          {shopOwnedByUser && (
            <button onClick={() => deleteCoffeeShop(shop.id)}>
              {" "}
              Delete Coffee Shop
            </button>
          )}
        </InfoRight>
      </StyledShop>
    </div>
  );

  const renderReviews = () => {
    return reviews.map((review) => (
      <CoffeeShopReview
        key={review.id}
        review={review}
        shopId={shop.id}
        editReview={editReview}
        deleteReview={deleteReview}
      />
    ));
  };

  if (!shop) return null;
  else
    return (
      <StyledPage>
        <StyledInfoContainer>{renderShopInfo()}</StyledInfoContainer>
        {/* <div>{renderAllRating()}</div><hr /> */}
        <CoffeeShopRating ratingsData={ratingsData} />
        <hr />
        <CoffeeShopQuestions questionsShopId={shop.id} />

        <hr />
        <Row>
          <Column1>
            <CoffeeShopBreakdown match={match} />
            <br />
            <hr />
            <RPics>
              <CoffeeShopReviewPics shopId={shop.id} />
            </RPics>
          </Column1>
          <Column2>
            <div>{renderReviews()}</div>
            {!noMoreReviews ? (
              <button onClick={nextPage}>More reviews</button>
            ) : (
              <p>No More Reviews</p>
            )}
            <hr />
            <br />
            {user && <button onClick={handleAddReview}> Write Review</button>}
            <Modal show={showReviewForm}>
              <Modal.Header closeButton onHide={handleCloseReview}>
                <Modal.Title>Create Review</Modal.Title>.
              </Modal.Header>
              <Modal.Body>
                <ReviewForm
                  hide={handleCloseReview}
                  afterCreate={addReview}
                  shopId={shop.id}
                />
                <Modal.Footer>
                  <button onClick={handleCloseReview}>Cancel</button>
                </Modal.Footer>
              </Modal.Body>
            </Modal>
            <br />
            <hr />
            <Button onClick={history.goBack}>BACK</Button>
          </Column2>
        </Row>
      </StyledPage>
    );
};

const StyledPage = styled.div`
  padding: 3em 6em 1em;
`;

const StyledInfoContainer = styled.div`
  // border: 1px solid black; //take out when done
`;

const InfoRight = styled.div`
  padding-left: 50px;
  display: flex;
  flex-direction: column;
`;

const ImageBox = styled.div``;

const StyledImg = styled.img`
  heigth: 400px;
  width: 350px;
  border-radius: 20%;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledShop = styled.div`
  // border: 2px solid green; //take out when done
  display: flex;
`;

const StyledCoffeeShopName = styled.h1`
  display: flex;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;
  flex-wrap: wrap;
`;

const StyledMoney = styled.div`
  color: #86945e;
`;

const BoolenBox = styled.div`
  display: flex;
`;

const Open = styled.p`
  font-weight: bold;
  margin: 5px;
  padding: 4px;
  background-color: ${(props) => (props.open ? "#86945E" : "#ff6961")};
  color: ${(props) => (props.open ? "white" : "white")};
  opacity: ${(props) => (props.open ? 0.9 : 0.2)};
  border-radius: 8px;
`;

const Delivery = styled.p`
  font-weight: bold;
  margin: 5px;
  padding: 4px;
  background-color: ${(props) => (props.delivers ? "#86945E" : "#ff6961")};
  color: ${(props) => (props.delivers ? "white" : "white")};
  opacity: ${(props) => (props.delivers ? 0.9 : 0.2)};
  border-radius: 8px;
`;

const PickUp = styled.p`
  font-weight: bold;
  margin: 5px;
  padding: 4px;
  background-color: ${(props) => (props.pick ? "#86945E" : "#ff6961")};
  color: ${(props) => (props.pick ? "white" : "white")};
  opacity: ${(props) => (props.pick ? 0.9 : 0.2)};
  border-radius: 8px;
`;

const Online = styled.p`
  font-weight: bold;
  margin: 5px;
  padding: 4px;
  background-color: ${(props) => (props.online ? "#86945E" : "#ff6961")};
  color: ${(props) => (props.online ? "white" : "white")};
  opacity: ${(props) => (props.online ? 0.9 : 0.2)};
  border-radius: 8px;
`;
const StyledDescription = styled.p`
  overflow: hidden;
`;

const LinkContainer = styled.div`
  display: flex;
`;

const Menu = styled.a`
  display: flex;
  margin-right: 2rem;
`;

const Website = styled.a`
  display: flex;
`;

const Contact = styled.h5`
  font-size: 12px;
`;

const Button = styled.button`
  background-color: #4d4d4d;
  border-radius: 30px;
  border: none;
  color: white;
`;

const Row = styled.div`
  display: flex;
`;

const Column1 = styled.div`
  margin-right: 5rem;
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-right: 2.5%;
`;

const Column2 = styled.div`
  flex: 7;
`;

const RPics = styled.div`
  img {
    flex_direction: row;
    height: 40px;
    border-radius: 8px;
    margin: 3px;
  }
`;

export default CoffeeShop;
