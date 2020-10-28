import React from "react";
import HomeSearch from "../search/HomeSearch";
import About from "./About";
import Team from "./Team";
import styled from "styled-components";

const Lander = () => {
  return (
    <>
      <Wrapper url="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80">
        <StyledLayout>
          <Row>
            <HomeSearch />
          </Row>
        </StyledLayout>
      </Wrapper>

      <StyledLayout>
        <Row>
          <div>
            <h2>We are Brew Daddy</h2>
            <p>
              <About />
            </p>
          </div>
        </Row>
        <Row>
          <Column2>
            <Card1>
              <h2> Your Perfect Shop </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
                amet justo donec enim diam vulputate.
              </p>
            </Card1>
            <Card2>
              <h2> Get Involved </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
                amet justo donec enim diam vulputate.
              </p>
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
                amet justo donec enim diam vulputate.
              </p>
            </Card2>
            <Card1>
              <h2> Voice an Opinion </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
                amet justo donec enim diam vulputate.
              </p>
            </Card1>
          </Column2>
        </Row>
      </StyledLayout>
      <Row>
        <Wrapper1>
          <h2 style={{ color: "white", paddingTop: "90px" }}>Meet Our Team</h2>
        </Wrapper1>
      </Row>
      <StyledLayout>
        <Team />
      </StyledLayout>
      <Wrapper1>{"     "}</Wrapper1>
    </>
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
  color: white;
  background: linear-gradient(156.55deg, #2d2721 30.74%, #8a8179 149.22%);
  margin: 10px;
  padding: 10px;
  flex: 1;
  border-radius: 16px;
  width: 570px;
  height: 200px;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
`;

const Card2 = styled.div`
  background: linear-gradient(156.55deg, #fdf6ee 30.74%, #dbd4cc 149.22%);
  margin: 10px;
  padding: 10px;
  flex: 1;
  border-radius: 16px;
  width: 570px;
  height: 200px;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
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
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px;
  flex-shrink: 0;
  margin: 0;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px;
  flex: 10;
  margin: 0;
  background: black;
`;

export default Lander;
