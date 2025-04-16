  
  
  //import { latitude, longitude } from "";



  
  function getCurrentHourIndex(timeArray) {
    const now = new Date();
    const nowIso = now.toISOString().slice(0, 13); // Format: 'YYYY-MM-DDTHH'
    return timeArray.findIndex(t => t.startsWith(nowIso));
  }

  const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.37&longitude=4.89&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,rain,snowfall,cloudcover,windspeed_10m,windgusts_10m,uv_index,surface_pressure,evapotranspiration,soil_temperature_0cm,soil_moisture_0_1cm,direct_radiation&timezone=Europe/Amsterdam';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const currentHourIndex = getCurrentHourIndex(data.hourly.time);
  
      // Pull all the values for the current hour:
      const weatherNow = {
        time: data.hourly.time[currentHourIndex],
        temperature: data.hourly.temperature_2m[currentHourIndex],
        feelsLike: data.hourly.apparent_temperature[currentHourIndex],
        humidity: data.hourly.relativehumidity_2m[currentHourIndex],
        // precipitation: data.hourly.precipitation[currentHourIndex],
        rain: data.hourly.rain[currentHourIndex],
        // snowfall: data.hourly.snowfall[currentHourIndex],
        cloudcover: data.hourly.cloudcover[currentHourIndex],
        windspeed: data.hourly.windspeed_10m[currentHourIndex],
        // windgusts: data.hourly.windgusts_10m[currentHourIndex],
        uvIndex: data.hourly.uv_index[currentHourIndex],
        surfacePressure: data.hourly.surface_pressure[currentHourIndex],
        // evapotranspiration: data.hourly.evapotranspiration[currentHourIndex],
        // soilTemperature: data.hourly.soil_temperature_0cm[currentHourIndex],
        // soilMoisture: data.hourly.soil_moisture_0_1cm[currentHourIndex],
        // directRadiation: data.hourly.direct_radiation[currentHourIndex],
      };
  
      console.log('Current Weather Data:', weatherNow);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
  