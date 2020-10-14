import axios from "axios";
import React,{useState,useEffect} from "react";
import {Form} from "react-bootstrap"

const EditProfileForm = ({editProp, editRow}) => {
  const [user,setUser] = useState(editProp.currentUser)

  
  const doEdit = async () => {
    try{
        let res = await axios.put(`/api/users/${user.id}`);
        setUser(res.data);
    } catch (err){
      alert("ERROR: could not edit because of Axios")
    }
  }

 
  useEffect(() => {
    setUser(editProp.user)
  }, [])
  
  const handleChange = (e) => {
    const{name,value} = e.target

    setUser({...user,[name]:value})
  }
  return(
    <Form
    onSubmit ={(e) => { e.preventDefault(); user.updateUser(user.id, user)}}
    >
      <Form.Group>
      <Form.Label> First Name</Form.Label>
      <Form.Control 
      type="text"
      name="first_name"
      value={editProp.first_name}
      onChange ={handleChange}
      />
      </Form.Group>
      <Form.Group>
     <Form.Label> Last Name</Form.Label>
      <Form.Control 
      type="text"
      name="last_name"
      value={editProp.last_name}
      onChange ={handleChange}
      />
      </Form.Group>
      <Form.Group>
      <Form.Label> Email:</Form.Label>
      <Form.Control 
      type="text"
      name="last_name"
      value={editProp.email}
      onChange ={handleChange}
      />
      </Form.Group>
      <Form.Group>
      <Form.File
      label="Upload User Image"
      name="image"
      value={editProp.image}
      onChange={handleChange}
          />
      </Form.Group>
    </Form>
  
  )
};

export default EditProfileForm;
