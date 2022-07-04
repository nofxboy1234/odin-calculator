const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const operate = (operator, num1, num2) => {
  const func = operatorFunctions[operator];
  return func(num1, num2);
};

const displayNumberOnScreen = (num) => {
  if (
    Number(screenValue()) === 0 ||
    Object.keys(operatorFunctions).includes(values.at(-1)) ||
    totalWasCalculated
  ) {
    replaceValueOnScreen(num);
    if (totalWasCalculated) {
      totalWasCalculated = false;
      clearSubcalcScreen();
    }
  } else {
    appendValueToScreen(num);
  }
};

const clearSubcalcScreen = () => {
  document.getElementById('sub-calc').textContent = '';
};

const storeScreenNumber = () => {
  values.push(Number(screenValue()));
};

const storeOperator = (operator) => {
  values.push(operator);
};

const screenValue = () => {
  return document.getElementById('screen').textContent;
};

const replaceValueOnScreen = (num) => {
  document.getElementById('screen').textContent = num;
};

const appendValueToScreen = (num) => {
  let screen = document.getElementById('screen');
  screen.textContent = screen.textContent.concat(num);
};

const calculateSubtotal = () => {
  values = [operate(values[1], values[0], values[2])];
};

const displaySubcalc = () => {
  document.getElementById('sub-calc').textContent = values.join(' ');
};

const displaySubcalcAfterEquals = () => {
  document.getElementById('sub-calc').textContent = values.join(' ');
};

const numberButtons = document.querySelectorAll('.btn-num');
numberButtons.forEach((num) => {
  num.addEventListener('click', (e) => {
    displayNumberOnScreen(e.target.textContent);
  });
});

const operatorButtons = document.querySelectorAll('.btn-operator');
operatorButtons.forEach((op) => {
  op.addEventListener('click', (e) => {
    storeScreenNumber();
    storeOperator(e.target.textContent);

    if (values.length === 4) {
      calculateSubtotal();
      storeOperator(e.target.textContent);
      displayNumberOnScreen(values[0]);
    }

    displaySubcalc();
  });
});

const equalsButton = document.querySelector('.btn-equals');
equalsButton.addEventListener('click', (e) => {
  storeScreenNumber();
  storeOperator(e.target.textContent);

  displaySubcalcAfterEquals();
  calculateSubtotal();
  replaceValueOnScreen(values[0]);
  values = [];
  totalWasCalculated = true;
});

let values = [];
let totalWasCalculated = false;

const operatorFunctions = { '+': add, '-': subtract, x: multiply, '/': divide };
