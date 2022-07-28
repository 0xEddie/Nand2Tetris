# Objectives

Write an Assembler program that translates programs written in the symbolic Hack assembly language into binary code that can execute on the Hack hardware platform built in the previous projects.

# Deliverables

[] Parse the symbolic command into its underlying fields
[] For each field, generate the correstponding bits in the machine language
[] Replace all symbolic references with numeric addresses of memory locations
[] Assemble the binary codes into a complete machine instruction

# Strategy

1. Write an assembler that can only translate programs that contain no symbols
2. Extend the assembler's functionality to handle symbols
