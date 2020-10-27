import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const UserRating = ({ userId }) => {
  const [ratingsData, setRatingsData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${userId}/stats`)
      .then((res) => setRatingsData(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderAllRating = () => {
    return (
      <div>
        <StyledUserInfo>
          {ratingsData && ratingsData.total_count} Reviews
        </StyledUserInfo>
        <StyledUserInfo>
          {ratingsData.total_rating
            ? ratingsData.total_rating.toFixed(1)
            : "NA"}{" "}
          Avg Rating
        </StyledUserInfo>
      </div>
    );
  };

  return <>{ratingsData && renderAllRating()}</>;
};

const StyledUserInfo = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  padding-left: 20px;
`;

export default UserRating;
