
import { currentCity } from "../index.js";


// old code without fetch
// export function cityNameFetch(currentCity) {
//     console.log("cityNameFetch");
//     if (currentCity === "Amsterdam") {
//       return { latitude: 52.3676, longitude: 4.9041 };
//     }
  
//     return { latitude: 0, longitude: 0 };  
//   }

  // new code with fewtch
  export async function cityNameFetch(currentCity) {
    const encodedCityName = encodeURIComponent(currentCity);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedCityName}&countrycodes=nl&limit=1`;
  
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          // Optional but nice: include user agent to be respectful to their API
          'User-Agent': 'YourWeatherApp/1.0 (your-email@example.com)'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.length === 0) {
        console.warn("No results found for this city.");

        // ToDo add div with the error message  
        return { latitude: null, longitude: null };
      }
  
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
  
    } catch (error) {
      console.error('Error fetching city coordinates:', error);
      return { latitude: null, longitude: null };
    }
  }
  