import { useEffect } from 'react';
import {
  EmptyAndErrorRecoveryCompactOnePageTaskChipUtility,
  SettingsAndPreferencesCompactOnePageTaskChipUtility,
  ShortEditorCompactOnePageTaskChipUtility,
  ShortOperationsCompactOnePageTaskChipUtility,
} from './screens';
import {
  CompactOnePageTaskChipUtilityProvider,
  useCompactOnePageTaskChipUtility,
} from './features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.store';
import type { CompactOnePageTaskChipUtilitySurface } from './features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';
import { installBridge } from './test/bridge';

/**
 * Top-level App. Wires the Compact One Page Task Chip Utility provider,
 * surfaces ONE generated screen at a time (the rest are owned by sibling
 * stories), and installs the runtime bridge onto `window.app` / `globalThis.app`
 * so generated screens and downstream tests can observe and invoke state.
 */
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
  const { state, getApi } = useCompactOnePageTaskChipUtility();

  // Install the live state/actions handle onto window.app / globalThis.app
  // for generated screens and integration tests. Pure effect; no visible UI.
  useEffect(() => {
    installBridge(getApi());
  }, [getApi]);

  const surface = state.activeSurface;

  return (
    <ActiveSurface
      surface={surface}
      data-active-surface={surface}
      data-testid="setfarm-app-root"
      data-setfarm-root="shell"
    />
  );
}

interface ActiveSurfaceProps {
  surface: CompactOnePageTaskChipUtilitySurface;
  'data-active-surface': string;
  'data-testid': string;
  'data-setfarm-root': string;
}

/**
 * Renders exactly one generated screen as the visual viewport. The four
 * siblings stay reachable through navigation actions stored in `window.app`,
 * which sibling stories consume to swap the active surface.
 */
function ActiveSurface(props: ActiveSurfaceProps) {
  switch (props.surface) {
    case 'editor':
      return (
        <div {...props}>
          <ShortEditorCompactOnePageTaskChipUtility />
        </div>
      );
    case 'settings':
      return (
        <div {...props}>
          <SettingsAndPreferencesCompactOnePageTaskChipUtility />
        </div>
      );
    case 'recovery':
      return (
        <div {...props}>
          <EmptyAndErrorRecoveryCompactOnePageTaskChipUtility />
        </div>
      );
    case 'operations':
    default:
      return (
        <div {...props}>
          <ShortOperationsCompactOnePageTaskChipUtility />
        </div>
      );
  }
}
