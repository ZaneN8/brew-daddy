import React from "react";
import HomeSearch from "../search/HomeSearch";
import About from "./About";
import Team from "./Team";
import styled from "styled-components";

const Lander = () => {
  return (
    <>
      <Wrapper url="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80">
        <HomeSearch />
      </Wrapper>

      <StyledLayout>
        <Row>
          <div>
            <h2 style={{ paddingTop: "5%" }}>We are Brew Daddy</h2>
            <p>
              <About />
            </p>
          </div>
        </Row>
        <Row>
          <Column2>
            <Card1 style={{ margin: "0 30px 30px 0" }}>
              <h2> Your Perfect Shop </h2>
              <p>
                Find your perfect coffee shop. You will be able to see each
                coffee with its information and reviews. Want to look for the
                best taste? or Best place to work away from office? We got you
                covered!
              </p>
            </Card1>
            <Card2 style={{ margin: "0 30px 0 0" }}>
              <h2> Get Involved </h2>
              <p>
                We encourage people to be involved by telling their thoughts of
                the coffee shop!
              </p>
            </Card2>
          </Column2>
          <StyledImage url="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" />
        </Row>
        <Spacer />
        <Row>
          <StyledImage url="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" />
          <Column2>
            <Card2 style={{ margin: "0 0 30px 30px" }}>
              <h2> Take Pictures </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
                amet justo donec enim diam vulputate.
              </p>
            </Card2>
            <Card1 style={{ margin: "0 0 0 30px" }}>
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
        <Wrapper1 style={{ background: "#FBF7F3" }}>
          <h2 style={{ color: "black", paddingTop: "90px" }}>Meet Our Team</h2>
        </Wrapper1>
      </Row>
      <StyledLayout>
        <Team />
      </StyledLayout>
      <Wrapper1 style={{ background: "#2D2721" }}>{"     "}</Wrapper1>
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
  padding-top: 2.5% !important;
`;

const Card1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: white;
  background: linear-gradient(156.55deg, #2d2721 30.74%, #8a8179 149.22%);
  padding: 20px;
  flex: 1;
  border-radius: 16px;
  flex-grow: 1;
  height: 235px;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
`;

const Card2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: linear-gradient(156.55deg, #fdf6ee 30.74%, #dbd4cc 149.22%);
  padding: 10px;
  flex: 1;
  border-radius: 16px;
  flex-grow: 1;
  height: 235px;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
`;

const Column1 = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Column2 = styled.div`
  flex: 5;
`;

const StyledImage = styled.div`
  border-radius: 15px;
  width: 500px;
  height: 500px;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
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
`;

const Spacer = styled.div`
  height: 60px;
`;

export default Lander;
