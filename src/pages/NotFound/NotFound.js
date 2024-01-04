import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Flex flexDirection="column" justifyContent="center">
      <Text fontSize="4xl">
        The page you are looking for, could not be found.
      </Text>
      <Text noOfLines={1} fontSize="2xl">
        Navigate to the homepage by clicking{" "}
        <Text as="ins" color="blue">
          <Link to="/">here</Link>
        </Text>
      </Text>
    </Flex>
  );
};

export default NotFound;
