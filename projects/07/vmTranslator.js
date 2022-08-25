const { argv } = require("node:process");
const fs = require("fs");
const path = require("path");

class Parser {
  constructor(inputPath) {
    // read contents of input file, filter out whitespace and comments
    // copy contents into `lines` array
    
    // grab file contents
    const inputFile = fs.readFileSync(inputPath, "utf-8");
    
    // find output file path from input file path
    const dirname = path.dirname(inputPath);
    const filename = path.basename(inputPath, path.extname(inputPath));
    this.outputPath1 = path.join(dirname, `eo-${filename}.hack`);
    this.outputPath2 = path.join('/mnt/c/Users/googl/Projects/nand2tetris/projects/06', dirname, `eo-${filename}.hack`);
    // create blank output file
    fs.writeFileSync(this.outputPath1, "");
    fs.writeFileSync(this.outputPath2, "");

    let line;
    this.lines = [];
    // split contents on line breaks -> '\r\n' on Windows, '\n\' on Unix
    // push instructions onto `this.lines`
    inputFile.split(/\r?\n/).forEach( rawline => {
      // trim whitespace from start and end of line
      line = rawline.trim();
      // remove comments
      if (line.includes("//")) line = line.replace(/\s*\/{2}.*$/, "");
      
      // filter out lines containing only whitespace
      if ( !(line.length === 0) ) this.lines.push(line);
    });
    
    // CLASS PROPERTIES
    this.lineIdx = undefined;
  }
  
  hasMoreCommands() {
    // check if current line index is at end of file
    if (this.lineIdx === undefined) {
      return true;
    } else return ( this.lineIdx < (this.lines.length - 1) );
  }
  
  advance() {
    if (this.lineIdx === undefined) {
      this.lineIdx = 0;
    } else this.lineIdx++;
  }
}  

function main() {
  const filePath = argv[2];
  const parser = new Parser(filePath);
  
}