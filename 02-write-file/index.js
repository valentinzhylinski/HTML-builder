const fs = require("fs");
const path = require("path");
const process = require("process");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const greeting = "Hello, enter your text below!";
const goodbye = "Bye, have a nice day";

const writeStream = fs.createWriteStream(path.join(__dirname, "input.txt"), {
  flags: "a",
});

console.log(greeting);

readline.on("line", (input) => {
  let exitText = input.toLowerCase();
  if (exitText === "exit") {
    readline.close();
  } else {
    writeStream.write(`${input}\n`);
  }
});

readline.on("SIGINT", () => {
  readline.close();
});

readline.on("close", () => {
  console.log(goodbye);
});
