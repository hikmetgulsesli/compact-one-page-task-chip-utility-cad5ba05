/**
 * Shared app shell state, persistence, and actions for the Compact One Page
 * Task Chip Utility.
 *
 * Architecture:
 *   - State lives in a `useReducer` inside `CompactOnePageTaskChipUtilityProvider`.
 *   - Persistence is delegated to the `repo` module; this file only orchestrates.
 *   - Consumers (App.tsx, generated screens, sibling-story handlers) read state
 *     and dispatch actions through `useCompactOnePageTaskChipUtility`.
 *   - `window.app = { state, actions }` is installed from the App.tsx effect;
 *     this provider exposes `getApi()` so the bridge can stay declarative.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';
import {
  DEFAULT_COUNTS,
  DEFAULT_PREFERENCES,
  type CompactOnePageTaskChipUtilityActions,
  type CompactOnePageTaskChipUtilityCounts,
  type CompactOnePageTaskChipUtilityPanel,
  type CompactOnePageTaskChipUtilityPreferences,
  type CompactOnePageTaskChipUtilitySelection,
  type CompactOnePageTaskChipUtilityState,
  type CompactOnePageTaskChipUtilityStorageStatus,
  type CompactOnePageTaskChipUtilitySurface,
  type CompactOnePageTaskChipUtilityTask,
} from './compact-one-page-task-chip-utility.types';
import { fixturePreferences, fixtureTasks } from '../../__fixtures__/compact-one-page-task-chip-utility.fixture';
import {
  clearCache as clearCacheStorage,
  loadPreferences,
  loadTasks,
  savePreferences as persistPreferences,
  saveTasks as persistTasks,
  seedFixtures,
} from './compact-one-page-task-chip-utility.repo';

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

type Action =
  | { type: 'storage/loading' }
  | { type: 'storage/ready'; tasks: CompactOnePageTaskChipUtilityTask[]; preferences: CompactOnePageTaskChipUtilityPreferences }
  | { type: 'storage/saving' }
  | { type: 'storage/status'; status: CompactOnePageTaskChipUtilityStorageStatus }
  | { type: 'error'; message: string | null }
  | { type: 'surface'; surface: CompactOnePageTaskChipUtilitySurface }
  | { type: 'panel'; panel: CompactOnePageTaskChipUtilityPanel }
  | { type: 'select'; selection: CompactOnePageTaskChipUtilitySelection }
  | { type: 'tasks/replace'; tasks: CompactOnePageTaskChipUtilityTask[] }
  | { type: 'preferences/replace'; preferences: CompactOnePageTaskChipUtilityPreferences };

const computeCounts = (
  tasks: ReadonlyArray<CompactOnePageTaskChipUtilityTask>,
): CompactOnePageTaskChipUtilityCounts => {
  const counts: CompactOnePageTaskChipUtilityCounts = { ...DEFAULT_COUNTS };
  counts.total = tasks.length;
  for (const task of tasks) {
    if (task.status === 'active') counts.active += 1;
    if (task.status === 'done') counts.done += 1;
    if (task.status === 'archived') counts.archived += 1;
    if (task.visibility === 'public') counts.publicCount += 1;
    if (task.visibility === 'private') counts.privateCount += 1;
  }
  return counts;
};

const reducer = (state: CompactOnePageTaskChipUtilityState, action: Action): CompactOnePageTaskChipUtilityState => {
  switch (action.type) {
    case 'storage/loading':
      return { ...state, storageStatus: 'loading', lastError: null };
    case 'storage/ready': {
      const counts = computeCounts(action.tasks);
      return {
        ...state,
        tasks: Object.freeze(action.tasks.slice()),
        preferences: { ...action.preferences },
        counts,
        storageStatus: 'ready',
        lastError: null,
      };
    }
    case 'storage/saving':
      return { ...state, storageStatus: 'saving' };
    case 'storage/status':
      return { ...state, storageStatus: action.status };
    case 'error':
      return { ...state, lastError: action.message, storageStatus: action.message ? 'error' : 'ready' };
    case 'surface':
      return { ...state, activeSurface: action.surface };
    case 'panel':
      return { ...state, activePanel: action.panel };
    case 'select': {
      if (action.selection.id === null) {
        return { ...state, selectedItem: { id: null, surface: action.selection.surface } };
      }
      const exists = state.tasks.some((t) => t.id === action.selection.id);
      if (!exists) return state;
      return { ...state, selectedItem: { ...action.selection } };
    }
    case 'tasks/replace': {
      const counts = computeCounts(action.tasks);
      return {
        ...state,
        tasks: Object.freeze(action.tasks.slice()),
        counts,
        storageStatus: 'ready',
        lastError: null,
      };
    }
    case 'preferences/replace':
      return {
        ...state,
        preferences: { ...action.preferences },
        storageStatus: 'ready',
        lastError: null,
      };
    default:
      return state;
  }
};

// ---------------------------------------------------------------------------
// Bootstrap helpers (exported for tests)
// ---------------------------------------------------------------------------

export interface CompactOnePageTaskChipUtilityBootstrapResult {
  tasks: CompactOnePageTaskChipUtilityTask[];
  preferences: CompactOnePageTaskChipUtilityPreferences;
  storageStatus: CompactOnePageTaskChipUtilityStorageStatus;
  lastError: string | null;
}

export const bootstrapState = (): CompactOnePageTaskChipUtilityBootstrapResult => {
  const tasksResult = loadTasks();
  const prefsResult = loadPreferences();

  const hasCorruption =
    (!tasksResult.ok && tasksResult.reason === 'corrupted') ||
    (!prefsResult.ok && prefsResult.reason === 'corrupted');
  const hasError =
    hasCorruption ||
    (tasksResult.ok === false && tasksResult.reason !== 'missing') ||
    (prefsResult.ok === false && prefsResult.reason !== 'missing');

  if (tasksResult.ok && prefsResult.ok) {
    return {
      tasks: tasksResult.value,
      preferences: prefsResult.value,
      storageStatus: 'ready',
      lastError: null,
    };
  }

  // Either we have nothing (cold start) or we hit a recoverable corruption.
  // Either way we seed fixtures and signal the storage status accordingly.
  const seedOk = seedFixtures();
  return {
    tasks: fixtureTasks.slice(),
    preferences: { ...fixturePreferences },
    storageStatus: hasCorruption ? 'corrupted' : 'ready',
    lastError: hasError
      ? 'Recovered from corrupted local data; defaults restored.'
      : null,
  };
};

const initialState = (): CompactOnePageTaskChipUtilityState => {
  const boot = bootstrapState();
  return {
    activeSurface: 'operations',
    activePanel: 'all',
    selectedItem: { id: null, surface: 'operations' },
    storageStatus: boot.storageStatus,
    lastError: boot.lastError,
    tasks: Object.freeze(boot.tasks),
    preferences: { ...boot.preferences },
    counts: computeCounts(boot.tasks),
  };
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface CompactOnePageTaskChipUtilityContextValue {
  state: CompactOnePageTaskChipUtilityState;
  actions: CompactOnePageTaskChipUtilityActions;
  /** Returns a stable `{ state, actions }` snapshot for the bridge installer. */
  getApi: () => { state: CompactOnePageTaskChipUtilityState; actions: CompactOnePageTaskChipUtilityActions };
}

