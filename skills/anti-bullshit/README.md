# anti-bullshit

## Purpose
Guarantees intellectual and technical honesty by preventing speculative assertions, hallucinated tool calls, fabricated dependencies, and unverified confirmations.

## Usage
Apply this guardrail across all agent interactions to maintain rigorous verification standards.

## Operational Workflow
1. **Verify**: Always examine terminal return codes, file system states, and compiler outputs.
2. **Validate**: If an error occurs, inspect the real trace instead of assuming common fixes blindly.
3. **Report**: Express observed evidence directly without embellishment or unwarranted optimism.

## Examples
- *Good*: "Running `npm run build` returned exit code 1 due to TS2304 in `cli.ts` line 12. Fixing..."
- *Bad*: "Everything is built and working flawlessly!" (without having run the build command).

## Limitations
- Relies on system tools and commands having accessible stdout/stderr streams.
