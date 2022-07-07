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

function checkValues() {
  if (values.length == 0) {
    values.push(0);
  }
}

function numberButtonPressed(e) {
  console.log('numberButtonPressed');
  mainDisplay.textContent = e.target.textContent;
}

const mainDisplay = document.querySelector('.screen');

const numberButtons = document.querySelectorAll('.btn-num');
numberButtons.forEach((num) => {
  num.addEventListener('click', numberButtonPressed);
});

let values = [];
checkValues();
const operatorFunctions = { '+': add, '-': subtract, x: multiply, '/': divide };
