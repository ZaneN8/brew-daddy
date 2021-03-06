import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import styled from "styled-components";
import BrewDad from "../../image/brew-daddy-logo.svg";
import { Col } from "react-bootstrap";
// For Basic setup only please change
const NavBar = ({ match }) => {
  const history = useHistory();
  const { user, handleLogout } = useContext(AuthContext);

  const correctNavBar = () => {
    if (user) {
      return (
        <>
          <Link
            style={{ color: "black", marginLeft: "7px" }}
            onClick={() => handleLogout(history)}
            to=""
          >
            Logout
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link style={{ color: "black", marginLeft: "7px" }} to="/login">
            Login
          </Link>
          <span style={{ marginRight: "10px" }}></span>
          <Link style={{ color: "black" }} to="/register">
            Register
          </Link>
        </>
      );
    }
  };

  return (
    <StyledLayout>
      <div>
        <Link to="/">
          <StyledImage src={BrewDad} />
        </Link>
      </div>
      <div>
        <Link style={{ color: "black" }} to="/">
          Home
        </Link>
        <span style={{ marginRight: "10px" }}></span>
        {user && (
          <Link style={{ color: "black" }} to="/profile">
            Profile
          </Link>
        )}
        {correctNavBar()}
      </div>
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 50px
  margin: 0;
  padding: 0 2rem;
  background-color: #FBF7F3;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
`;

const StyledImage = styled.img`
  display: flex;
  flex: 1;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  margin-right: 80% !important;
  border-radius: 50%;
  width: 75px;
  height: 75px;
`;

export default NavBar;
