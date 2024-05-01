/* # Composition

This is an exercise to practice composition.

## Instructions

1. Define a `compose(..)` that takes any number of functions (as individual arguments) and composes them right-to-left.

2. Define a `pipe(..)` that takes any number of functions (as individual arguments) and composes them left-to-right.
*/

"use strict";

function increment(x) { return x + 1; }
function decrement(x) { return x - 1; }
function double(x) { return x * 2; }
function half(x) { return x / 2; }

function compose(...fns) {
  return pipe(...fns.reverse());
}

function pipe(...fns) {
  return function piped(value) {
    /* Since for is left-to-right, easier to do pipe first,
    then call pipe in reverse */
    for (let fn of fns) {
      value = fn(value);
    }

    return value;
  }
}

var f1 = compose(increment,decrement);
var f2 = pipe(decrement,increment);
var f3 = compose(decrement,double,increment,half);
var f4 = pipe(half,increment,double,decrement);
var f5 = compose(increment);
var f6 = pipe(increment);

console.log( f1(3) === 3 );
console.log( f1(3) === f2(3) );
console.log( f3(3) === 4 );
console.log( f3(3) === f4(3) );
console.log( f5(3) === 4 );
console.log( f5(3) === f6(3) );
