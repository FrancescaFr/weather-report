'use strict';
import 'regenerator-runtime/runtime';
import axios from 'axios';

const state = {
  city: 'Dallol',
  temp: 70,
  skyType: 'Sunny',
};

let plusButton = null;
let displayTemp = null;
let minusButton = null;
let weatherBox = null;
let body = null;
let textBox = null;
let viewCity = null;
let getTempButton = null;
let resetButton = null;
let setButton = null;
let skyBox = null;
let skyType = null;

const loadControls = () => {
  state.city = document.getElementById('city');
  state.skyType = document.getElementById('skyType');
  plusButton = document.getElementById('plus');
  displayTemp = document.getElementById('temp');
  minusButton = document.getElementById('minus');
  weatherBox = document.getElementById('weather-box');
  body = document.querySelector('body');
  textBox = document.getElementById('city');
  viewCity = document.getElementById('view-city');
  getTempButton = document.getElementById('current-temp');
  resetButton = document.getElementById('reset-city');
  setButton = document.getElementById('set-city');
  skyBox = document.getElementById('sky-box');
  skyType = document.getElementById('sky-type');
};

const tempColor = () => {
  if (state.temp >= 80) {
    weatherBox.style.backgroundColor = 'rgba(255,0,0,0.5)';
    body.style.backgroundImage = URL('./assets/sunny.webp', import.meta.url);
  } else if (state.temp >= 70) {
    weatherBox.style.backgroundColor = 'rgba(255,165,0,0.5)';
    body.style.backgroundImage = "url('./assets/spring.jpg')";
  } else if (state.temp >= 60) {
    weatherBox.style.backgroundColor = 'rgba(255,255,0,0.5)';
    body.style.backgroundImage = "url('./assets/autumn.jpeg')";
  } else if (state.temp >= 50) {
    weatherBox.style.backgroundColor = 'rgba(0,128,0,0.5)';
    body.style.backgroundImage = "url('./assets/snowy.jpg')";
  } else if (state.temp < 50) {
    weatherBox.style.backgroundColor = 'rgba(0,128,128,0.5)';
    body.style.backgroundImage = "url('./assets/snowy.jpg')";
  }
};

const increaseTemp = () => {
  state.temp += 1;
  displayTemp.textContent = `${state.temp}`;
  tempColor();
};

const decreaseTemp = () => {
  state.temp -= 1;
  displayTemp.textContent = `${state.temp}`;
  tempColor();
};

const updateCity = () => {
  state.city = textBox.value;
  viewCity.textContent = state.city;
};

const resetCity = () => {
  state.city = 'Dallol';
  viewCity.textContent = state.city;
  textBox.value = state.city;
  updateTemp();
};
const updateTemp = () => {
  axios
    .get('http://127.0.0.1:5000/location', { params: { q: state.city } })
    .then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      axios
        .get('http://127.0.0.1:5000/weather', {
          params: { lat: lat, lon: lon },
        })
        .then((response) => {
          const tempK = response.data.main.temp;
          const country = response.data.sys.country;
          state.temp = Math.floor((tempK - 273) * (9 / 5) + 32);
          displayTemp.textContent = `${state.temp}`;
          viewCity.textContent = state.city + `, ${country}`;
          tempColor();
        })
        .except((error) => {
          console.log('Error: Could not get Weather');
        });
    })
    .except((error) => {
      console.log('Error: Could not get Lat Lon');
    });
};

const updateSkyType = () => {
  if (skyType.options[skyType.selectedIndex].value === 'sunny') {
    skyBox.style.backgroundImage = "url('./assets/sun_skytype.jpeg')";
  } else if (skyType.options[skyType.selectedIndex].value === 'cloudy') {
    skyBox.style.backgroundImage = "url('./assets/cloudy.jpg')";
  } else if (skyType.options[skyType.selectedIndex].value === 'rainy') {
    skyBox.style.backgroundImage = "url('./assets/rainy.jpeg')";
  } else if (skyType.options[skyType.selectedIndex].value === 'snowy') {
    skyBox.style.backgroundImage = "url('./assets/snow_skytype.jpeg')";
  }
};

const registerEventHandlers = () => {
  loadControls();
  updateTemp();
  plusButton.addEventListener('click', increaseTemp);
  minusButton.addEventListener('click', decreaseTemp);
  textBox.addEventListener('input', updateCity);
  getTempButton.addEventListener('click', updateTemp);
  resetButton.addEventListener('click', resetCity);
  setButton.addEventListener('click', updateTemp);
  skyType.addEventListener('change', updateSkyType);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
