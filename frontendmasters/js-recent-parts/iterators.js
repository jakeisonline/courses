/* # Iterators

Make `numbers` an iteratorable object. By default it will print 0...100
incrementing by 1 each time. But should also take in an argument to print 6...
30 incrementing by 4
*/

var numbers = {
  *[Symbol.iterator]({
      start = 0,
      end = 100,
      increment = 1,
  } = {}) {
    for (let i = start; i <= end; i += increment) {
      yield i;
    }
  }
};

// should print 0..100 by 1s
for (let num of numbers) {
  console.log(num);
}

// should print 6..30 by 4s
const luckyNumbers = [
  ...numbers[Symbol.iterator]({
    start: 6, end: 30, increment: 4
  })];

console.log(`My lucky numbers are: ${luckyNumbers}`);

// Hint:
//     [...numbers[Symbol.iterator]( ?? )]
