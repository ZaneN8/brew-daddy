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
      history.push("./");
    } catch (err) {
      alert("Register Failed");
    }
  };

  const handleLogin = async (user, history) => {
    try {
      let res = await axios.post("/api/auth/sign_in", user);
      setUser(res.data.data);
      history.push("/");
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
      setUser(null);
      history.push("/login");
    } catch (err) {
      console.log("Logout Failed");
    }
  };

  const handleUpdate = async (user) => {
    try {
      let res = await axios.put(`/api/users/${user.id}`, user)
      setUser(res.data)
    } catch (err) {
      console.log("Edit failed")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        handleRegister,
        handleLogout,
        handleLogin,
        handleUpdate
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
