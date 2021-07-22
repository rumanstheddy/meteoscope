import React from "react";
import "./Home.scss";
import { Jumbotron, Input, Button, InputGroup } from "reactstrap";

const Home = () => {
  return (
    <div className="container">
      <Jumbotron>
        <p className="display-1 mt-4">
          <i class="fas fa-sun" id="logo"></i> Wcast
        </p>
        <p className="display-6 pt-2">Search the current weather for a city:</p>
        <InputGroup id="searchInputGrp">
          <Input
            type="search"
            name="citySearch"
            id="citySearch"
            placeholder="City"
          />
          <Button type="button" color="primary" id="citySearchBtn">
            Search
          </Button>
        </InputGroup>
      </Jumbotron>
      {/* TODO: Use API to fetch data and create other component to display weather */}
    </div>
  );
};

export default Home;
