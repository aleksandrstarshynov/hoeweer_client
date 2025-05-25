import { setRandomBackgroundImage } from "../controller/getImageFetch.js";
import { fetchCurrentWeather, weather } from "../controller/weatherFetch.js";
import { cityNameFetch } from "../controller/cityNameFetch.js";
import { renderResultPage } from "./renderResultPage.js";
import { renderAboutPage } from "./renderAboutPage.js";
import { showErrorMessage } from "./showErrorMessage.js";
import { displayCityAddress } from "./displayCityAddress.js";

export let currentCity = '';
export let cityInfo = null;
let weatherData = null;

let flagChecked = false;
const SERVER_URL = "https://mywheatherapp.onrender.com";

// Получение состояния флага
async function getFlagState() {
    try {
        console.log("🚀 Asking the old flag state");
        const response = await fetch(`${SERVER_URL}/get-flag`, {
            method: 'GET'
        });
        const responseData = await response.json();

        if (responseData && responseData.changeDayDatum) {
            console.log('🚀🚀🚀 We got the next flag state:', responseData);
        } else {
            console.warn('Failed to get required data from response:', responseData);
        }

        return {
            changeDayFlag: responseData.changeDayFlag,
            changeDayDatum: responseData.changeDayDatum
        };

    } catch (error) {
        console.error('Error getting flag state:', error);
        return { changeDayFlag: null, changeDayDatum: null };
    }
}

// Основная логика отображения index-страницы
export async function renderIndexPage() {
    if (flagChecked) return;

    const currentData = new Date().toISOString().split('T')[0];

    try {
        const { changeDayFlag, changeDayDatum } = await getFlagState();

        if (!changeDayFlag && currentData !== changeDayDatum) {
            console.log("🚀🚀 Flag check done");

            async function updateData(currentData) {
                try {
                    console.log('📤 Sending a request to the server...');
                    const response = await fetch(`${SERVER_URL}/update-flag`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ currentData })
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Сервер вернул ошибку: ${response.status} - ${errorText}`);
                    }

                    const responseData = await response.json();
                    console.log('✅ Сервер ответил:', responseData);
                } catch (error) {
                    console.error('❌ Error in updateData:', error);
                }
            }

            async function processData() {
                try {
                    console.log('🚀 Sending a request from index.js for data Processing');
                    const response = await fetch(`${SERVER_URL}/process-data`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`The server returned an error: ${response.status} - ${errorText}`);
                    }

                    const responseData = await response.json();
                    console.log('✅ Data processed:', responseData);
                } catch (error) {
                    console.error('❌ Error in data processing:', error);
                }
            }

            await updateData(currentData);
            await processData();
        }

        flagChecked = true;

    } catch (error) {
        console.error("❌ Error during flag logic:", error);
    }

    // Очистка интерфейса и установка фона
    document.body.innerHTML = '';
    currentCity = '';
    document.body.style.backgroundImage = 'url("src/default-image.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';

    // Элементы DOM
    const main = document.createElement('main');

    const header = document.createElement('div');
    header.id = 'header';
    const logo = document.createElement('div');
    logo.textContent = 'HoeWeer NL';
    logo.id = 'logo';

    const contentDiv = document.createElement('div');
    contentDiv.id = 'content-horizontal';

    const introduction = document.createElement('div');
    introduction.id = 'description';
    introduction.textContent = 
        "Finding a weather forecast is easy – dozens of apps offer predictions. " +
        "But how accurate are they, especially in the Netherlands, where reliable forecasts really matter? " +
        "With this project, I’ve created a way to predict the expected temperature. " +
        "The first version works only with temperature, not rain. I hope to have time and energy to add rain prediction soon.";

    const description = document.createElement('div');
    description.id = 'description';
    description.innerHTML = `My name is Oleksandr Starshynov. I am a full-stack developer with JavaScript as my second native language. 
    Nice to meet you here. More information about me: 
    <a href="#" target="_blank">Git</a>, 
    <a href="#" target="_blank">LinkedIn</a>, 
    <a href="mailto:you@example.com" target="_blank">Email</a>`;

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

    const moreButton = document.createElement('div');
    moreButton.classList.add('button', 'second-button');
    const link3 = document.createElement('a');
    link3.textContent = 'More about the project';
    link3.href = '#';

    // Event listeners
    findButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const cityInput = document.getElementById('cityInput').value.trim();
        if (!cityInput) return;

        try {
            const { latitude, longitude, cityInfo: fetchedCityInfo } = await cityNameFetch(cityInput);

            if (latitude && longitude && fetchedCityInfo) {
                cityInfo = fetchedCityInfo;
                weatherData = await fetchCurrentWeather(latitude, longitude);

                if (weatherData) {
                    await setRandomBackgroundImage(cityInput, weather);
                    renderResultPage(weatherData, cityInfo);
                } else {
                    showErrorMessage("No weather data found.");
                }
            } else {
                showErrorMessage("City not found in the Netherlands.");
            }
        } catch (error) {
            console.error('Error during fetching:', error);
            showErrorMessage("An error occurred. Please try again.");
        }
    });

    moreButton.addEventListener('click', (event) => {
        event.preventDefault();
        renderAboutPage();
    });

    // Сборка и добавление всех элементов в DOM
    const fragment = document.createDocumentFragment();

    fragment.appendChild(main);
    main.appendChild(header);
    header.appendChild(logo);
    fragment.appendChild(contentDiv);
    contentDiv.appendChild(description);
    contentDiv.appendChild(introduction);
    fragment.appendChild(navDiv);
    navDiv.appendChild(input);
    navDiv.appendChild(findButton);
    findButton.appendChild(link);
    fragment.appendChild(moreButton);
    moreButton.appendChild(link3);

    document.body.appendChild(fragment);
}
