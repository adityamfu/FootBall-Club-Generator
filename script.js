import { footballClubsData } from './database.js';

let previousClubData = null;
let selectedTier = [];

function showInitialClub(selectedLeague, selectedTier) {
  let initialClubData;

  if (selectedLeague === 'AllLeague' && selectedTier.length === 0) {
    initialClubData = footballClubsData[0];
  } else {
    const clubsInSelectedLeagueAndTier = footballClubsData.filter((club) => (selectedLeague === 'AllLeague' || club.league === selectedLeague) && (selectedTier.length === 0 || selectedTier.includes(club.tier)));
    initialClubData = clubsInSelectedLeagueAndTier[0];
  }

  if (initialClubData) {
    document.getElementById('clubName').textContent = `Club: ${initialClubData.name}`;
    document.getElementById('clubLogo').src = `./images/${initialClubData.logo}`;
    document.getElementById('clubLeague').textContent = `League: ${initialClubData.league}`;
    document.getElementById('clubTier').textContent = `Tier: ${initialClubData.tier}`;
  }
}

const availableLeagues = Array.from(new Set(footballClubsData.map((club) => club.league)));
const leagueSelect = document.getElementById('leagueSelect');
const tierCheckboxes = document.querySelectorAll('input[name="tier"]');

availableLeagues.forEach((league) => {
  const option = document.createElement('option');
  option.value = league;
  option.text = league;
  leagueSelect.appendChild(option);
});

showInitialClub(leagueSelect.value, selectedTier);

function generateRandomClub(selectedLeague, selectedTier) {
  document.getElementById('clubInfo').style.backgroundColor = '#151823';

  let filteredClubs;

  if (selectedLeague === 'AllLeague' && selectedTier.length === 0) {
    filteredClubs = footballClubsData;
  } else {
    filteredClubs = footballClubsData.filter((club) => (selectedLeague === 'AllLeague' || club.league === selectedLeague) && (selectedTier.length === 0 || selectedTier.includes(club.tier)));
  }

  let randomClubData;

  do {
    const randomIndex = Math.floor(Math.random() * filteredClubs.length);
    randomClubData = filteredClubs[randomIndex];
  } while (randomClubData === previousClubData);

  if (randomClubData) {
    document.getElementById('clubName').textContent = `${randomClubData.name}`;
    document.getElementById('clubLogo').src = `./images/${randomClubData.logo}`;
    document.getElementById('clubLeague').textContent = `${randomClubData.league}`;
    document.getElementById('clubTier').textContent = `${randomClubData.tier}`;

    previousClubData = randomClubData;
  }

  setTimeout(() => {
    document.getElementById('clubInfo').style.backgroundColor = '#9edc74';
  }, 3500);
}

const generateButton = document.getElementById('generateButton');

generateButton.addEventListener('click', function () {
  const selectedLeague = leagueSelect.value;
  const duration = 3500;
  const interval = setInterval(() => {
    generateRandomClub(selectedLeague, selectedTier);
  }, 120);

  setTimeout(() => {
    clearInterval(interval);
    clubInfo.style.backgroundColor = '#9edc74';
  }, duration);
});

tierCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    selectedTier = getSelectedTier();
    showInitialClub(leagueSelect.value, selectedTier);
  });
});

function getSelectedTier() {
  const selectedTierCheckboxes = Array.from(tierCheckboxes).filter((checkbox) => checkbox.checked);
  return selectedTierCheckboxes.map((checkbox) => checkbox.value);
}

leagueSelect.addEventListener('change', function () {
  showInitialClub(leagueSelect.value, selectedTier);
});

var animateButton = function (e) {
  e.preventDefault;
  e.target.classList.remove('animate');

  e.target.classList.add('animate');
  setTimeout(function () {
    e.target.classList.remove('animate');
  }, 700);
};

var bubblyButtons = document.getElementsByClassName('bubbly-button');

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}
