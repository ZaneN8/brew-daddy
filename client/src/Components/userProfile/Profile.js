import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CoffeeShopForm from "../coffeeShop/CoffeeShopForm";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import EditProfileForm from "./EditProfileForm";
import { Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import UserRating from "./UserRating";
import userDefaultPhoto from "../../image/userDefault.svg";
import CoffeeShopReview from "../review/CoffeeShopReview";
import FontAwesome from "react-fontawesome";

const Profile = () => {
  // const [shops, setShops] = useState([]);
  const [profileReviews, setProfileReviews] = useState([]);
  const [profileCoffeeShops, setProfileCoffeeShops] = useState([]);
  const [show, setShow] = useState(false);
  const { user, handleImageUpdate } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [changePic, setChangePic] = useState(false);
  const handleClose = () => setChangePic(false);
  const handleShow = () => setChangePic(true);
  const closeShow = () => setShow(false);
  const createShow = () => setShow(true);
  const closeEditShow = () => setShowEdit(false);
  const createEditShow = () => setShowEdit(true);

  const [page, setPage] = useState(1);
  const [noMoreProfileReviews, setNoMoreProfileReviews] = useState(false);
  const [fileState, setFileState] = useState({
    url: null,
    blob: null,
    file: null,
  });

  const getProfileReviews = async () => {
    try {
      const params = { params: { page } };
      let res = await axios.get(`/api/users/${user.id}/reviews`, params);
      setProfileReviews(res.data);
    } catch (err) {
      alert("Error: failed to get this profiles reviews");
    }
  };

  const moreProfileReviews = () => {
    const params = {
      params: {
        page: page + 1,
      },
    };
    axios
      .get(`/api/users/${user.id}/reviews`, params)
      .then((res) => {
        if (res.data.length < 5) {
          setNoMoreProfileReviews(true);
        }
        setProfileReviews(profileReviews.concat(res.data));
        setPage(page + 1);
      })
      .catch((err) => {
        alert("ERROR: Could not load more reviews");
      });
  };

  const getProfileCoffeeShops = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/coffee_shops`);
      setProfileCoffeeShops(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error: failed to get users coffee shops");
    }
  };

  const addCoffeeShop = (shop) =>
    setProfileCoffeeShops([shop, ...profileCoffeeShops]);

  const editReview = (newReview) => {
    const newReviews = profileReviews.map((review) => {
      if (newReview.id === review.id) return newReview;
      else return review;
    });
    setProfileReviews(newReviews);
  };

  const deleteReview = (id) => {
    setProfileReviews(profileReviews.filter((review) => review.id !== id));
  };

  const renderProfileReviews = () => {
    return profileReviews.map((review) => (
      <CoffeeShopReview
        displayShop
        review={review}
        editReview={editReview}
        deleteReview={deleteReview}
      />
    ));
  };

  const renderProfileCoffeeShop = () => {
    return profileCoffeeShops.map((coffeeShop) => (
      <StyledCoffeeShop className="coffeeShopRender" key={coffeeShop.id}>
        <CoffeeShopImage url={coffeeShop.image} />
        <CoffeeShopNameText>
          <a href={`/coffee_shops/${coffeeShop.id}`}>{coffeeShop.name}</a>
        </CoffeeShopNameText>
        <CoffeeShopLocationText>
          {coffeeShop.state}, {coffeeShop.city}, {coffeeShop.zip}
        </CoffeeShopLocationText>
      </StyledCoffeeShop>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleImageUpdate(fileState);
    handleClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const blob = new Blob([file], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    setFileState({ file, blob, url });
  };

  useEffect(() => {
    getProfileReviews();
    getProfileCoffeeShops();
  }, []);

  return (
    <StyledLayout>
      <Box>
        <div className="userinfo">
          <div>
            <StyledProfileImage
              onClick={handleShow}
              src={user.image ? user.image : userDefaultPhoto}
            />
            <Modal show={changePic} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User Pic</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.File
                  label="Upload New Image for User"
                  name="image"
                  type="file"
                  onChange={handleImageUpload}
                />
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleClose}>Close</button>
                <button onClick={handleSubmit}>Change Picture</button>
              </Modal.Footer>
            </Modal>
          </div>
          <Row>
            <StyledUserName>
              {user.first_name} {user.last_name}
            </StyledUserName>
            <button
              style={{ border: "none", background: "none" }}
              onClick={createEditShow}
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
          </Row>
          <Modal show={showEdit} onHide={closeEditShow}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditProfileForm hide={closeEditShow} />
            </Modal.Body>
            <Modal.Footer>
              <button onClick={closeEditShow}>Close</button>
            </Modal.Footer>
          </Modal>
        </div>
        {user && <UserRating userId={user.id} />}
      </Box>
      <BigBox>
        <StyledHeaderText>About Me</StyledHeaderText>
        <StyledAboutText>{user.about_me}</StyledAboutText>
        <StyledReviewText>Recent Reviews</StyledReviewText>
        <div>{renderProfileReviews()}</div>
        {!noMoreProfileReviews ? (
          <StyledLoadMoreButton onClick={moreProfileReviews}>
            See more reviews
          </StyledLoadMoreButton>
        ) : (
          <StyledAboutText>
            That's all the reviews for this profile
          </StyledAboutText>
        )}
      </BigBox>
      <Box>
        <Row>
          <StyledHeaderText>
            Coffee Shops
            <button
              style={{ border: "none", background: "none" }}
              onClick={createShow}
            >
              <span>
                <FontAwesome
                  style={{
                    border: "none",
                    background: "none",
                    color: "#2D2721",
                  }}
                  name="plus-circle"
                />
              </span>
            </button>
          </StyledHeaderText>
        </Row>
        <div>
          <Modal show={show} onHide={closeShow}>
            <Modal.Header closeButton>
              <Modal.Title>Create Coffee Shop</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CoffeeShopForm hide={closeShow} afterCreate={addCoffeeShop} />
            </Modal.Body>
            <Modal.Footer>
              <button onClick={closeShow}>Cancel</button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>{renderProfileCoffeeShop()}</div>
      </Box>
    </StyledLayout>
  );
};

const StyledPage = styled.div`
  padding: 1em 4em 1em;
`;

const StyledCoffeeShop = styled.div`
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  border-radius: 30px;
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
`;

const CoffeeShopImage = styled.img`
  width: 200px;
  height: 135px;
  flex-shrink: 0;
  border-radius: 30px 30px 0 0;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const CoffeeShopNameText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 20px;
`;

const CoffeeShopLocationText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 15px;
  padding-right: 20px;
`;

const StyledHeaderText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 20px;
  padding-bottom: 30px;
`;

const StyledReviewText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 20px;
  padding-bottom: 30px;
`;

const StyledUserName = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  padding-left: 20px;
  padding-top: 25px;
  padding-bottom: 15px;
`;

const StyledAboutText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  padding-bottom: 60px;
`;

const StyledLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
`;

const Box = styled.div`
  flex: 3;
  display: flex;
  width: 175px;
  min-height: 300px;
  flex-direction: column;
  padding: 5%;
  height: 100%;
`;

const BigBox = styled.div`
  flex: 7;
  display: flex;
  width: 600px;
  min-height: 300px;
  flex-direction: column;
  padding: 5%;
  height: 100%;
`;

const StyledProfileImage = styled.img`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const StyledLoadMoreButton = styled.button`
  color: black;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const StyledButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  // margin: 0 0.1em 0.1em 0;
  border: 0.16em solid #dbd4cc;
  border-radius: 15px;
  background-color: #dbd4cc;
  color: black;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

export default Profile;
