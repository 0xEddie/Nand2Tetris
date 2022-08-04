# Objectives

Write an Assembler program that translates programs written in the symbolic Hack assembly language into binary code that can execute on the Hack hardware platform built in the previous projects.

# Strategy

1. Write an assembler that can only translate programs that contain no symbols
   - all address commands of type '@xxx' are not symbols, only decimal numbers
   - input file contains no label commands like '(LOOP)'
   - open output file named after input file (input 'Prog.asm' -> output 'Prog.hack')
   - for each C-instruction, concatenate the translated binary codes of the instruction fields into a single 16-bit word
     - write this word into the output file
   - for each A-instruction of type @xxx, translate the decimal constant returned by the parser into its binary representation
     - write this 16-bit word into the output file
2. Extend the assembler's functionality to handle symbols

# Implementation

1. _Parser module_--parses an input file
2. _Code module_--provides the binary codes of all the assembly mnemonics
3. _SymbolTable module_--handles symbols
4. _main program_--drives the entire translation process

# APIs

## _Parser_ Module Specification

| Routine/ Method          | Arguments          | Returns                         | Function                                                                                                                                                 |
| ------------------------ | ------------------ | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Constructor/ initializer | Input file/ stream | -                               | Opens the input file and gets ready to parse it.                                                                                                         |
| hasMoreCommands          | -                  | bool                            | Are there more commands in the input (reached EOF)?                                                                                                      |
| advance                  | -                  | -                               | Reads the next command from the input and makes it the current command. Only called if hasMoreCommands() is true. Initially there is no current command. |
| commandType              | -                  | A_COMMAND, C_COMMAND, L_COMMAND | Returns the type of current command                                                                                                                      |
| symbol                   | -                  | string                          | Returns the symbol [or decimal xxx] of the current command @xxx [or xxx]. Called when commandType() is A_COMMAND or L_COMMAND.                           |
| dest                     | -                  | string                          | Returns the 'dest' mnemonic in the current C-command. Called when commandType() is C_COMMAND.                                                            |
| comp                     | -                  | string                          | Returns the 'comp' mnemonic in the current C-command. Called when commandType() is C_COMMAND.                                                            |
| jump                     | -                  | string                          | Returns the 'jump' mnemonic in the current C-command. Called when commandType() is C_COMMAND.                                                            |

## _Code_ Module Specification

| Routine/ Method | Arguments         | Returns | Function                                       |
| --------------- | ----------------- | ------- | ---------------------------------------------- |
| dest            | mnemonic (string) | 3 bits  | Returns the binary code of the 'dest' mnemonic |
| comp            | mnemonic (string) | 7 bits  | Returns the binary code of the 'comp' mnemonic |
| jump            | mnemonic (string) | 3 bits  | Returns the binary code of the 'jump' mnemonic |

# Notes
- Input file in memory instead of streaming it line by line. It is easier to implement, but does limit the size of the files that can be assembled to the amount of RAM on the computer running the assembler (minus the resource requirements for the OS and runtime)

## Out of Scope
- Assembler does not check for correct syntax of input Hack assembly file, does not return errors.