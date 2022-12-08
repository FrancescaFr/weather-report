'use strict';

const state = {
  city: 'Dallol',
  temp: 48,
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
};

const tempColor = () => {
  if (state.temp >= 80) {
    weatherBox.style.backgroundColor = 'red';
    body.style.backgroundImage = "url('./assets/sunny.webp')";
  } else if (state.temp >= 70) {
    weatherBox.style.backgroundColor = 'orange';
    body.style.backgroundImage = "url('./assets/spring.jpeg')";
  } else if (state.temp >= 60) {
    weatherBox.style.backgroundColor = 'yellow';
    body.style.backgroundImage = "url('./assets/autumn.jpeg')";
  } else if (state.temp >= 50) {
    weatherBox.style.backgroundColor = 'green';
    body.style.backgroundImage = "url('./assets/snowy.jpg')";
  } else if (state.temp < 50) {
    weatherBox.style.backgroundColor = 'teal';
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
}

const resetCity = () => {
  state.city = 'Dallol';
  viewCity.textContent = state.city;
  textBox.value = state.city;
  updateTemp();
}
const updateTemp = () => {
  // const lat = null;
  // const lon = null;
  axios.get('http://127.0.0.1:5000/location', { params: { 'q': state.city } })
    .then((response) => {
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      axios.get('http://127.0.0.1:5000/weather', { params: { 'lat': lat, 'lon': lon } })
        .then((response) => {
          const tempK = response.data.main.temp;
          state.temp = Math.floor(((tempK - 273) * (9 / 5)) + 32)
          displayTemp.textContent = `${state.temp}`;
          tempColor();
        })
        .except((error) => {
          console.log("Error: Could not get Weather")
        })
    })
    .except((error) => {
      console.log("Error: COuld not get Lat Lon")
    })
}

const registerEventHandlers = () => {
  loadControls();
  plusButton.addEventListener('click', increaseTemp);
  minusButton.addEventListener('click', decreaseTemp);
  textBox.addEventListener('input', updateCity);
  getTempButton.addEventListener("click", updateTemp);
  resetButton.addEventListener("click", resetCity);
  setButton.addEventListener("click", updateTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
