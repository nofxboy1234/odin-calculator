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
  storedValues.push(Number(value));
};

const displayNumber = (num) => {
  const screen = document.getElementById('screen');

  let lastStoredValue = storedValues.at(-1);
  if (typeof lastStoredValue === 'number') {
    if (lastStoredValue === 0) {
      screen.textContent = num;
    } else {
      screen.textContent = screen.textContent.concat(num);
    }
  }
};

// const displayNumberAndOperator = (num, operator) => {
//   console.log('displayNumberAndOperator');
// };

const numberButtons = document.querySelectorAll('.btn-num');
numberButtons.forEach((num) => {
  num.addEventListener('click', (e) => {
    displayNumber(e.target.textContent);
    storeValue(e.target.textContent);
  });
});

// const operators = document.querySelectorAll('.btn-operator');
// operators.forEach((operator) => {
//   operator.addEventListener('click', (e) => {
//     const solution = calculateSolution();
//     storeValue(e.target.textContent);
//     displayNumber(e.target.textContent);
//   });
// });

let storedValues = [];
storeValue(0);
const operatorFunctions = { '+': add, '-': subtract, x: multiply, '/': divide };
