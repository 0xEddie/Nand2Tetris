// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.
// > VARIABLES
// cursor = @SCREEN
    @SCREEN
    D=A
    @cursor
    M=D
    // rows = 256
    @256
    D=A
    @rows
    M=D
// columns = 32
    @32
    D=A
    @columns
    M=D
// end = @SCREEN + columns
    @SCREEN
    D=D+A
    @end
    M=D
// i = 0
    @i
    M=0
// offset = 0
    @offset
    M=0

// - column is an array of addresses, which point to the RAM locations of the 
//   words in the current column
// COLUMNINIT
(COLUMNINIT)
// if (i >= rows) goto LOOP
    @i
    D=M
    @rows
    D=D-A
    @LOOP
    D;JGE // if D>=0, goto LOOP
// column[i] = @SCREEN + offset
    @column
    D=A
    @i
    D=D+A // D = *column[0+i]
    @R0
    M=D
    @SCREEN
    D=A
    @offset
    D=D+M // D = @SCREEN + offset
    @R0
    A=M
    M=D
// offset += 32
    @32
    D=A
    @offset
    M=M+D
// i++
    @i
    M=M+1
// goto COLUMNINIT
    @COLUMNINIT
    0;JMP

// LOOP
(LOOP)
// if (RAM[KBD] == 0) goto KEYUP
    @KBD
    D=M
    @KEYUP
    D;JEQ
// else goto KEYDOWN

// KEYDOWN
(KEYDOWN)
// -check if cursor at end of row
// if (cursor == @end) goto LOOP, else not end of row
    @cursor
    D=A
    @end
    D=D-A
    @LOOP
    D;JEQ
// -blacken current column
// i = 0
    @i
    M=0
// -iterate through column, darkening each word:
// COLORCOL
(COLORCOL)
// if (i >= 256) goto NEXTCOL
    @i
    D=M
    @rows
    D=D-M
    @NEXTCOL
    D;JGE
// RAM[*{column[i]}] = -1
    @i
    D=M
    @column
    A=D+A // A = *column[i]
    A=M
    M=-1
// *{column[i]}++
    @column
    A=D+A
    M=M+1
// i++
    @i
    M=M+1
// goto COLORCOL
    @COLORCOL
    0;JMP

// NEXTCOL
// -move cursor to next column
// cursor++
    @cursor
    M=M+1
// goto LOOP
    @LOOP
    0;JMP

// KEYUP
// -check if cursor at start of line
// if (cursor == @SCREEN) goto LOOP, else not start of row
    @SCREEN
    D=A
    @cursor
    D=D-M
    @LOOP
    D;JEQ
// -move cursor to prev column
// cursor--
    @cursor
    M=M-1
// i=0
    @i
    M=0
// -iterate through column, clearing each word:
// CLEARCOL
(CLEARCOL)
// if (i >= 256) goto PREVCOL?2
// if (i >= 256) goto LOOP?1
    @rows
    D=M
    @i
    D=D-M
    @LOOP
    D;JLE
// RAM[column[i]] = 0
    @i
    D=M
    @column
    A=D+A
    A=M
    M=0
// column[i]--
    @column
    A=D+A
    M=M-1
// i++
    @i
    M=M=1
// goto CLEARCOL
    @CLEARCOL
    0;JMP

// PREVCOL?2
// goto LOOP?2
// @LOOP
// 0;JMP