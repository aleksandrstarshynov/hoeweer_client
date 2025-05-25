
// import { weather } from "../controller/weatherFetch.js";
// import { setRandomBackgroundImage } from "../controller/getImageFetch.js";
// import { cityNameFetch } from "../controller/cityNameFetch.js";
import { renderIndexPage } from "./renderIndexPage.js";
import { showErrorMessage } from "./showErrorMessage.js";
import { displayCityAddress } from "./displayCityAddress.js";
// import { fetchStart } from '../controller/fetchData.js';
// import { fetchCurrentWeather } from "../controller/weatherFetch.js";

export let currentCity = '';
export let cityInfo = null;
let weatherData = null;

export function renderAboutPage() {
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
  logo.textContent = 'HoeWeer NL';
  logo.id = 'logo';

  const contentDiv = document.createElement('div');
  contentDiv.id = 'content-vertical';


  // put the default content here

  const description = document.createElement('div');
  description.id = 'description';
  description.textContent = `I guess that this project able to call the interest in two different areas: tech stack and calculation logic. As for the steck, it is pritty simple. Everythink linked by using the javascript language. Client-side wrote on the clean JS, server-side made with Rest API (actually 5 different APIs are used here), node.js As for the part with callulations, piace of code that works totally  ander the hood, it has two tech desiccions. Firts one is to use js files to store the data, that more ofter used for mocking the data. The second is just the strikt but not very clear logic of processing data and counting the accuracy. Actually, from the accuracy I get the expected numbers, wich you can find more as correct then the data from APIs. Besides of this, I fill that I have to write the artick about the calculation. Will keep you in a loop.`;  

  const releases = document.createElement('div');
  releases.id = 'description';
  releases.textContent = `As all project this one has a planned releases. Below you can find the information about where I am now in my development. Thank you for your interest. Release 1... Release 2...  Release 3`;  
  // end of content block

  const backButton = document.createElement('div');
  backButton.classList.add('button', 'second-button');
  const backLink = document.createElement('a');
  backLink.textContent = 'Back to the results';
  backLink.href = '#';
  backButton.addEventListener('click', (event) => {
    event.preventDefault();
    renderIndexPage();
  });

  document.body.appendChild(main);
  main.appendChild(header);
  header.appendChild(logo);
  document.body.appendChild(contentDiv);
  contentDiv.appendChild(description);
  contentDiv.appendChild(releases);
  document.body.appendChild(backButton);
  backButton.appendChild(backLink);
}