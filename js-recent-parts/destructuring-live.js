/* # Destructuring

In this exercise, the instructor live codes examples of destructuring. I have
attempted to capture the examples here.
*/

function arrayDestructor() {
  return [1, 2, 3, , , 6, 7, 8];
}

var tmp;
var [
  first,
  second,
  third,
  fourth,
  fifth = 5,
  ,
  ...rest
] = arrayDestructor() || []; // Protection from null values

console.log(first === 1)
console.log(second === 2);
console.log(third === 3);
console.log(fourth === undefined);
console.log(fifth === 5);
// We skip 6 due to the , in data pattern
console.log((rest[0] === 7) && (rest[1] === 8));


// We can also handle nested arrays
var [
  first,
  [second, third] = [], // We can have null protection here, too
  fourth,
  fifth = 5,
  ,
  ...rest
] = [1, [2, 3], , , 6, 7, 8];

console.log(first === 1)
console.log(second === 2);
console.log(third === 3);
console.log(fourth === undefined);
console.log(fifth === 5);
// We skip 6 due to the , in data pattern
console.log((rest[0] === 7) && (rest[1] === 8));


// We can use destructors in function params too
function destructorParams([
  first,
  second,
  third,
  fourth,
  fifth = 5,
  ,
  ...rest
] = []) {
  console.log(first === 1);
  console.log(second === 2);
  console.log(third === 3);
  console.log(fourth === undefined);
  console.log(fifth === 5);
  // We skip 6 due to the , in data pattern
  console.log(rest[0] === 7 && rest[1] === 8);
}

destructorParams([1, 2, 3, , , 6, 7, 8]);


// Deconstructors can be used on objects, too
function data() {
  return { a: 1, b: { c: 3, d: 4 }, g: 7, h: 8 };
}

data = {
  a,
  b: { c, d } = {}, // We can have null protection here, too
  e = 5,
  ...rest
} = data();

console.log(a === 1);
console.log(c === 3);
console.log(d === 4);
console.log(e === 5);
console.log(rest.g === 7 && rest.h === 8);
