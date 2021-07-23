import React from "react";
import "./Home.scss";
import {
  Container,
  Jumbotron,
  Input,
  Button,
  InputGroup,
  Row,
} from "reactstrap";
import CityCard from "../CityCard/CityCard.js";

const Home = () => {
  return (
    <Container>
      <Jumbotron>
        <p className="display-1 mt-4">
          <i class="fas fa-sun" id="logo"></i> Wcast
        </p>
        <p className="display-6 pt-2">Search the current weather for a city:</p>
      </Jumbotron>
      <Row>
        <InputGroup id="searchInputGrp">
          <Input
            type="search"
            name="citySearch"
            id="searchInputFld"
            placeholder="City"
          />
          <Button type="button" color="primary" id="citySearchBtn">
            <i class="fas fa-search"></i>
          </Button>
        </InputGroup>
      </Row>
      <Row id="cardRow" className="row-container">
        {/* TODO: Use API to fetch data and create other component to display cities */}
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
      </Row>
    </Container>
  );
};

export default Home;
