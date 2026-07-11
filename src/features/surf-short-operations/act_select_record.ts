/**
 * ACT_SELECT_RECORD — Short Operations surface inline-edit handler.
 *
 * Triggered by the per-row `Edit` (and `visibility` toggle) buttons on the
 * Short Operations task list. The handler selects the targeted task in
 * shared state and navigates to the Short Editor surface so the row's data
 * becomes the editor's draft target. When the user invokes the inline-edit
 * button without a concrete task id (e.g. the third "Done" row where the
 * button is disabled in the generated markup but still wired), the handler
 * is a safe no-op — we never invent a record that doesn't exist.
 *
 * The optional `surface` argument lets future surfaces route the selection
 * somewhere other than the editor (e.g. a future detail view); callers that
 * want the editor pass nothing or `'editor'`.
 */
import type { CompactOnePageTaskChipUtilityActions, CompactOnePageTaskChipUtilitySurface } from '../compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

const EDITOR_SURFACE: CompactOnePageTaskChipUtilitySurface = 'editor';

/**
 * Select a task (by id) and route the shell to the editor surface.
 *
 * Passing `null` clears the current selection without navigating — useful for
 * "Cancel selection" affordances. Passing a non-existent id is a no-op
 * (the store's `select` action silently ignores unknown ids).
 */
export const actSelectRecord = (
  actions: CompactOnePageTaskChipUtilityActions,
  taskId: string | null,
  surface: CompactOnePageTaskChipUtilitySurface = EDITOR_SURFACE,
): void => {
  if (taskId === null) {
    actions.selectItem(null, surface);
    return;
  }
  actions.selectItem(taskId, surface);
  actions.navigateTo(surface);
};