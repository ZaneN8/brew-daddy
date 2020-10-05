import React, {useState } from "react";




//dummy data for frontend
let cShops = [{id:1, name: "CoffeeShop1", description: "This place sucks", city: "SLC", state: 'UT', zip: "123456"},
{id:2, name: "CoffeeShop2", description: "This place Rocks", city: "South", state: 'West', zip: "765"}]

const Home = () => {
  const [shops, setShops] = useState(cShops) // dummy date

  // const getShops = async () => {
  //   try {
  //     let res = Axios.get("/api/coffee_shop")
  //   }
  // }

const renderShops = () => {
  return shops.map((shop) => (
  <div>
    <h2>{shop.name}</h2>
  <p>{shop.description}</p>
  </div>
  ))
}




  return (
    <>
  <h1>Welcome to Brew Daddy</h1>
  <br />
  {renderShops()}
  </>
  )
}

export default Home;





