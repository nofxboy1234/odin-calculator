const add = (num1, num2) => {
  console.log('add!');
  return Number(num1) + Number(num2);
};

const subtract = (num1, num2) => {
  console.log('subtract!');
  return Number(num1) - Number(num2);
};

const multiply = (num1, num2) => {
  console.log('multiply!');
  return Number(num1) * Number(num2);
};

const divide = (num1, num2) => {
  console.log('divide!');
  return Number(num1) / Number(num2);
};

const operate = (operator, num1, num2) => {
  const func = operatorFunctions[operator];
  return func(num1, num2);
};

const storeValue = (value) => {
  storedValues.push(value);
};

const displayNumber = (num) => {
  const screen = document.getElementById('screen');
  if (operatorEntered) {
    console.log('initializing screen');
    screen.textContent = num;
  } else {
    console.log('appending to screen');
    screen.textContent = `${screen.textContent}${num}`;
  }
};

const calculateSolution = () => {
  console.log(`operator: ${lastOperator}`);
  const num1 = storedValues[0];
  const num2 = storedValues[1];

  const solution = operate(lastOperator, num1, num2);
  console.log(`solution: ${solution}`);
  return solution;
};

const initializeStoredValues = (num1, operator) => {
  storedValues = [num1];
  // lastOperator = operator === '=' ? undefined : operator;
  lastOperator = operator;
  canEnterOperator = true;
  operatorEntered = true;
};

const numbers = document.querySelectorAll('.btn-num');
numbers.forEach((num) => {
  num.addEventListener('click', (e) => {
    canEnterOperator = true;

    if (lastOperator === '=') {
      initializeStoredValues(e.target.textContent, lastOperator);
      storeValue(e.target.textContent);
      displayNumber(e.target.textContent);
    }

    storeValue(e.target.textContent);
    displayNumber(e.target.textContent);
    operatorEntered = false;
  });
});

const operators = document.querySelectorAll('.btn-operator');
operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    if (!canEnterOperator) {
      return;
    }

    operatorEntered = true;
    canEnterOperator = false;
    const solution = calculateSolution();
    lastOperator = e.target.textContent;
    initializeStoredValues(solution, lastOperator);
    displayNumber(solution);
  });
});

let storedValues = [0];
let lastOperator = '+';
let canEnterOperator = false;
let operatorEntered = true;
const operatorFunctions = { '+': add, '-': subtract, x: multiply, '/': divide };
