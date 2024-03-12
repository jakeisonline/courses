/* # Template Literals

Build your own tag function, called `upper`. Use it to drop in `name`,
`twitter`, `topic` into the string, ensuring those values are uppercased while
keeping the rest of the string lower case.
*/

function upper(strings, ...values) {
  const upperValues = values.map((v) => v.toUpperCase());
  let returnString = "";

  for (let i = 0; i < strings.length; i++) {
    if (i > 0) {
      returnString += upperValues[i - 1];
    }

    returnString += strings[i];
  }

  return returnString;

}

var name = "kyle",
  twitter = "getify",
  topic = "JS Recent Parts";

console.log(
  upper`Hello ${name} (@${twitter}), welcome to ${topic}!` ===
    "Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);
