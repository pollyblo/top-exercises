// Main

const display = document.getElementById('display');
const digits = document.querySelectorAll('.digit');
const operator = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const storingResult = document.getElementById('stored-result');
const clear = document.getElementById('clear');
const float = document.getElementById('float');

let resultStorage = 0;
let storage = '';
let arrOperate = [];
let equalExecuted = false;

digits.forEach((digit) => {
   digit.addEventListener('click', displayDigit);
});

operator.forEach((op) => {
   op.addEventListener('click', storingOperator);
});

equals.addEventListener('click', equalsTo);

clear.addEventListener('click', clearAll);

float.addEventListener('click', floatNumber);

function displayDigit(e) {
   if (equalExecuted) {
      storage = '';
      display.textContent = '';
   }
   equalExecuted = false;
   if (display.textContent === '0') {
      display.textContent = e.target.value;
   } else {
      display.textContent += e.target.value;
   }
   storage += e.target.value;
   console.log(storage);
}

function storingOperator(e) {
   if (equalExecuted) {
      arrOperate.push(resultStorage, e.target.value);
      equalExecuted = false;
   }
   const number = Number(storage);
   if (arrOperate.length === 2) {
      if (storage === '') {
         if (e.target.value !== arrOperate[1]) {
            arrOperate.pop();
            arrOperate.push(e.target.value);
         } else {
            arrOperate = [arrOperate[0], arrOperate[1]];
         }
      } else {
         arrOperate.push(number);
         const storedResult = operate(
            arrOperate[1],
            arrOperate[0],
            arrOperate[2]
         );
         arrOperate = [];
         storage = '';
         arrOperate.push(storedResult, e.target.value);
      }
      display.textContent = ` ${arrOperate[0]} ${arrOperate[1]} `;
   } else {
      arrOperate.push(Number(storage), e.target.value);
      display.textContent += ` ${e.target.value} `;
      storage = '';
   }
}

function equalsTo() {
   if (!equalExecuted && storage !== '') {
      equalExecuted = true;
      arrOperate.push(Number(storage));
   } else {
      return;
   }
   if (arrOperate.length === 1) {
      storage = arrOperate[0];
      arrOperate.pop();
      return;
   } else if (arrOperate.length == 2) {
      arrOperate = [arrOperate[0], arrOperate[1]];
      display.textContent = `${arrOperate[0]} ${arrOperate[1]}`;
   }
   if (arrOperate.length === 3) {
      const result = operate(arrOperate[1], arrOperate[0], arrOperate[2]);
      display.textContent = result;
      resultStorage = result;
      storage = '';
      arrOperate = [];
   }
}

function clearAll() {
   resultStorage = 0;
   storage = '';
   arrOperate = [];
   equalExecuted = false;
   display.textContent = '0';
}

function isFloat() {
   let isFloat = false;
   const textArray = display.textContent.split('');
   for (const char of textArray) {
      if (char === '.') {
         isFloat = true;
      }
   }
   return isFloat;
}

function floatNumber() {
   if (!isFloat()) {
      display.textContent += '.';
      storage += '.';
   } else {
      return;
   }
}

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
   if (n2ToNumber === 0) {
      return (display.textContent = 'impossible');
   } else {
      return Math.round((n1ToNumber / n2ToNumber) * 100) / 100;
   }
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
