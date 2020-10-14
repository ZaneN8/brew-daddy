import axios from "axios";
import React,{useState,useEffect,useContext} from "react";
import {Button, Form} from "react-bootstrap"
import { AuthContext } from "../providers/AuthProvider";

const EditProfileForm = () => {
  const { user, handleUpdate } = useContext(AuthContext)
  const [userState, setUserState]= useState(user)

 const handleSubmit = (e) =>{
  e.preventDefault()
  //handleupdate is in Auth Provider
  handleUpdate(userState)
 }

  
  const handleChange = (e) => {
    setUserState({ ...userState ,[e.target.name]: e.target.value })};

  return(
    <Form
    onSubmit ={(e) => { handleSubmit()}}
    >
      <Form.Group>
      <Form.Label> First Name</Form.Label>
      <Form.Control 
      type="text"
      name="first_name"
      value={userState.first_name}
      onChange = {handleChange}
      />
      </Form.Group>
      <Form.Group>
     <Form.Label> Last Name</Form.Label>
      <Form.Control 
      type="text"
      name="last_name"
      value={userState.last_name}
      onChange = {handleChange}
      />
      </Form.Group>
      <Form.Group>
      <Form.Label> Email:</Form.Label>
      <Form.Control 
      type="text"
      name="email"
      value={userState.email}
      onChange ={handleChange}
      />
      </Form.Group>
      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
  
  )
};

export default EditProfileForm;
