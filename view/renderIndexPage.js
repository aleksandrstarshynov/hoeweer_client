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
  // 1. Очистка страницы
  document.body.innerHTML = "";
  currentCity = "";

  // 2. Фон по умолчанию
  document.body.style.backgroundImage = 'url("src/default-image.jpg")';
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";

  // 3. Основная разметка
  const main = document.createElement("main");

  // 3.1 Header
  const header = document.createElement("div");
  header.id = "header";
  const logo = document.createElement("div");
  logo.id = "logo";
  logo.textContent = "Weather App NL";
  header.appendChild(logo);

  // 3.2 Контентный блок
  const contentDiv = document.createElement("div");
  contentDiv.id = "content-transparent";

  // 3.2.1 Введение
  const introduction = document.createElement("div");
  introduction.id = "introduction";
  introduction.textContent =
    "It is so easy to find the weather. Tens of applications provide us with forecasts. But is it possible to find the correct one? Especially in the Netherlands, where knowing what to expect makes great sense. With this project, I’ve found a way to know the expected temperature. Yes, the first version works only with degrees, not the rain. I hope that when I have free time and enough energy, I will finish the functionality for rain prediction.";

  // 3.2.2 Описание автора
  const description = document.createElement("div");
  description.id = "about";
  description.innerHTML = `
    My name is Oleksandr Starshynov, and I am a full-stack developer with JavaScript as my second native language. Nice to meet you here. More information about me you can find here:
    <a href="https://github.com/YOUR_GITHUB" target="_blank">GitHub</a>,
    <a href="https://www.linkedin.com/in/YOUR_LINKEDIN" target="_blank">LinkedIn</a>,
    <a href="mailto:YOUR_EMAIL@example.com" target="_blank">Email</a>.
  `;

  contentDiv.appendChild(introduction);
  contentDiv.appendChild(description);

  // 3.3 Навигационный блок: ввод города + кнопка
  const navDiv = document.createElement("div");
  navDiv.id = "navDiv";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter city name";
  input.id = "cityInput";

  // Обязательно объявляем кнопку до того, как вешать на неё слушатель
  const findButton = document.createElement("div");
  findButton.classList.add("button");
  const link = document.createElement("a");
  link.textContent = "Find";
  link.href = "#";
  findButton.appendChild(link);

  // 4. Обработчик клика
  findButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const cityInput = input.value.trim();
    if (!cityInput) {
      showErrorMessage("Please enter a city name.");
      return;
    }

    try {
      // Получаем координаты и информацию о городе
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

      // 4.1 Open-Meteo: текущая погода
      weatherData = await fetchCurrentWeather(latitude, longitude);
      if (!weatherData) {
        showErrorMessage("No weather data found.");
        return;
      }

      // 4.2 Бэкенд: расчётные данные для графика
      const chartRes = await fetch(
        `${API_BASE_URL}/chart-data?lat=${latitude}&lon=${longitude}`
      );
      if (!chartRes.ok) {
        throw new Error(`Chart API вернул ${chartRes.status}`);
      }
      const chartData = await chartRes.json();
      weatherData.chartData = chartData;

      // 4.3 Фон + рендер результатов
      renderResultPage(weatherData, cityInfo);
    } catch (error) {
      console.error("Error during fetching:", error);
      showErrorMessage("An error occurred. Please try again.");
    }
  });

  // 5. Собираем всё вместе
  navDiv.appendChild(input);
  navDiv.appendChild(findButton);

  main.appendChild(header);
  document.body.appendChild(contentDiv);
  document.body.appendChild(main);
  document.body.appendChild(navDiv);
}
