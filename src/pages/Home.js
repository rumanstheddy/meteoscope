import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Icon, Spinner, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { getLocationsFromSearch } from "../apis/WeatherAPI";
import useDebounce from "../hooks/useDebounce";
import { WiSunrise } from "react-icons/wi";
import ResultsBox from "../components/ResultsBox";

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

  const displayHomeInfo = () => (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Icon
        as={WiSunrise}
        // boxSize={20}
        color="#FFB300"
        id="sun-icon-logo"
        // w={40}
        w={[20, null, 20, null]}
        // h={20}
        h={[40, null, 40, null]}
        mt={"-40px"}
      />
      <Heading
        as={"h1"}
        bgGradient="linear(to-r, #FFB300, #FFBC00, #FFC500, #FFCD00, #FFD600, #FFDF00)"
        bgClip="text"
        fontSize={["5xl", "6xl", "7xl", null]}
        fontWeight="600"
        // textShadow="#FFDF00 5px 5px 10px"
        mt={["-60px", null, "-50px", null]}
        letterSpacing={"-1px"}
        pl={["30px", null, null, null]}
        pr={[["30px", null, null, null]]}
      >
        Meteoscope
      </Heading>
    </Flex>
  );

  const displayInputBox = () => (
    <Box mt={"30"}>
      <Text
        color="#666"
        ml={[25, null, null, 30]}
        mr={[25, null, null, 30]}
        mb="20px"
        fontSize="lg"
        fontWeight={"350"}
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
        fontSize={["14px", null, "16px", null]}
      />
    </Box>
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBoxHeight = debouncedSearchQuery
    ? ["85%", "70%", "80%", null]
    : ["55%", "45%", null, null];

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
      bgGradient="linear(to-l, #66b2ff, #39f, #007fff)"
    >
      <Flex
        width={"100vw"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex
          width={["90%", null, "70%", "50%"]}
          height={handleBoxHeight}
          alignContent={"center"}
          justifyContent={"center"}
          flexDirection="column"
          boxShadow="2xl"
          rounded="3xl"
          pt={"40px"}
          pb={"40px"}
          mb={"100px"}
          bg={"white"}
          mt={["100px", null, null, null]}
          zIndex={"2"}
        >
          {/* TODO: make the web page transparent */}
          {displayHomeInfo()}
          {displayInputBox()}
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
          <ResultsBox searchResults={searchResults} />
          {/* </Box> */}
        </Flex>
        <Box
          width={"100vw"}
          height={"100vh"}
          bgGradient="radial-gradient(#FFBC00, #F4D150)"
          // bg={"#E3B60F"}
          sx={{ "clip-path": "circle(25% at 100vw 100vh)" }}
          position={"absolute"}
          zIndex={"1"}
        ></Box>
      </Flex>
    </Flex>
  );
};

export default Home;