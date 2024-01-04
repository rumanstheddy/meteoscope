import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getForecastFromLocation } from "../../apis/WeatherAPI";

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
        <Text fontSize="2xl">
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
            {forecastData.current.temperature_2m}{" "}
            {forecastData.current_units.temperature_2m}
          </Text>
          <Text fontSize="2xl">
            {forecastData.current.is_day ? "Day" : "Night"}
          </Text>
        </Box>
      );
  };

  return (
    <Box>
      <Card
        maxW={["60vw", null, "50vw", "40vw"]}
        textAlign="center"
        ml="auto"
        mr="auto"
        mt="20vh"
      >
        <CardHeader>
          <Heading size="md">
            {location.state.name}, {location.state.admin1},{" "}
            {location.state.country_code}
          </Heading>
        </CardHeader>
        <CardBody>
          {loading && <Spinner />}
          {displayForecastInfo()}
        </CardBody>
      </Card>
      <Text as="ins" color="blue">
        <Link to="/">back</Link>
      </Text>
    </Box>
  );
};

export default Forecast;
