const operatorFunctions = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
};

const errorMessage = "Divide by zero";

function operate(a, b, func) {
  return func(parseInt(a), parseInt(b));
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
  return a === 0 || b === 0 ? errorMessage : a / b;
}

let a = null;
let b = null;
let result = null;
let operatorFunction = null;

function reset() {
  result = null;
  operatorFunction = null;
  a = null;
  b = null;
}

function updateDisplay() {
  let toDisplay = "0";
  if (b) {
    toDisplay = b;
  } else if (a) {
    toDisplay = a;
  } else if (result) {
    toDisplay = result;
  }
  document.querySelector("#display").textContent = toDisplay;
}

// If clear button is clicked reset all variables
document.querySelector("#clear").addEventListener("click", () => {
  reset();
  updateDisplay();
});

// If a number is clicked add that to the relevant variable
document.querySelectorAll(".number").forEach((btn) =>
  btn.addEventListener("click", () => {
    const number = btn.textContent;
    if (operatorFunction) {
      b ? (b += number) : (b = number);
    } else {
      a ? (a += number) : (a = number);
    }
    updateDisplay();
  })
);

// Operator calls need to be logged accordingly
document.querySelectorAll(".operator").forEach((operator) =>
  operator.addEventListener("click", () => {
    operatorFunction = operatorFunctions[operator.id];
    /* If they are calling the operator function after getting a result then set
    the result to `a` */
    if (!a) {
      a = result;
    }
    updateDisplay();
  })
);

// Equals call should display result on the display
document.querySelector("#equals").addEventListener("click", () => {
  result = operate(a, b, operatorFunction);
  a = null;
  b = null;
  operatorFunction = null;
  updateDisplay();
});
