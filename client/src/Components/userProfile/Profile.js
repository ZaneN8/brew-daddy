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

  const renderProfileReviews = () => {
    return profileReviews.map((review) => (
      <div className="profileReviewRender" key={review.id}>
        <h4>{review.coffee_shop_id}</h4>
        <h4>{review.title}</h4>
        <h5>{review.body}</h5>
        <p>Total rating:{review.rating}</p>
        <p>Coffee rating:{review.coffee_rating}</p>
        <p>Work friendly:{review.work_friendly}</p>
        <p>Food:{review.food}</p>
        <p>Noise:{review.noise_level}</p>
      </div>
    ));
  };

  const renderProfileCoffeeShop = () => {
    {
      return profileCoffeeShops.map((coffeeShop) => (
        <StyledCoffeeShop className="coffeeShopRender" key={coffeeShop.id}>
          <img href={`/coffee_shops/${coffeeShop.id}`} src={coffeeShop.image} />
          <a href={`/coffee_shops/${coffeeShop.id}`}>{coffeeShop.name}</a>
          <p>{coffeeShop.state}, </p>
          <p>
            {coffeeShop.city}, {coffeeShop.zip}
          </p>
        </StyledCoffeeShop>
      ));
    }
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
            <StyledImage
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
          <div>
            {user.first_name} {user.last_name}
            <p>{user.email}</p>
          </div>
          <button onClick={createEditShow}>
            <span>&#128295;</span>
          </button>
          <Modal show={showEdit} onHide={closeEditShow}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User Profile </Modal.Title>
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
        <h4>About Me</h4>
        <p>{user.about_me}</p>
        <h1>Profiles Reviews</h1>
        <div>{renderProfileReviews()}</div>
        {!noMoreProfileReviews ? (
          <button onClick={moreProfileReviews}>See more reviews</button>
        ) : (
          <p>That's all the reviews for this profile</p>
        )}
        <hr />
      </BigBox>
      <Box>
        <h3>{user.name} Coffee Shops </h3>
        <div>
          <PlusButton onClick={createShow}>Add Coffee Shop</PlusButton>
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

        <hr />
      </Box>
      <br />
      <br />
    </StyledLayout>
  );
};

const StyledPage = styled.div`
  padding: 1em 4em 1em;
`;

const StyledCoffeeShop = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  background-image: url("https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_1280.jpg");
  transition: 0.3s;
  border: 0.1em solid;
  border-radius: 30px;
  padding: 1em;
  width: 200px;
  height: flex;
  object-fit: scale-down;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
`;

const CoffeeShopImage = styled.img`
  flex: 1;
`;

const Box = styled.div`
  display: flex;
  width: 175px;
  min-height: 300px;
  flex-direction: column;
  padding: 5%;
  height: 100%;
`;

const BigBox = styled.div`
  display: flex;
  width: 600px;
  min-height: 300px;
  flex-direction: column;
  padding: 5%;
  height: 100%;
`;

const StyledImage = styled.img`
  border-radius: 50%;
`;

const StyledButton = styled.button`
  display: inline-block;
  padding: 0.3em;
  border-radius: 2em;
  background-color: #4e9af1;
`;

const PlusButton = styled.button`
  display: incline-block;
  // padding: 0.1em 0.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid green;
  border-radius: 1em;
  background-color: green;
  color: white;
  text-align: center;
  font-size: 30px;
  transition: all 0.2s;
  &:hover {
     border-color: black;
  }
`;

export default Profile;
