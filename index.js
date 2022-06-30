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
  return operator(num1, num2);
};

const displayNumber = (num) => {
  displayValue = num;
  document.getElementById('screen').textContent = num;
};

const numbers = document.querySelectorAll('.btn-num');
numbers.forEach((num) =>
  num.addEventListener('click', (e) => displayNumber(e.target.textContent))
);
