import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const handleRegister = async (user, history) => {
    try {
      let res = await axios.post("/api/auth", user);
      setUser(res.data.data);
      history.push("./home");
    } catch (err) {
      alert("Register Failed");
    }
  };

  const handleLogin = async (user, history) => {
    try {
      let res = await axios.post("/api/auth/sign_in", user);
      setUser(res.data.data);
      history.push("/home");
    } catch (err) {
      alert("error in logging in");
    }
  };

  //TODO We somehow broke this
  const handleLogout = async (history) => {
    console.log(user);
    try {
      // await block until done
      let res = await axios.delete("/api/auth/sign_out");
      debugger;
      setUser(null);
      history.push("/login");
    } catch (err) {
      debugger;
      console.log("Logout Failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        handleRegister,
        handleLogout,
        handleLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
