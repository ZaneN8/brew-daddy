import React from "react";
import styled from "styled-components";
import Jon from "../../image/Jon.png";
import Simon from "../../image/simon.jpeg";
import Riley from "../../image/IMG_2073.jpg";
import Zane from "../../image/ZanePhoto.jpeg";

const Team = () => {
  return (
    <>
      <Row>
        <Column1>
          <StyledImage url={Jon} />
        </Column1>
        <Column2>
          <Card>
            <h3 style={{ textAlign: "left" }}>Jon Roberts</h3>
            <p style={{ textAlign: "left" }}>
              Jon Roberts is the brain behind the back-end. He fell in love with
              JSON during this development. He worked on the models and
              controllers on the back-end with Riley. He handled the search
              function, pagination for the search result, created custom SQL
              queries for different parts (such as average rating, counts, and
              so on). He was one of the main reviewer, reviewing most of pull
              requests with Zane. He also did lot of bug fixes as well!
            </p>
          </Card>
        </Column2>
      </Row>
      <Row>
        <Column2>
          <Card>
            <h3 style={{ textAlign: "right" }}>Simon Johnston</h3>
            <p style={{ textAlign: "right" }}>
              Simon Johnston is one of the front end developers involved with
              this project. Having background experience with graphic design it
              helped apply modern day practices to make the website
              aesthetically pleasing. He worked closely with Zane on Form,
              Profile, Questions & Answers, Reviews, and Coffee Shop pages.
            </p>
          </Card>
        </Column2>
        <Column1>
          <StyledImage url={Simon} />
        </Column1>
      </Row>
      <Row>
        <Column1>
          <StyledImage url={Zane} />
        </Column1>
        <Column2>
          <Card>
            <h3 style={{ textAlign: "left" }}>Zane Newsom</h3>
            <p style={{ textAlign: "left" }}>
              Zane Newsom, a name associated with leadership, styling, coding,
              and Brew Daddy. One of the front end developers for the Brew
              Daddy. With full-stack skill to really push this webpage to the
              next level, which not only earned but demanded respect. He was
              responsible for linking the data from back-end, set up these data
              to be present as information on the pages. He is the maintainer
              the repository, he reviewed most of the codes coming from the
              back-end along with Jon.
            </p>{" "}
          </Card>
        </Column2>
      </Row>
      <Row>
        <Column2>
          <Card>
            <h3 style={{ textAlign: "right" }}>Riley Santi</h3>
            <p style={{ textAlign: "right" }}>
              Riley Santi is new to full-stack development and it has quickly
              become his newest passion. He worked on the back-end with Jon, the
              front-end building custom React components, pagination for the
              questions, answers, and review sections, also helping with the
              styling on this project. A special thanks to my entire family but
              especially his beautiful wife Leah and two amazing children Milo
              and Coco for their continued support over the course of this
              project.
            </p>{" "}
          </Card>
        </Column2>
        <Column1>
          <StyledImage url={Riley} />
        </Column1>
      </Row>
      <Row>
        <Column1>
          <StyledImage url="https://cdn.shopify.com/s/files/1/0863/0604/products/Marmoset8x10.jpg?v=1531867498" />
        </Column1>
        <Column2>
          <Card>
            <h3 style={{ textAlign: "left" }}>Nick Ristagno</h3>
            <p style={{ textAlign: "left" }}>
              Nick Ristagno is the project manager for this project. He liked to
              challenge all the developers on this team, made them pull their
              hairs out. He is responsible for all the designs for this project.
              He was recently offered a full-time job and decided to abandon us.
              Farewell, be well, Nick!
            </p>{" "}
          </Card>
        </Column2>
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
  flex-direction: column;
`;

const Column2 = styled.div`
  flex: 8;
`;

const StyledImage = styled.div`
  border-radius: 50%;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  width:200px;
  height 200px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
