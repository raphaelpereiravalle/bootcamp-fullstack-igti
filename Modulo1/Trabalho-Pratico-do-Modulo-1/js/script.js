'use strict';

let red = document.querySelector('#red'),
  green = document.querySelector('#green'),
  blue = document.querySelector('#blue'),
  redOut = document.querySelector('#redOut'),
  greenOut = document.querySelector('#greenOut'),
  blueOut = document.querySelector('#blueOut');

const visualizer =  document.querySelector('#visualizer');

const selectColor = () => {
  const color = `rgb(${red.value}, ${green.value}, ${blue.value})`;
  visualizer.style.backgroundColor = color;
  //document.querySelector('#rgbResult').innerText = newColor;         
}

red.addEventListener('change', () => {
  selectColor();
  redOut.value = red.value;
}, false);

red.addEventListener('input', () => {
  selectColor();
  redOut.value = red.value;
}, false);

green.addEventListener('change', () => {
  selectColor();
  greenOut.value = green.value;
}, false);

green.addEventListener('input', () => {
  selectColor();
  greenOut.value = green.value;
}, false);

blue.addEventListener('change', () => {
  selectColor();
  blueOut.value = blue.value;
}, false);

blue.addEventListener('input', () => {
  selectColor();
  blueOut.value = blue.value;
}, false);