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
  if (operator === '/' && num2 === 0) {
    alert('Cannot divide by zero');
    return 0;
  }
  const func = operatorFunctions[operator];
  let answer = func(num1, num2);
  if (answer.toString().length > 12) {
    return answer.toExponential(6);
  } else {
    return answer;
  }
}

function isOperator(value) {
  return Object.keys(operatorFunctions).includes(value);
}

function validateInput() {
  if (equalsWasPressed) {
    return false;
  }
  // Don't display '00'
  if (mainDisplay.textContent === '0' && lastButtonPressed === '0') {
    return true;
  }
  // Limit the display to 12 digits
  if (
    (mainDisplay.textContent.length === 12 &&
      Number(lastButtonPressed) &&
      Number(state.at(-1))) ||
    (mainDisplay.textContent.length === 12 &&
      lastButtonPressed === '0' &&
      Number(state.at(-1)))
  ) {
    return true;
  }
  return false;
}

function updateDisplay() {
  if (state.length === 3) {
    mainDisplay.textContent = state.at(2);
  } else {
    mainDisplay.textContent = state.at(0);
  }
}

function numberButtonPressed(e) {
  lastButtonPressed = e.target.textContent;
  if (validateInput()) {
    return;
  }
  if (state.at(-1) === '0' || Number(state.at(-1))) {
    if (state.length === 1) {
      if (state[0] === '0' || equalsWasPressed) {
        state[0] = lastButtonPressed;
        equalsWasPressed = false;
      } else {
        state[0] = state[0] + lastButtonPressed;
      }
    } else if (state.length === 3) {
      if (state[2] === '0') {
        state[2] = lastButtonPressed;
      } else {
        state[2] = state[2] + lastButtonPressed;
      }
    }
  } else if (isOperator(state.at(-1))) {
    state.push(lastButtonPressed);
  }
  updateDisplay();
}

function operatorButtonPressed(e) {
  equalsWasPressed = false;
  lastButtonPressed = e.target.textContent;
  if (state.at(-1) === '0' || Number(state.at(-1))) {
    if (state.length === 0) {
      console.log('Trying to operate on empty state');
    } else if (state.length === 3) {
      state = [
        operate(state[1], Number(state[0]), Number(state[2])).toString(),
      ];
      state.push(lastButtonPressed);
    } else {
      state.push(lastButtonPressed);
    }
  } else if (isOperator(state.at(-1))) {
    state[state.length - 1] = lastButtonPressed;
  }
  updateDisplay();
}

function clearButtonPressed(e) {
  lastButtonPressed = e.target.textContent;
  state = ['0'];
  updateDisplay();
}

function equalsButtonPressed(e) {
  if (state.length === 3) {
    state = [operate(state[1], Number(state[0]), Number(state[2])).toString()];
    mainDisplay.textContent = state.at(0);
    equalsWasPressed = true;
  }
}

const mainDisplay = document.querySelector('.display');

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
let equalsWasPressed = false;

if (state.length === 0) {
  state.push('0');
}
updateDisplay();
