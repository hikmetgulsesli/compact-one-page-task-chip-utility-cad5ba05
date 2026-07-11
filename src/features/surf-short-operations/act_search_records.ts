/**
 * ACT_SEARCH_RECORDS — Short Operations surface search-input handler.
 *
 * The search box on the Short Operations surface is the `search_input_persistent`
 * control (control hint per design contract). Every keystroke routes through
 * this handler so the active search term is mirrored into
 * `state.preferences.searchTerm` — that is the durable copy the empty-state
 * surface reads back when the user navigates away and returns.
 *
 * The handler is intentionally parameterless in the action-prop contract:
 * callers close over the current query value (typically a React `useState`
 * setter) and forward it here. The store is the single source of truth — the
 * store then derives the visible task list and counts via its existing
 * selectors, so every screen stays in sync.
 */
import type { CompactOnePageTaskChipUtilityActions } from '../compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

/**
 * Persist a new search term into the shared preferences slice.
 *
 * Empty strings are accepted: clearing the search resets the filter and
 * restores the full list. No-op for non-string inputs (defensive — callers
 * usually pass a controlled input value).
 */
export const actSearchRecords = (
  actions: CompactOnePageTaskChipUtilityActions,
  query: string,
): void => {
  if (typeof query !== 'string') return;
  actions.savePreferences({ searchTerm: query });
};