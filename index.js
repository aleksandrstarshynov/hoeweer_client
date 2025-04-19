import { backgroundImageUrl} from "./controller/getImageFetch.js";
import { setRandomBackgroundImage } from "./controller/getImageFetch.js";
import { fetchCurrentWeather } from "./controller/weatherFetch.js";
import { weather } from "./controller/weatherFetch.js";
import { cityNameFetch } from "./controller/cityNameFetch.js";

export let currentCity;  
export let cityInfo = null;
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
contentDiv.id = 'content-transparent';



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
link.addEventListener('click', async (event) => {
  event.preventDefault();  // Prevents link from reloading the page

  const currentCity = document.getElementById('cityInput').value;
  console.log(currentCity);

  try {
    // 1. Wait for city coordinates
    const { latitude, longitude, cityInfo } = await cityNameFetch(currentCity);

    if (latitude && longitude && cityInfo) {
      // 2. Wait for weather data
      const data = await fetchCurrentWeather(latitude, longitude);

      if (data) {
        weatherData = data;  // Save it for later use

        // 3. Wait for background image to load
        await setRandomBackgroundImage(currentCity, weather);

        // 4. Finally render the result page with both weatherData and cityInfo
        renderResultPage(weatherData, cityInfo);
      } else {
        // Weather API returned nothing
        console.warn('No weather data found!');
        showErrorMessage("No weather data found.");
      }
    } else {
      // No coordinates or cityInfo returned
      console.warn("Coordinates or cityInfo not set yet!");
      showErrorMessage("City not found in the Netherlands.");
    }
  } catch (error) {
    // If any fetch fails (network, etc.)
    console.error('Error during fetching:', error);
    showErrorMessage("An error occurred. Please try again.");
  }
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
// Function to create the Result Page
function renderResultPage(wData, cInfo) {
  weatherData = wData;
  cityInfo = cInfo;

  if (!weatherData || !cityInfo) {
    console.error('Missing data!');
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

  // City info
  const cityInfoDiv = document.createElement('div');
  cityInfoDiv.textContent = `City: ${cityInfo}`;
  contentDiv.appendChild(cityInfoDiv);

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

  const rainElement = document.createElement("p");
  rainElement.textContent = `Rain: ${weatherData.rain}mm`;
  weatherContainer.appendChild(rainElement);

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
    renderIndexPage();  
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
  const navDiv = document.createElement('div');
  navDiv.id = 'navDiv';

  // Back Button
  const backButton = document.createElement('div');
  backButton.classList.add('button');
  const backLink = document.createElement('a');
  backLink.textContent = 'Back';
  backLink.href = '#';
  backLink.addEventListener('click', (event) => {
    event.preventDefault();
    renderResultPage(weatherData, cityInfo);  
  });

  // New Search Button
  const newSearchButton = document.createElement('div');
  newSearchButton.classList.add('button');
  const newSearchLink = document.createElement('a');
  newSearchLink.textContent = 'New Search';
  newSearchLink.href = '#';
  newSearchLink.addEventListener('click', (event) => {
    event.preventDefault();
    renderIndexPage();
  });

  // Append the buttons to navDiv
  navDiv.appendChild(backButton);
  backButton.appendChild(backLink);
  navDiv.appendChild(newSearchButton);
  newSearchButton.appendChild(newSearchLink);

  // Append the main content to the body
  document.body.appendChild(main);
  main.appendChild(header);
  header.appendChild(logo);
  header.appendChild(title);
  main.appendChild(contentDiv);
  main.appendChild(navDiv);
}



function showErrorMessage(message) {
  const oldError = document.getElementById("error-message");
  if (oldError) oldError.remove();

  const errorDiv = document.createElement("div");
  errorDiv.id = "error-message";
  errorDiv.textContent = message;
  const contentDiv = document.getElementById('content-transparent');
  if (contentDiv) {
    contentDiv.appendChild(errorDiv);
  }
}

function displayCityAddress(cityAddress) {
  // Create or clear the previous address display
  const existingAddressDiv = document.getElementById('city-address');
  if (existingAddressDiv) {
    existingAddressDiv.remove();
  }

  const addressDiv = document.createElement('div');
  addressDiv.id = 'city-address';

  // Concatenate the city, state, and country into a single line of text
  const addressText = `${cityAddress.city}, ${cityAddress.state}, ${cityAddress.country} (Country Code: ${cityAddress.countryCode})`;

  // Create a single paragraph element for the full address
  const addressElement = document.createElement('p');
  addressElement.textContent = addressText;
  addressDiv.appendChild(addressElement);

  // Append the addressDiv to the body or any specific container element
  const contentDiv = document.getElementById('content-transparent'); // Assuming this is your main container
  if (contentDiv) {
    contentDiv.appendChild(addressDiv);
  }
}


// Initialize with Page 1
renderIndexPage();