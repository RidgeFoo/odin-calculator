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
let display = null;
let operatorUsed = null;
let errorMessage = null;

// Setup event listener and update display and values
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) =>
  button.addEventListener("click", () => {
    evaluateInput(button.textContent);
    document.querySelector(".display").textContent =
      display || errorMessage || "0";
  })
);

function evaluateInput(input) {
  if (input === clearText) {
    reset();
  } else if (input in operatorFunctions) {
    operatorUsed = input;
    a = display;
  } else if (input === "=" && operatorUsed && a) {
    b = display;
    display = operate(a, b, operatorUsed);
    if (display === Infinity) {
      errorMessage = "Divide by 0 error!";
      reset();
    }
    operatorUsed = null;
  } else if (operatorUsed || !display) {
    a = display;
    display = input;
  } else {
    display += input;
    errorMessage = null;
  }
}

function reset() {
  display = null;
  operatorUsed = null;
  a = null;
  b = null;
}
