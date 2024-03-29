import { Box } from "@chakra-ui/react";
import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const AnimatedWeatherIcon = ({
  forecastData,
  styleProps,
  color,
  isMobileView,
}) => {
  const selectIcon = () => {
    if (forecastData && forecastData.current) {
      let fData = forecastData.current;
      let icon = fData.is_day ? "CLEAR_DAY" : "CLEAR_NIGHT";
      if (fData.rain > 2 || fData.showers > 2) icon = "RAIN";
      else if (fData.snowfall > 1) icon = "SNOW";
      else if (fData.cloud_cover > 70 && fData.cloud_cover < 90)
        icon = fData.is_day ? "PARTLY_CLOUDY_DAY" : "PARTLY_CLOUDY_NIGHT";
      else if (fData.cloud_cover > 90) icon = "CLOUDY";
      else if (fData.wind_speed_10m > 10 * 3.6) icon = "WIND";

      return (
        <ReactAnimatedWeather
          icon={icon}
          color={color}
          size={isMobileView ? 64 : 110}
          animate={true}
        />
      );
    }
  };
  return <Box {...styleProps}>{selectIcon()}</Box>;
};

export default AnimatedWeatherIcon;
