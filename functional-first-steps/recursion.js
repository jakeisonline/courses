
"use strict"

function iterativeFibonacci(n) {
  const fibonacciSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

  let position = 0;
  while (position < n) {
    position++;
  }

  return fibonacciSequence[position];
}

function recursiveFibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return recursiveFibonacci(n-2) + recursiveFibonacci(n-1);
}

console.log(iterativeFibonacci(2) === 1);
console.log(iterativeFibonacci(6) === 8);
console.log(iterativeFibonacci(10) === 55);
console.log(iterativeFibonacci(20) === 6765);
console.log(recursiveFibonacci(2) === 1);
console.log(recursiveFibonacci(6) === 8);
console.log(recursiveFibonacci(10) === 55);
console.log(recursiveFibonacci(20) === 6765);
