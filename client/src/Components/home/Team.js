import React from "react";
import styled from "styled-components";

const Team = () => {
  return (
    <>
      <Row>
        <Column1>
          <StyledImage src="https://images.unsplash.com/photo-1587085580271-cf1389892268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" />
        </Column1>
        <Column2>
          <Card>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
              amet justo donec enim diam vulputate. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Sit amet justo donec enim diam
              vulputate.
            </p>{" "}
          </Card>
        </Column2>
      </Row>
      <Row>
        <Column2>
          <Card>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
              amet justo donec enim diam vulputate. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Sit amet justo donec enim diam
              vulputate.
            </p>
          </Card>
        </Column2>
        <Column1>
          <StyledImage src="https://cdn.shopify.com/s/files/1/0863/0604/products/Marmoset8x10.jpg?v=1531867498" />
        </Column1>
      </Row>
      <Row>
        <Column1>
          <StyledImage src="https://images.unsplash.com/photo-1587085580271-cf1389892268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" />
        </Column1>
        <Column2>
          <Card>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
              amet justo donec enim diam vulputate. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Sit amet justo donec enim diam
              vulputate.
            </p>{" "}
          </Card>
        </Column2>
      </Row>
      <Row>
        <Column2>
          <Card>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
              amet justo donec enim diam vulputate. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Sit amet justo donec enim diam
              vulputate.
            </p>{" "}
          </Card>
        </Column2>
        <Column1>
          <StyledImage src="https://images.unsplash.com/photo-1587085580271-cf1389892268?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" />
        </Column1>
      </Row>
    </>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Card = styled.div`
  background-color: white;
  margin: 10px;
  padding: 10px;
  flex: 1;
  border-radius: 16px;
`;

const Column1 = styled.div`
  flex: 2;
  display: flex;
  flex-directionL column;
`;

const Column2 = styled.div`
  flex: 8;
`;

const StyledImage = styled.img`
  border-radius: 50%;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  width:200px;
  height 200px;

`;

const StyledLayout = styled.div`
  max-width: 1168px;
  margin: auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  padding: 1em 4em 1em;
`;

export default Team;
