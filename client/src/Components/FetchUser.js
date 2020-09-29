
import Axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

const FetchUser = (props) => {
  const [loaded, setLoaded] = useState(false);

  const { setUser, authenticated } = useContext(AuthContext);

  // when component mount call checkUser
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    // if user is authentecated or doesn't not have acces token
    // we can setloaded to true and return from the function call

    // have a user or dont have a token
    if (authenticated || !localStorage.getItem("access-token")) {
      setLoaded(true);
      return;
    }

    // user is not authentecated but has acces-token in local storage
    // let's check if it is valid if it, will grab and set user

    // have token but not a user, check if token is valid
    // reminder token is automically sent in headres
    try {
      //if successfull it will return users, if not it will throw error
      const res = await Axios.get("/api/auth/validate_token");
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
      console.log("unable to validate token");
    } finally {
      setLoaded(true);
    }
  };

  return loaded ? props.children : null;
};

export default FetchUser;