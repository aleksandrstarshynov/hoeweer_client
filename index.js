// function to creat Index Page
function renderIndexPage() {
    document.body.innerHTML = '';
    const main = document.createElement('div');
    main.textContent = 'Index page';

// header
const logo = document.createElement('div');
logo.textContent = 'LOGO';





// Navigation bar
const navDiv = document.createElement('div');
navDiv.id = 'navDiv';
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
navDiv.appendChild(link);
}






// Function to create Result Page 
function renderResultPage() {
document.body.innerHTML = '';

const main = document.createElement('main');
main.textContent = 'Result Page';

// header
const logo = document.createElement('div');
logo.textContent = 'LOGO';


// Create link to Page 2
const navDiv = document.createElement('div');
navDiv.id = 'navDiv';
const link = document.createElement('a');
link.textContent = 'New Search';
link.href = '#';
link.addEventListener('click', (event) => {
event.preventDefault();
renderIndexPage();
});

// Create link to Page 3
const navDiv2 = document.createElement('div');
navDiv2.id = 'navDiv2';
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
navDiv.appendChild(link);
document.body.appendChild(navDiv2);
navDiv2.appendChild(link2);
};






// Function to create Page 3
function renderExtraInfoPage() {
document.body.innerHTML = '';

const main = document.createElement('main');
main.textContent = 'Extra Info';

// header
const logo = document.createElement('div');
logo.textContent = 'LOGO';



// Create link to the Index Page
const navDiv = document.createElement('div');
navDiv.id = 'navDiv';
const link = document.createElement('a');
link.textContent = 'Back';
link.href = '#';
link.addEventListener('click', (event) => {
    event.preventDefault();
    renderResultPage();
});

const navDiv2 = document.createElement('div');
navDiv2.id = 'navDiv';
const link2 = document.createElement('a');
link2.textContent = 'New Search';
link2.href = '#';
link2.addEventListener('click', (event) => {
event.preventDefault();
renderIndexPage();
});

document.body.appendChild(main);
main.appendChild(logo);
document.body.appendChild(navDiv);
navDiv.appendChild(link);
document.body.appendChild(navDiv2);
navDiv2.appendChild(link2);
}

// Initialize with Page 1
renderIndexPage();