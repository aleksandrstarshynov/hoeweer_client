import { renderResultPage } from "./renderResultPage.js";
import { renderIndexPage } from "./renderIndexPage.js";

export function renderExtraInfoPage(weatherData, cityInfo) {
  if (!weatherData || !cityInfo) {
    console.error('Missing data for extra info!');
    return;
  }

  document.body.innerHTML = '';

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
  const title = document.createElement('div');
  title.textContent = 'Extra Info';
  title.id = 'title';

  const contentDiv = document.createElement('div');
  contentDiv.id = 'content';

  const cityInfoDiv = document.createElement('div');
  cityInfoDiv.textContent = `City: ${cityInfo}`;
  cityInfoDiv.id = 'cityInfo';
  contentDiv.appendChild(cityInfoDiv);

  // const weatherContainer = document.createElement('div');
  // weatherContainer.id = 'weatherContainer';

  const math = document.createElement('div');
  math.id = 'weatherContainer';
  math.textContent = 'In this project, I used the entire JavaScript stack: on the server — Node.js with Express for request orchestration and fs/ESM modules for sliding data storage in JSON files, on the client — pure JS with dynamic import and Chart.js for visualization. As an interesting technical solution, I implemented a "sliding" data update: with each request, the "day after tomorrow" forecast is written to a file, then three files are shifted — this is how the history of "yesterday", "today" and "tomorrow" is supported — and only after that the final array for the chart is formed. This gave an easy alternative to Databases without external storage, with automatic data rolling. There is no justification for this choice, I just wanted to practice using the functionality of fs modules. The mathematics of the forecast is based on the analysis of temperature "drifts" between three horizons: the day before yesterday → yesterday and yesterday → today. For each hour, we calculate the directional difference (drift) between each neighboring forecast, average these two drifts, and get the value avgDrift. Our "proposed" temperature is calculated as the original forecast today plus this average drift. This way, we take into account the tendency of the forecast to shift over the previous two days and produce a smoother temperature, adapted to real dynamics.';

  // contentDiv.appendChild(weatherContainer);
  contentDiv.appendChild(math);

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
