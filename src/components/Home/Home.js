import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { getLocationsFromSearch } from "../../apis/WeatherAPI";

const Home = () => {
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      // let results = await getLocationsFromSearch();
      // console.log("results: ", results);
      // setSearchResults(results);
      getLocationsFromSearch().then((data) => {
        setSearchResults(data.results);
      });
    };

    fetchResults();
  }, []);

  const searchPholder = "Search the current weather for a location 📍";
  console.log("searchResults: ", searchResults);

  return (
    <Box>
      {/* TODO: make the web page transparent */}
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        pt={"30px"}
      >
        <SunIcon boxSize={20} color=" #FFB300" pr="10px" id="sun-icon-logo" />
        <Text
          bgGradient="linear(to-l, #FFDF00, #FFD600, #FFCD00, #FFC500, #FFBC00, #FFB300)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          // textShadow="#FFDF00 5px 5px 10px"
        >
          W-cast
        </Text>
      </Flex>
      <Box mt={[50, null, null, 30]} mb="30px">
        <Input
          placeholder={searchPholder}
          size="lg"
          maxW="40vw"
          textAlign="center"
          boxShadow="md"
        />
      </Box>
      <Box>
        {/* TODO: Learn more about async, await and map function */}
        {searchResults.map((location) => (
          <div>
            {location.name}, {location.admin1}, {location.country}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
