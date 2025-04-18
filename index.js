import { backgroundImageUrl} from "./controller/getImageFetch.js";
import { setRandomBackgroundImage } from "./controller/getImageFetch.js";
import { fetchCurrentWeather } from "./controller/weatherFetch.js";
import { weather } from "./controller/weatherFetch.js";
import { cityNameFetch } from "./controller/cityNameFetch.js";

export let currentCity;  
let weatherData = null; 

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
const header = document.createElement('div');
header.id = 'header';
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
      fetchCurrentWeather(latitude, longitude)
        .then(data => {
          if (data) {
            weatherData = data;  // Store the data in the global variable
            renderResultPage(weatherData);  // Pass the data to the result page
          } else {
            console.warn('No weather data found!');
          }
        })
        .catch(error => console.error('Error fetching weather data:', error));
    } else {
      console.warn("Coordinates not set yet!");
    }

    setRandomBackgroundImage(currentCity, weather);
    //finish
    renderResultPage();
});

//nesting the DOM structure
document.body.appendChild(contentDiv);
document.body.appendChild(main);
main.appendChild(header)
header.appendChild(logo);
document.body.appendChild(navDiv);
navDiv.appendChild(input); 
navDiv.appendChild(findButton);
findButton.appendChild(link);
}






// Function to create the Result Page
function renderResultPage(weatherData) {
    if (!weatherData) {
        console.error('Weather data is missing!');
        return;
    }
    document.body.innerHTML = '';  // Clear the page content
  
    // Set the background image
    document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
    document.body.style.backgroundSize = 'cover'; // Optional: make it fill the screen
    document.body.style.backgroundRepeat = 'no-repeat'; // Optional: prevent tiling
    document.body.style.backgroundPosition = 'center'; // Optional: center the image
  
    const main = document.createElement('main');
  
    // Header
    const header = document.createElement('div');
    header.id = 'header';
    const logo = document.createElement('div');
    logo.textContent = 'Weather App NL';
    logo.id = 'logo';
  
    // Create contentDiv inside this function to ensure it's available
    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
  
    // Create the weather container and append weather details
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
  
    // const humidityElement = document.createElement("p");
    // humidityElement.textContent = `Humidity: ${weatherData.humidity}%`;
    // weatherContainer.appendChild(humidityElement);
  
    const rainElement = document.createElement("p");
    rainElement.textContent = `Rain: ${weatherData.rain}mm`;
    weatherContainer.appendChild(rainElement);
  
    // const windspeedElement = document.createElement("p");
    // windspeedElement.textContent = `Wind Speed: ${weatherData.windspeed} km/h`;
    // weatherContainer.appendChild(windspeedElement);
  
    // const uvIndexElement = document.createElement("p");
    // uvIndexElement.textContent = `UV Index: ${weatherData.uvIndex}`;
    // weatherContainer.appendChild(uvIndexElement);
  
    // const surfacePressureElement = document.createElement("p");
    // surfacePressureElement.textContent = `Surface Pressure: ${weatherData.surfacePressure} hPa`;
    // weatherContainer.appendChild(surfacePressureElement);
  
    // Append the weather container to contentDiv
    contentDiv.appendChild(weatherContainer);
  
    // Navigation bar
    const navDiv = document.createElement('div');
    navDiv.id = 'navDiv';
  
    const newSeachButton = document.createElement('div');
    newSeachButton.classList.add('button');
    const link = document.createElement('a');
    link.textContent = 'New Search';
    link.href = '#';
    link.addEventListener('click', (event) => {
      event.preventDefault();
      renderIndexPage();  // Make sure this function is defined
    });
  
    // Create link to More Info page
    const extraPageButton = document.createElement('div');
    extraPageButton.classList.add('button');
    const link2 = document.createElement('a');
    link2.textContent = 'More Info';
    link2.href = '#';
    link2.addEventListener('click', (event) => {
      event.preventDefault();
      renderExtraInfoPage();  // Make sure this function is defined
    });
  
    // Append the buttons to navDiv
    navDiv.appendChild(newSeachButton);
    newSeachButton.appendChild(link);
    navDiv.appendChild(extraPageButton);
    extraPageButton.appendChild(link2);
  
    // Append the main content to the body
    document.body.appendChild(main);
    main.appendChild(header)
    header.appendChild(logo);
    main.appendChild(contentDiv); 
    main.appendChild(navDiv);
}

  






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
const header = document.createElement('div');
header.id = 'header';
const logo = document.createElement('div');
logo.textContent = 'Weather App NL';
logo.id = 'logo';
const title = document.createElement('div');
title.textContent = 'Extra Info';
title.id = 'title';

    // Create contentDiv inside this function to ensure it's available
    const contentDiv = document.createElement('div');
    contentDiv.id = 'content';
  
    // Create the weather container and append weather details
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
  
    const humidityElement = document.createElement("p");
    humidityElement.textContent = `Humidity: ${weatherData.humidity}%`;
    weatherContainer.appendChild(humidityElement);
  
    const rainElement = document.createElement("p");
    rainElement.textContent = `Rain: ${weatherData.rain}mm`;
    weatherContainer.appendChild(rainElement);
  
    const windspeedElement = document.createElement("p");
    windspeedElement.textContent = `Wind Speed: ${weatherData.windspeed} km/h`;
    weatherContainer.appendChild(windspeedElement);
  
    const uvIndexElement = document.createElement("p");
    uvIndexElement.textContent = `UV Index: ${weatherData.uvIndex}`;
    weatherContainer.appendChild(uvIndexElement);
  
    const surfacePressureElement = document.createElement("p");
    surfacePressureElement.textContent = `Surface Pressure: ${weatherData.surfacePressure} hPa`;
    weatherContainer.appendChild(surfacePressureElement);
  
    // Append the weather container to contentDiv
    contentDiv.appendChild(weatherContainer);

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
    renderResultPage(weatherData);
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
main.appendChild(header)
header.appendChild(logo);
header.appendChild(title);
main.appendChild(contentDiv); 
document.body.appendChild(navDiv);
navDiv.appendChild(backButton);
backButton.appendChild(link);
navDiv.appendChild(newSearchButton);
newSearchButton.appendChild(link2);
}

// Initialize with Page 1
renderIndexPage();