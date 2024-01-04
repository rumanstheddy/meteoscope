import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { getLocationsFromSearch } from "../../apis/WeatherAPI";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      getLocationsFromSearch(debouncedSearchQuery, 5).then((data) => {
        setSearchResults(data.results || []);
        setLoading(false);
      });
    };

    if (debouncedSearchQuery) fetchResults();
    return () => setSearchResults([]);
  }, [debouncedSearchQuery]);

  const searchPholder = "Search the current weather for a location 📍";

  const handleSearch = (e) => {
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
          maxW={["60vw", null, "50vw", "40vw"]}
          textAlign="center"
          boxShadow="sm"
          onChange={(e) => handleSearch(e)}
        />
      </Box>
      {/* TODO: Learn more about async, await and map function */}
      {loading && <Spinner />}
      <Box textAlign="center" ml="auto" mr="auto">
        <Box
          boxShadow="md"
          // flexDirection={"column"}
          maxW={["60vw", null, "50vw", "40vw"]}
          // alignItems={"center"}
          // justifyContent={"center"}
          alignItems="center"
          borderRadius="5px"
          textAlign="center"
          ml="auto"
          mr="auto"
        >
          {searchResults &&
            searchResults.map((location) => {
              console.log(typeof location);
              console.log(location);
              return (
                <Box
                  pt={["40px", null, null, "15px"]}
                  pb={["40px", null, null, "15px"]}
                  borderRadius="5px"
                  // border="1px"
                  // borderColor="var(--chakra-colors-gray-300)"
                  key={`${location.latitude}${location.longitude}`}
                >
                  <Link to="/forecast" state={location}>
                    {location.name}, {location.admin1}, {location.country}
                  </Link>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
