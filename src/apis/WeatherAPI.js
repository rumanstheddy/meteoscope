const callAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const getLocationsFromSearch = async (searchQuery, resultCount) => {
  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=${resultCount}&language=en&format=json`;
  const data = await callAPI(apiUrl);
  return data;
};

const getForecastFromLocation = async (latitude, longitude) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,rain,showers,snowfall`;
  const data = await callAPI(apiUrl);
  return data;
};

export { getLocationsFromSearch, getForecastFromLocation };
