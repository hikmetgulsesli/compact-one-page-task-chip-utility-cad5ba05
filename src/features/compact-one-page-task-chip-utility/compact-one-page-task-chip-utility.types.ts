/**
 * Domain types for the Compact One Page Task Chip Utility.
 *
 * The app is a single-viewport task-chip utility: tasks are short, chip-like
 * records whose lifecycle (active / done / archived) and visibility are
 * managed through a compact operations surface, with editor / settings /
 * recovery surfaces side-stepping the same shared state.
 *
 * Every Story that touches this feature MUST import from this module instead
 * of redefining the shapes. The supervisor rejects duplicate type definitions
 * that drift across stories.
 */

/** The four top-level surfaces reachable from the app shell. */
export type CompactOnePageTaskChipUtilitySurface =
  | 'operations'
  | 'editor'
  | 'settings'
  | 'recovery';

/**
 * Operations panels. The chip utility organises chips into a single primary
 * list view with secondary filters selected through "active panel".
 */
export type CompactOnePageTaskChipUtilityPanel = 'all' | 'active' | 'done' | 'archive';

/** Visibility flag for a single chip - shown to the team or kept private. */
export type CompactOnePageTaskChipUtilityVisibility = 'public' | 'private';

/** Lifecycle status of a chip. */
export type CompactOnePageTaskChipUtilityStatus = 'active' | 'done' | 'archived';

/** Priority buckets used to colour the chip. */
export type CompactOnePageTaskChipUtilityPriority = 'low' | 'medium' | 'high';

/** A single task chip. */
export interface CompactOnePageTaskChipUtilityTask {
  id: string;
  name: string;
  notes?: string;
  category: string;
  status: CompactOnePageTaskChipUtilityStatus;
  visibility: CompactOnePageTaskChipUtilityVisibility;
  priority: CompactOnePageTaskChipUtilityPriority;
  createdAt: string;
  updatedAt: string;
}

/**
 * Local preferences for the chip utility. These persist only when PRD or
 * DESIGN_DOM requires it; for this story we persist the full set so the
 * settings screen has real data to bind against.
 */
export interface CompactOnePageTaskChipUtilityPreferences {
  defaultCategory: string;
  defaultPriority: CompactOnePageTaskChipUtilityPriority;
  defaultVisibility: CompactOnePageTaskChipUtilityVisibility;
  showCompleted: boolean;
  autoArchive: boolean;
  searchTerm: string;
}

export interface CompactOnePageTaskChipUtilityCounts {
  total: number;
  active: number;
  done: number;
  archived: number;
  publicCount: number;
  privateCount: number;
}

/**
 * Selected-item pointer. Other surfaces (editor / settings) may target a
 * concrete task for inspection; null means "no selection".
 */
export interface CompactOnePageTaskChipUtilitySelection {
  id: string | null;
  surface: CompactOnePageTaskChipUtilitySurface;
}

export type CompactOnePageTaskChipUtilityStorageStatus =
  | 'idle'
  | 'loading'
  | 'saving'
  | 'ready'
  | 'corrupted'
  | 'error';

/**
 * Authoritative shared app shell state. Every Story that owns a screen
 * reads from this shape and dispatches through the actions returned by
 * `useCompactOnePageTaskChipUtility`.
 */
export interface CompactOnePageTaskChipUtilityState {
  activeSurface: CompactOnePageTaskChipUtilitySurface;
  activePanel: CompactOnePageTaskChipUtilityPanel;
  selectedItem: CompactOnePageTaskChipUtilitySelection;
  storageStatus: CompactOnePageTaskChipUtilityStorageStatus;
  lastError: string | null;
  tasks: ReadonlyArray<CompactOnePageTaskChipUtilityTask>;
  preferences: CompactOnePageTaskChipUtilityPreferences;
  counts: CompactOnePageTaskChipUtilityCounts;
}

/**
 * Action surface exposed to consumers (window.app, generated screens, tests).
 * Every method is `(...args) => void`; throwing is reserved for programmer
 * error - recoverable failures set `state.lastError` and `state.storageStatus`.
 */
export interface CompactOnePageTaskChipUtilityActions {
  /** Navigate to one of the four top-level surfaces. */
  navigateTo(surface: CompactOnePageTaskChipUtilitySurface): void;
  /** Switch the operations panel filter. */
  setActivePanel(panel: CompactOnePageTaskChipUtilityPanel): void;
  /** Select / clear a task from any screen. */
  selectItem(taskId: string | null, surface?: CompactOnePageTaskChipUtilitySurface): void;

  createTask(input: Pick<CompactOnePageTaskChipUtilityTask, 'name'> & Partial<CompactOnePageTaskChipUtilityTask>): string;
  updateTask(id: string, patch: Partial<CompactOnePageTaskChipUtilityTask>): void;
  deleteTask(id: string): void;
  toggleTask(id: string): void;

  resetToDefaults(): void;
  savePreferences(patch: Partial<CompactOnePageTaskChipUtilityPreferences>): void;
  clearCache(): void;

  /** Test escape hatch - retries after a corrupted load. */
  retryLoad(): void;
  /** Manual dismiss of the last error banner. */
  dismissError(): void;
}

/** Static defaults - single source of truth for fixture / reset paths. */
export const DEFAULT_PREFERENCES: CompactOnePageTaskChipUtilityPreferences = {
  defaultCategory: 'general',
  defaultPriority: 'medium',
  defaultVisibility: 'private',
  showCompleted: true,
  autoArchive: false,
  searchTerm: '',
};

export const DEFAULT_COUNTS: CompactOnePageTaskChipUtilityCounts = {
  total: 0,
  active: 0,
  done: 0,
  archived: 0,
  publicCount: 0,
  privateCount: 0,
};
