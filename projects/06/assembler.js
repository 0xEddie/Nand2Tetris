const { argv } = require("node:process");
const fs = require("fs");

class Parser {
  constructor(filePath) {
    const contents = fs.readFileSync(filePath, "utf-8");
    // split contents on line breaks -> '\r\n' on Windows, '\n\' on Unix
    this.lines = contents.split(/\r?\n/);
    // find output file path from input file path
    const outputPath = `${filePath.slice(0, filePath.lastIndexOf("."))}.txt`;
    // create blank output file
    try {
      fs.writeFileSync(outputPath, "");
    } catch (err) {
      console.log(err);
    }
    // write lines to output file
    try {
      // append line to file if it is not whitespace or a comment
      // regex for finding `//` at start of line
      const reggy = /^\/{2}/;
      // if str.trim().length===0, line is blank
      this.lines.forEach((line) => {
        let isBlank;
        ( line.trim().length === 0 | reggy.test(line) ) ? isBlank = false : isBlank = true;
        if (isBlank) {
          fs.appendFileSync(outputPath, `${line.trim()}\n`);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

function main() {
  // grab file path from commandline arguments
  const filePath = argv[2];
  const myparser = new Parser(filePath);
}

main();
