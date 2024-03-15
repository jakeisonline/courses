/* # Iterators */

// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log("Hello, world!");

// CHALLENGE 1

/* A) Create a for loop that iterates through an array and returns the sum of
the elements of the array.

B) Create a functional iterator for an array that returns each value of the
array when called, one element at a time. */

function sumFunc(arr) {
  let sum = 0;

  for (i in arr) {
    sum = sum + arr[i];
  }

  return sum;
}

const array = [1, 2, 3, 4];
console.log(sumFunc(array)); // -> should log 10

function returnIterator(arr) {
  let i = 0;

  const iterator = () => {
    const currIteration = arr[i];
    i++;
    return currIteration;
  }

  return iterator;
}

const array2 = ['a', 'b', 'c', 'd'];
const myIterator = returnIterator(array2);
console.log(myIterator()); // -> should log 'a'
console.log(myIterator()); // -> should log 'b'
console.log(myIterator()); // -> should log 'c'
console.log(myIterator()); // -> should log 'd'

// CHALLENGE 2

/* Create an iterator with a next method that returns each value of the array
when .next is called. */

function nextIterator(arr) {
  let i = 0;

  return { next: () => {
    const currIteration = arr[i];
    i++;
    return currIteration;
  }};
}

const array3 = [1, 2, 3];
const iteratorWithNext = nextIterator(array3);
console.log(iteratorWithNext.next()); // -> should log 1
console.log(iteratorWithNext.next()); // -> should log 2
console.log(iteratorWithNext.next()); // -> should log 3

// CHALLENGE 3

/* Write code to iterate through an entire array using your nextIterator and sum the values. Use your nextIterator function. */

function sumArray(arr) {
  let sum = 0;
  let iterator = nextIterator(arr);
  let next = iterator.next();

  while (next) {
    sum = sum + next;
    next = iterator.next();
  }

  return sum;
}

const array4 = [1, 2, 3, 4];
console.log(sumArray(array4)); // -> should log 10

// CHALLENGE 4

/* Create an iterator with a next method that returns each value of a set when .next is called */

function setIterator(set) {
  const setValues = set.values();
  return { next: () => {
      return setValues.next().value;
    }
  }
}

const mySet = new Set('hey');
const iterateSet = setIterator(mySet);
console.log(iterateSet.next()); // -> should log 'h'
console.log(iterateSet.next()); // -> should log 'e'
console.log(iterateSet.next()); // -> should log 'y'

// CHALLENGE 5

/* Create an iterator with a next method that returns an array with two
elements (where the first element is the index and the second is the value at
that index) when .next is called. */

function indexIterator(arr) {
  const mySet = new Set(arr);
  let i = 0;
  const setValues = mySet.values();

  return {
    next: () => {
      const key = i
      const value = setValues.next().value;
      i++;

      return [key, value]
    }
  }
}

// Uncomment the lines below to test your work
const array5 = ['a', 'b', 'c', 'd'];
const iteratorWithIndex = indexIterator(array5);
console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
console.log(iteratorWithIndex.next()); // -> should log [2, 'c']

// CHALLENGE 6

/* Create an iterator that returns each word from a string of words on the call
of its .next method (hint: use regex!)

Then attach it as a method to the prototype of a constructor Words. Hint:
research Symbol.iterator! */

function Words(string) {
  this.str = string;
}

Words.prototype[Symbol.iterator] = function* () {
  const splitWord = this.str.split(" ");

  for (i in splitWord) {
    yield splitWord[i];
  }
};

const helloWorld = new Words('Hello World');
for (let word of helloWorld) { console.log(word); } // -> should log 'Hello' and 'World'

// CHALLENGE 7

function valueAndPrevIndex(array) {}

// const returnedSentence = valueAndPrevIndex([4, 5, 6]);
// console.log(returnedSentence.sentence());
// console.log(returnedSentence.sentence());
// console.log(returnedSentence.sentence());

//CHALLENGE 8

function* createConversation(string) {}

// console.log(createConversation("english").next());

//CHALLENGE 9
function waitForVerb(noun) {}

async function f(noun) {}

f("dog");
