let output;
const DIGIT_LIMIT = 10;
let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
let shouldResetDisplay = false;
let lastOperation = null;
let lastOperand = '';

document.addEventListener('DOMContentLoaded', function () {
  output = document.getElementById('output-value');
  if (!output) {
    console.error('Element with id "output-value" not found');
  }
});

function enterNum(num) {
  if (!output) return;
  if (shouldResetDisplay) {
    output.innerText = '';
    shouldResetDisplay = false;
  }
  output.innerText = output.innerText === '0' ? num : output.innerText + num;
  calculateFontSize();
}

function setOperation(operation) {
  if (!output) return;
  if (currentOperation !== null) calculate();
  firstNumber = output.innerText;
  currentOperation = operation;
  shouldResetDisplay = true;
  calculateFontSize();
}

function calculate() {
  if (!output) {
    console.error('Output element is not initialized');
    return;
  }

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

  result = limitToMaxDigits(result);

  output.innerText = result.toString();
  firstNumber = output.innerText;
  secondNumber = '';
  currentOperation = null;
  shouldResetDisplay = true;
  calculateFontSize();
}

function reset() {
  if (!output) {
    console.error('Output element is not initialized');
    return;
  }
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
  if (!output) {
    console.error('Output element is not initialized');
    return;
  }
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
  if (!output) {
    console.error('Output element is not initialized');
    return;
  }
  output.innerText = (parseFloat(output.innerText) * -1).toString();
}

function calculateFontSize() {
  if (!output) {
    console.error('Output element is not initialized');
    return;
  }
  output.style.fontSize =
    (3 - (output.innerText.length / DIGIT_LIMIT) * 1.5).toFixed(2) + 'em';
}

function sqrt() {
  if (!output) {
    console.error('Output element is not initialized');
    return;
  }
  output.innerText = limitToMaxDigits(
    Math.sqrt(parseFloat(output.innerText)).toString()
  );
  calculateFontSize();
}

function limitToMaxDigits(number) {
  let parts = number.toString().split('.');
  let beforeDecimal = parts[0];
  let afterDecimal = parts[1] || '';

  let totalDigits = beforeDecimal.length + afterDecimal.length;

  if (totalDigits > DIGIT_LIMIT) {
    if (beforeDecimal.length >= DIGIT_LIMIT) {
      beforeDecimal = beforeDecimal.slice(0, DIGIT_LIMIT);
      afterDecimal = '';
    } else {
      let remainingDigits = DIGIT_LIMIT - beforeDecimal.length;
      afterDecimal = afterDecimal.slice(0, remainingDigits);
    }
  }

  let newNumber = afterDecimal
    ? `${beforeDecimal}.${afterDecimal}`
    : beforeDecimal;
  return newNumber;
}
