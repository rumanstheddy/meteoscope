import { Box, Flex, Hide, Show, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getForecastFromLocation } from "../apis/WeatherAPI";
import ReactAnimatedWeather from "react-animated-weather";
import { BsMoonStars } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { IoRainyOutline } from "react-icons/io5";
import { FiWind } from "react-icons/fi";
import { HiStar } from "react-icons/hi";

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

  const displayDate = () => {
    if (forecastData && forecastData.current && forecastData.current.time)
      return (
        <Text
          fontSize={["sm", null, "lg", null]}
          fontWeight={"500"}
          mb={["5px", null, "-15px", null]}
        >
          {new Date(forecastData.current.time).toLocaleString()}{" "}
          {forecastData.timezone}
        </Text>
      );
  };

  const displayWeatherIcon = () => {
    if (forecastData && forecastData.current) {
      let fData = forecastData.current;
      let icon = fData.is_day ? "CLEAR_DAY" : "CLEAR_NIGHT";
      if (fData.rain > 2 || fData.showers > 2) icon = "RAIN";
      else if (fData.snowfall > 1) icon = "SNOW";
      else if (fData.cloud_cover > 70)
        icon = fData.is_day ? "PARTLY_CLOUDY_DAY" : "PARTLY_CLOUDY_NIGHT";
      else if (fData.wind_speed_10m > 10 * 3.6) icon = "WIND";
      return (
        <ReactAnimatedWeather
          icon={icon}
          color={"black"}
          size={110}
          animate={true}
        />
      );
    }
  };

  const displayStars = () => {
    if (forecastData && forecastData.current && !forecastData.current.is_day) {
      return (
        <Box>
          <Text
            fontSize={"8xl"}
            position={"absolute"}
            zIndex={"1"}
            left={"21vw"}
            top={"21vh"}
            color={"#CAC9C3"}
          >
            <HiStar />
          </Text>
          <Text
            fontSize={"8xl"}
            position={"absolute"}
            zIndex={"1"}
            left={"30vw"}
            bottom={"20vh"}
            color={"#CAC9C3"}
          >
            <HiStar />
          </Text>
          <Text
            fontSize={"8xl"}
            position={"absolute"}
            zIndex={"1"}
            right={"20vw"}
            top={"30vh"}
            color={"#CAC9C3"}
          >
            <HiStar />
          </Text>
        </Box>
      );
    }
  };

  const setColorTheme = (pageElement) => {
    if (pageElement && pageElement === "sunOrMoon") {
      let gradient =
        forecastData && forecastData.current && forecastData.current.is_day
          ? "radial-gradient(#FFBC00, #F4D150)"
          : "radial-gradient(#E2DCC8, #CAC9C3)";
      return (
        <Box
          width={"100vw"}
          height={"100vh"}
          bgGradient={gradient}
          sx={{ "clip-path": "circle(25% at 100vw 100vh)" }}
          position={"absolute"}
          zIndex={"1"}
        />
      );
    }

    if (pageElement && pageElement === "bgColor") {
      let gradient =
        forecastData && forecastData.current && forecastData.current.is_day
          ? "linear(to-l, #66b2ff, #39f, #007fff)"
          : "linear(to-r, #051020, #081830, #0C2244)";

      return gradient;
    }
  };

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
      bgGradient={setColorTheme("bgColor")}
    >
      <Flex
        width={"100vw"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex
          width={["80%", null, null, "50%"]}
          height={["90%", null, "45%", null]}
          alignContent={"center"}
          justifyContent={"space-around"}
          flexDirection="row"
          boxShadow="2xl"
          rounded="3xl"
          pt={"40px"}
          pb={"40px"}
          mb={"100px"}
          bg={"white"}
          mt={["100px", null, null, null]}
          zIndex={"2"}
        >
          <Hide below={"48em"}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              // w={"100%"}
              flexDirection={"column"}
            >
              <Text
                color="black"
                // ml={[25, null, null, 30]}
                // mr={[25, null, null, 30]}
                fontSize="md"
                fontWeight={"600"}
              >
                {location.state.name}, {location.state.admin1},{" "}
                {location.state.country} ({location.state.country_code})
              </Text>

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
                mt={"5rem"}
                mb={"5rem"}
              >
                {forecastData && forecastData.current
                  ? forecastData.current.temperature_2m
                  : ""}
                {forecastData && forecastData.current
                  ? forecastData.current_units.temperature_2m
                  : ""}
              </Text>
              <Flex flexDirection={"column"} justifyContent={"center"}>
                <Text fontSize={"5xl"} alignSelf={"center"}>
                  <WiHumidity />
                </Text>
                <Text fontSize={"lg"} mt={"1rem"}>
                  Humidity{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current.relative_humidity_2m
                    : ""}
                  {forecastData && forecastData.current
                    ? forecastData.current_units.relative_humidity_2m
                    : ""}
                </Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection={"column"}
              alignContent={"center"}
              justifyContent={"center"}
              // w={"100%"}
              // mt={"50px"}
              // mb={"50px"}
            >
              <Text
                color="black"
                // ml={[25, null, null, 30]}
                // mr={[25, null, null, 30]}
                fontSize="3xl"
                fontWeight={"500"}
                alignSelf={"center"}
              >
                {forecastData &&
                forecastData.current &&
                forecastData.current.is_day ? (
                  <BsSun />
                ) : (
                  <BsMoonStars />
                )}
              </Text>

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

              <Flex
                alignContent={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                mt={"5rem"}
                mb={"5rem"}
              >
                <Text
                  color="#666"
                  fontSize="lg"
                  fontWeight={"500"}
                  alignSelf={"center"}
                  // pl={"10px"}
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
              <Flex flexDirection={"column"} justifyContent={"center"}>
                <Text fontSize={"5xl"} alignSelf={"center"}>
                  <IoRainyOutline />
                </Text>
                <Text fontSize={"lg"} mt={"1rem"}>
                  Precipitation{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current.precipitation
                    : ""}{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current_units.precipitation
                    : ""}
                </Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection={"column"}
              alignContent={"center"}
              justifyContent={"center"}
              // w={"100%"}
            >
              {displayDate()}
              <Box alignSelf={"center"} mt={"5rem"} mb={"5rem"}>
                {displayWeatherIcon()}
              </Box>
              <Flex flexDirection={"column"} justifyContent={"center"}>
                <Text fontSize={"5xl"} alignSelf={"center"}>
                  <FiWind />
                </Text>
                <Text fontSize={"lg"} mt={"1rem"}>
                  Wind Speed{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current.wind_speed_10m
                    : ""}{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current_units.wind_speed_10m
                    : ""}
                </Text>
              </Flex>
            </Flex>
          </Hide>

          {/* Mobile Screen */}
          <Show below="48em">
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              // w={"100%"}
              flexDirection={"column"}
            >
              <Text
                color="black"
                // ml={[25, null, null, 30]}
                // mr={[25, null, null, 30]}
                fontSize="3xl"
                fontWeight={"500"}
                alignSelf={"center"}
                pb={"15px"}
              >
                {forecastData &&
                forecastData.current &&
                forecastData.current.is_day ? (
                  <BsSun />
                ) : (
                  <BsMoonStars />
                )}
              </Text>
              <Text
                color="black"
                // ml={[25, null, null, 30]}
                // mr={[25, null, null, 30]}
                fontSize="sm"
                fontWeight={"600"}
              >
                {location.state.name}, {location.state.admin1},{" "}
                {location.state.country} ({location.state.country_code})
              </Text>
              {displayDate()}
              <Box alignSelf={"center"}>{displayWeatherIcon()}</Box>
              <Text
                // bgGradient="linear(to-r, #FFB300, #FFBC00, #FFC500, #FFCD00, #FFD600, #FFDF00)"
                bgClip="text"
                fontSize={["4xl", "5xl", "7xl", null]}
                fontWeight="400"
                color="black"
                // textShadow="#FFDF00 5px 5px 10px"
                // mt={["-60px", null, "-50px", null]}
                letterSpacing={"-1px"}
                // pl={["30px", null, null, null]}
                // pr={[["30px", null, null, null]]}
                // mt={"5rem"}
                mb={"10px"}
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
                // mt={"5rem"}
                mb={"10px"}
              >
                <Text
                  color="#666"
                  fontSize="sm"
                  fontWeight={"500"}
                  alignSelf={"center"}
                  // pl={"10px"}
                >
                  Feels like{" "}
                </Text>
                <Text
                  color="#666"
                  fontSize="2xl"
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
              <Flex flexDirection={"column"} justifyContent={"center"}>
                <Text
                  fontSize={"4xl"}
                  alignSelf={"center"}
                  mt={"10px"}
                  mb={"5px"}
                >
                  <WiHumidity />
                </Text>
                <Text fontSize={"md"}>
                  Humidity{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current.relative_humidity_2m
                    : ""}
                  {forecastData && forecastData.current
                    ? forecastData.current_units.relative_humidity_2m
                    : ""}
                </Text>
              </Flex>
              <Flex flexDirection={"column"} justifyContent={"center"}>
                <Text
                  fontSize={"4xl"}
                  alignSelf={"center"}
                  mt={"10px"}
                  mb={"5px"}
                >
                  <IoRainyOutline />
                </Text>
                <Text fontSize={"md"}>
                  Precipitation{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current.precipitation
                    : ""}{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current_units.precipitation
                    : ""}
                </Text>
              </Flex>
              <Flex flexDirection={"column"} justifyContent={"center"}>
                <Text
                  fontSize={"4xl"}
                  alignSelf={"center"}
                  mt={"10px"}
                  mb={"5px"}
                >
                  <FiWind />
                </Text>
                <Text fontSize={"md"}>
                  Wind Speed{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current.wind_speed_10m
                    : ""}{" "}
                  {forecastData && forecastData.current
                    ? forecastData.current_units.wind_speed_10m
                    : ""}
                </Text>
              </Flex>
            </Flex>
          </Show>
        </Flex>
        {setColorTheme("sunOrMoon")}
        {displayStars()}
        {/* <Text as="ins" color="white">
          <Link to="/">back</Link>
        </Text> */}
      </Flex>
    </Flex>
  );
};

export default Forecast;
