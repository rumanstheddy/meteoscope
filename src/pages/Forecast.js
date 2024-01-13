import { Box, Flex, Hide, Show, Text } from "@chakra-ui/react";
import { useEffect, useState, React } from "react";
import { Link, useLocation } from "react-router-dom";
import { getForecastFromLocation } from "../apis/WeatherAPI";
import ReactAnimatedWeather from "react-animated-weather";
import { BsMoonStars } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { IoRainyOutline } from "react-icons/io5";
import { FiWind } from "react-icons/fi";
import { HiStar } from "react-icons/hi";
import DayNightBg from "../components/DayNightBg";

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

  const displayAnimatedIcon = () => {
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

  const setColorTheme = () => {
    return forecastData && forecastData.current && forecastData.current.is_day
      ? "linear(to-l, #66b2ff, #39f, #007fff)"
      : "linear(to-r, #051020, #081830, #0C2244)";
  };

  const returnInfo = (category) => {
    if (forecastData && forecastData.current) {
      if (category === "is_day") return forecastData.current[category];
      return `${forecastData.current[category]} ${forecastData.current_units[category]}`;
    }
  };

  const iconComponents = {
    WiHumidity: WiHumidity,
    IoRainyOutline: IoRainyOutline,
    FiWind: FiWind,
  };

  const displayWeatherIcon = (styleProps, iconType) => {
    const IconComponent = iconType && iconComponents[iconType];
    return <Text {...styleProps}>{IconComponent && <IconComponent />}</Text>;
  };

  const displayWeatherValue = (styleProps, displayText, categoryParameter) => {
    return (
      <Text {...styleProps}>
        {displayText} {returnInfo(categoryParameter)}
      </Text>
    );
  };

  const displayWeather = (category, isDesktopView) => {
    let displayText = "";
    let categoryParameter = "";
    const iconStyle = isDesktopView
      ? { fontSize: "5xl", alignSelf: "center" }
      : { fontSize: "4xl", alignSelf: "center", mt: "10px", mb: "5px" };
    let icon = "";

    const textStyle = isDesktopView
      ? { fontSize: "lg", mt: "1rem" }
      : { fontSize: "md" };

    if (category === "humidity") {
      displayText = "Humidity";
      categoryParameter = "relative_humidity_2m";
      icon = "WiHumidity";
    }
    if (category === "precipitation") {
      displayText = "Precipitation";
      categoryParameter = "precipitation";
      icon = "IoRainyOutline";
    }
    if (category === "wind speed") {
      displayText = "Wind Speed";
      categoryParameter = "wind_speed_10m";
      icon = "FiWind";
    }

    return (
      <Flex flexDirection={"column"} justifyContent={"center"}>
        {displayWeatherIcon(iconStyle, icon)}
        {displayWeatherValue(textStyle, displayText, categoryParameter)}
      </Flex>
    );
  };

  const renderDesktopView = () => (
    <Hide below={"48em"}>
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
          {returnInfo("temperature_2m")}
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
          fontSize="3xl"
          fontWeight={"500"}
          alignSelf={"center"}
        >
          {returnInfo("is_day") ? <BsSun /> : <BsMoonStars />}
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
            {returnInfo("apparent_temperature")}
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
        <Box alignSelf={"center"} mt={"5rem"} mb={"5rem"}>
          {displayAnimatedIcon()}
        </Box>
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
          {returnInfo("is_day") ? <BsSun /> : <BsMoonStars />}
        </Text>
        <Text color="black" fontSize="sm" fontWeight={"600"}>
          {location.state.name}, {location.state.admin1},{" "}
          {location.state.country} ({location.state.country_code})
        </Text>
        {displayDate()}
        <Box alignSelf={"center"}>{displayAnimatedIcon()}</Box>
        <Text
          bgClip="text"
          fontSize={["4xl", "5xl", "7xl", null]}
          fontWeight="400"
          color="black"
          letterSpacing={"-1px"}
          mb={"10px"}
        >
          {returnInfo("temperature_2m")}
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
            {returnInfo("apparent_temperature")}
          </Text>
        </Flex>
        {displayWeather("humidity", false)}
        {displayWeather("precipitation", false)}
        {displayWeather("wind speed", false)}
      </Flex>
    </Show>
  );

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      bgGradient={setColorTheme()}
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
          {renderDesktopView()}
          {renderMobileView()}
        </Flex>
        <DayNightBg
          isDay={
            forecastData && forecastData.current && forecastData.current.is_day
          }
        />
      </Flex>
    </Flex>
  );
};
export default Forecast;
