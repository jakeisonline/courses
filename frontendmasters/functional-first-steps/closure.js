"use strict"

/* CLOSURE EXERCISES */

function signMessageWith(salutation) {
  return (message, signOff) => {
    return `${message}\n\n${salutation},\n${signOff}`;
  }
}

let writeBusinessMemo = signMessageWith('Best');

console.log(writeBusinessMemo("Hi, Peter. We need to talk about your TPS reports.", "Bob") === "Hi, Peter. We need to talk about your TPS reports.\n\nBest,\nBob");

/* CURRYING EXERCISES */

function quote(name, year, text) {
  return `"${text}"\n- ${name} (${year})\n\n`;
}

let curriedQuote = (name) => {
  return function quoteYear(year) {
    return function quoteText(text) {
      return quote(name, year, text);
    }
  }
}

let quoteCrockford = curriedQuote('Doug Crockford')
let quoteDijkstra = curriedQuote('Edsger Dijkstra')
let quoteDijkstra75 = quoteDijkstra(1975)

let stillGrumpyQuotes = `${[
  curriedQuote('Guido van Rossum')(2001)(
    "Don't you hate code that's not properly indented?"
  ),

  quoteCrockford(2005)('There are no good texts on JavaScript programming.'),

  quoteCrockford(2008)(
    'JavaScript is an astonishing language, in the very worst sense.'
  ),

  quoteDijkstra(1978)(
    'Object oriented programming is an exceptionally bad idea which could only have originated in California.'
  ),

  quoteDijkstra75(
    'By claiming that they can contribute to software engineering, the soft scientists make themselves even more ridiculous.'
  ),

  quoteDijkstra75(
    "Besides a mathematical inclination, an exceptionally good mastery of one's native tongue is the most vital asset of a competent programmer."
  ),

  quoteDijkstra75(
    "The irony of my self-contradiction is lost on me. [Just kidding, he didn't actually say this one - making it all the more true!]"
  )
]}`

console.log(stillGrumpyQuotes);
