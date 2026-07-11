/**
 * Persistence adapter for the Compact One Page Task Chip Utility.
 *
 * The repo is the only place that touches `localStorage`. The store calls
 * `loadTasks` / `saveTasks` (and the matching `*Preferences` pair) at well
 * defined moments; everything outside this file treats storage as opaque.
 *
 * Corruption is a first-class signal: when `loadTasks` or `loadPreferences`
 * sees unparseable JSON or a value that does not match the expected shape,
 * it does NOT throw. It returns a {@link RepoLoadFailure} carrying the
 * original raw string so the store can surface a recoverable error and let
 * the user retry.
 */
import {
  DEFAULT_PREFERENCES,
  type CompactOnePageTaskChipUtilityPreferences,
  type CompactOnePageTaskChipUtilityTask,
} from './compact-one-page-task-chip-utility.types';
import { fixturePreferences, fixtureTasks } from '../../__fixtures__/compact-one-page-task-chip-utility.fixture';

const STORAGE_NAMESPACE = 'compact-one-page-task-chip-utility';
export const TASKS_STORAGE_KEY = `${STORAGE_NAMESPACE}:tasks:v1`;
export const PREFERENCES_STORAGE_KEY = `${STORAGE_NAMESPACE}:preferences:v1`;

/** Outcome of a load attempt against `localStorage`. */
export type RepoLoadResult<T> =
  | { ok: true; value: T }
  | { ok: false; reason: 'missing' | 'corrupted'; raw?: string };

export interface RepoLoadFailure {
  reason: 'missing' | 'corrupted';
  raw?: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === 'string';

const isIsoTimestamp = (value: unknown): value is string =>
  isString(value) && !Number.isNaN(Date.parse(value));

const PRIORITIES = new Set(['low', 'medium', 'high']);
const STATUSES = new Set(['active', 'done', 'archived']);
const VISIBILITIES = new Set(['public', 'private']);

const isValidTask = (value: unknown): value is CompactOnePageTaskChipUtilityTask => {
  if (!isRecord(value)) return false;
  return (
    isString(value.id) &&
    isString(value.name) &&
    (value.notes === undefined || isString(value.notes)) &&
    isString(value.category) &&
    STATUSES.has(String(value.status)) &&
    VISIBILITIES.has(String(value.visibility)) &&
    PRIORITIES.has(String(value.priority)) &&
    isIsoTimestamp(value.createdAt) &&
    isIsoTimestamp(value.updatedAt)
  );
};

const isValidPreferences = (value: unknown): value is CompactOnePageTaskChipUtilityPreferences => {
  if (!isRecord(value)) return false;
  return (
    isString(value.defaultCategory) &&
    PRIORITIES.has(String(value.defaultPriority)) &&
    VISIBILITIES.has(String(value.defaultVisibility)) &&
    typeof value.showCompleted === 'boolean' &&
    typeof value.autoArchive === 'boolean' &&
    (value.searchTerm === undefined || isString(value.searchTerm))
  );
};

/**
 * Backwards-compatible storage accessor. In jsdom test environments the
 * `localStorage` global exists but may be cleared between tests; we still
 * wrap every read in a try/catch so quota errors do not surface as uncaught
 * exceptions in unrelated suites.
 */
const getStorage = (): Storage | null => {
  if (typeof globalThis === 'undefined') return null;
  try {
    const candidate = (globalThis as { localStorage?: Storage }).localStorage;
    return candidate ?? null;
  } catch {
    return null;
  }
};

const safeGet = (key: string): string | null => {
  const storage = getStorage();
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key: string, value: string): boolean => {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

const safeRemove = (key: string): void => {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(key);
  } catch {
    /* swallow - storage may be locked in tests */
  }
};

const parseOrFail = (raw: string | null): RepoLoadResult<unknown> => {
  if (raw === null) return { ok: false, reason: 'missing' };
  try {
    return { ok: true, value: JSON.parse(raw) };
  } catch {
    return { ok: false, reason: 'corrupted', raw };
  }
};

export const loadTasks = (): RepoLoadResult<CompactOnePageTaskChipUtilityTask[]> => {
  const parsed = parseOrFail(safeGet(TASKS_STORAGE_KEY));
  if (!parsed.ok) return parsed;
  if (!Array.isArray(parsed.value) || !parsed.value.every(isValidTask)) {
    return { ok: false, reason: 'corrupted', raw: JSON.stringify(parsed.value) };
  }
  return { ok: true, value: parsed.value.map((t) => Object.freeze({ ...t })) };
};

export const saveTasks = (tasks: ReadonlyArray<CompactOnePageTaskChipUtilityTask>): boolean => {
  const clone = tasks.map((task) => ({ ...task }));
  return safeSet(TASKS_STORAGE_KEY, JSON.stringify(clone));
};

export const loadPreferences = (): RepoLoadResult<CompactOnePageTaskChipUtilityPreferences> => {
  const parsed = parseOrFail(safeGet(PREFERENCES_STORAGE_KEY));
  if (!parsed.ok) return parsed;
  if (!isValidPreferences(parsed.value)) {
    return { ok: false, reason: 'corrupted', raw: JSON.stringify(parsed.value) };
  }
  return { ok: true, value: { ...DEFAULT_PREFERENCES, ...parsed.value } };
};

export const savePreferences = (prefs: CompactOnePageTaskChipUtilityPreferences): boolean => {
  return safeSet(PREFERENCES_STORAGE_KEY, JSON.stringify(prefs));
};

/** Remove every localStorage artefact owned by this feature. */
export const clearCache = (): void => {
  safeRemove(TASKS_STORAGE_KEY);
  safeRemove(PREFERENCES_STORAGE_KEY);
};

/** Seed the storage with fixture data. Used by tests and the "reset" path. */
export const seedFixtures = (): boolean => {
  const tasksOk = saveTasks(fixtureTasks);
  const prefsOk = savePreferences(fixturePreferences);
  return tasksOk && prefsOk;
};
