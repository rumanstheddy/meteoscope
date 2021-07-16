import React from "react";
import "./Home.css";
import { Jumbotron } from "reactstrap";

const Home = () => {
  return (
    <div className="container">
      <Jumbotron>
        <p className="display-1 mt-4">Wcast</p>
        <p className="display-6 pt-2">Weather prediction for 5 days in:</p>
        <p className="lead"><b>New York</b></p>
      </Jumbotron>
    </div>
  );
};

export default Home;
