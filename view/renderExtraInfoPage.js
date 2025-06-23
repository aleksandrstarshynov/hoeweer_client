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
  logo.textContent = 'Hoe is het weer? NL';
  logo.id = 'logo';
  const title = document.createElement('div');
  title.textContent = 'Extra Info';
  title.id = 'title';

  const contentDiv = document.createElement('div');
  contentDiv.id = 'content';

  const cityInfoDiv = document.createElement('div');
  cityInfoDiv.textContent = `Stad: ${cityInfo}`;
  cityInfoDiv.id = 'cityInfo';
  contentDiv.appendChild(cityInfoDiv);

  const math = document.createElement('div');
  math.id = 'weatherContainer';
  math.textContent = 'In dit project heb ik de volledige JavaScript-stack gebruikt: op de server – Node.js met Express voor de orkestratie van aanvragen en fs/ESM-modules voor het opslaan van verschuivende gegevens in JSON-bestanden, op de client – ​​pure JS met dynamische import en Chart.js voor visualisatie. Als interessante technische oplossing heb ik een "schuivende" gegevensupdate geïmplementeerd: bij elke aanvraag wordt de voorspelling voor overmorgen naar een bestand geschreven, vervolgens worden drie bestanden verschoven – zo wordt de geschiedenis van "gisteren", "vandaag" en "morgen" ondersteund – en pas daarna wordt de definitieve array voor de grafiek samengesteld. Dit bood een eenvoudig alternatief voor databases zonder externe opslag, met automatische gegevensrolling. Er is geen rechtvaardiging voor deze keuze, ik wilde gewoon oefenen met de functionaliteit van fs-modules. De wiskunde van de voorspelling is gebaseerd op de analyse van temperatuurverschillen tussen drie horizonnen: eergisteren → gisteren en gisteren → vandaag. Voor elk uur berekenen we het richtingsverschil (drift) tussen de aangrenzende voorspellingen, middelen we deze twee driften en krijgen we de waarde avgDrift. Onze "voorgestelde" temperatuur wordt berekend als de oorspronkelijke voorspelling van vandaag plus deze gemiddelde drift. Op deze manier houden we rekening met de neiging van de voorspelling om te verschuiven in de afgelopen twee dagen en produceren we een gelijkmatigere temperatuur, aangepast aan de werkelijke dynamiek.';

  // contentDiv.appendChild(weatherContainer);
  contentDiv.appendChild(math);

  const navDiv = document.createElement('div');
  navDiv.id = 'navDiv';

  const backButton = document.createElement('div');
  backButton.classList.add('button');
  const backLink = document.createElement('a');
  backLink.textContent = 'Terug';
  backLink.href = '#';
  backButton.addEventListener('click', (event) => {
    event.preventDefault();
    renderResultPage(weatherData, cityInfo);
  });

  const newSearchButton = document.createElement('div');
  newSearchButton.classList.add('button');
  const newSearchLink = document.createElement('a');
  newSearchLink.textContent = 'Nieuwe zoekopdracht';
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
