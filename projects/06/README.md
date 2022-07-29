# Objectives

Write an Assembler program that translates programs written in the symbolic Hack assembly language into binary code that can execute on the Hack hardware platform built in the previous projects.

# Strategy

1. Write an assembler that can only translate programs that contain no symbols
2. Extend the assembler's functionality to handle symbols

# Implementation

1. _Parser module_--parses an input file
2. _Code module_--provides the binary codes of all the assembly mnemonics
3. _SymbolTable module_--handles symbols
4. _main program_--drives the entire translation process

## Parser API

| Routine/ Method          | Arguments          | Returns                         | Function                                                                                                                                                 |
| ------------------------ | ------------------ | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Constructor/ initializer | Input file/ stream | -                               | Opens the input file and gets ready to parse it.                                                                                                         |
| hasMoreCommands          | -                  | bool                            | Are there more commands in the input (reached EOF)?                                                                                                      |
| advance                  | -                  | -                               | Reads the next command from the input and makes it the current command. Only called if hasMoreCommands() is true. Initially there is no current command. |
| commandType              | -                  | A_COMMAND, B_COMMAND, C_COMMAND | Returns the type of current command                                                                                                                      |
| symbol                   | -                  | string                          | Returns the symbol [or decimal xxx] of the current command @xxx [or xxx]. Called when commandType() is A_COMMAND or L_COMMAND.                           |
| dest                     | -                  | string                          | Returns the 'dest' mnemonic in the current C-command. Called when commandType() is C_COMMAND.                                                            |
| comp                     | -                  | string                          | Returns the 'comp' mnemonic in the current C-command. Called when commandType() is C_COMMAND.                                                            |
| jump                     | -                  | string                          | Returns the 'jump' mnemonic in the current C-command. Called when commandType() is C_COMMAND.                                                            |
