import { backgroundImageUrl } from "../controller/getImageFetch.js";
import { renderResultPage } from "./renderResultPage.js";
import { renderIndexPage } from "./renderIndexPage.js";

export function renderExtraInfoPage(weatherData, cityInfo) {
  if (!weatherData || !cityInfo) {
    console.error('Missing data for extra info!');
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
  const title = document.createElement('div');
  title.textContent = 'Extra Info';
  title.id = 'title';

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

  const navDiv = document.createElement('div');
  navDiv.id = 'navDiv';

  const backButton = document.createElement('div');
  backButton.classList.add('button');
  const backLink = document.createElement('a');
  backLink.textContent = 'Back';
  backLink.href = '#';
  backButton.addEventListener('click', (event) => {
    event.preventDefault();
    renderResultPage(weatherData, cityInfo);
  });

  const newSearchButton = document.createElement('div');
  newSearchButton.classList.add('button');
  const newSearchLink = document.createElement('a');
  newSearchLink.textContent = 'New Search';
  newSearchLink.href = '#';
  newSearchButton.addEventListener('click', (event) => {
    event.preventDefault();
    renderIndexPage();
  });

  navDiv.appendChild(backButton);
  backButton.appendChild(backLink);
  navDiv.appendChild(newSearchButton);
  newSearchButton.appendChild(newSearchLink);

  document.body.appendChild(main);
  main.appendChild(header);
  header.appendChild(logo);
  header.appendChild(title);
  main.appendChild(contentDiv);
  main.appendChild(navDiv);
}
