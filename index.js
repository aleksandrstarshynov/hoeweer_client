import { backgroundImageUrl} from "./controller/getImageFetch.js";
import { setRandomBackgroundImage } from "./controller/getImageFetch.js";
import { fetchCurrentWeather } from "./controller/weatherFetch.js";
import { weather } from "./controller/weatherFetch.js";
import { cityNameFetch } from "./controller/cityNameFetch.js";

export let currentCity;  

// function to creat Index Page
function renderIndexPage() {
    document.body.innerHTML = ''; 

    currentCity = ''; 
    document.body.style.backgroundImage = 'url("src/default-image.jpg")';
    document.body.style.backgroundSize = 'cover'; // Optional: make it fill the screen
    document.body.style.backgroundRepeat = 'no-repeat'; // Optional: prevent tiling
    document.body.style.backgroundPosition = 'center'; // Optional: center the image

    const main = document.createElement('main');
    // main.textContent = 'Index page';

// header
const logo = document.createElement('div');
logo.textContent = 'Weather App NL';
logo.id = 'logo';

const contentDiv = document.createElement('div');
contentDiv.id = 'content';



// Navigation bar
const navDiv = document.createElement('div');
navDiv.id = 'navDiv';
// input field
const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Enter city name';
input.id = 'cityInput';

//button
const findButton = document.createElement('div');
findButton.classList.add('button'); 
const link = document.createElement('a');
link.textContent = 'Find';
link.href = '#';
link.addEventListener('click', (event) => {
    event.preventDefault();
    const currentCity = document.getElementById('cityInput').value;
    console.log(currentCity); 


    // run all fetches here
    // cityNameFetch(currentCity);
    const { latitude, longitude } = cityNameFetch(currentCity);

    if (latitude && longitude) {
      fetchCurrentWeather(latitude, longitude);
    } else {
      console.warn("Coordinates not set yet!");
    };

    setRandomBackgroundImage(currentCity, weather);
    //finish
    renderResultPage();
});

//nesting the DOM structure
document.body.appendChild(contentDiv);
document.body.appendChild(main);
main.appendChild(logo);
document.body.appendChild(navDiv);
navDiv.appendChild(input); 
navDiv.appendChild(findButton);
findButton.appendChild(link);
}






// Function to create Result Page 
function renderResultPage() {
document.body.innerHTML = '';

document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
document.body.style.backgroundSize = 'cover'; // Optional: make it fill the screen
document.body.style.backgroundRepeat = 'no-repeat'; // Optional: prevent tiling
document.body.style.backgroundPosition = 'center'; // Optional: center the image


const main = document.createElement('main');
// main.textContent = 'Result Page';



// header
const logo = document.createElement('div');
logo.textContent = 'Weather App NL';
logo.id = 'logo';

const contentDiv = document.createElement('div');
contentDiv.id = 'content';

// Navigation bar
// Create link to Page 2
const navDiv = document.createElement('div');
navDiv.id = 'navDiv';
const newSeachButton = document.createElement('div');
newSeachButton.classList.add('button'); 
const link = document.createElement('a');
link.textContent = 'New Search';
link.href = '#';
link.addEventListener('click', (event) => {
event.preventDefault();
renderIndexPage();
});

// Create link to Page 3
const extraPageButton = document.createElement('div');
extraPageButton.classList.add('button'); 
const link2 = document.createElement('a');
link2.textContent = 'More Info';
link2.href = '#';
link2.addEventListener('click', (event) => {
  event.preventDefault();
  renderExtraInfoPage();
});

document.body.appendChild(main);
main.appendChild(logo);
document.body.appendChild(contentDiv);
document.body.appendChild(navDiv);
navDiv.appendChild(newSeachButton);
newSeachButton.appendChild(link);
navDiv.appendChild(extraPageButton);
extraPageButton.appendChild(link2);
};






// Function to create Page 3
function renderExtraInfoPage() {
document.body.innerHTML = '';

document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
document.body.style.backgroundSize = 'cover'; // Optional: make it fill the screen
document.body.style.backgroundRepeat = 'no-repeat'; // Optional: prevent tiling
document.body.style.backgroundPosition = 'center'; // Optional: center the image


const main = document.createElement('main');
// main.textContent = 'Extra Info';

// header
const logo = document.createElement('div');
logo.textContent = 'Weather App NL';
logo.id = 'logo';
const title = document.createElement('div');
title.textContent = 'Extra Info';
title.id = 'title';

const contentDiv = document.createElement('div');
contentDiv.id = 'content';

// Navigation bar
// Create link to the Index Page
const navDiv = document.createElement('div');
navDiv.id = 'navDiv';
const backButton = document.createElement('div');
backButton.classList.add('button');  //    WHY IT DOES NOT WORK ?????
const link = document.createElement('a');
link.textContent = 'Back';
link.href = '#';
link.addEventListener('click', (event) => {
    event.preventDefault();
    renderResultPage();
});

const newSearchButton = document.createElement('div');
newSearchButton.classList.add('button'); 
const link2 = document.createElement('a');
link2.textContent = 'New Search';
link2.href = '#';
link2.addEventListener('click', (event) => {
event.preventDefault();
renderIndexPage();
});

document.body.appendChild(main);
main.appendChild(logo);
main.appendChild(title);
document.body.appendChild(contentDiv);
document.body.appendChild(navDiv);
navDiv.appendChild(backButton);
backButton.appendChild(link);
navDiv.appendChild(newSearchButton);
newSearchButton.appendChild(link2);
}

// Initialize with Page 1
renderIndexPage();