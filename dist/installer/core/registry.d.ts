export type SkillCategory = 'methodology' | 'quality' | 'ui' | 'security' | 'efficiency';
export interface Skill {
    id: string;
    name: string;
    description: string;
    category: SkillCategory;
    path: string;
}
export declare const SKILLS: Record<string, Skill>;
export declare function getAllSkills(): Skill[];
export declare function getSkill(id: string): Skill | undefined;
