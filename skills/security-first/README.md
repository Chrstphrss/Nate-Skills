# security-first

## Purpose
Establishes non-negotiable defensive security practices, guarding against credential leakage, input tampering, command injection, and authorization bypasses.

## Usage
Include in every project stack, especially backend services, API integrations, authentication flows, and CLI tooling.

## Operational Workflow
1. **Threat Assessment**: Review data flow boundaries, external ingress, and permission gates.
2. **Sanitization**: Apply input parsing, type coercion, and schema validation.
3. **Execution Guardrails**: Restrict system command execution to verified, non-interpolated argument lists.

## Examples
- *Good*: Using `execFile('git', ['status', dir])` with discrete arguments.
- *Bad*: Using `exec(`git status ${userInput}`)` vulnerable to command injection.

## Limitations
- Automated skill guidelines do not replace dedicated human penetration testing or automated SAST/DAST tooling.
