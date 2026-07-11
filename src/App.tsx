/**
 * Top-level App. Wires the Compact One Page Task Chip Utility provider,
 * surfaces ONE generated screen at a time (the rest are owned by sibling
 * stories), and installs the runtime bridge onto `window.app` / `globalThis.app`
 * so generated screens and downstream tests can observe and invoke state.
 *
 * Layout contract:
 * - The active-surface wrapper is a flex container (`relative flex min-h-screen
 * w-full overflow-hidden`). The generated Stitch screens render their own
 * sidebar + main + footer layout internally (sidebar uses `position: fixed`,
 * main uses `margin-left`), so a flex root keeps the viewport from collapsing
 * when the screen's `<main className="min-h-screen">` is present.
 * - The mount root carries `data-setfarm-root="shell"` so supervisor lint can
 * verify the flex layout without parsing arbitrary Tailwind trees.
 *
 * Story US-002 owns the wiring for the Short Operations + Short Editor
 * surfaces. The two surface wrappers below translate the store's action
 * surface into the generated-screen `actions` prop shape; sibling stories
 * wire their own surfaces (settings / recovery) through their own claim.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  EmptyAndErrorRecoveryCompactOnePageTaskChipUtility,
  SettingsAndPreferencesCompactOnePageTaskChipUtility,
  ShortEditorCompactOnePageTaskChipUtility,
  ShortOperationsCompactOnePageTaskChipUtility,
  type ShortEditorCompactOnePageTaskChipUtilityActionId,
  type ShortOperationsCompactOnePageTaskChipUtilityActionId,
} from './screens';
import {
  CompactOnePageTaskChipUtilityProvider,
  useCompactOnePageTaskChipUtility,
} from './features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.store';
import type {
  CompactOnePageTaskChipUtilityActions,
  CompactOnePageTaskChipUtilityPriority,
  CompactOnePageTaskChipUtilityState,
  CompactOnePageTaskChipUtilityStatus,
  CompactOnePageTaskChipUtilitySurface,
  CompactOnePageTaskChipUtilityVisibility,
} from './features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';
import { actCreateRecord } from './features/surf-short-operations/act_create_record';
import { actRetryLoad } from './features/surf-short-operations/act_retry_load';
import { actSearchRecords } from './features/surf-short-operations/act_search_records';
import { actSelectRecord } from './features/surf-short-operations/act_select_record';
import { actCancelEdit } from './features/surf-short-editor/act_cancel_edit';
import { actSaveRecord } from './features/surf-short-editor/act_save_record';
import { installBridge } from './test/bridge';

export default function App() {
  return (
    <CompactOnePageTaskChipUtilityProvider>
      <CompactOnePageTaskChipUtilityShell />
    </CompactOnePageTaskChipUtilityProvider>
  );
}

/**
 * The shell picks one of the four surfaces based on `state.activeSurface`
 * and renders it full-bleed. NO diagnostic/session/status/debug/QA chrome is
 * rendered here - the generated screen IS the viewport root so it cannot be
 * pushed, covered, or overflowed by app-shell decorations on mobile.
 */
function CompactOnePageTaskChipUtilityShell() {
  const { state, getApi, actions } = useCompactOnePageTaskChipUtility();

  // Install the live state/actions handle onto window.app / globalThis.app
  // for generated screens and integration tests. Pure effect; no visible UI.
  useEffect(() => {
    installBridge(getApi());
  }, [getApi]);

  const surface = state.activeSurface;

  return (
    <ActiveSurface
      surface={surface}
      state={state}
      actions={actions}
      data-active-surface={surface}
      data-testid="setfarm-app-root"
      data-setfarm-root="shell"
    />
  );
}

interface ActiveSurfaceProps {
  surface: CompactOnePageTaskChipUtilitySurface;
  state: CompactOnePageTaskChipUtilityState;
  actions: CompactOnePageTaskChipUtilityActions;
  'data-active-surface': string;
  'data-testid': string;
  'data-setfarm-root': string;
}

/**
 * Renders exactly one generated screen as the visual viewport. The four
 * siblings stay reachable through navigation actions stored in `window.app`,
 * which sibling stories consume to swap the active surface.
 *
 * The wrapper carries a flex layout class so the generated screen's internal
 * sidebar + main + footer composition renders side-by-side without collapsing
 * the viewport (GENERATED_SCREEN_LAYOUT_MOUNT_UNSAFE fix).
 *
 * Story US-002 wraps the Operations + Editor surfaces in stateful surface
 * components so the generated `actions` prop is populated with handlers
 * that close over the live store. Settings + Recovery stay bare; their owning
 * stories own the wiring.
 */
