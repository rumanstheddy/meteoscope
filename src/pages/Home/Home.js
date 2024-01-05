import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Box, Flex, Heading, Icon, Img, Spinner, Text } from "@chakra-ui/react";
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
    console.log(debouncedSearchQuery);
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
    "Meteoscope harnesses the Open Meteo API to provide precise weather forecasts for any location around the globe.";

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBoxHeight = debouncedSearchQuery
    ? ["85%", "70%", "70%", "65%"]
    : ["55%", null, "null", "50%"];

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      // alignContent={"center"}
      justifyContent={"center"}
      // flexDirection="column"
      alignItems={"center"}
      // bgImage="url(./killmong.jpg)"
      // bgSize={"cover"}
      // bgColor={"black"}

      bgGradient="linear(to-l, #FFB300, #FFBC00, #FFC500, #FFCD00, #FFD600, #FFDF00)"
      position={"relative"}
    >
      <Flex
        width={["90%", null, "70%", "50%"]}
        height={handleBoxHeight}
        alignContent={"center"}
        justifyContent={"center"}
        flexDirection="column"
        boxShadow="2xl"
        rounded="2xl"
        pt={"40px"}
        pb={"40px"}
        mb={"100px"}
        bg={"white"}
        mt={["20px", null, null, null]}
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
            w={[20, null, 20, null]}
            // h={20}
            h={[40, null, 40, null]}
            mt={"-40px"}
          />
          <Heading
            bgGradient="linear(to-l, #FFDF00, #FFD600, #FFCD00, #FFC500, #FFBC00, #FFB300)"
            bgClip="text"
            fontSize={["6xl", "7xl", null, null]}
            fontWeight="600"
            // textShadow="#FFDF00 5px 5px 10px"
            mt={["-60px", null, "-50px", null]}
          >
            Meteoscope
          </Heading>
        </Flex>
        <Box mt={"30"}>
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
            _focus={{ borderColor: "#FFCD00", boxShadow: "none" }}
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
          overflow={"visible"}
        >
          {searchResults &&
            searchResults.map((location) => {
              return (
                <Link to="/forecast" state={location}>
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
        {/* </Box> */}
      </Flex>
    </Flex>
  );
};

export default Home;
