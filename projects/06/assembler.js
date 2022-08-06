const { argv } = require("node:process");
const fs = require("fs");

class Parser {
  constructor(inputPath) {
    
    // INPUT FILE MANAGEMENT
    // grab file contents
    const inputFile = fs.readFileSync(inputPath, "utf-8");
    // find output file path from input file path
    // TODO change output file extension from .txt to .hack
    this.outputPath = `${inputPath.slice(0, inputPath.lastIndexOf("."))}1.hack`;
    // create blank output file
    fs.writeFileSync(this.outputPath, "");

    // regex for finding `//` at start of line
    const reggy = /^\/{2}/;
    let notBlank, notComment, line;
    // split contents on line breaks -> '\r\n' on Windows, '\n\' on Unix
    // trim whitespace from start and end of line
    // filter out lines containing only whitespace or comments
    this.lines = inputFile.split(/\r?\n/).filter( rawline => {
      line = rawline.trim();
      notBlank = !(line.length === 0);
      notComment = !reggy.test(line);
      if ( notBlank && notComment ) {
        return line;
      }
    });
    
    // CLASS PROPERTIES
    this.lineIdx = undefined;
    this.numberOfLines = this.lines.length;
    
  }
  
  hasMoreCommands() {
    // check if current line index is at end of file
    if (this.lineIdx === undefined) {
      return true;
    } else return ( this.lineIdx < (this.numberOfLines - 1) );
  }
  
  advance() {
    if (this.lineIdx === undefined) {
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
  
  symbol(cmdType) {
    const line = this.lines[this.lineIdx];
    // based on command type, return symbol or decimal addr of current command
    
    switch (cmdType) {
      case "A_COMMAND":
        return line.slice(1);
      case "L_COMMAND":
        return line.slice(1,-1);
    }
  }
  
  dest() {
    const line = this.lines[this.lineIdx];
    // check if `dest` is present in instruction
    if (line.includes('=')) {
      return line.slice(0, line.indexOf('='));
    } else return null;
  }
  
  comp() {
    const line = this.lines[this.lineIdx];
    // `comp` is either after `=` or before `;` in the instruction
    if (line.includes('=')) {
      return line.slice(line.indexOf('=') + 1);
    } else {
      return line.slice(0, line.indexOf(';'));
    }
  }
  
  jump() {
    const line = this.lines[this.lineIdx];
    // check if `jump` is present in instruction
    if (line.includes(';')) {
      return line.slice(line.indexOf(';') + 1);
    } else return null;
  }
}

class Code {
  constructor() {
    this.destTable = {
      null: '000',
      'M': '001',
      'D': '010',
      'MD': '011',
      'A': '100',
      'AM': '101',
      'AD': '110',
      'AMD': '111'
    };
    this.compTable = {
      '0': '0101010',
      '1': '0111111',
      '-1': '0111010',
      'D': '0001100',
      'A': '0110000',
      '!D': '0001101',
      '!A': '0110001',
      '-D': '0001111',
      '-A': '0110011',
      'D+1': '0011111',
      'A+1': '0110111',
      'D-1': '0001110',
      'A-1': '0110010',
      'D+A': '0000010',
      'D-A': '0010011',
      'A-D': '0000111',
      'D&A': '0000000',
      'D|A': '0010101',
      'M': '1110000',
      '!M': '1110001',
      '-M': '1110011',
      'M+1': '1110111',
      'M-1': '1110010',
      'D+M': '1000010',
      'D-M': '1010011',
      'M-D': '1000111',
      'D&M': '1000000',
      'D|M': '1010101',
    };
    this.jumpTable = {
      null: '000',
      'JGT': '001',
      'JEQ': '010',
      'JGE': '011',
      'JLT': '100',
      'JNE': '101',
      'JLE': '110',
      'JMP': '111',
    };
  }
  dest(d) {
    return this.destTable[d];
  }
  comp(c) {
    return this.compTable[c];
  }
  jump(j) {
    return this.jumpTable[j];
  }
}

function main() {
  // grab file path from commandline arguments
  const filePath = argv[2];
  const parser = new Parser(filePath);
  let line, cmdType;
  const code = new Code();
  
  while (parser.hasMoreCommands()) {
    // move to next command in file
    parser.advance()
    cmdType = parser.commandType();
    // get fields of current command
    // translate instructions into binary
    switch (cmdType) {
      
      case "A_COMMAND":
        // parse instruction string into integer
        // convert decimal number to binary, then cast as string;
        const value = parseInt(parser.symbol(cmdType)).toString(2);
        line = `${value}`;
        while (line.length < 16) {
          line = `0${line}`;
        }
        break;
        
      case "C_COMMAND":
        // get field elements from instruction from `parser`
        // get binary translations from respective `code` method
        const cc = code.comp(parser.comp());
        const dd = code.dest(parser.dest());
        const jj = code.jump(parser.jump());
        
        line = `111${cc}${dd}${jj}`;
        break;
    }
    
    // append new line to output file
    fs.appendFileSync(parser.outputPath, `${line}\n`);
    // console.log(line);
  }
  // const line = ['@2', 'D=A', '@3', 'D=D+A', '@0', 'M=D', '(LOOP)'];
  console.log(`File '${parser.outputPath}' assembled successfully.`)
}

main();
