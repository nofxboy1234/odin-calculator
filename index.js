const add = (num1, num2) => {
  console.log('add!');
  return num1 + num2;
};

const subtract = (num1, num2) => {
  console.log('subtract!');
  return num1 - num2;
};

const multiply = (num1, num2) => {
  console.log('multiply!');
  return num1 * num2;
};

const divide = (num1, num2) => {
  console.log('divide!');
  return num1 / num2;
};

const operate = (operator, num1, num2) => {
  const func = operatorFunctions[operator];
  return func(Number(num1), Number(num2));
};

const storeNumber = (value) => {
  const screen = document.getElementById('screen');
  // Store what is displayed on the screen
  // Replace index 0 or 2 of storedValues
  // Check if there is an operator stored
  let found = false;
  Object.keys(operatorFunctions).forEach((operator) => {
    found = storedValues.includes(operator);
  });

  if (found) {
    // Replace index 2
    storedValues[2] = Number(screen.textContent);
  } else {
    // Replace index 0
    storedValues[0] = Number(screen.textContent);
  }
};

const storeOperator = (value) => {
  storedValues.push(value);
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

const displaySolution = (num) => {
  const screen = document.getElementById('screen');
  screen.textContent = num;
};

const displayNumberAndOperator = (num, operator) => {
  console.log('displayNumberAndOperator');
};

const numberButtons = document.querySelectorAll('.btn-num');
numberButtons.forEach((num) => {
  num.addEventListener('click', (e) => {
    displayNumber(e.target.textContent);
    storeNumber(e.target.textContent);
  });
});

const operatorButtons = document.querySelectorAll('.btn-operator');
operatorButtons.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    // const solution = calculateSolution();
    // displayNumberAndOperator(e.target.textContent);

    let operatorEntered;
    // If there's already an operator stored
    if (Object.keys(operatorFunctions).includes(storedValues.at(-1))) {
      operatorEntered = true;
    } else {
      operatorEntered = false;
    }

    if (operatorEntered) {
      return;
    }

    if (storedValues.length === 3) {
      console.log('Operate on num1 and num2');
      const num1 = storedValues[0];
      const operator = storedValues[1];
      const num2 = storedValues[2];
      const solution = operate(operator, num1, num2);
      displaySolution(solution);
    } else {
      storeOperator(e.target.textContent);
    }
  });
});

let storedValues = [];
const operatorFunctions = { '+': add, '-': subtract, x: multiply, '/': divide };
storeNumber(0);
