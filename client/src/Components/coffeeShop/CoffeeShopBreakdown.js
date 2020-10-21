import React, { useState, useEffect } from "react"
import axios from "axios"

const CoffeeShopBreakdown= ({ match }) => {
const [breakdownRating, setBreakdownRating] = useState({});

useEffect(() => {
    axios
    .get(`/api/coffee_shops/${match.params.id}/count_reviews`)
    .then((res) => {
        console.log(res.data)
        setBreakdownRating(res.data)})
    .catch ((err) => {
        console.log("Error with Breakdown Rating");
    })
    
}, [])

const renderBreakdown = () => {
    return (
        <div>
        Breakdown of Review by Overall Rating
        </div>
    )
}


return (
    <>Breakdown:
    {renderBreakdown()}
    </>
)
}

export default CoffeeShopBreakdown