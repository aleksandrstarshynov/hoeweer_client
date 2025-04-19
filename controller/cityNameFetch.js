export async function cityNameFetch(currentCity) {
  const encodedCityName = encodeURIComponent(currentCity);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedCityName}&countrycodes=nl&limit=1&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'YourWeatherApp/1.0 (your-email@example.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (data.length === 0) {
      console.warn("No results found for this city.");
      return { latitude: null, longitude: null, cityInfo: null };
    }

    const { lat, lon, display_name } = data[0];
    console.log("cityInfo:", display_name);

    return { latitude: parseFloat(lat), longitude: parseFloat(lon), cityInfo: display_name };

  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    return { latitude: null, longitude: null, cityInfo: null };
  }
}
