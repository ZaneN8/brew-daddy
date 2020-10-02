import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

// For Basic setup only please change
const NavBar = () => {
  const history = useHistory();
  const { user, handleLogout } = useContext(AuthContext);

  const correctNavBar = () => {
    if (user) {
      return (
        <>
          <Link onClick={() => handleLogout(history)}>Logout</Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login">Login</Link>
          <span style={{ marginRight: "10px" }}></span>
          <Link to="/register">Register</Link>
        </>
      );
    }
  };

  return (
    <div style={styles.navbar}>
      <Link to="/">DashBoard</Link>
      <span style={{ marginRight: "10px" }}></span>
      <div>{correctNavBar()}</div>
      {user && <Link to="/samplesDemo">Samples</Link>}
    </div>
  );
};

const styles = {
  navbar: {
    background: "black",
    padding: "10px",
  },
};

export default NavBar;
