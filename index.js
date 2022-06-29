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
  // console.log(`number to display: ${num}`);
  displayValue = num;
  document.getElementById('screen').textContent = num;
};

// function displayNumber(num) {
//   console.log(`number to display: ${num}`);
//   document.getElementById('screen').textContent = num;
// }

// const btn0Click = () => {
//   console.log('button 0 clicked');
// };

// const btn0 = document.getElementById('btn-0');
// btn0.addEventListener('click', btn0Click);

const numbers = document.querySelectorAll('.number');
numbers.forEach((num) =>
  num.addEventListener('click', (e) => {
    // console.log(e.target);
    displayNumber(e.target.textContent);
  })
);

let displayValue = 0;
displayNumber(displayValue);
