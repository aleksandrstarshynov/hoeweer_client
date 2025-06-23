import { fetchCurrentWeather, weather } from "../controller/weatherFetch.js";
import { cityNameFetch } from "../controller/cityNameFetch.js";
import { renderResultPage } from "./renderResultPage.js";
import { showErrorMessage } from "./showErrorMessage.js";
import { displayCityAddress } from "./displayCityAddress.js";
import { API_BASE_URL } from "../config.js";

export let currentCity = "";
export let cityInfo = null;
let weatherData = null;

export function renderIndexPage() {
  // 1. Clearing the page
  document.body.innerHTML = "";
  currentCity = "";

  // 2. Default background
  document.body.style.backgroundImage = 'url("src/default-image.jpg")';
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";

  // 3. Basic markup
  const main = document.createElement("main");

  // 3.1 Header
  const header = document.createElement("div");
  header.id = "header";
  const logo = document.createElement("div");
  logo.id = "logo";
  logo.textContent = "Hoe is het weer? NL";
  header.appendChild(logo);

  // 3.2 Content block
  const contentDiv = document.createElement("div");
  contentDiv.id = "content-transparent";

  // 3.2.1 Introduction
  const introduction = document.createElement("div");
  introduction.id = "introduction";
  introduction.textContent =
    "Het is zo makkelijk om het weer te vinden. Tientallen apps geven ons voorspellingen. Maar is het mogelijk om de juiste te vinden? Zeker in Nederland, waar het heel handig is om te weten wat je kunt verwachten. Met dit project heb ik een manier gevonden om de verwachte temperatuur te weten. Ja, de eerste versie werkt alleen met graden, niet met regen. Ik hoop dat ik, als ik voldoende tijd en energie heb, de functionaliteit voor regenvoorspelling afrond.";

  // 3.2.2 Author's description
  const description = document.createElement("div");
  description.id = "about";
  description.innerHTML = `
    Mijn naam is Oleksandr Starshynov en ik ben een full-stack developer met JavaScript als tweede moedertaal. Leuk je hier te ontmoeten. Meer informatie over mij vind je hier:
    <a href="https://github.com/YOUR_GITHUB" target="_blank">GitHub</a>,
    <a href="https://www.linkedin.com/in/YOUR_LINKEDIN" target="_blank">LinkedIn</a>,
    <a href="mailto:YOUR_EMAIL@example.com" target="_blank">Email</a>.
  `;

  contentDiv.appendChild(introduction);
  contentDiv.appendChild(description);

  // 3.3 Navigation block: city input + button
  const navDiv = document.createElement("div");
  navDiv.id = "navDiv";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter city name";
  input.id = "cityInput";

  const findButton = document.createElement("div");
  findButton.classList.add("button");
  const link = document.createElement("a");
  link.textContent = "Vinden";
  link.href = "#";
  findButton.appendChild(link);

  // 4. Click handler
  findButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const cityInput = input.value.trim();
    if (!cityInput) {
      showErrorMessage("Voer een stadsnaam in.");
      return;
    }

    try {
      // Receiving coordinates and information about the city
      const {
        latitude,
        longitude,
        cityInfo: fetchedCityInfo,
      } = await cityNameFetch(cityInput);

      if (!latitude || !longitude || !fetchedCityInfo) {
        showErrorMessage("City not found in the Netherlands.");
        return;
      }
      cityInfo = fetchedCityInfo;

      // 4.1 Current weather by Open-Meteo
      weatherData = await fetchCurrentWeather(latitude, longitude);
      if (!weatherData) {
        showErrorMessage("No weather data found.");
        return;
      }

      // 4.2 Backend: Calculated data for the chart
      const chartRes = await fetch(
        `${API_BASE_URL}/chart-data?lat=${latitude}&lon=${longitude}`
      );
      if (!chartRes.ok) {
        throw new Error(`Chart API вернул ${chartRes.status}`);
      }
      const chartData = await chartRes.json();
      weatherData.chartData = chartData;

      // 4.3 render results
      renderResultPage(weatherData, cityInfo);
    } catch (error) {
      console.error("Error during fetching:", error);
      showErrorMessage("An error occurred. Please try again.");
    }
  });

  // 5. Putting it all together
  navDiv.appendChild(input);
  navDiv.appendChild(findButton);

  main.appendChild(header);
  document.body.appendChild(contentDiv);
  document.body.appendChild(main);
  document.body.appendChild(navDiv);
}
