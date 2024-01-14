import { Flex, Hide, Show, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState, React, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { getForecastFromLocation } from "../apis/WeatherAPI";
import DayNightBg from "../components/DayNightBg";
import AnimatedWeatherIcon from "../components/AnimatedWeatherIcon";
import WeatherIconInfo from "../components/WeatherIconInfo";
import { PiSun } from "react-icons/pi";
import { FaRegMoon } from "react-icons/fa";

const Forecast = () => {
  const location = useLocation();
  const [forecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      getForecastFromLocation(
        location.state.latitude,
        location.state.longitude
      ).then((data) => {
        setForecastData(data || {});
        setLoading(false);
      });
    };
    fetchResults();
  }, [location]);

  const displayDate = () => {
    if (forecastData && forecastData.current && forecastData.current.time)
      return (
        <Text
          fontSize={["sm", null, "lg", null]}
          fontWeight={["400", null, null, "500"]}
          mb={["5px", null, "-15px", null]}
        >
          {new Date(forecastData.current.time).toLocaleString()}{" "}
          {forecastData.timezone}
        </Text>
      );
  };

  const displayAnimatedIcon = (styleProps) => {
    if (forecastData && forecastData.current) {
      return (
        <AnimatedWeatherIcon
          forecastData={forecastData}
          styleProps={styleProps}
        />
      );
    }
  };

  const setBgColorTheme = () => {
    return forecastData && forecastData.current && forecastData.current.is_day
      ? "linear(to-l, #66b2ff, #39f, #007fff)"
      : "linear(to-r, #051020, #081830, #0C2244)";
  };

  const getInfo = (category) => {
    if (forecastData && forecastData.current) {
      if (category === "is_day") return forecastData.current[category];
      return `${forecastData.current[category]}${forecastData.current_units[category]}`;
    }
  };

  const displayWeather = (category, isDesktopView) => (
    <WeatherIconInfo
      category={category}
      isDesktopView={isDesktopView}
      forecastData={forecastData}
    />
  );

  const renderDesktopView = () => (
    <Hide below={"80em"}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Text color="black" fontSize="md" fontWeight={"600"}>
          {location.state.name}, {location.state.admin1},{" "}
          {location.state.country} ({location.state.country_code})
        </Text>

        <Text
          bgClip="text"
          fontSize={["5xl", "6xl", "7xl", null]}
          fontWeight="400"
          color="black"
          letterSpacing={"-1px"}
          mt={"5rem"}
          mb={"5rem"}
        >
          {getInfo("temperature_2m")}
        </Text>
        {displayWeather("humidity", true)}
      </Flex>
      <Flex
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Text
          color="black"
          fontSize="4xl"
          fontWeight={"500"}
          alignSelf={"center"}
        >
          {getInfo("is_day") ? <PiSun /> : <FaRegMoon />}
        </Text>

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
          >
            Feels like{" "}
          </Text>
          <Text
            color="#666"
            fontSize="5xl"
            fontWeight={"400"}
            alignSelf={"center"}
          >
            {getInfo("apparent_temperature")}
          </Text>
        </Flex>
        {displayWeather("precipitation", true)}
      </Flex>
      <Flex
        flexDirection={"column"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        {displayDate()}
        {displayAnimatedIcon({ alignSelf: "center", mt: "5rem", mb: "5rem" })}
        {displayWeather("wind speed", true)}
      </Flex>
    </Hide>
  );

  const renderMobileView = () => (
    <Show below="48em">
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Text
          color="black"
          fontSize="3xl"
          fontWeight={"500"}
          alignSelf={"center"}
          pb={"15px"}
        >
          {getInfo("is_day") ? <PiSun /> : <FaRegMoon />}
        </Text>
        <Text color="black" fontSize="sm" fontWeight={"600"}>
          {location.state.name}, {location.state.admin1},{" "}
          {location.state.country} ({location.state.country_code})
        </Text>
        {displayDate()}
        {displayAnimatedIcon({ alignSelf: "center" })}
        <Text
          bgClip="text"
          fontSize={["4xl", "5xl", "7xl", null]}
          fontWeight="400"
          color="black"
          letterSpacing={"-1px"}
          mb={"10px"}
        >
          {getInfo("temperature_2m")}
        </Text>
        <Flex
          alignContent={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          mb={"10px"}
        >
          <Text
            color="#666"
            fontSize="sm"
            fontWeight={"500"}
            alignSelf={"center"}
          >
            Feels like{" "}
          </Text>
          <Text
            color="#666"
            fontSize="2xl"
            fontWeight={"400"}
            alignSelf={"center"}
          >
            {getInfo("apparent_temperature")}
          </Text>
        </Flex>
        {displayWeather("humidity", false)}
        {displayWeather("precipitation", false)}
        {displayWeather("wind speed", false)}
      </Flex>
    </Show>
  );

  const renderTabletView = () => (
    <Hide above={"80em"}>
      <Show above="48em">
        <Flex
          justifyContent={"space-around"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Text
            color="black"
            fontSize="3xl"
            fontWeight={"500"}
            alignSelf={"center"}
            mb={"-10px"}
          >
            {getInfo("is_day") ? <PiSun /> : <FaRegMoon />}
          </Text>
          <Text color="black" fontSize="md" fontWeight={"600"} mb={"-35px"}>
            {location.state.name}, {location.state.admin1},{" "}
            {location.state.country} ({location.state.country_code})
          </Text>
          {displayDate()}

          <Flex flexDirection={"row"} justifyContent={"space-between"}>
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              mr={"50px"}
            >
              <Text
                bgClip="text"
                fontSize={["4xl", "5xl", "7xl", null]}
                fontWeight="400"
                color="black"
                letterSpacing={"-1px"}
                mb={"-10px"}
              >
                {getInfo("temperature_2m")}
              </Text>
              <Flex
                alignContent={"center"}
                justifyContent={"center"}
                flexDirection={"row"}
                mb={"10px"}
              >
                <Text
                  color="#666"
                  fontSize="sm"
                  fontWeight={"500"}
                  alignSelf={"center"}
                  pr={"5px"}
                >
                  Feels like{" "}
                </Text>
                <Text
                  color="#666"
                  fontSize="xl"
                  fontWeight={"400"}
                  alignSelf={"center"}
                >
                  {getInfo("apparent_temperature")}
                </Text>
              </Flex>
            </Flex>
            {displayAnimatedIcon({ alignSelf: "center", pb: "40px" })}
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-around"}
            gap={"50px"}
            mb={"-10px"}
          >
            {displayWeather("humidity", false)}
            {displayWeather("precipitation", false)}
          </Flex>

          {displayWeather("wind speed", false)}
        </Flex>
      </Show>
    </Hide>
  );

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      bgGradient={setBgColorTheme()}
    >
      <Flex
        width={"100vw"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Flex
          width={["80%", null, "70%", "50%"]}
          height={["85%", null, "65%", "45%"]}
          alignContent={"center"}
          justifyContent={"space-around"}
          flexDirection="row"
          boxShadow="2xl"
          rounded="3xl"
          pt={"40px"}
          pb={"40px"}
          mb={"100px"}
          bg={"white"}
          mt={["100px", null, "50px", "100px"]}
          zIndex={"2"}
        >
          {loading ? (
            <Spinner alignSelf={"center"} size={"xl"} thickness="5px" />
          ) : (
            <Fragment>
              {renderDesktopView()}
              {renderMobileView()}
              {renderTabletView()}
            </Fragment>
          )}
        </Flex>
        <DayNightBg
          isDay={
            forecastData && forecastData.current && forecastData.current.is_day
          }
        />

        <Show above="48em">
          <Link to={"/"}>
            <Text as={"ins"} color={"white"} fontSize={"2xl"}>
              back
            </Text>
          </Link>
        </Show>
      </Flex>
    </Flex>
  );
};

export default Forecast;