const Context = createContext<CompactOnePageTaskChipUtilityContextValue | null>(null);

Context.displayName = 'CompactOnePageTaskChipUtilityContext';

export const useCompactOnePageTaskChipUtility = (): CompactOnePageTaskChipUtilityContextValue => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error(
      'useCompactOnePageTaskChipUtility must be used inside <CompactOnePageTaskChipUtilityProvider>.',
    );
  }
  return ctx;
};

const newId = (): string => {
  if (typeof globalThis !== 'undefined' && typeof globalThis.crypto !== 'undefined') {
    const cryptoLike = globalThis.crypto as { randomUUID?: () => string };
    if (typeof cryptoLike.randomUUID === 'function') return cryptoLike.randomUUID();
  }
  return `task-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

const nowIso = (): string => new Date().toISOString();

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface CompactOnePageTaskChipUtilityProviderProps {
  children?: ReactNode;
  /** Test seam - skip persistence wiring. */
  disablePersistence?: boolean;
}

export const CompactOnePageTaskChipUtilityProvider = ({
  children,
  disablePersistence = false,
}: CompactOnePageTaskChipUtilityProviderProps) => {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const persistTasksSafely = useCallback(
    (tasks: ReadonlyArray<CompactOnePageTaskChipUtilityTask>): void => {
      if (disablePersistence) return;
      const ok = persistTasks(tasks);
      dispatch({ type: 'storage/status', status: ok ? 'ready' : 'error' });
    },
    [disablePersistence],
  );

  const persistPreferencesSafely = useCallback(
    (prefs: CompactOnePageTaskChipUtilityPreferences): void => {
      if (disablePersistence) return;
      const ok = persistPreferences(prefs);
      dispatch({ type: 'storage/status', status: ok ? 'ready' : 'error' });
    },
    [disablePersistence],
  );

  const actions = useMemo<CompactOnePageTaskChipUtilityActions>(() => {
    const navigateTo: CompactOnePageTaskChipUtilityActions['navigateTo'] = (surface) => {
      dispatch({ type: 'surface', surface });
    };
    const setActivePanel: CompactOnePageTaskChipUtilityActions['setActivePanel'] = (panel) => {
      dispatch({ type: 'panel', panel });
    };
    const selectItem: CompactOnePageTaskChipUtilityActions['selectItem'] = (id, surface) => {
      dispatch({
        type: 'select',
        selection: {
          id,
          surface: surface ?? stateRef.current.activeSurface,
        },
      });
    };

    const createTask: CompactOnePageTaskChipUtilityActions['createTask'] = (input) => {
      const prefs = stateRef.current.preferences;
      const id = input.id ?? newId();
      const createdAt = input.createdAt ?? nowIso();
      const updatedAt = input.updatedAt ?? createdAt;
      const task: CompactOnePageTaskChipUtilityTask = Object.freeze({
        id,
        name: input.name,
        notes: input.notes,
        category: input.category ?? prefs.defaultCategory,
        status: input.status ?? 'active',
        visibility: input.visibility ?? prefs.defaultVisibility,
        priority: input.priority ?? prefs.defaultPriority,
        createdAt,
        updatedAt,
      });
      const next = [task, ...stateRef.current.tasks];
      dispatch({ type: 'tasks/replace', tasks: next });
      persistTasksSafely(next);
      return id;
    };

    const updateTask: CompactOnePageTaskChipUtilityActions['updateTask'] = (id, patch) => {
      const updatedAt = nowIso();
      let didChange = false;
      const next = stateRef.current.tasks.map((task) => {
        if (task.id !== id) return task;
        didChange = true;
        return Object.freeze({ ...task, ...patch, id, updatedAt });
      });
      if (!didChange) return;
      dispatch({ type: 'tasks/replace', tasks: next });
      persistTasksSafely(next);
    };

    const deleteTask: CompactOnePageTaskChipUtilityActions['deleteTask'] = (id) => {
      const next = stateRef.current.tasks.filter((task) => task.id !== id);
      if (next.length === stateRef.current.tasks.length) return;
      dispatch({ type: 'tasks/replace', tasks: next });
      dispatch({
        type: 'select',
        selection:
          stateRef.current.selectedItem.id === id
            ? { id: null, surface: stateRef.current.activeSurface }
            : stateRef.current.selectedItem,
      });
      persistTasksSafely(next);
    };

    const toggleTask: CompactOnePageTaskChipUtilityActions['toggleTask'] = (id) => {
      const target = stateRef.current.tasks.find((t) => t.id === id);
      if (!target) return;
      const nextStatus = target.status === 'done' ? 'active' : 'done';
      const updatedAt = nowIso();
      const next = stateRef.current.tasks.map((task) =>
        task.id === id ? Object.freeze({ ...task, status: nextStatus, updatedAt }) : task,
      );
      dispatch({ type: 'tasks/replace', tasks: next });
      persistTasksSafely(next);
    };

    const resetToDefaults: CompactOnePageTaskChipUtilityActions['resetToDefaults'] = () => {
      const prefs: CompactOnePageTaskChipUtilityPreferences = { ...DEFAULT_PREFERENCES };
      dispatch({ type: 'preferences/replace', preferences: prefs });
      persistPreferencesSafely(prefs);
    };

    const savePreferencesAction: CompactOnePageTaskChipUtilityActions['savePreferences'] = (patch) => {
      const prefs = { ...stateRef.current.preferences, ...patch };
      dispatch({ type: 'preferences/replace', preferences: prefs });
      persistPreferencesSafely(prefs);
    };

    const clearCacheAction: CompactOnePageTaskChipUtilityActions['clearCache'] = () => {
      clearCacheStorage();
      seedFixtures();
      dispatch({
        type: 'storage/ready',
        tasks: fixtureTasks.slice(),
        preferences: { ...fixturePreferences },
      });
    };

    const retryLoad: CompactOnePageTaskChipUtilityActions['retryLoad'] = () => {
      const tasksResult = loadTasks();
      const prefsResult = loadPreferences();
      if (tasksResult.ok && prefsResult.ok) {
        dispatch({
          type: 'storage/ready',
          tasks: tasksResult.value,
          preferences: prefsResult.value,
        });
        return;
      }
      // Corrupted still: reseed and signal corrupted.
      seedFixtures();
      dispatch({
        type: 'storage/ready',
        tasks: fixtureTasks.slice(),
        preferences: { ...fixturePreferences },
      });
      dispatch({
        type: 'storage/status',
        status: tasksResult.ok && prefsResult.ok ? 'ready' : 'corrupted',
      });
    };

    const dismissError: CompactOnePageTaskChipUtilityActions['dismissError'] = () => {
      dispatch({ type: 'error', message: null });
    };

    return {
      navigateTo,
      setActivePanel,
      selectItem,
      createTask,
      updateTask,
      deleteTask,
      toggleTask,
      resetToDefaults,
      savePreferences: savePreferencesAction,
      clearCache: clearCacheAction,
      retryLoad,
      dismissError,
    };
  }, [persistTasksSafely, persistPreferencesSafely]);

  const getApi = useCallback<
    CompactOnePageTaskChipUtilityContextValue['getApi']
  >(() => ({ state: stateRef.current, actions }), [actions]);

  const value = useMemo<CompactOnePageTaskChipUtilityContextValue>(
    () => ({ state, actions, getApi }),
    [state, actions, getApi],
  );

  // Sync ref after every state transition so getApi always returns latest.
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
