export type SkillCategory = 'methodology' | 'quality' | 'ui' | 'security' | 'efficiency';

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  path: string;
}

export const SKILLS: Record<string, Skill> = {
  'think-before-code': {
    id: 'think-before-code',
    name: 'Think Before Code',
    description: 'Inspect relevant files and patterns before coding. Plan before implementation.',
    category: 'methodology',
    path: 'skills/think-before-code'
  },
  'anti-bullshit': {
    id: 'anti-bullshit',
    name: 'Anti-Bullshit',
    description: 'Never claim without verification. No hallucinated APIs or files.',
    category: 'quality',
    path: 'skills/anti-bullshit'
  },
  'human-ui': {
    id: 'human-ui',
    name: 'Human UI',
    description: 'Optimize interfaces for real humans with accessibility and full states.',
    category: 'ui',
    path: 'skills/human-ui'
  },
  'responsive-first': {
    id: 'responsive-first',
    name: 'Responsive First',
    description: 'Mobile-first responsive design across layouts, typography, and controls.',
    category: 'ui',
    path: 'skills/responsive-first'
  },
  'ios-ui': {
    id: 'ios-ui',
    name: 'iOS UI',
    description: 'iOS-inspired ergonomics, safe areas, navigation sheets, and touch targets.',
    category: 'ui',
    path: 'skills/ios-ui'
  },
  'security-first': {
    id: 'security-first',
    name: 'Security First',
    description: 'Never expose secrets or credentials. Validate input and avoid unsafe execution.',
    category: 'security',
    path: 'skills/security-first'
  },
  'code-cleaner': {
    id: 'code-cleaner',
    name: 'Code Cleaner',
    description: 'Remove unused imports, dead code, debug artifacts, and unnecessary complexity.',
    category: 'quality',
    path: 'skills/code-cleaner'
  },
  'frugal-token': {
    id: 'frugal-token',
    name: 'Frugal Token',
    description: 'Targeted reading and editing to conserve context window while preserving correctness.',
    category: 'efficiency',
    path: 'skills/frugal-token'
  }
};

export function getAllSkills(): Skill[] {
  return Object.values(SKILLS);
}

export function getSkill(id: string): Skill | undefined {
  return SKILLS[id];
}
