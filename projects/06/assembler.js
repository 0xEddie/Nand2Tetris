const { argv } = require("node:process");
const fs = require("fs");

class Parser {
  constructor(inputPath) {
    
    // CLASS PROPERTIES
    this.lineIdx = undefined;
    this.numberOfLines = this.lines.length;
        
    // INPUT FILE MANAGEMENT
    // grab file contents
    const inputFile = fs.readFileSync(inputPath, "utf-8");
    // find output file path from input file path
    // TODO change output file extension from .txt to .hack
    const outputPath = `${inputPath.slice(0, inputPath.lastIndexOf("."))}.txt`;
    // create blank output file
    fs.writeFileSync(outputPath, "");

    // regex for finding `//` at start of line
    const reggy = /^\/{2}/;
    // split contents on line breaks -> '\r\n' on Windows, '\n\' on Unix
    // trim whitespace from start and end of line
    // filter out lines containing only whitespace or comments
    this.lines = inputFile.split(/\r?\n/).trim().filter( line => {
      if ( !line.length === 0 && !reggy.test(line) ) {
        return line;
      }
    });
    
  }
  
  hasMoreCommands() {
    return ( this.lineIdx < this.numberOfLines - 1 ) ? true : false;
  }
  
  advance() {
    if (typeof(this.lineIdx) === undefined) {
      this.lineIdx = 0;
    } else this.lineIdx++;
  }
  
  commandType() {
    const line = this.lines[this.lineIdx];
    // check if first char in line is `@`
    if (line[0] == "@") {
      return "A_COMMAND";
    } 
    // regex match to check if line enclosed in parentheses
    else if (/^\(.*\)$/.test(line)) {
      return "L_COMMAND";
    } 
    // otherwise it's a C_command
    else {
      return "C_COMMAND";
    }
  }
  
  symbol() {
    const line = this.lines[this.lineIdx];
    
    switch (commandType()) {
      case "A_COMMAND":
        return line.slice(1);
      case "L_COMMAND":
        return line.slice(1,-1);
    }
  }
  
  
}

function main() {
  // grab file path from commandline arguments
  const filePath = argv[2];
  const parser = new Parser(filePath);
  
  while (parser.hasMoreCommands()) {
    advance()
  }
  // const line = ['@2', 'D=A', '@3', 'D=D+A', '@0', 'M=D', '(LOOP)'];
}

main();
