// function to creat Index Page
function renderIndexPage() {
    document.body.innerHTML = '';
    // document.body.style.backgroundImage = 'url("your-image-path.jpg")';

    const main = document.createElement('main');
    // main.textContent = 'Index page';

// header
const logo = document.createElement('div');
logo.textContent = 'Weather App NL';
logo.id = 'logo';





// Navigation bar
const navDiv = document.createElement('div');
navDiv.id = 'navDiv';
const findButton = document.createElement('div');
findButton.classList.add('button'); 
const link = document.createElement('a');
link.textContent = 'Find';
link.href = '#';
link.addEventListener('click', (event) => {
    event.preventDefault();
    renderResultPage();
});

//nesting the DOM structure
document.body.appendChild(main);
main.appendChild(logo);
document.body.appendChild(navDiv);
navDiv.appendChild(findButton);
findButton.appendChild(link);
}






// Function to create Result Page 
function renderResultPage() {
document.body.innerHTML = '';

const main = document.createElement('main');
// main.textContent = 'Result Page';

// header
const logo = document.createElement('div');
logo.textContent = 'Weather App NL';
logo.id = 'logo';

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
document.body.appendChild(navDiv);
navDiv.appendChild(newSeachButton);
newSeachButton.appendChild(link);
navDiv.appendChild(extraPageButton);
extraPageButton.appendChild(link2);
};






// Function to create Page 3
function renderExtraInfoPage() {
document.body.innerHTML = '';

const main = document.createElement('main');
// main.textContent = 'Extra Info';

// header
const logo = document.createElement('div');
logo.textContent = 'Weather App NL';
logo.id = 'logo';
const title = document.createElement('div');
title.textContent = 'Extra Info';
title.id = 'title';

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
document.body.appendChild(navDiv);
navDiv.appendChild(backButton);
backButton.appendChild(link);
navDiv.appendChild(newSearchButton);
newSearchButton.appendChild(link2);
}

// Initialize with Page 1
renderIndexPage();