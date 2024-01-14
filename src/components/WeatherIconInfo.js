import { Flex, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { IoWaterOutline } from "react-icons/io5";
import { IoRainyOutline } from "react-icons/io5";
import { FiWind } from "react-icons/fi";

const WeatherIconInfo = ({
  category,
  isDesktopView,
  forecastData,
  fontColor,
}) => {
  const iconComponents = {
    IoWaterOutline: IoWaterOutline,
    IoRainyOutline: IoRainyOutline,
    FiWind: FiWind,
  };

  const returnInfo = (category) => {
    if (forecastData && forecastData.current) {
      if (category === "is_day") return forecastData.current[category];
      return `${forecastData.current[category]} ${forecastData.current_units[category]}`;
    }
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

  const displayWeather = () => {
    let displayText = "";
    let categoryParameter = "";
    let iconStyle = isDesktopView
      ? { fontSize: "5xl", alignSelf: "center" }
      : { fontSize: "4xl", alignSelf: "center", mt: "10px", mb: "5px" };
    let icon = "";

    iconStyle = { ...iconStyle, color: fontColor };

    let textStyle = isDesktopView
      ? { fontSize: "lg", mt: "1rem" }
      : { fontSize: "md" };

    textStyle = { ...textStyle, color: fontColor };

    if (category === "humidity") {
      displayText = "Humidity";
      categoryParameter = "relative_humidity_2m";
      icon = "IoWaterOutline";
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

  return <Fragment>{displayWeather()}</Fragment>;
};

export default WeatherIconInfo;
