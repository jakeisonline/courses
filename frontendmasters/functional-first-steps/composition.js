"use strict"

function pipeline(...functions) {
  return function piped(input) {
    for (let func of functions) {
      input = func(input);
    }

    return input;
  };
}

let pluralize = singularWord => singularWord + 's'
let heart = word => "I ❤️ " + word
let exclaim = sentence => sentence + "!"

let showSomeLove = pipeline(pluralize, heart, exclaim);
let pipelineLove = showSomeLove('pipeline')
let functionLove = showSomeLove('pure function')
let coffeeLove = showSomeLove('coffee break')
let loveSomeShow = pipeline(exclaim, heart, pluralize)
let wrongOrder = loveSomeShow('pipeline')
let composedPipe = pipeline(pluralize, pipeline(heart, exclaim))
let compositionLove = composedPipe('composition') // should be equivalent to: showSomeLove('composition')
let composedPipe2 = pipeline(pipeline(pluralize, heart), exclaim)
let compositionLove2 = composedPipe2('composition') // should be equivalent to: composedPipe('composition')

console.log(pipelineLove === "I ❤️ pipelines!");
console.log(functionLove === "I ❤️ pure functions!");
console.log(coffeeLove === "I ❤️ coffee breaks!");
console.log(wrongOrder === "I ❤️ pipeline!s");
console.log(compositionLove === "I ❤️ compositions!")
console.log(compositionLove2 === "I ❤️ compositions!");
