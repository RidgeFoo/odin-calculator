const clearText = "AC";
const operatorFunctions = {
  "+": add,
  "-": subtract,
  "×": multiply,
  "÷": divide,
};

function operate(a, b, operator) {
  return operatorFunctions[operator](parseInt(a), parseInt(b));
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let a = null;
let b = null;
let numberToDisplay = null;
let operatorUsed = null;

// Setup event listener and update display and values
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) =>
  button.addEventListener("click", () => {
    evaluateInput(button.textContent);
    document.querySelector(".display").textContent = numberToDisplay || "0";
  })
);

function evaluateInput(input) {
  if (input === clearText) {
    numberToDisplay = null;
    operatorUsed = null;
    a = null;
    b = null;
  } else if (input in operatorFunctions) {
    operatorUsed = input;
    a = numberToDisplay;
  } else if (input === "=" && operatorUsed && a != null) {
    b = numberToDisplay;
    numberToDisplay = operate(a, b, operatorUsed);
    operatorUsed = null;
  } else if (operatorUsed || !numberToDisplay) {
    a = numberToDisplay;
    numberToDisplay = input;
  } else {
    numberToDisplay += input;
  }
}