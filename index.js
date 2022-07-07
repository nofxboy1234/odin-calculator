function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  const func = operatorFunctions[operator];
  return func(num1, num2);
}

function updateState() {
  if (lastButtonPressed === 'C') {
    state[0] = '0';
  } else if (state.length === 0) {
    state.push('0');
  } else if (state.length === 1) {
    if (state[0] === '0') {
      state[0] = lastButtonPressed;
    } else {
      state[0] = state[0] + lastButtonPressed;
    }
  }
  mainDisplay.textContent = state.at(-1);
}

function numberButtonPressed(e) {
  lastButtonPressed = e.target.textContent;
  updateState();
}

function clearButtonPressed(e) {
  lastButtonPressed = e.target.textContent;
  updateState();
}

const mainDisplay = document.querySelector('.main-display');

const numberButtons = document.querySelectorAll('.btn-num');
numberButtons.forEach((num) => {
  num.addEventListener('click', numberButtonPressed);
});

const clearButton = document.querySelector('.btn-clear');
clearButton.addEventListener('click', clearButtonPressed);

let state = [];
let lastButtonPressed = '';
const operatorFunctions = { '+': add, '-': subtract, x: multiply, '/': divide };
updateState();
