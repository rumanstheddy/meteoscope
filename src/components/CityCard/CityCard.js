import React from "react";
import "./CityCard.scss";
import { Card, CardBody, CardImg, CardTitle, Col } from "reactstrap";

const CityCard = () => {
  return (
    <Col xs="4">
      <Card className="card">
        <CardImg
          top
          width="100%"
          height="80%"
          src="https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=426&w=640"
          alt="city image"
        ></CardImg>
        <CardBody>
          <CardTitle tag="h5">City</CardTitle>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CityCard;