function ActiveSurface(props: ActiveSurfaceProps) {
  switch (props.surface) {
    case 'editor':
      return (
        <div
          className="relative flex min-h-screen w-full overflow-hidden"
          data-active-surface={props['data-active-surface']}
          data-testid={props['data-testid']}
          data-setfarm-root={props['data-setfarm-root']}
        >
          <ShortEditorSurface state={props.state} actions={props.actions} />
        </div>
      );
    case 'settings':
      return (
        <div
          className="relative flex min-h-screen w-full overflow-hidden"
          data-active-surface={props['data-active-surface']}
          data-testid={props['data-testid']}
          data-setfarm-root={props['data-setfarm-root']}
        >
          <SettingsAndPreferencesCompactOnePageTaskChipUtility />
        </div>
      );
    case 'recovery':
      return (
        <div
          className="relative flex min-h-screen w-full overflow-hidden"
          data-active-surface={props['data-active-surface']}
          data-testid={props['data-testid']}
          data-setfarm-root={props['data-setfarm-root']}
        >
          <EmptyAndErrorRecoveryCompactOnePageTaskChipUtility />
        </div>
      );
    case 'operations':
    default:
      return (
        <div
          className="relative flex min-h-screen w-full overflow-hidden"
          data-active-surface={props['data-active-surface']}
          data-testid={props['data-testid']}
          data-setfarm-root={props['data-setfarm-root']}
        >
          <ShortOperationsSurface state={props.state} actions={props.actions} />
        </div>
      );
  }
}

// ---------------------------------------------------------------------------
// Short Operations surface wrapper (story US-002 owned)
// ---------------------------------------------------------------------------

interface SurfaceWrapperProps {
  state: CompactOnePageTaskChipUtilityState;
  actions: CompactOnePageTaskChipUtilityActions;
}

/**
 * Stateful wrapper around the generated Short Operations screen. Owns the
 * `actions` prop map and the search-input local state that the generated
 * markup doesn't carry internally. The generated buttons fire the handlers
 * below; the search input drives `actSearchRecords` so the active filter
 * survives navigation away and back.
 */
function ShortOperationsSurface({ state, actions }: SurfaceWrapperProps) {
  const [searchDraft, setSearchDraft] = useState<string>(state.preferences.searchTerm);

  // Mirror the persisted search term back into the local input on every
  // navigation back to the surface (e.g. after the user saves in the editor).
  useEffect(() => {
    setSearchDraft(state.preferences.searchTerm);
  }, [state.preferences.searchTerm]);

  const handleSearchChange = useCallback(
    (next: string) => {
      setSearchDraft(next);
      actSearchRecords(actions, next);
    },
    [actions],
  );

  const operationsActionMap = useMemo<
    Partial<Record<ShortOperationsCompactOnePageTaskChipUtilityActionId, () => void>>
  >(() => {
    const navigate = (target: CompactOnePageTaskChipUtilitySurface) => () =>
      actions.navigateTo(target);
    const panel = (id: 'all' | 'active' | 'done' | 'archive') => () =>
      actions.setActivePanel(id);
    return {
      'operations-1': navigate('operations'),
      'settings-2': navigate('settings'),
      'recovery-3': navigate('recovery'),
      'create-task-4': () => actCreateRecord(actions, { name: 'Untitled Task' }),
      'create-task-5': () => actCreateRecord(actions, { name: 'Untitled Task' }),
      'all-6': panel('all'),
      'active-7': panel('active'),
      'done-8': panel('done'),
      'archive-9': panel('archive'),
      'edit-10': () => actSelectRecord(actions, state.selectedItem.id),
      'edit-11': () => actSelectRecord(actions, state.selectedItem.id),
      'visibility-12': () => actRetryLoad(actions),
      'operations-1-2': navigate('operations'),
      'settings-2-2': navigate('settings'),
      'recovery-3-2': navigate('recovery'),
      'cache-status-4': () => actRetryLoad(actions),
      'json-export-5': () => actRetryLoad(actions),
    };
  }, [actions, state.selectedItem.id]);

  // Hand the search input + change handler to a context-free shim so the
  // generated screen can read them through `window` without a global context.
  // Generated screens are auto-generated; we don't add new props to them.
  // The handler is exposed at runtime for any direct callers (tests, sibling
  // stories) via the bridge's `actions` surface.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window as Window & {
      __compactOnePageTaskChipUtilityOps?: {
        searchValue: string;
        onSearchChange: (next: string) => void;
      };
    };
    w.__compactOnePageTaskChipUtilityOps = {
      searchValue: searchDraft,
      onSearchChange: handleSearchChange,
    };
  }, [searchDraft, handleSearchChange]);

  return (
    <ShortOperationsCompactOnePageTaskChipUtility actions={operationsActionMap} />
  );
}

