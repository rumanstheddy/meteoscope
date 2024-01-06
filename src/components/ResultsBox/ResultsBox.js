import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const ResultsBox = ({ searchResults }) => {
  return (
    <Box
      boxShadow="md"
      // flexDirection={"column"}
      w={["60vw", null, "50vw", "40vw"]}
      // alignItems={"center"}
      // justifyContent={"center"}
      alignItems="center"
      borderRadius="5px"
      textAlign="center"
      ml="auto"
      mr="auto"
      overflow={"visible"}
    >
      {searchResults &&
        searchResults.map((location) => {
          return (
            <Link
              to="/forecast"
              state={location}
              key={`${location.latitude}${location.longitude}`}
            >
              <Box
                pt={["15px", null, null, "15px"]}
                pb={["15px", null, null, "15px"]}
                // h={["55px", null, null, "15px"]}
                fontSize={["15px", null, "16px", null]}
                borderRadius="5px"
                // border="1px"
                // borderColor="var(--chakra-colors-gray-300)"
                key={`${location.latitude}${location.longitude}`}
                _hover={{ bg: "#FFD600" }}
              >
                {location.name}, {location.admin1}, {location.country}
              </Box>
            </Link>
          );
        })}
    </Box>
  );
};

export default ResultsBox;
