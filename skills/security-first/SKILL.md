---
name: security-first
description: >
  Mandates defensive threat modeling prior to implementation. Enforces zero credential leakage,
  strict trust boundaries, robust input validation, parameterized execution, and zero client-trust assumptions.
---

# Security First

## Purpose
Prevents vulnerability introduction, credential leakage, and data exposure by requiring systematic threat modeling and defensive engineering as a default condition during design, coding, and review.

## When to Apply
Activate on all development tasks, and strictly enforce when:
- Touching authentication, authorization, session tokens, or RBAC logic.
- Processing user inputs, query parameters, external API payloads, or file uploads.
- Executing system commands, child processes, or shell operations.
- Interacting with databases, file systems, or network sockets (SSRF vectors).
- Handling environment variables, configuration stores, or logging pipelines.

## Core Principles
1. **Threat-Model Before Implementation**: Identify external data ingress, trust boundaries, sensitive data assets, and failure behaviors before editing code.
2. **Never Expose Secrets**: Zero hardcoded credentials, API keys, tokens, passwords, private certificates, or secret seeds in code, comments, test fixtures, or commits.
3. **Defensive Trust Boundaries**: Treat all external data (HTTP bodies, query strings, headers, files, webhooks, environment variables) as untrusted and potentially hostile.
4. **No Client-Side Authorization Trust**: Authorization and permission checks must be performed on the trusted server or backend; client-side checks are merely cosmetic UX aids.
5. **Parameterized Everything**: Never interpolate dynamic user values into SQL queries, NoSQL selectors, shell strings, HTML templates, or filesystem paths.
6. **No Disabling Security to Mask Errors**: Never disable TLS verification, bypass CORS on authenticated routes, disable CSRF protections, or weaken security headers just to resolve an environment warning.

## Workflow
1. **Identify Assets & Trust Boundaries**:
   - Trace where data originates (user, database, external API) and where it is sent.
   - Determine if the change touches credentials, storage, or external execution.
2. **Input Validation & Schema Enforcement**:
   - Define strict validation schemas (Zod, TypeBox, Valibot, or standard type guards) validating shape, length, and content before processing.
3. **Safe Execution & Storage**:
   - For database queries: Use parameterized queries or ORM query builders.
   - For child processes: Use discrete argument arrays (`execFile`, `spawn`) rather than shell string interpolation (`exec`).
   - For file paths: Use `path.resolve` and verify that the target path does not escape the designated base directory.
4. **Sanitize Logging & Errors**:
   - Ensure logs scrub sensitive fields (`password`, `token`, `authorization`, `creditCard`).
   - Return generic error messages to clients while logging detailed diagnostic traces internally.

## Decision Rules
- **For Secret Management**: Store all secrets in environment variables (`process.env`) or secure vaults. Verify `.env*` files are listed in `.gitignore`.
- **For File Operations**: Validate that path resolution does not contain directory traversal attempts (`..` escaping target directories).
- **For Shell Commands**: Avoid shell execution whenever standard library APIs exist (e.g., use `fs.copyFile` instead of executing `cp` or `copy`).
- **For Web APIs**: Enforce rate limiting, input size limits, CORS restrictions, and appropriate security headers (`Content-Security-Policy`, `X-Content-Type-Options`).

## Hard Rules
- **Never commit credentials**: If a secret is observed in code, immediately remove it and flag the need for credential revocation.
- **Never trust client-provided IDs for authorization**: Always verify that the authenticated user owns or has rights to the requested resource ID.
- **Never execute raw strings in shell processes**: Never call `exec(\`command \${input}\`)`. Always pass an argument array to `spawn` or `execFile`.
- **Never render raw user strings as unescaped HTML**: Prevent XSS by using framework-native sanitization or trusted sanitization libraries (DOMPurify).
- **Never disable SSL/TLS certificate verification**: Do not set `rejectUnauthorized: false` or `NODE_TLS_REJECT_UNAUTHORIZED=0`.

## Anti-Patterns
- Adding `git add .` containing `.env` files with production API keys.
- Checking user roles exclusively in React or Vue components without server-side validation.
- Constructing SQL queries using string concatenation: `"SELECT * FROM users WHERE id = '" + id + "'"`.
- Printing full request headers including `Authorization: Bearer ...` into application logs.

## Verification & Quality Gates
- Scan git diffs for credentials, tokens, or private keys before finalizing.
- Verify that every user input endpoint has corresponding schema or type validation.
- Verify that path traversal tests (e.g., passing `../../etc/passwd`) fail safely.

## Completion Criteria
- Zero secrets or sensitive data are exposed in source or git staging.
- All untrusted inputs are validated and sanitized at system boundaries.
- Database queries, shell calls, and file operations use safe, parameterized APIs.
