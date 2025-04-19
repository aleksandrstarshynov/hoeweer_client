import { setRandomBackgroundImage } from "../controller/getImageFetch.js";
import { fetchCurrentWeather, weather } from "../controller/weatherFetch.js";
import { cityNameFetch } from "../controller/cityNameFetch.js";
import { renderResultPage } from "./renderResultPage.js";
import { showErrorMessage } from "./showErrorMessage.js";
import { displayCityAddress } from "./displayCityAddress.js";

export let currentCity = '';
export let cityInfo = null;
let weatherData = null;

export function renderIndexPage() {
  document.body.innerHTML = '';
  currentCity = '';
  document.body.style.backgroundImage = 'url("src/default-image.jpg")';
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
  contentDiv.id = 'content-transparent';

  const navDiv = document.createElement('div');
  navDiv.id = 'navDiv';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter city name';
  input.id = 'cityInput';

  const findButton = document.createElement('div');
  findButton.classList.add('button');
  const link = document.createElement('a');
  link.textContent = 'Find';
  link.href = '#';

  findButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const cityInput = document.getElementById('cityInput').value;
    console.log(cityInput);

    try {
      const { latitude, longitude, cityInfo: fetchedCityInfo } = await cityNameFetch(cityInput);

      if (latitude && longitude && fetchedCityInfo) {
        cityInfo = fetchedCityInfo;
        weatherData = await fetchCurrentWeather(latitude, longitude);

        if (weatherData) {
          await setRandomBackgroundImage(cityInput, weather);
          renderResultPage(weatherData, cityInfo);
        } else {
          console.warn('No weather data found!');
          showErrorMessage("No weather data found.");
        }
      } else {
        console.warn("Coordinates or cityInfo not set yet!");
        showErrorMessage("City not found in the Netherlands.");
      }
    } catch (error) {
      console.error('Error during fetching:', error);
      showErrorMessage("An error occurred. Please try again.");
    }
  });

  document.body.appendChild(contentDiv);
  document.body.appendChild(main);
  main.appendChild(header);
  header.appendChild(logo);
  document.body.appendChild(navDiv);
  navDiv.appendChild(input);
  navDiv.appendChild(findButton);
  findButton.appendChild(link);
}
