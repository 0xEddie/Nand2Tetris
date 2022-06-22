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
> VARIABLES
cursor = @SCREEN
columns = 32
end = @SCREEN + columns
i = 0
product = 0
offset = 0

- column is an array of addresses, which point to the RAM locations of the 
  words in the current column
COLUMNINIT
if (i >= 256) goto LOOP
column[i] = @SCREEN + offset
offset += 32
i++
goto COLUMNINIT

LOOP
if (RAM[KBD] == 0) goto KEYUP
else goto KEYDOWN

KEYDOWN
-check if cursor at end of row
if (cursor == @end) goto LOOP, else not end of row
-blacken current column
i = 0
-iterate through column, darkening each word:
COLORCOL
if (i >= 256) goto NEXTCOL
RAM[column[i]] = -1
column[i]++
i++
goto COLORCOL

NEXTCOL
-move cursor to next column
cursor++
goto LOOP

KEYUP
-check if cursor at start of line
if (cursor == @SCREEN) goto LOOP, else not start of row
-move cursor to prev column
cursor--
i=0
-iterate through column, clearing each word:
CLEARCOL
if (i >= 256) goto PREVCOL
RAM[column[i]] = 0
column[i]--
i++
goto CLEARCOL

PREVCOL
goto LOOP