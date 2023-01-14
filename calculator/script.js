// Operators functions

function add(n1, n2) {
   const n1ToNumber = Number(n1);
   const n2ToNumber = Number(n2);
   return n1ToNumber + n2ToNumber;
}

function subtract(n1, n2) {
   const n1ToNumber = Number(n1);
   const n2ToNumber = Number(n2);
   return n1ToNumber - n2ToNumber;
}

function multiply(n1, n2) {
   const n1ToNumber = Number(n1);
   const n2ToNumber = Number(n2);
   return n1ToNumber * n2ToNumber;
}

function divide(n1, n2) {
   const n1ToNumber = Number(n1);
   const n2ToNumber = Number(n2);
   return n1ToNumber / n2ToNumber;
}

function operate(operator, n1, n2) {
   switch (operator) {
      case '+':
         return add(n1, n2);
      case '-':
         return subtract(n1, n2);
      case '*':
         return multiply(n1, n2);
      case '/':
         return divide(n1, n2);
      default:
         console.log('Mauvais opérateur');
   }
}

// Main

const display = document.getElementById('display');
const digits = document.querySelectorAll('.digit');
const operator = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');

let storage = '';
let arrOperate = [];

digits.forEach((digit) => {
   digit.addEventListener('click', displayDigit);
});

operator.forEach((op) => {
   op.addEventListener('click', storingOperator);
});

equals.addEventListener('click', equalsTo);

function displayDigit(e) {
   if (arrOperate.length === 3) {
      display.textContent = e.target.value;
      storage = '';
      arrOperate = [];
   } else {
      display.textContent += e.target.value;
   }
   storage += e.target.value;
   console.log(storage, arrOperate);
}

function storingOperator(e) {
   arrOperate.push(Number(storage));
   if (arrOperate.length === 3) {
      const waitingResult = operate(
         arrOperate[1],
         arrOperate[0],
         arrOperate[2]
      );
      arrOperate = [];
      arrOperate.push(waitingResult);
   } else {
      arrOperate.push(e.target.value);
   }
   storage = '';
   console.log(arrOperate);
   display.textContent += e.target.value;
}

function equalsTo() {
   storage.length === 0
      ? (display.textContent = '')
      : arrOperate.push(Number(storage));

   display.textContent = `${operate(
      arrOperate[1],
      arrOperate[0],
      arrOperate[2]
   )}`;
   console.log(arrOperate);
}
