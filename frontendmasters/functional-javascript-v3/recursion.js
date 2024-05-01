/* # Recursion

This is an exercise to practice recursion techniques.

## Instructions

1. Define a recursive `isPalidrome(..)` function that returns `true` if the string passed in is a palindrome -- same string when written forwards or backwards -- or `false` otherwise.

2. An empty string and a single character string are both defined as base-condition palindromes. The strings "aba" and "abba" are also palindromes.

3. All the test cases at the bottom of the exercise file should print `true`.

4. Hint: Consider "abcdcba". A handy recursive definition for a palindrome is that the first and last character of a string (ie, the "a" and "a") must be the same character, and the substring in between (ie, "bcdcb") must also be a palindrome.
*/


"use strict";

function isPalindrome(word) {
  if (word.length <= 1) return true;
  if (word[0] === word[word.length-1]) {
    return isPalindrome(word.slice(1,-1));
  }

  return false;
}

console.log( isPalindrome("") === true );
console.log( isPalindrome("a") === true );
console.log( isPalindrome("aa") === true );
console.log( isPalindrome("aba") === true );
console.log( isPalindrome("abba") === true );
console.log( isPalindrome("abccba") === true );

console.log( isPalindrome("ab") === false );
console.log( isPalindrome("abc") === false );
console.log( isPalindrome("abca") === false );
console.log( isPalindrome("abcdba") === false );
