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
            {"    "}Logout
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link style={{ color: "black", marginLeft: "7px" }} to="/login">
            {"    "}Login
          </Link>
          <span style={{ marginRight: "10px" }}></span>
          <Link style={{ color: "black" }} to="/register">
            {"    "}Register
          </Link>
        </>
      );
    }
  };

  return (
    <StyledLayout>
      <div style={styles.navbar}>
        <div style={{ justifyContent: "space-between", padding: "10px" }}>
          <Row>
            <Col>
              <Link to="/">
                <StyledImage src={BrewDad} />
              </Link>
            </Col>
            <Col>
              <Link style={{ color: "black" }} to="/">
                Home{"    "}
              </Link>
              <span style={{ marginRight: "10px" }}></span>
              {user && (
                <Link style={{ color: "black" }} to="/profile">
                  Profile{"    "}
                </Link>
              )}
              {correctNavBar()}
            </Col>
          </Row>
        </div>
      </div>
    </StyledLayout>
  );
};

const styles = {
  navbar: {
    background: "#FBF7F3",
    textAlign: "end",
  },
};

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLayout = styled.div`
  max-width: 100%;
  max-height: 50px
  margin: 0%;
  display: flex;
  flex-direction: column;
  background: "#BFBFBF";
`;

const StyledImage = styled.img`
  display: flex;
  flex: 1;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  margin-right: 80% !important;
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

export default NavBar;
