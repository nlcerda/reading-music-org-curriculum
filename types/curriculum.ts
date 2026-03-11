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
export type LessonInputSection = TextInputSection | ExerciseInputSection;


// ── Lesson ───────────────────────────────────────────────────────────────────

/**
 * Represents a single Lesson blueprint within a Module/Course.
 * When fetched from the CDN, it looks exactly like this.
 */
export interface CurriculumLesson {
    /** Unique identifier for the lesson (e.g. 'les_staff_basics') */
    id: string;
    /** Displayed as the page heading and used in the curriculum menu */
    title: string;
    /** Short summary of what the lesson teaches */
    description?: string;

    // --- Mode A: Prompt only ---
    /** Prompt to generate the entire lesson (text + exercises) in one go. */
    prompt?: string;

    // --- Mode B: Explicit Sections ---
    /** 
     * Ordered list of section blueprints. 
     * If provided, the app will resolve each section individually. 
     */
    sections?: LessonInputSection[];

    // --- Cache Control ---
    /** Increment this number in the JSON to invalidate the cached AI generations for this lesson */
    version?: number;
}


// ── Module / Course ──────────────────────────────────────────────────────────

/**
 * A self-contained unit of study made up of an ordered list of Lessons.
 * Maps 1:1 to files like `modules/mod_first_steps.json`
 */
export interface CurriculumModule {
    /** Unique identifier for the module (e.g. 'mod_first_steps') */
    id: string;
    /** Display title for the module */
    title: string;
    /** Description of the module's overarching goals */
    description?: string;
    /** The ordered list of lesson blueprints in this module */
    lessons: CurriculumLesson[];
}
