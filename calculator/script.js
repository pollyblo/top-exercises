// TODO: Reprendre la valeur de equals quand elle existe si l'user veut continuer à faire des opérations sur ce résultat

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
   return Math.round((n1ToNumber / n2ToNumber) * 100) / 100;
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
const storedResult = document.getElementById('stored-result');

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
      arrOperate.push(e.target.value);
      display.textContent = `${e.target.value} `;
      storedResult.textContent = `${waitingResult}`;
      storedResult.style.display = 'block';
      display.style.paddingBottom = '5px';
   } else {
      arrOperate.push(e.target.value);
      display.textContent += ` ${e.target.value} `;
   }

   if (!isNaN(arrOperate[1])) {
      const temp = arrOperate[1];
      arrOperate[1] = arrOperate[2];
      arrOperate[2] = temp;
   }
   storage = '';
   console.log(arrOperate);
}

function equalsTo() {
   storedResult.style.display = 'none';
   display.style.paddingBottom = '0px';
   storage.length === 0
      ? (display.textContent = '')
      : arrOperate.push(Number(storage));
   endTotal = operate(arrOperate[1], arrOperate[0], arrOperate[2]);
   display.textContent = endTotal;
   console.log(arrOperate);
}
