const maxLen = 10;

let output = document.getElementById('output-value');
let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
let shouldResetDisplay = false;
let lastOperation = null;
let lastOperand = '';

function enterNum(num) {
  if (output.innerText.length >= maxLen) return;
  if (shouldResetDisplay) {
    output.innerText = '';
    shouldResetDisplay = false;
  }
  output.innerText = output.innerText === '0' ? num : output.innerText + num;
  calculateFontSize();
}

function setOperation(operation) {
  if (currentOperation !== null) calculate();
  firstNumber = output.innerText;
  currentOperation = operation;
  shouldResetDisplay = true;
  calculateFontSize();
}

function calculate() {
  if (currentOperation === null && lastOperation === null) return;

  if (shouldResetDisplay) {
    firstNumber = output.innerText;
    secondNumber = lastOperand;
    currentOperation = lastOperation;
  } else {
    if (secondNumber === '') {
      secondNumber = output.innerText;
    }
    lastOperand = secondNumber;
    lastOperation = currentOperation;
  }

  let result = operate(
    currentOperation,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );

  output.innerText = result.toString().slice(0, maxLen);
  firstNumber = output.innerText;
  secondNumber = '';
  currentOperation = null;
  shouldResetDisplay = true;
  calculateFontSize();
}

function reset() {
  output.innerText = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperation = null;
  shouldResetDisplay = false;
  lastOperation = null;
  lastOperand = '';
  calculateFontSize();
}

function operate(operation, a, b) {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return null;
  }
}

function enterDecimal() {
  if (shouldResetDisplay) {
    output.innerText = '0';
    shouldResetDisplay = false;
  }
  if (!output.innerText.includes('.')) {
    output.innerText += '.';
  }
  calculateFontSize();
}

function toggleSign() {
  output.innerText = (parseFloat(output.innerText) * -1).toString();
}

function calculateFontSize() {
  output.style.fontSize =
    (3 - (output.innerText.length / maxLen) * 1.5).toFixed(2) + 'em';
}
