// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// Put your code here.

// File: Mult.asm
// Computes RAM[2] = RAM[0] * RAM[1]
// Usage: Store values >= 0 in R0 and R1

// PSUEDOCODE
    i = 1
    prod = 0
LOOP:
    if (i > R0) goto STOP
    prod = prod + R1
    i = i + 1
    goto LOOP
STOP:
    R2 = prod