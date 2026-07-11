/**
 * Test bridge for the Compact One Page Task Chip Utility.
 *
 * Installs the live state/actions handle onto `window.app` and `globalThis.app`
 * so generated screens, sibling-story handlers, and downstream tests can read
 * or invoke the same handle as the React tree. The bridge is intentionally
 * tiny - it does NOT own the state, it just exposes the provider's API.
 */
import type {
  CompactOnePageTaskChipUtilityActions,
  CompactOnePageTaskChipUtilityState,
} from '../features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

export interface CompactOnePageTaskChipUtilityBridgeHandle {
  state: CompactOnePageTaskChipUtilityState;
  actions: CompactOnePageTaskChipUtilityActions;
}

export interface CompactOnePageTaskChipUtilityBridgeNamespace {
  /** The Compact One Page Task Chip Utility feature handle. */
  chipUtility: CompactOnePageTaskChipUtilityBridgeHandle;
}

declare global {
  // eslint-disable-next-line no-var
  var app:
    | CompactOnePageTaskChipUtilityBridgeNamespace
    | CompactOnePageTaskChipUtilityBridgeHandle
    | undefined;
}

/**
 * Install the handle onto `window.app` and `globalThis.app` so external code
 * (generated screens, QA tooling, integration tests) can read the latest
 * state and invoke actions. Returns the handle for convenience so the caller
 * can write `useEffect(() => installBridge({ state, actions }), [state, actions])`.
 */
export const installBridge = (
  handle: CompactOnePageTaskChipUtilityBridgeHandle,
): CompactOnePageTaskChipUtilityBridgeHandle => {
  const namespace: CompactOnePageTaskChipUtilityBridgeNamespace = {
    chipUtility: handle,
  };
  if (typeof window !== 'undefined') {
    (window as Window & { app?: typeof namespace }).app = namespace;
  }
  if (typeof globalThis !== 'undefined') {
    (globalThis as typeof globalThis & { app?: typeof namespace }).app = namespace;
  }
  return handle;
};

/** Read the currently installed handle, if any. Useful for assertions. */
export const readBridge = (): CompactOnePageTaskChipUtilityBridgeNamespace | undefined => {
  if (typeof window !== 'undefined') {
    return (window as Window & { app?: CompactOnePageTaskChipUtilityBridgeNamespace }).app;
  }
  if (typeof globalThis !== 'undefined') {
    return (globalThis as typeof globalThis & { app?: CompactOnePageTaskChipUtilityBridgeNamespace }).app;
  }
  return undefined;
};

/**
 * Remove the bridge. Used by tests in `afterEach` to avoid leaking state
 * across suites.
 */
export const uninstallBridge = (): void => {
  if (typeof window !== 'undefined') {
    delete (window as Window & { app?: unknown }).app;
  }
  if (typeof globalThis !== 'undefined') {
    delete (globalThis as typeof globalThis & { app?: unknown }).app;
  }
};
