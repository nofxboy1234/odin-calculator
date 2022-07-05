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
    totalWasCalculated ||
    dividedByZero
  ) {
    replaceValueOnScreen(num);
    if (totalWasCalculated) {
      totalWasCalculated = false;
      resetValuesAndSubcalc();
    }
    if (dividedByZero) {
      dividedByZero = false;
      resetValuesAndSubcalc();
      toggleScreenMessageStyle();
    }
  } else {
    appendValueToScreen(num);
  }
};

const resetValuesAndSubcalc = () => {
  values = [];
  clearSubcalcScreen();
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
  return document.querySelector('.screen').textContent;
};

const replaceValueOnScreen = (num) => {
  document.querySelector('.screen').textContent = num;
};

const appendValueToScreen = (num) => {
  let screen = document.querySelector('.screen');
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

const toggleScreenMessageStyle = () => {
  document.querySelector('.screen').classList.toggle('screen-message');
};

const toggleOperatorButtonsEnabled = () => {};

const isDivideByZero = () => {
  if (values[1] === '/' && values[2] === 0) {
    replaceValueOnScreen(`Cannot divide by zero`);
    dividedByZero = true;
    toggleScreenMessageStyle();
  }
  return dividedByZero;
};

const numButtonsSetup = (e) => {
  displayNumberOnScreen(e.target.textContent);
};

const operatorButtonsSetup = (e) => {
  storeScreenNumber();
  storeOperator(e.target.textContent);

  if (values.length === 4) {
    if (isDivideByZero()) {
      return;
    }
    calculateSubtotal();
    storeOperator(e.target.textContent);
    displayNumberOnScreen(values[0]);
  }

  displaySubcalc();
};

const equalsButtonSetup = (e) => {
  storeScreenNumber();
  storeOperator(e.target.textContent);

  displaySubcalcAfterEquals();
  if (isDivideByZero()) {
    return;
  }
  calculateSubtotal();
  replaceValueOnScreen(values[0]);
  // values = [];
  totalWasCalculated = true;
};

const clearButtonSetup = () => {
  replaceValueOnScreen(0);
  resetValuesAndSubcalc();
};

const numberButtons = document.querySelectorAll('.btn-num');
numberButtons.forEach((num) => {
  num.addEventListener('click', (e) => {
    numButtonsSetup(e);
  });
});

const operatorButtons = document.querySelectorAll('.btn-operator');
operatorButtons.forEach((op) => {
  op.addEventListener('click', (e) => {
    operatorButtonsSetup(e);
  });
});

const equalsButton = document.querySelector('.btn-equals');
equalsButton.addEventListener('click', (e) => {
  equalsButtonSetup(e);
});

const clearButton = document.querySelector('.btn-clear');
clearButton.addEventListener('click', (e) => {
  clearButtonSetup();
});

let values = [];
let totalWasCalculated = false;
let dividedByZero = false;

const operatorFunctions = { '+': add, '-': subtract, x: multiply, '/': divide };
