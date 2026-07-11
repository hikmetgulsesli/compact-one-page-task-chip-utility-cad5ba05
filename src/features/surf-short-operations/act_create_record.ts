/**
 * ACT_CREATE_RECORD — Short Operations surface primary-button handler.
 *
 * Triggered by the two `Create Task` buttons on the Short Operations surface
 * (the top-nav mobile button and the side-nav web button). The handler
 * mints a fresh task via the shared store, selects it, and navigates to the
 * Short Editor surface so the user lands directly on a draft of the new
 * record. Selection happens BEFORE navigation so the editor reads the right
 * target as soon as it mounts.
 *
 * Optional seed fields let callers (tests, voice-command surfaces) inject a
 * preset name, category, priority, or visibility. Production callers omit
 * them — the store fills the rest from `state.preferences`.
 */
import type { CompactOnePageTaskChipUtilityActions, CompactOnePageTaskChipUtilityTask } from '../compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

export type ActCreateRecordInput = Pick<CompactOnePageTaskChipUtilityTask, 'name'> &
  Partial<Omit<CompactOnePageTaskChipUtilityTask, 'id' | 'name' | 'createdAt' | 'updatedAt'>>;

/**
 * Create a new task, select it, and route the shell to the editor surface.
 *
 * Returns the freshly created task id so the caller can drive follow-on UI
 * (scroll-into-view, toast, deep-link) without re-reading state.
 */
export const actCreateRecord = (
  actions: CompactOnePageTaskChipUtilityActions,
  input: ActCreateRecordInput = { name: 'Untitled Task' },
): string => {
  const { name, ...rest } = input;
  const id = actions.createTask({ ...rest, name });
  actions.selectItem(id, 'editor');
  actions.navigateTo('editor');
  return id;
};