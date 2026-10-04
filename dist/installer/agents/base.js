import * as fs from 'node:fs';
import * as path from 'node:path';
export const AGENTS_MD_MARKER_START = '<!-- NATE-SKILLS:START -->';
export const AGENTS_MD_MARKER_END = '<!-- NATE-SKILLS:END -->';
export function updateAgentsMarkdown(filePath, contentToInsert) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const wrappedContent = `${AGENTS_MD_MARKER_START}\n${contentToInsert.trim()}\n${AGENTS_MD_MARKER_END}`;
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `${wrappedContent}\n`, 'utf-8');
        return;
    }
    const existing = fs.readFileSync(filePath, 'utf-8');
    const startIndex = existing.indexOf(AGENTS_MD_MARKER_START);
    const endIndex = existing.indexOf(AGENTS_MD_MARKER_END);
    if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
        const before = existing.slice(0, startIndex).trimEnd();
        const after = existing.slice(endIndex + AGENTS_MD_MARKER_END.length).trimStart();
        const result = [before, wrappedContent, after].filter(Boolean).join('\n\n') + '\n';
        fs.writeFileSync(filePath, result, 'utf-8');
    }
    else {
        const result = `${existing.trimEnd()}\n\n${wrappedContent}\n`;
        fs.writeFileSync(filePath, result, 'utf-8');
    }
}
export function removeAgentsMarkdown(filePath) {
    if (!fs.existsSync(filePath))
        return;
    const existing = fs.readFileSync(filePath, 'utf-8');
    const startIndex = existing.indexOf(AGENTS_MD_MARKER_START);
    const endIndex = existing.indexOf(AGENTS_MD_MARKER_END);
    if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
        const before = existing.slice(0, startIndex).trimEnd();
        const after = existing.slice(endIndex + AGENTS_MD_MARKER_END.length).trimStart();
        const result = [before, after].filter(Boolean).join('\n\n');
        if (result.trim().length === 0) {
            fs.unlinkSync(filePath);
        }
        else {
            fs.writeFileSync(filePath, `${result.trim()}\n`, 'utf-8');
        }
    }
}
