import type { InputExercise } from '../../src/types/exerciseInput/exercise';

/**
 * curriculum-repo/types/curriculum.ts
 * 
 * Shared TypeScript definitions describing the exact schema of the JSON files 
 * stored in the reading-music-org-curriculum repository.
 * 
 * These types are "blueprints" used by authors. They represent what is fetched
 * via the GitHub CDN, before any runtime processing or AI generation occurs.
 */

// ── Sections ─────────────────────────────────────────────────────────────────

/**
 * A blueprint for a text section in the curriculum JSON.
 * Provide EITHER `content` (pre-written) or `prompt` (AI-generated).
 */
export interface TextInputSection {
    type: 'text';
    /** Pre-written markdown content. If provided, no AI call is made. */
    content?: string;
    /** Prompt for AI to generate the text content. */
    prompt?: string;
}

/**
 * A blueprint for an exercise section in the curriculum JSON.
 * Provide EITHER `exercise` (pre-written) or `prompt` (AI-generated).
 */
export interface ExerciseInputSection {
    type: 'exercise';
    /** Stable identifier for progress tracking. */
    slug: string;
    /** Pre-written exercise data. If provided, no AI call is made. */
    exercise?: InputExercise;
    /** Prompt for AI to generate the exercise. */
    prompt?: string;
}

/** A section blueprint in the curriculum JSON. */
export type SessionInputSection = TextInputSection | ExerciseInputSection;


// ── Session ──────────────────────────────────────────────────────────────────

/**
 * Represents a single Session blueprint within a Module.
 * When fetched from the CDN, it looks exactly like this.
 */
export interface ModuleSession {
    /** Unique identifier for the session (e.g. 'les_staff_basics') */
    id: string;
    /** Displayed as the page heading and used in the curriculum menu */
    title: string;
    /** Short summary of what the session teaches */
    description?: string;

    // --- Mode A: Prompt only ---
    /** Prompt to generate the entire session (text + exercises) in one go. */
    prompt?: string;

    // --- Mode B: Explicit Sections ---
    /** 
     * Ordered list of section blueprints. 
     * If provided, the app will resolve each section individually. 
     */
    sections?: SessionInputSection[];

    // --- Cache Control ---
    /** Increment this number in the JSON to invalidate the cached AI generations for this session */
    version?: number;
    
    // --- Skills ---
    /** 
     * Skills developed in this single session. 
     * OPTIONAL: Most sessions contribute to the parent Module's skill(s).
     */
    proficiencies?: Proficiency[];
}


// ── Module / Course Blueprint ──────────────────────────────────────────────

/**
 * A self-contained unit of study made up of an ordered list of Sessions.
 * Maps 1:1 to files like `modules/mod_first_steps.json`
 */
export interface Module {
    /** Unique identifier for the module (e.g. 'mod_first_steps') */
    id: string;
    /** Display title for the module */
    title: string;
    /** Description of the module's overarching goals */
    description?: string;
    /** The ordered list of session blueprints in this module */
    sessions: ModuleSession[];
    /** Optional dictionary of reusable exercise templates/prompts for this module */
    exercises?: Record<string, any>;

    /** 
     * Dependency IDs (Module IDs only). 
     * The module unlocks when all required modules are mastered.
     */
    requiredModules?: string[];

    // --- Skills ---
    /** 
     * Skills requiring synthesis of multiple sessions.
     * IMPORTANT: Must include at least Level 0 (Baseline/Module Passed status)
     */
    proficiencies: Proficiency[];
}


// ── Curriculum Graph (The Main Map) ──────────────────────────────────────────

/**
 * Registry definition of a capability (e.g., 'rhythm', 'note_reading').
 */
export interface Proficiency {
    id: string;
    title: string;
    description: string;
}

/**
 * How we define if a skill has been achieved.
 */
export interface ProficiencyLevel {
    id: string; // e.g., "mod_rhythm_lvl_1"
    index: number; // 1, 2, 3...
    /** A human-readable description of the capability. */
    description: string; 
    /** 
     * Specific instructions, parameters, or heuristics intended for the AI "Expert Evaluator".
     */
    criteria: string;
}

/**
 * A progressive definition of a capability.
 */
export interface Proficiency {
    id: string;
    title: string;
    description: string;
    /** 
     * Progression milestones. 
     * index 0 = Baseline (Passed)
     * index 1+ = Mastery Levels
     */
    levels: ProficiencyLevel[];
}

/**
 * An ordered collection of underlying Modules designed to guide a user toward a macro-learning objective.
 */
export interface Skill {
    id: string;               // e.g., "path_theory_basics"
    title: string;
    description: string;
    modules: string[];        // Array of Module IDs defining the path
    /** 
     * Dependency IDs (Skill IDs only). 
     * The group unlocks when all required groups are mastered.
     */
    requiredSkills?: string[]; 
    /** 
     * Skills requiring synthesis of the entire path.
     * IMPORTANT: Must include at least Level 0 (Baseline/Path Passed status)
     */
    proficiencies: Proficiency[]; 
}

/**
 * A node in the high-level curriculum map.
 * Represents a Module and its position in the dependency graph.
 */
export interface ModuleGraphNode {
    id: string;
    /** Dependency IDs (Module IDs only) */
    requiredModules?: string[];
    /** Display metadata for the map UI */
    metadata: {
        title: string;
        description: string;
        learningOutcome: string;
        learningOutcomeFull?: string;
    };
    /** Skills attached to this module node (including Level 0 pass threshold) */
    proficiencies: Proficiency[];
}

/**
 * The root structure of a curriculum map (e.g., music_theory.json).
 * It is a set of Modules (nodes) + a set of Skills.
 */
export interface CurriculumGraph {
    id: string;
    /** Semantic version of the curriculum definition */
    version: string;
    /** Dictionary of module groups/paths */
    groups?: Record<string, Skill>;
    /** Dictionary of module nodes */
    nodes: Record<string, ModuleGraphNode>;
    /** Skills registry */
    proficiencies?: Record<string, Proficiency>;
}
