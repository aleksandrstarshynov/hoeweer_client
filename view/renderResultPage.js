import { backgroundImageUrl } from "../controller/getImageFetch.js";
import { renderIndexPage } from "./renderIndexPage.js";
import { renderExtraInfoPage } from "./renderExtraInfoPage.js";
// import { chart} from "../controller/chart.js";

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
  logo.textContent = 'HoeWeer NL';
  logo.id = 'logo';

  const contentDiv = document.createElement('div');
  // contentDiv.id = 'content-vertical';
  contentDiv.id = 'content-horizontal';

  const cityInfoDiv = document.createElement('div');
  cityInfoDiv.textContent = `City: ${cityInfo}`;
  cityInfoDiv.id = 'description'; 
  contentDiv.appendChild(cityInfoDiv);


  const weatherContainer = document.createElement('div');
  // weatherContainer.id = 'weatherContainer';
  weatherContainer.id = 'description'; 

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

  const chart = document.createElement('div');
  chart.textContent = `Chart`;
  chart.id = 'chart'; 

  // Draw the chart
  // Graph drawing function
function renderChart(mainElement) {
  // console.log('🎨 Drawing a chart');

  const canvasElement = document.createElement('canvas');
  canvasElement.id = 'myChart';
  // canvasElement.width = 1600;
  // canvasElement.height = 800;

  const scriptElement = document.createElement('script');
  scriptElement.type = 'module';  
  scriptElement.src = './controller/chart.js';
  chart.appendChild(canvasElement);
  chart.appendChild(scriptElement);
}
  renderChart(main);

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
  extraPageButton.classList.add('button', 'second-button');
  const link2 = document.createElement('a');
  link2.textContent = 'More dayly data from the Open Weather App';
  link2.href = '#';
  extraPageButton.addEventListener('click', (event) => {
    event.preventDefault();
    renderExtraInfoPage(weatherData, cityInfo);
  });

  document.body.appendChild(main);
  main.appendChild(header);
  header.appendChild(logo);
  main.appendChild(contentDiv);
  contentDiv.appendChild(cityInfoDiv);
  contentDiv.appendChild(weatherContainer);
  main.appendChild(chart);
  // main.appendChild(canvasElement);
  // main.appendChild(scriptElement);
  main.appendChild(navDiv);
  navDiv.appendChild(newSearchButton);
  newSearchButton.appendChild(link);
  document.body.appendChild(extraPageButton);
  extraPageButton.appendChild(link2);
}
