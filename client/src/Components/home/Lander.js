import React from "react";
import HomeSearch from "../search/HomeSearch";
import About from "./About";
import Team from "./Team";
import styled from "styled-components";

const Lander = () => {
  return (
    <StyledLayout>
      <div>
        <HomeSearch />
      </div>
      <Row>
        <div>
          <h3>We are Brew Daddy</h3>
          <About />
        </div>
      </Row>
      <Row>
        <Column2>
          <Card1>
            <h2> Your Perfect Shop </h2>
          </Card1>
          <Card2>
            <h2> Get Involved </h2>
          </Card2>
        </Column2>
        <Column1>
          <StyledImage src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" />
        </Column1>
      </Row>
      <Row>
        <Column1>
          <StyledImage src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" />
        </Column1>
        <Column2>
          <Card2>
            <h2> Take Pictures </h2>
          </Card2>
          <Card1>
            <h2> Voice an Opinion </h2>
          </Card1>
        </Column2>
      </Row>
      <Team />
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  max-width: 1168px;
  margin: auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  padding: 1em 4em 1em;
`;

const Row = styled.div`
  display: flex;
`;

const Card1 = styled.div`
  background: linear-gradient(
    156.55deg,
    #d8d8d8 30.74%,
    rgba(255, 255, 255, 0) 149.22%
  );
  margin: 10px;
  padding: 10px;
  flex: 1;
  border-radius: 16px;
  width: 570px;
  height: 200px;
`;

const Card2 = styled.div`
  background: linear-gradient(
    156.55deg,
    #4d4d4d 30.74%,
    rgba(77, 77, 77, 0) 149.22%
  );
  margin: 10px;
  padding: 10px;
  flex: 1;
  border-radius: 16px;
  width: 570px;
  height: 200px;
`;

const Column1 = styled.div`
  flex: 5;
  display: flex;
  flex-directionL column;
`;

const Column2 = styled.div`
  flex: 5;
`;

const StyledImage = styled.img`
  border-radius: 15px;
  width: 500px;
  height: 500px;
`;

export default Lander;