// ---------------------------------------------------------------------------
// Short Editor surface wrapper (story US-002 owned)
// ---------------------------------------------------------------------------

interface ShortEditorFormDraft {
  name: string;
  status: CompactOnePageTaskChipUtilityStatus;
  priority: CompactOnePageTaskChipUtilityPriority;
  visibility: CompactOnePageTaskChipUtilityVisibility;
  notes: string;
  category: string;
}

/**
 * Stateful wrapper around the generated Short Editor screen. The generated
 * markup renders hard-coded `<input>` / `<select>` controls with no React
 * state binding; this wrapper holds the draft locally and feeds it into
 * `actSaveRecord` when the user clicks `Save Task`. The selected-item id
 * is sourced from the live store so a save click after an inline-edit
 * updates the existing record instead of minting a new one.
 */
function ShortEditorSurface({ state, actions }: SurfaceWrapperProps) {
  const selectedTask = useMemo(() => {
    if (state.selectedItem.id === null) return undefined;
    return state.tasks.find((task) => task.id === state.selectedItem.id);
  }, [state.selectedItem.id, state.tasks]);

  const [draft, setDraft] = useState<ShortEditorFormDraft>(() => ({
    name: selectedTask?.name ?? '',
    status: selectedTask?.status ?? 'active',
    priority: selectedTask?.priority ?? state.preferences.defaultPriority,
    visibility: selectedTask?.visibility ?? state.preferences.defaultVisibility,
    notes: selectedTask?.notes ?? '',
    category: selectedTask?.category ?? state.preferences.defaultCategory,
  }));

  // Reset the draft whenever the editor mounts against a different record
  // (e.g. user clicks a different `Edit` button while the editor is open).
  useEffect(() => {
    setDraft({
      name: selectedTask?.name ?? '',
      status: selectedTask?.status ?? 'active',
      priority: selectedTask?.priority ?? state.preferences.defaultPriority,
      visibility: selectedTask?.visibility ?? state.preferences.defaultVisibility,
      notes: selectedTask?.notes ?? '',
      category: selectedTask?.category ?? state.preferences.defaultCategory,
    });
  }, [
    selectedTask?.id,
    state.preferences.defaultCategory,
    state.preferences.defaultPriority,
    state.preferences.defaultVisibility,
  ]);

  const handleSave = useCallback(() => {
    actSaveRecord(actions, draft, state.selectedItem.id);
  }, [actions, draft, state.selectedItem.id]);

  const handleCancel = useCallback(() => {
    actCancelEdit(actions);
  }, [actions]);

  const editorActionMap = useMemo<
    Partial<Record<ShortEditorCompactOnePageTaskChipUtilityActionId, () => void>>
  >(() => {
    const navigate = (target: CompactOnePageTaskChipUtilitySurface) => () =>
      actions.navigateTo(target);
    return {
      'create-task-1': () => actCreateRecord(actions, { name: 'Untitled Task' }),
      'cancel-2': handleCancel,
      'save-task-3': handleSave,
      'operations-1': navigate('operations'),
      'settings-2': navigate('settings'),
      'recovery-3': navigate('recovery'),
      'operations-4': navigate('operations'),
      'settings-5': navigate('settings'),
      'recovery-6': navigate('recovery'),
      'cache-status-7': () => actRetryLoad(actions),
      'json-export-8': () => actRetryLoad(actions),
    };
  }, [actions, handleCancel, handleSave]);

  // Expose the live form draft + draft mutators for direct callers (tests,
  // voice-command bridges) without re-rendering the generated screen. The
  // generated `<input>`/`<select>` controls stay presentational; mutations
  // come through this bridge.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window as Window & {
      __compactOnePageTaskChipUtilityEditor?: {
        draft: ShortEditorFormDraft;
        setDraft: (next: ShortEditorFormDraft) => void;
        selectedId: string | null;
      };
    };
    w.__compactOnePageTaskChipUtilityEditor = {
      draft,
      setDraft,
      selectedId: state.selectedItem.id,
    };
  }, [draft, state.selectedItem.id]);

  return <ShortEditorCompactOnePageTaskChipUtility actions={editorActionMap} />;
}