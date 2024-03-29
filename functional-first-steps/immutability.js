"use strict"

// instead of myArray.push(element)
function push(element, array) {
  array = [...array];
  array.push(element);
  return array;
}

let prePush = [1, 2, 3];
let postPush = push(4, prePush);

console.log(compareArrays(postPush, [1, 2, 3, 4]));
console.log(compareArrays(prePush, [1, 2, 3]));

function update(index, value, array) {
  array = [...array];
  array[index] = value;
  return array;
}

let preUpdate = ["spellling", "is", "hard"];
let postUpdate = update(0, "SPELLING", preUpdate);

console.log(postUpdate.toString() === ["SPELLING", "is", "hard"].toString());
console.log(preUpdate.toString() === ["spellling", "is", "hard"].toString());

// instead of myArray.pop();
function pop(array) {
  array = [...array];
  array.pop();
  return array;
}

let prePop = [1, 2, 3, "popMe"];
let postPop = pop(prePop);

console.log(compareArrays(postPop, [1, 2, 3]));
console.log(compareArrays(prePop, [1, 2, 3, "popMe"]));

// Compare two arrays
function compareArrays(array1, array2) {
  return array1.toString() === array2.toString();
}
