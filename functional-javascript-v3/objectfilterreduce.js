/* # Data Structures (And FP Review!)

This is an exercise to practice list-operations (map/filter/reduce) on more general data structures. We also revisit a variety of previous FP concepts (point-free, currying, etc).

## Instructions (Part 1)

1. Familiarize yourself with the provided utilities and helpers, like `listSum(..)`, `listProduct(..)`, `mapObj(..)`, etc.

2. Find the `// TODO` comments to implement both `filterObj(..)` and `reduceObj(..)`. The fixed exercise should now print `38886` to the console.

## Instructions (Part 2)

1. Recall/review the following topics:
	- argument manipulation (`binary(..)`)
	- point-free style
	- composition (`compose(..)`, `pipe(..)`)
	- currying
	- list operations (`reduce(..)`)

2. Using only the provided utilities in this exercise, refactor the three separate statements that invoke `mapObj(..)`, `filterObj(..)`, and `reduceObj(..)` into a single list operation that's completely point-free.

3. Hint: `reduce(..)` and `pipe(..)`.

*/

"use strict";

// inception!
curry = curry(2,curry);

var nums = {
	first: [3,5,2,4,9,1,12,3],
	second: [5,7,7,9,10,4,2],
	third: [1,1,3,2]
};

// const reducedObj = pipe(
//   curry(2)(filterObj(compose(isOdd, listSum))),
//   curry(2)(mapObj(listProduct)),
//   curry(2)(reduceObj(sum,0)),
// )(nums);
// // 38886

const reducedObj = [
	curry(2)(filterObj)(compose(isOdd,listSum)),
	curry(2)(mapObj)(listProduct),
	curry(3)(reduceObj)(sum)(0)
].reduce(binary(pipe))(nums);

console.log(reducedObj === 38886);



// ************************************

function mapObj(mapperFn,o) {
	var newObj = {};
	var keys = Object.keys(o);
	for (let key of keys) {
		newObj[key] = mapperFn( o[key] );
	}
	return newObj;
}

function filterObj(predicateFn,o) {
	let newObj = {};
  let keys = Object.keys(o);

  for (let key of keys) {
    if (predicateFn(o[key])) newObj[key] = o[key];
  }

  return newObj;
}

function reduceObj(reducerFn,initialValue,o) {
	let result = initialValue;
  let keys = Object.keys(o);

  for (let key of keys) {
    result = reducerFn(result, o[key]);
  }

  return result;
}


// ************************************

function curry(arity,fn) {
	return (function nextCurried(prevArgs){
		return function curried(nextArg){
			var args = prevArgs.concat([nextArg]);
			if (args.length >= arity) {
				return fn(...args);
			}
			else {
				return nextCurried(args);
			}
		};
	})([]);
}
function compose(...fns) {
	return function composed(arg) {
		return fns.reduceRight((result,fn) => fn(result),arg);
	};
}
function pipe(...fns) {
	return compose(...fns.reverse());
}
function binary(fn) {
	return function two(arg1,arg2){
		return fn(arg1,arg2);
	};
}


// ************************************

function isOdd(v) { return v % 2 == 1; }
function sum(x,y) { return x + y; }
function mult(x,y) { return x * y; }
function listSum(list) { return list.reduce(sum,0); }
function listProduct(list) { return list.reduce(mult,1); }




