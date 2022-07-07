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

function isOperator(value) {
  return Object.keys(operatorFunctions).includes(value);
}

function updateState() {
  if (state.length === 0) {
    state.push('0');
  } else if (lastButtonPressed === 'C') {
    state[0] = '0';
  } else if (state.at(-1) === '0' || Number(state.at(-1))) {
    if (lastButtonPressed === '0' || Number(lastButtonPressed)) {
      if (state.length === 1) {
        if (state[0] === '0') {
          state[0] = lastButtonPressed;
        } else {
          state[0] = state[0] + lastButtonPressed;
        }
      } else if (state.length === 3) {
        state[2] = state[2] + lastButtonPressed;
      }
    } else if (isOperator(lastButtonPressed)) {
      if (state.length === 0) {
        console.log('Trying to operate on empty state');
      } else if (state.length === 3) {
        state = [operate(state[1], Number(state[0]), Number(state[2]))];
        state.push(lastButtonPressed);
      } else {
        state.push(lastButtonPressed);
      }
    }
  } else if (isOperator(state.at(-1))) {
    if (lastButtonPressed === '0' || Number(lastButtonPressed)) {
      state.push(lastButtonPressed);
    } else if (isOperator(lastButtonPressed)) {
      state[state.length - 1] = lastButtonPressed;
    }
  }

  if (state.length === 3) {
    mainDisplay.textContent = state.at(2);
  } else {
    mainDisplay.textContent = state.at(0);
  }
}

function numberButtonPressed(e) {
  lastButtonPressed = e.target.textContent;
  updateState();
}

function operatorButtonPressed(e) {
  lastButtonPressed = e.target.textContent;
  updateState();
}

function clearButtonPressed(e) {
  lastButtonPressed = e.target.textContent;
  updateState();
}

function equalsButtonPressed(e) {
  if (state.length === 3) {
    state = [operate(state[1], Number(state[0]), Number(state[2]))];
    mainDisplay.textContent = state.at(0);
  }
}

const mainDisplay = document.querySelector('.main-display');

const numberButtons = document.querySelectorAll('.btn-num');
numberButtons.forEach((numButton) => {
  numButton.addEventListener('click', numberButtonPressed);
});

const operatorButtons = document.querySelectorAll('.btn-operator');
operatorButtons.forEach((opButton) => {
  opButton.addEventListener('click', operatorButtonPressed);
});

const clearButton = document.querySelector('.btn-clear');
clearButton.addEventListener('click', clearButtonPressed);

const equalsButton = document.querySelector('.btn-equals');
equalsButton.addEventListener('click', equalsButtonPressed);

let state = [];
let lastButtonPressed = '';
const operatorFunctions = { '+': add, '-': subtract, x: multiply, '/': divide };
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
updateState();
