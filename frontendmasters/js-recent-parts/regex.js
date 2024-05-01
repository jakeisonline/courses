/* # Regex

The `for` loop should output the following when `poem` is passed into
`powers()` by using regex:

// a gun: kill
// fire: burn
// wind: chill
// a mind: learn
// anger: rage
// a smile: heal

*/

// The Power of a Smile
// by Tupac Shakur
var poem = `
The power of a gun can kill
and the power of fire can burn
the power of wind can chill
and the power of a mind can learn
the power of anger can rage
inside until it tears u apart
but the power of a smile
especially yours can heal a frozen heart`;

for (let power of powers(poem)) {
  console.log(power);
}

function *powers(poem) {
  const regex = /power of (?<power>(?:a |)\w+).*?(?<=can )(?<verb>\w+)/gs;
  let match;

  while (match = regex.exec(poem)) {
    console.log(`${match.groups.power}: ${match.groups.verb}`)
  }
}
