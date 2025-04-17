  
  
import { latitude, longitude } from "./cityNameFetch.js";
export let weather = null;

export async function fetchCurrentWeather() {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?${latitude}&${longitude}&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,rain,snowfall,cloudcover,windspeed_10m,windgusts_10m,uv_index,surface_pressure,evapotranspiration,soil_temperature_0cm,soil_moisture_0_1cm,direct_radiation&timezone=Europe/Amsterdam`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const currentHourIndex = getCurrentHourIndex(data.hourly.time);

    const weatherNow = {
      time: data.hourly.time[currentHourIndex],
      temperature: data.hourly.temperature_2m[currentHourIndex],
      feelsLike: data.hourly.apparent_temperature[currentHourIndex],
      humidity: data.hourly.relativehumidity_2m[currentHourIndex],
      rain: data.hourly.rain[currentHourIndex],
      cloudcover: data.hourly.cloudcover[currentHourIndex],
      windspeed: data.hourly.windspeed_10m[currentHourIndex],
      uvIndex: data.hourly.uv_index[currentHourIndex],
      surfacePressure: data.hourly.surface_pressure[currentHourIndex],
    };

    wearter = weatherNow.rain;

    console.log('Current Weather Data:', weatherNow);
    return weatherNow;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

function getCurrentHourIndex(timeArray) {
  const now = new Date();
  const nowIso = now.toISOString().slice(0, 13); // Format: 'YYYY-MM-DDTHH'
  return timeArray.findIndex(t => t.startsWith(nowIso));
}
