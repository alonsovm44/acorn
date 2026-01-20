🌰 Acorn
Acorn is a next-generation semantic programming language designed to express human intent and compatibility with low level implementation details.
It belongs to a fifth generation of abstraction, where programming is treated as the articulation of goals, constraints, and expectations rather than rigid syntax.

Acorn is meant to be consumed by a semantic compiler (like Yori) capable of interpreting intent, generating executable code, self-correcting, and adapting to context.

Core Principles
Programming is about declaring intent, not writing instructions
Semantics come before syntax
The compiler is an intelligent agent, not a passive translator
The language is conversational, tolerant, and declarative
Multiple implementations can satisfy the same intent
What problem does Acorn solve?
Traditional programming languages force humans to think like machines.
Acorn reverses this relationship:

Humans describe what they want
The system decides how to achieve it

This reduces:

cognitive load
syntactic errors
dependency on a specific target language
barriers to entry for programming
Key Features
Intent-oriented language
Acorn provides semantic keywords such as:

INTENT

GOAL

ENSUE

ASSUME

CHECK (MAKES A CHECKPOINT IN THE CODE)

GOTO (GOES TO A GIVEN CHECKPOINT)

These describe purpose, expectations, and constraints, not just control flow.

🔹 Semantic control flow
Acorn introduces higher-level flow mechanisms: CHECK "retry" <<< checkpoint declaration GOTO "retry" <<< program goes to checkpoint

This enables:

retries
backtracking
state based logic
error recovery
Without the chaos of traditional GOTO

Acorn is turing complete
Despite its declarative and semantic nature, Acorn supports:

Variables
1. conditions
2. loops
3. functions
4. operations
5. memory management
6. input
7. output
EXAMPLE PROGRAMS
simple calculator
````
INTENT compute fibonacci sequence
GOAL print fibonacci numbers

LET n : INT
INPUT n

CHECK "start"

IF n <= 0 THEN
    PRINT "Invalid number"
    GOTO "start"
END
````

list manager
```
INTENT analyze numeric data
GOAL process a sequence safely and clearly

LET LIST data = INPUT "Enter numbers"
ASSUME data CONTAINS numbers

// Declare expectations, not implementation
ENSURE data IS NOT EMPTY
ENSURE no division by zero
ENSURE result IS deterministic

// High-level transformation pipeline
LET cleaned =
    data
    |> FILTER x WHERE x IS NUMBER
    |> FILTER x WHERE x > 0
    |> MAP x TO SQRT(x)
    |> MAP x TO ROUND(x)

// Express meaning, not control flow
LET summary : MAP
summary.mean     = REDUCE cleaned USING MEAN
summary.maximum  = MAX cleaned
summary.count    = LEN cleaned

PRINT "Summary:"
PRINT summary
````
EXAMPLES OF LOW LEVEL INTERACTIONS
````
C/C++ like memory management
INTENT manage memory manually
ENSURE no memory leaks
ENSURE no dangling pointers

GOAL allocate, use and free memory safely

LET PTR p  = ALLOCATE(1024)
ENSURE p IS NOT NULL

MEMZERO(p, 1024)

PRINT "Memory allocated and zeroed"

FREE p
````
Rust like program
```
INTENT demonstrate ownership and borrowing
GOAL manage memory safely without garbage collection

// Allocate memory on the heap
LET PTR buffer OWN = ALLOCATE(64)
ENSURE buffer IS NOT NULL

// Initialize memory
MEMZERO(buffer, 64)

// Borrow the buffer immutably
FUNCTION readBuffer(BORROW buf : PTR) : VOID
    PRINT "Reading buffer contents"
    // Only read operations allowed
END

// Borrow the buffer mutably
FUNCTION writeBuffer(BORROW buf : PTR)
    INTENT modify borrowed memory safely
    MEMSET(buf, 65, 64)   // Fill with 'A'
END

// Use borrows
readBuffer(buffer)
writeBuffer(buffer)

// Ownership is still valid here
PRINT "Buffer still owned"

// Explicitly release ownership
FREE buffer

// Any access after this point is invalid
ENSURE buffer IS NULL
````
Freestanding microkernel
````
INTENT build a freestanding microkernel
GOAL boot, manage memory, schedule tasks

ASSUME no operating system
ASSUME bare metal environment
ASSUME single core initially
ASSUME memory starts at 0x100000

// Memory layout
LET KERNEL_BASE INT = 0x100000
LET KERNEL_SIZE INT = 1024 * 1024
FUNCTION kernel_main() : VOID
INTENT kernel entry point
GOAL initialize system safely

    CHECK "memory"

    CALL init_memory()
    CALL init_scheduler()

    GOTO "idle"
END

LET STACK_TOP : INT = KERNEL_BASE + KERNEL_SIZE

ENSURE stack aligned
ENSURE no overlap with bootloader

LET heap_start : PTR OWN
LET heap_end   : PTR

FUNCTION init_memory()
INTENT initialize kernel heap

    heap_start = CAST PTR FROM (KERNEL_BASE + 0x20000)
    heap_end   = CAST PTR FROM (KERNEL_BASE + KERNEL_SIZE)

    ENSURE heap_start < heap_end
    ENSURE memory region exclusive
END

LET heap_cursor : PTR OWN

FUNCTION kmalloc(size : INT) : PTR
INTENT allocate kernel memory

    ENSURE size > 0

    LET addr = heap_cursor
    heap_cursor = heap_cursor + size

    ENSURE heap_cursor <= heap_end
    RETURN addr
END

TYPE TASK = STRUCT {
    entry : PTR
    stack : PTR
}

LET tasks : LIST
LET current_task : INT = 0

FUNCTION init_scheduler()
INTENT prepare task system

    LET main_task : TASK
    main_task.entry = ADDRESSOF idle_task
    main_task.stack = kmalloc(4096)

    APPEND tasks, main_task
END

CHECK "idle"

FUNCTION idle_task()
INTENT run when no other task is ready

    LOOP FOREVER
        CALL schedule()
        HALT
    END
END

FUNCTION schedule()
INTENT simple round-robin scheduling

    current_task = (current_task + 1) MOD LEN tasks
    SWITCH_TO tasks[current_task]
END

BUILTIN HALT
BUILTIN SWITCH_TO(task : TASK)

ENSURE no null dereference
ENSURE no memory overlap
ENSURE no task escapes kernel space
ENSURE kernel deterministic

````

