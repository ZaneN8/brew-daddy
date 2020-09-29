import React, {useContext}from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';
import {AuthContext} from '../providers/AuthProvider'
import {Link,useHistory} from "react-router-dom"


const NavBar =()=> {
const history = useHistory();
const {user,handleLogout} = useContext(AuthContext)


const getRightNav = () => {
  if (user) {
    return (
      <>
      <NavDropdown.Item
        onClick={() => console.log("hello")}> User Info
      </NavDropdown.Item>
      <NavDropdown.Item
        onClick={() => 
        handleLogout(history)}> Log Out
      </NavDropdown.Item>
      </>
      
    );
  } else {
    return (
      < div className="userLink">
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Login</Link>
      </div>
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
<NavDropdown title="User" id="basic-nav-dropdown">
{getRightNav()}
</NavDropdown>
</Nav>

)
}

export default NavBar;










