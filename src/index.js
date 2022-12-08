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

const registerEventHandlers = () => {
  loadControls();
  plusButton.addEventListener('click', increaseTemp);
  minusButton.addEventListener('click', decreaseTemp);
  textBox.addEventListener('input', updateCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
