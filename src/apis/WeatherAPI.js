const getLocationsFromSearch = async (searchQuery, resultCount) => {
  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=${resultCount}&language=en&format=json`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  return data;
};

export { getLocationsFromSearch };
