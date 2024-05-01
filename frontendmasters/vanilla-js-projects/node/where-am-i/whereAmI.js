// Run this in Node
import { say } from "cowsay";

const currentDir = process.cwd();

console.log(say({
    text: 'You are here:' + currentDir,
    e: '^^', // eyes
    T: 'U ', // tongue
  })
);

