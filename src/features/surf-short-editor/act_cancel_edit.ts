/**
 * ACT_CANCEL_EDIT — Short Editor surface secondary-button handler.
 *
 * Triggered by the `Cancel` button on the Short Editor surface. The handler
 * discards the in-progress draft (a draft is never persisted until
 * ACT_SAVE_RECORD fires), clears the current selection so a follow-up
 * `Create Task` starts from a clean state, and routes the shell back to the
 * Short Operations surface.
 *
 * The store already guarantees that no record is mutated by simply leaving
 * the editor — drafts live in component state and only reach the store via
 * `actSaveRecord`. This handler exists as an explicit user-visible
 * confirmation: pressing `Cancel` is a deliberate signal that the user
 * does not want the draft.
 */
import type { CompactOnePageTaskChipUtilityActions } from '../compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

const OPERATIONS_SURFACE = 'operations' as const;

/**
 * Abandon the editor draft and route back to the operations list.
 *
 * Always returns to the operations surface regardless of where the user
 * came from — `Cancel` is the canonical "throw away my work" affordance.
 */
export const actCancelEdit = (actions: CompactOnePageTaskChipUtilityActions): void => {
  actions.selectItem(null, OPERATIONS_SURFACE);
  actions.navigateTo(OPERATIONS_SURFACE);
};