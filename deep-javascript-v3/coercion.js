/* TODO: In this exercise, you will define some validation functions that check
user inputs (such as from DOM elements). You'll need to properly handle the
coercions of the various value types.

1. Define an `isValidName(..)` validator that takes one parameter, `name`. The validator returns `true` if all the following match the parameter (`false` otherwise):

	- must be a string
	- must be non-empty
	- must contain non-whitespace of at least 3 characters

2. Define an `hoursAttended(..)` validator that takes two parameters, `attended` and `length`. The validator returns `true` if all the following match the two parameters (`false` otherwise):

	- either parameter may only be a string or number
	- both parameters should be treated as numbers
	- both numbers must be 0 or higher
	- both numbers must be whole numbers
	- `attended` must be less than or equal to `length`

*/

const isValidName = (name) => {
  if (!name) {
    return false;
  } else if (name.trim().length <= 3) {
    return false;
  } else if (typeof name !== "string") {
    return false;
  }

  return true;
};

const hoursAttended = (attended, length) => {
  const isValidType = (v) => {
    return typeof v === "number" || typeof v === "string";
  };
  const isNotNaN = (v) => {
    return v === v;
  };
  const isNotNull = (v) => {
    return v !== null;
  };
  const isHigherThanZero = (v) => {
    return v > 0;
  };
  const isWholeNumber = (v) => {
    return v % 1 === 0;
  };
  const isValid = (v) => {
    return (
      isNotNull(v) &&
      isValidType(v) &&
      isNotNaN(v) &&
      Number(attended) <= Number(length) &&
      isHigherThanZero(v) &&
      isWholeNumber(v)
    );
  };

  return isValid(attended) && isValid(length);
};

// tests:
console.log(isValidName("Frank") === true);
console.log(hoursAttended(6, 10) === true);
console.log(hoursAttended(6, "10") === true);
console.log(hoursAttended("6", 10) === true);
console.log(hoursAttended("6", "10") === true);

console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);
console.log(hoursAttended("", 6) === false);
console.log(hoursAttended(6, "") === false);
console.log(hoursAttended("", "") === false);
console.log(hoursAttended("foo", 6) === false);
console.log(hoursAttended(6, "foo") === false);
console.log(hoursAttended("foo", "bar") === false);
console.log(hoursAttended(null, null) === false);
console.log(hoursAttended(null, undefined) === false);
console.log(hoursAttended(undefined, null) === false);
console.log(hoursAttended(undefined, undefined) === false);
console.log(hoursAttended(false, false) === false);
console.log(hoursAttended(false, true) === false);
console.log(hoursAttended(true, false) === false);
console.log(hoursAttended(true, true) === false);
console.log(hoursAttended(10, 6) === false);
console.log(hoursAttended(10, "6") === false);
console.log(hoursAttended("10", 6) === false);
console.log(hoursAttended("10", "6") === false);
console.log(hoursAttended(6, 10.1) === false);
console.log(hoursAttended(6.1, 10) === false);
console.log(hoursAttended(6, "10.1") === false);
console.log(hoursAttended("6.1", 10) === false);
console.log(hoursAttended("6.1", "10.1") === false);
