import { Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <Text>The page you are looking for, could not be found.</Text>
      <Text>
        Navigate to the homepage, by clicking <Link to="/">here</Link>
      </Text>
    </div>
  );
};

export default NotFound;
