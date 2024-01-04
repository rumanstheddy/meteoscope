import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Box, Flex, Heading, Icon, Spinner, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { getLocationsFromSearch } from "../../apis/WeatherAPI";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import { WiSunrise } from "react-icons/wi";

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

  const searchPholderText = "Enter a location 📍";
  const summaryText =
    "Meteoscope harnesses the Open Meteo API to provide precise weather  forecasts for any location.";

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Flex
      width={"100vw"}
      height={"80vh"}
      alignContent={"center"}
      justifyContent={"center"}
      flexDirection="column"
    >
      {/* TODO: make the web page transparent */}
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Icon
          as={WiSunrise}
          // boxSize={20}
          color=" #FFB300"
          id="sun-icon-logo"
          // w={40}
          w={[60, null, null, 40]}
          // h={20}
          h={[40, null, null, 40]}
        />
        <Heading
          bgGradient="linear(to-l, #FFDF00, #FFD600, #FFCD00, #FFC500, #FFBC00, #FFB300)"
          bgClip="text"
          fontSize="7xl"
          fontWeight="600"
          // textShadow="#FFDF00 5px 5px 10px"
          mt="-20px"
        >
          Meteoscope
        </Heading>
      </Flex>
      <Box mt={[30, null, null, null]}>
        <Text
          color="#666"
          ml={[25, null, null, 30]}
          mr={[25, null, null, 30]}
          mb="20px"
          fontSize="lg"
        >
          {summaryText}
        </Text>
        <Input
          placeholder={searchPholderText}
          size="lg"
          w={["60vw", null, "50vw", "40vw"]}
          textAlign="center"
          boxShadow="sm"
          onChange={(e) => handleSearch(e)}
        />
      </Box>
      {/* TODO: Learn more about async, await and map function */}
      {loading && (
        <Spinner
          mt="50px"
          alignItems="center"
          textAlign="center"
          ml="auto"
          mr="auto"
        />
      )}
      {/* <Box textAlign="center" ml="auto" mr="auto"> */}
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
      >
        {searchResults &&
          searchResults.map((location) => {
            console.log(typeof location);
            console.log(location);
            return (
              <Link to="/forecast" state={location}>
                <Box
                  pt={["40px", null, null, "15px"]}
                  pb={["40px", null, null, "15px"]}
                  borderRadius="5px"
                  // border="1px"
                  // borderColor="var(--chakra-colors-gray-300)"
                  key={`${location.latitude}${location.longitude}`}
                >
                  {location.name}, {location.admin1}, {location.country}
                </Box>
              </Link>
            );
          })}
      </Box>
      {/* </Box> */}
    </Flex>
  );
};

export default Home;
