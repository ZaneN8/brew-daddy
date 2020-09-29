
import Axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

const FetchUser = (props) => {
  const [loaded, setLoaded] = useState(false);

  const { setUser, authenticated } = useContext(AuthContext);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
 
    if (authenticated || !localStorage.getItem("access-token")) {
      setLoaded(true);
      return;
    }

    try {
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