import React, {useContext}from 'react';
import {Nav} from 'react-bootstrap';
import {AuthContext} from '../providers/AuthProvider'
import {Link,useHistory} from "react-router-dom"


const NavBar =()=> {
const history = useHistory();
const {user,handleLogout} = useContext(AuthContext)

const getRightNav = () => {
  if (user) {
    return (
      <>
        <div onclick={() => handleLogout(history)}> logout!</div>
      </>
    );
  } else {
    return (
      <>
        <Link to="/register">register</Link>
        <Link to="/login">login</Link>
      </>
    );
  }
};



return (
<Nav className="justify-content-end" activeKey="/home">
<Nav.Item>
  <Nav.Link href="/home">Home</Nav.Link>
</Nav.Item>
<Nav.Item>
  <Nav.Link href="/about">About</Nav.Link>
</Nav.Item>
<Nav.Item>
  <Nav.Link href="/whatever">Sample</Nav.Link>
</Nav.Item>
<Nav.Item>
<Nav.Link>{getRightNav}</Nav.Link>
</Nav.Item>
</Nav>

)
}

export default NavBar;