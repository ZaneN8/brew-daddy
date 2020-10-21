import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CoffeeShopForm from "../coffeeShop/CoffeeShopForm";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import EditProfileForm from "./EditProfileForm";
import { Modal, Form } from "react-bootstrap";
import styled from "styled-components";

const Profile = () => {
  const [shops, setShops] = useState([]);
  const [profileReviews, setProfileReviews] = useState([]);
  const [profileCoffeeShops, setProfileCoffeeShops] = useState([]);
  const [show, setShow] = useState(false);
  const { user, handleUpdate, handleImageUpdate } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [changePic, setChangePic] = useState(false);
  const handleClose = () => setChangePic(false);
  const handleShow = () => setChangePic(true);
  const [fileState, setFileState] = useState({
    url: null,
    blob: null,
    file: null,
  });

  const getProfileReviews = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/reviews`);
      setProfileReviews(res.data);
    } catch (err) {
      alert("Error: failed to get this profiles reviews");
    }
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

  const addCoffeeShop = (shop) => setShops([...shops, shop]);

  const renderProfileReviews = () => {
    return profileReviews.map((review) => (
      <div className="profileReviewRender" key={review.id}>
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
        <div className="coffeeShopRender" key={coffeeShop.id}>
          <img src={coffeeShop.image} />
          <h5>{coffeeShop.name}</h5>
          <p>
            {coffeeShop.state}, {coffeeShop.city}, {coffeeShop.zip}
          </p>
        </div>
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
            <StyledImage onClick={handleShow} src={user.image} />
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

          <button onClick={() => setShowEdit(!showEdit)}>
            {show ? "Cancel " : <span>&#128295;</span>}
          </button>
          {showEdit && <EditProfileForm hide={setShowEdit} />}
        </div>
      </Box>

      <BigBox>
        <p>About me info HERE</p>
        <h1>Profiles Reviews</h1>
        <div>{renderProfileReviews()}</div>
        <hr />
      </BigBox>
      <Box>
        <h3>{user.name} Coffee Shops </h3>
        <div>{renderProfileCoffeeShop()}</div>

        <hr />
        <div className="CoffeeShop Right">
          <PlusButton onClick={() => setShow(!show)}>
            {show ? <span>&#8854;</span> : <span>&#8853;</span>}
          </PlusButton>
          {show && <CoffeeShopForm hide={setShow} add={addCoffeeShop} />}
        </div>
      </Box>
      <br />
      <br />
    </StyledLayout>
  );
};

const StyledPage = styled.div`
  padding: 1em 4em 1em;
`;

const StyledLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
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
