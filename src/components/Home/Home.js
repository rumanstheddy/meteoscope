import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { getLocationsFromSearch } from "../../apis/WeatherAPI";
import useDebounce from "../../hooks/useDebounce";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // let results = await getLocationsFromSearch();
        // console.log("results: ", results);
        // setSearchResults(results);
        // TODO: Learn more about Array.from and spread operator
        getLocationsFromSearch(debouncedSearchQuery, 5).then((data) => {
          console.log("typeof data.results", typeof data.results);
          setSearchResults(data.results);
          setLoading(false);
        });
      } catch {
        setError("Error fetching data. Please try again.");
      }
    };

    if (debouncedSearchQuery) fetchResults();
  }, [debouncedSearchQuery]);

  const searchPholder = "Search the current weather for a location 📍";
  console.log("searchResults: ", searchResults);

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

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
      <Box mt={[50, null, null, 30]}>
        <Input
          placeholder={searchPholder}
          size="lg"
          maxW="40vw"
          textAlign="center"
          boxShadow="md"
          onChange={(e) => handleSearch(e)}
        />
      </Box>
      {/* TODO: Learn more about async, await and map function */}
      {/* {searchResults &&
        searchResults.map((location) => {
          console.log(searchResults);
          return (
            <Box>
              {location.name}, {location.admin1}, {location.country}
            </Box>
          );
        })} */}
    </Box>
  );
};

export default Home;
