import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getForecastFromLocation } from "../apis/WeatherAPI";
import ReactAnimatedWeather from "react-animated-weather";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";

const Forecast = () => {
  const location = useLocation();
  const [forecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      console.log(location);
      setLoading(true);
      getForecastFromLocation(
        location.state.latitude,
        location.state.longitude
      ).then((data) => {
        console.log(data);
        setForecastData(data || {});
        setLoading(false);
      });
    };
    fetchResults();
  }, [location]);

  console.log("location: ", location.state);
  console.log("weather: ", forecastData);

  const displayDate = (forecastData) => {
    if (forecastData && forecastData.current && forecastData.current.time)
      return (
        <Text fontSize="2xl" fontWeight={"500"}>
          {new Date(forecastData.current.time).toLocaleString()}{" "}
          {forecastData.timezone}
        </Text>
      );
  };

  const displayForecastInfo = () => {
    if (forecastData && forecastData.current)
      return (
        <Box>
          {displayDate(forecastData)}
          <Text fontSize="6xl">
            {forecastData.current.temperature_2m}
            {forecastData.current_units.temperature_2m}
          </Text>
          <Text fontSize="2xl">
            {forecastData.current.is_day ? "Day" : "Night"}
          </Text>
        </Box>
      );
  };

  return (
    // <Flex
    //   width={"100vw"}
    //   height={"70vh"}
    //   alignContent={"center"}
    //   justifyContent={"center"}
    //   flexDirection="column"
    // >
    //   <Card
    //     maxW={["60vw", null, "50vw", "40vw"]}
    //     textAlign="center"
    //     ml="auto"
    //     mr="auto"
    //     mt="20vh"
    //     color="#666"
    //   >
    //     <CardHeader>
    //       <Heading size="md">
    //         {location.state.name}, {location.state.admin1},{" "}
    //         {location.state.country} ({location.state.country_code})
    //       </Heading>
    //     </CardHeader>
    //     <CardBody>
    //       {loading && <Spinner mt="50px" />}
    //       {displayForecastInfo()}
    //     </CardBody>
    //   </Card>
    //   <Text as="ins" color="blue">
    //     <Link to="/">back</Link>
    //   </Text>
    // </Flex>
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
          height={["55%", "45%", null, null]}
          alignContent={"space-around"}
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
          <Flex
            justifyContent={"space-around"}
            alignItems={"center"}
            w={"100%"}
            flexDirection={"row"}
          >
            <Text
              color="black"
              // ml={[25, null, null, 30]}
              // mr={[25, null, null, 30]}
              fontSize="lg"
              fontWeight={"500"}
            >
              {location.state.name}, {location.state.admin1},{" "}
              {location.state.country} ({location.state.country_code})
            </Text>
            <Text
              color="#666"
              // ml={[25, null, null, 30]}
              // mr={[25, null, null, 30]}
              fontSize="4xl"
              fontWeight={"500"}
            >
              {forecastData &&
              forecastData.current &&
              forecastData.current.is_day ? (
                <LuSun />
              ) : (
                <LuMoon />
              )}
            </Text>
            {displayDate(forecastData)}
          </Flex>
          <Flex
            flexDirection={"row"}
            alignContent={"center"}
            justifyContent={"space-around"}
            w={"100%"}
            mt={"50px"}
            mb={"50px"}
          >
            {/* <Text
                color="black"
                // ml={[25, null, null, 30]}
                // mr={[25, null, null, 30]}
                mb="20px"
                fontSize="lg"
                fontWeight={"500"}
              >
                {location.state.name}, {location.state.admin1},{" "}
                {location.state.country} ({location.state.country_code})
              </Text> */}
            <Text
              // bgGradient="linear(to-r, #FFB300, #FFBC00, #FFC500, #FFCD00, #FFD600, #FFDF00)"
              bgClip="text"
              fontSize={["5xl", "6xl", "7xl", null]}
              fontWeight="400"
              color="black"
              // textShadow="#FFDF00 5px 5px 10px"
              // mt={["-60px", null, "-50px", null]}
              letterSpacing={"-1px"}
              // pl={["30px", null, null, null]}
              // pr={[["30px", null, null, null]]}
              // mt={"50px"}
            >
              {forecastData && forecastData.current
                ? forecastData.current.temperature_2m
                : ""}
              {forecastData && forecastData.current
                ? forecastData.current_units.temperature_2m
                : ""}
            </Text>
            <Flex
              alignContent={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Text
                color="#666"
                fontSize="lg"
                fontWeight={"400"}
                alignSelf={"center"}
                pl={"20px"}
              >
                Feels like{" "}
              </Text>
              <Text
                color="#666"
                fontSize="5xl"
                fontWeight={"400"}
                alignSelf={"center"}
              >
                {forecastData && forecastData.current
                  ? forecastData.current.apparent_temperature
                  : ""}
                {forecastData && forecastData.current
                  ? forecastData.current_units.apparent_temperature
                  : ""}
              </Text>
            </Flex>
            <Box>
              <ReactAnimatedWeather
                icon={"CLOUDY"}
                color={"black"}
                size={120}
                animate={true}
              />
            </Box>
          </Flex>
          <Flex
            flexDirection={"row"}
            alignContent={"center"}
            justifyContent={"space-around"}
            w={"100%"}
          >
            <Box ml={"20px"}>
              Humidity{" "}
              {forecastData && forecastData.current
                ? forecastData.current.relative_humidity_2m
                : ""}
              {forecastData && forecastData.current
                ? forecastData.current_units.relative_humidity_2m
                : ""}
            </Box>
            <Box ml={"20px"}>
              Precipitation{" "}
              {forecastData && forecastData.current
                ? forecastData.current.precipitation
                : ""}{" "}
              {forecastData && forecastData.current
                ? forecastData.current_units.precipitation
                : ""}
            </Box>
            <Box ml={"20px"}>
              Wind Speed{" "}
              {forecastData && forecastData.current
                ? forecastData.current.wind_speed_10m
                : ""}{" "}
              {forecastData && forecastData.current
                ? forecastData.current_units.wind_speed_10m
                : ""}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Forecast;
