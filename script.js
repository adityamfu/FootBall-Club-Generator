import { footballClubsData } from './database.js';

let previousClubData = null; 

function showInitialClub() {
  const initialClubData = footballClubsData[0];

  document.getElementById('clubName').textContent = `Your Club: ${initialClubData.name}`;
  document.getElementById('clubLogo').src = `./images/${initialClubData.logo}`;
  document.getElementById('clubLeague').textContent = `League: ${initialClubData.league}`;
}

const availableLeagues = Array.from(new Set(footballClubsData.map((club) => club.league)));

const leagueSelect = document.getElementById('leagueSelect');

availableLeagues.forEach((league) => {
  const option = document.createElement('option');
  option.value = league;
  option.text = league;
  leagueSelect.appendChild(option);
});

showInitialClub();

function generateRandomClub(selectedLeague) {
  let filteredClubs;

  if (selectedLeague === 'AllLeague') {
    filteredClubs = footballClubsData;
  } else {
    filteredClubs = footballClubsData.filter((club) => club.league === selectedLeague);
  }

  let randomClubData;

  do {
    const randomIndex = Math.floor(Math.random() * filteredClubs.length);
    randomClubData = filteredClubs[randomIndex];
  } while (randomClubData === previousClubData);

  if (randomClubData) {
    document.getElementById('clubName').textContent = `Your Club: ${randomClubData.name}`;
    document.getElementById('clubLogo').src = `./images/${randomClubData.logo}`;
    document.getElementById('clubLeague').textContent = `League: ${randomClubData.league}`;

    previousClubData = randomClubData;
  }
}

const generateButton = document.getElementById('generateButton');

generateButton.addEventListener('click', function () {
  const selectedLeague = leagueSelect.value;
  const duration = 3500;

  const interval = setInterval(() => {
    generateRandomClub(selectedLeague);
  }, 120);

  setTimeout(() => {
    clearInterval(interval);
    clubInfo.style.backgroundColor = '#007bff';
  }, duration);
});
