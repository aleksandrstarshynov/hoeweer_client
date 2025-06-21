import { renderIndexPage } from "./renderIndexPage.js";
import { renderExtraInfoPage } from "./renderExtraInfoPage.js";
import { renderChart } from "../controller/chart.js";

export function renderResultPage(weatherData, cityInfo) {
  if (!weatherData || !cityInfo) {
    console.error("Missing data!");
    return;
  }

  // Сброс страницы и установка фонового изображения
  document.body.innerHTML = "";
  document.body.style.backgroundImage = 'url("src/default-image.jpg")';
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";

  const main = document.createElement("main");

  // --- Header ---
  const header = document.createElement("div");
  header.id = "header";
  const logo = document.createElement("div");
  logo.id = "logo";
  logo.textContent = "Weather App NL";
  header.appendChild(logo);

  // --- Контент с фоном ---
  const contentDiv = document.createElement("div");
  contentDiv.id = "content";

  // Информация о городе
  const cityInfoDiv = document.createElement("div");
  cityInfoDiv.id = "cityInfo";
  cityInfoDiv.textContent = `City: ${cityInfo}`;
  contentDiv.appendChild(cityInfoDiv);

  // Текущая погода
  const weatherContainer = document.createElement("div");
  weatherContainer.id = "weatherContainer";
  const entries = [
    { label: "Time", value: weatherData.time },
    { label: "Temperature", value: `${weatherData.temperature}°C` },
    { label: "Feels Like", value: `${weatherData.feelsLike}°C` },
    { label: "Humidity", value: `${weatherData.humidity}%` },
    { label: "Rain", value: `${weatherData.rain}mm` },
    { label: "Wind Speed", value: `${weatherData.windspeed} km/h` },
    { label: "UV Index", value: weatherData.uvIndex },
    { label: "Surface Pressure", value: `${weatherData.surfacePressure} hPa` },
  ];
  for (const { label, value } of entries) {
    const p = document.createElement("p");
    p.textContent = `${label}: ${value}`;
    weatherContainer.appendChild(p);
  }
  contentDiv.appendChild(weatherContainer);

  // График
  const chartDiv = document.createElement("div");
  chartDiv.id = "chartDiv";
  const canvas = document.createElement("canvas");
  canvas.id = "myChart";
  chartDiv.appendChild(canvas);
  contentDiv.appendChild(chartDiv);

  // Собираем header и contentDiv
  main.appendChild(header);
  main.appendChild(contentDiv);

  // --- Навигация (кнопки) ---
  const navDiv = document.createElement("div");
  navDiv.id = "navDiv";

  const newSearchButton = document.createElement("div");
  newSearchButton.classList.add("button");
  const newLink = document.createElement("a");
  newLink.textContent = "New Search";
  newLink.href = "#";
  newSearchButton.appendChild(newLink);
  newSearchButton.addEventListener("click", (e) => {
    e.preventDefault();
    renderIndexPage();
  });

  const extraPageButton = document.createElement("div");
  extraPageButton.classList.add("button");
  const extraLink = document.createElement("a");
  extraLink.textContent = "More Info";
  extraLink.href = "#";
  extraPageButton.appendChild(extraLink);
  extraPageButton.addEventListener("click", (e) => {
    e.preventDefault();
    renderExtraInfoPage(weatherData, cityInfo);
  });

  navDiv.appendChild(newSearchButton);
  navDiv.appendChild(extraPageButton);

  main.appendChild(navDiv);
  document.body.appendChild(main);

  // Рендерим график
  if (
    weatherData.chartData &&
    Array.isArray(weatherData.chartData) &&
    weatherData.chartData.length > 0
  ) {
    renderChart(weatherData.chartData);
  } else {
    chartDiv.innerHTML =
      '<p style="color:white; text-align:center;">Chart not available for this city/time.</p>';
  }
}
