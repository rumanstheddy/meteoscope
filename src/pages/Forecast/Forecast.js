import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getForecastFromLocation } from "../../apis/WeatherAPI";

const Forecast = () => {
  const location = useLocation();
  // const weatherData = locationData.state;
  const [forecastData, setForecastData] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      const lat = location.state.latitude;
      const long = location.state.longitude;
      getForecastFromLocation(lat, long).then((data) => {
        setForecastData(data);
      });
    };
    fetchResults();
  }, [location]);

  console.log("locationData", forecastData);

  return (
    <Box>
      <Text>Forecast Page</Text>
    </Box>
  );
};

export default Forecast;
