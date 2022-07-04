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
    Object.keys(operatorFunctions).includes(values.at(-1))
  ) {
    replaceValueOnScreen(num);
  } else {
    appendValueToScreen(num);
  }
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
      values = [operate(values[1], values[0], values[2])];
      storeOperator(e.target.textContent);
    }
  });
});

let values = [];

const operatorFunctions = { '+': add, '-': subtract, x: multiply, '/': divide };
