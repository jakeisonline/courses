"use strict"

const wholes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* FILTER EXERCISES */

function filter(predicateFn, array) {
  if (length(array) === 0) return [];
  const firstItem = head(array);
  const filteredFirst = predicateFn(firstItem) ? [firstItem] : [];
  return concat(filteredFirst, filter(predicateFn, tail(array)));
}

function isEven(n) {
  return (n % 2) == 0;
}

let evens = filter(isEven, wholes);

// Test isEven()
console.log(compareArrays(evens, [0, 2, 4, 6, 8, 10]) === true);

let odds = filter(n => {
  return !isEven(n);
}, wholes)

// Test odds
console.log(compareArrays(odds, [1, 3, 5, 7, 9]) === true);

let greaterThanFour = filter(
  (n) => { return n > 4 }, // TODO replace this line
  wholes
)

// Test greaterThanFour
console.log(compareArrays(greaterThanFour, [5, 6, 7, 8, 9, 10]) === true);

function isPrime(n, factor = 3) {
  if (n === 2) return true;
  if (n < 2 || n % 2 === 0) return false;
  if (factor * factor > n) return true;
  if (n * factor === 0) return false;
  return isPrime(n, factor + 2);
}

let primes = filter(isPrime, wholes);

/* MAP EXERCISES */

function map(fn, array) {
  if (length(array) === 0) return [];
  return [fn(head(array))].concat(map(fn, tail(array)));
}

let doubled = map(n => n * 2, wholes);
let halved = map(n => n / 2, wholes);

console.log(compareArrays(doubled, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]));
console.log(compareArrays(halved, [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]));

/* REDUCE EXERCISES */

function reduce(reducerFn, initialValue, array) {
  if (length(array) === 0) return initialValue;
  const newInitialValue = reducerFn(initialValue, head(array));
  return reduce(reducerFn, newInitialValue, tail(array));
}

let sum = reduce(
  (accumulator, value) => {
    return accumulator + value;
  },
  0,
  wholes
)

let max = reduce(
  (accumulator, value) => {
    return value > accumulator ? value : accumulator;
  },
  0,
  [7, 1, 3, 5, 6, 2, 8, 10, 0, 4, 9]
)


console.log(sum === 55);
console.log(max === 10);

/* Array helper functions */

// Concatenate two arrays into a new single array
function concat(array1, array2) {
  return array1.concat(array2);
}

// Return the number of items in an array
function length(array) {
  return array.length;
}

// Return the first item in an array
function head(array) {
  return array[0];
}

// Return the rest of an array after the first item
function tail(array) {
  return array.slice(1);
}

// Compare two arrays
function compareArrays(array1, array2) {
  return array1.toString() === array2.toString();
}
