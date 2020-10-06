import React, {useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import Axios from 'axios'




//dummy data for frontend
// let cShops = [{id:1, name: "CoffeeShop1", description: "This place sucks", city: "SLC", state: 'UT', zip: "123456"},
// {id:2, name: "CoffeeShop2", description: "This place Rocks", city: "South", state: 'West', zip: "765"}]

const Home = () => {
  const [shops, setShops] = useState([]) // dummy date

  const getShops = async () => {
    try {
      let res = await Axios.get("/api/coffee_shops")
      setShops(res.data)
    } catch (err) {
      console.log(err.response)
      alert("Error: Importing API")
    }
  }

const renderShops = () => {
  return shops.map((shop) => (
  <div>
    <img src={shop.image} />
    <Link as="h1" to={`/coffee_shops/${shop.id}`}>{shop.name}</Link>
  <p>{shop.description}</p>
  </div>
  ))
}

  useEffect(()=>{
    getShops()
  },[])


  return (
    <>
  <h1>Welcome to Brew Daddy HOME</h1>
  <br />
  {renderShops()}
  </>
  )
}

export default Home;





