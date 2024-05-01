/* # Lists (And FP Review!)

This is an exercise to practice list operations (map/reduce/filter). We also revisit a variety of previous FP concepts (closure, recursion, etc).

## Bonus

Write tests for your functions.
*/

"use strict";


/* 1. Write two functions, each of which return a fixed number (different from
each other) when called. */

function fixNum1() {
  return 5;
}

function fixNum2() {
  return 10;
}


/* 2. Write an `add(..)` function that takes two numbers and adds them and returns
the result. Call `add(..)` with the results of your two functions from (1) and
print the result to the console. */

function add(num1, num2) {
  return num1 + num2;
}

const addedNumbers = add(fixNum1(), fixNum2());
console.log(addedNumbers === 15);


/* 3. Write an `add2(..)` that takes two functions instead of two numbers, and it
calls those two functions and then sends those values to `add(..)`, just like
you did in (2) above. */

function add2(fn1, fn2) {
  return (add(fn1(), fn2()));
}

const addedNumbers2 = add2(fixNum1, fixNum2);
console.log(addedNumbers2 === 15);


/* 4. Replace your two functions from (1) with a single function that takes a
value and returns a function back, where the returned function will return the
value when it's called. */

function returnValue(value) {

  return function v() {
    return value;
  }
}

const valueOfReturnValue = returnValue(20);
console.log(valueOfReturnValue() === 20);


/* 5. Write an `addn(..)` that can take an array of 2 or more functions, and using
only `add2(..)`, adds them together. Try it with a loop. Try it without a loop
(recursion). Try it with built-in array functional helpers (hint: reduce). */

function addnLoop(...fns) {
  while (fns.length > 2) {
    let [fn0, fn1, ...rest] = fns;

    fns = [
      function f() {
        return add2(fn0, fn1);
      },
      ...rest
    ]
  }

  return add2(fns[0], fns[1]);
}

const addnLoop100 = addnLoop(returnValue(10), returnValue(20), returnValue(30), returnValue(40));
const addnLoop30 = addnLoop(returnValue(10), returnValue(20));
console.log(addnLoop100 === 100);
console.log(addnLoop30 === 30);

function addnRecur([fn0, fn1, ...rest]) {
  if (rest.length == 0) { return add2(fn0, fn1); }

  return addnRecur([
    function f() {
      return add2(fn0, fn1);
    },
    ...rest
  ])
}

const addnRecur100 = addnRecur([returnValue(10), returnValue(20), returnValue(30), returnValue(40)]);
const addnRecur30 = addnRecur([returnValue(10), returnValue(20)]);
console.log(addnRecur100 === 100);
console.log(addnRecur30 === 30);

function addnReduce(fns) {
  return fns.reduce(function reducer(composedFn, fn) {
    return function f() {
      return add2(composedFn, fn);
    }
  })();
}

const addnReduce100 = addnReduce([returnValue(10), returnValue(20), returnValue(30), returnValue(40)]);
const addnReduce30 = addnReduce([returnValue(10), returnValue(20)]);
console.log(addnReduce100 === 100);
console.log(addnReduce30 === 30);


/* 6. Start with an array of odd and even numbers (with some duplicates), and trim
it down to only have unique values.*/

const numbers = [ 1, 1, 2, 3, 3, 4, 5, 5 ];

const dedupedNumbers = numbers.reduce(
  function dedupe(newList, value) {
    if (!newList.includes(value)) {
      return [...newList, value];
    }
    return newList;
  },[]
);

console.log(numbers !== dedupedNumbers);

/* 7. Filter your array to only have even numbers in it. */

const evenNumbers = dedupedNumbers.filter(
  function getEvens(value) {
    return value % 2 == 0;
  }
)

console.log(evenNumbers);
