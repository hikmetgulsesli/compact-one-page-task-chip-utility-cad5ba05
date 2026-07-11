/**
 * Deterministic fixture data for the Compact One Page Task Chip Utility.
 *
 * Tests and Story resets import from this module instead of synthesising
 * records inline. The shapes here MUST stay compatible with the types in
 * `src/features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types.ts`.
 */
import {
  DEFAULT_PREFERENCES,
  type CompactOnePageTaskChipUtilityPreferences,
  type CompactOnePageTaskChipUtilityState,
  type CompactOnePageTaskChipUtilityTask,
} from '../features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

/** Stable iso timestamps so reruns produce identical JSON. */
const T0 = '2026-07-01T09:00:00.000Z';
const T1 = '2026-07-02T10:15:00.000Z';
const T2 = '2026-07-03T11:30:00.000Z';
const T3 = '2026-07-04T13:45:00.000Z';
const T4 = '2026-07-05T15:00:00.000Z';
const T5 = '2026-07-06T16:30:00.000Z';

export const fixtureTasks: ReadonlyArray<CompactOnePageTaskChipUtilityTask> = Object.freeze([
  Object.freeze({
    id: 'task-draft-launch',
    name: 'Draft launch checklist',
    notes: 'Outline the day-one checks across ops, support, and marketing.',
    category: 'launch',
    status: 'active',
    visibility: 'public',
    priority: 'high',
    createdAt: T0,
    updatedAt: T5,
  }),
  Object.freeze({
    id: 'task-spec-data-export',
    name: 'Spec JSON export shape',
    notes: 'Decide schema for the JSON export link target.',
    category: 'spec',
    status: 'done',
    visibility: 'private',
    priority: 'medium',
    createdAt: T1,
    updatedAt: T4,
  }),
  Object.freeze({
    id: 'task-recovery-empty',
    name: 'Document empty-state recovery copy',
    notes: 'Words shown when no tasks exist yet; cover recovery flow.',
    category: 'docs',
    status: 'active',
    visibility: 'private',
    priority: 'low',
    createdAt: T2,
    updatedAt: T5,
  }),
  Object.freeze({
    id: 'task-archive-old-board',
    name: 'Archive old planning board',
    notes: 'Move last quarter board to archive filter for visibility.',
    category: 'housekeeping',
    status: 'archived',
    visibility: 'private',
    priority: 'low',
    createdAt: T3,
    updatedAt: T4,
  }),
]);

export const fixturePreferences: CompactOnePageTaskChipUtilityPreferences = {
  ...DEFAULT_PREFERENCES,
  defaultCategory: 'general',
  defaultPriority: 'medium',
  defaultVisibility: 'private',
  showCompleted: true,
  autoArchive: false,
  searchTerm: '',
};

/**
 * Snapshot of a fully hydrated app state. Components that need a ready-made
 * state for unit tests can spread / freeze this; production code builds its
 * own state inside the store provider.
 */
export const createFixtureState = (): CompactOnePageTaskChipUtilityState => {
  const tasks = fixtureTasks.slice();
  const counts = {
    total: tasks.length,
    active: tasks.filter((t) => t.status === 'active').length,
    done: tasks.filter((t) => t.status === 'done').length,
    archived: tasks.filter((t) => t.status === 'archived').length,
    publicCount: tasks.filter((t) => t.visibility === 'public').length,
    privateCount: tasks.filter((t) => t.visibility === 'private').length,
  };
  return {
    activeSurface: 'operations',
    activePanel: 'all',
    selectedItem: { id: null, surface: 'operations' },
    storageStatus: 'ready',
    lastError: null,
    tasks,
    preferences: { ...fixturePreferences },
    counts,
  };
};

/**
 * Frozen snapshot for libraries / tests that want referential stability.
 */
export const fixtureState: Readonly<CompactOnePageTaskChipUtilityState> = Object.freeze(
  createFixtureState(),
);
