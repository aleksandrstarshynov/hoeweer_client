import { backgroundImageUrl } from "../controller/getImageFetch.js";
import { renderIndexPage } from "./renderIndexPage.js";
import { renderExtraInfoPage } from "./renderExtraInfoPage.js";

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

  const timeElement = document.createElement("p");
  timeElement.textContent = `Time: ${weatherData.time}`;
  weatherContainer.appendChild(timeElement);

  const temperatureElement = document.createElement("p");
  temperatureElement.textContent = `Temperature: ${weatherData.temperature}°C`;
  weatherContainer.appendChild(temperatureElement);

  const feelsLikeElement = document.createElement("p");
  feelsLikeElement.textContent = `Feels Like: ${weatherData.feelsLike}°C`;
  weatherContainer.appendChild(feelsLikeElement);

  const rainElement = document.createElement("p");
  rainElement.textContent = `Rain: ${weatherData.rain}mm`;
  weatherContainer.appendChild(rainElement);

  contentDiv.appendChild(weatherContainer);

  const navDiv = document.createElement('div');
  navDiv.id = 'navDiv';

  const newSearchButton = document.createElement('div');
  newSearchButton.classList.add('button');
  const link = document.createElement('a');
  link.textContent = 'New Search';
  link.href = '#';
  link.addEventListener('click', (event) => {
    event.preventDefault();
    renderIndexPage();
  });

  const extraPageButton = document.createElement('div');
  extraPageButton.classList.add('button');
  const link2 = document.createElement('a');
  link2.textContent = 'More Info';
  link2.href = '#';
  link2.addEventListener('click', (event) => {
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
}
