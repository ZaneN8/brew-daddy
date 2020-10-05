import React, {useState, useEffect} from "react";
import Axios from "axios"

const CoffeeShop = ({ match, history }) => {
  const [shops, setShops] = useState([])
  const [reviews, setReviews] = useState([])


  useEffect(()=> {
    Axios.get(`/api/coffee_shops/${match.params.id}`)
    .then((res) => {
      setShops(res.data)
      console.log(res.data)
    }).catch((err) =>{
      // console.log()
      alert("Error: could not get shop info")
    })

    Axios.get(`/api/coffee_shops/${match.params.id}/reviews`)
  // Axios.get(`/api/reviews/all`)    
    .then((res) => {
      setReviews(res.data)
      console.log("Review")
      console.log(res.data)
    })
    .catch((err)=> {
      alert("ERROR: No reviews")
    })
}, [])

// const getShops = () => {
//  return (
//  <div>{}</div>
//  ) 
// }
  

  return(
    <div>
    <h1>
   Coffee Shop
  </h1>
  <p></p>
  <h4>Reviews will be going here </h4>
  
  </div>
  )
};

export default CoffeeShop;


// useEffect(() => {
//   Axios.get(`/api/departments/${match.params.id}`)
//     .then((res) => {
//       setDepartment(res.data);
//     })
//     .catch((err) => {
//       alert("Error: No departments loaded");
//     });

//   Axios.get(`/api/departments/${match.params.id}/items`)
//     .then((res) => {
//       setItem(res.data);
//     })
//     .catch((err) => {
//       alert("Error: Could not retrieve items");
//     });
// }, []);