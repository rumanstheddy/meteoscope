const getLocationsFromSearch = async () => {
  const apiUrl =
    "https://geocoding-api.open-meteo.com/v1/search?name=hyderabad&count=3&language=en&format=json";

  const response = await fetch(apiUrl);
  const results = await response.json();

  return results;
};

export { getLocationsFromSearch };