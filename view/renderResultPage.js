import { backgroundImageUrl } from "../controller/getImageFetch.js";
import { renderIndexPage } from "./renderIndexPage.js";
import { renderExtraInfoPage } from "./renderExtraInfoPage.js";
import { renderChart } from '../controller/chart.js';

export function renderResultPage(weatherData, cityInfo) {
  if (!weatherData || !cityInfo) {
    console.error('Missing data!');
    return;
  }

  document.body.innerHTML = '';

  document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center';

  const main = document.createElement('main');

  const header = document.createElement('div');
  header.id = 'header';
  const logo = document.createElement('div');
  logo.textContent = 'Weather App NL';
  logo.id = 'logo';

  const contentDiv = document.createElement('div');
  contentDiv.id = 'content';

  const cityInfoDiv = document.createElement('div');
  cityInfoDiv.textContent = `City: ${cityInfo}`;
  cityInfoDiv.id = 'cityInfo';
  contentDiv.appendChild(cityInfoDiv);

  const weatherContainer = document.createElement('div');
  weatherContainer.id = 'weatherContainer';

  const entries = [
    { label: 'Time', value: weatherData.time },
    { label: 'Temperature', value: `${weatherData.temperature}°C` },
    { label: 'Feels Like', value: `${weatherData.feelsLike}°C` },
    { label: 'Humidity', value: `${weatherData.humidity}%` },
    { label: 'Rain', value: `${weatherData.rain}mm` },
    { label: 'Wind Speed', value: `${weatherData.windspeed} km/h` },
    { label: 'UV Index', value: weatherData.uvIndex },
    { label: 'Surface Pressure', value: `${weatherData.surfacePressure} hPa` }
  ];

  for (const { label, value } of entries) {
    const element = document.createElement("p");
    element.textContent = `${label}: ${value}`;
    weatherContainer.appendChild(element);
  }

  contentDiv.appendChild(weatherContainer);

  const chartDiv = document.createElement('div');
chartDiv.id = 'chartDiv';

const canvas = document.createElement('canvas');
canvas.id = 'myChart';
chartDiv.appendChild(canvas);

contentDiv.appendChild(chartDiv);

  const navDiv = document.createElement('div');
  navDiv.id = 'navDiv';

  const newSearchButton = document.createElement('div');
  newSearchButton.classList.add('button');
  const link = document.createElement('a');
  link.textContent = 'New Search';
  link.href = '#';
  newSearchButton.addEventListener('click', (event) => {
    event.preventDefault();
    renderIndexPage();
  });

  const extraPageButton = document.createElement('div');
  extraPageButton.classList.add('button');
  const link2 = document.createElement('a');
  link2.textContent = 'More Info';
  link2.href = '#';
  extraPageButton.addEventListener('click', (event) => {
    event.preventDefault();
    renderExtraInfoPage(weatherData, cityInfo);
  });

  navDiv.appendChild(newSearchButton);
  newSearchButton.appendChild(link);
  navDiv.appendChild(extraPageButton);
  extraPageButton.appendChild(link2);

  document.body.appendChild(main);
  main.appendChild(header);
  header.appendChild(logo);
  main.appendChild(contentDiv);
  main.appendChild(navDiv);

renderChart();
  main.appendChild(navDiv);
}
