/**
 * ACT_SAVE_RECORD — Short Editor surface form-submit handler.
 *
 * Triggered by the `Save Task` button on the Short Editor surface. The
 * handler turns the editor's draft into a real record: if a record is
 * already selected (the editor was opened via an inline-edit), the existing
 * task is updated; otherwise a fresh task is created. In both cases the
 * editor surface hands control back to the operations list and clears the
 * selection so a follow-up `Create Task` click starts from a clean slate.
 *
 * Input shape mirrors the generated editor markup: name (required string),
 * status / priority / visibility (typed enums), notes (optional string),
 * category (optional string). Validation is permissive: empty names fall
 * back to `'Untitled Task'` so a Save click never silently drops the draft.
 */
import type {
  CompactOnePageTaskChipUtilityActions,
  CompactOnePageTaskChipUtilityPriority,
  CompactOnePageTaskChipUtilityStatus,
  CompactOnePageTaskChipUtilityVisibility,
} from '../compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

export interface ActSaveRecordInput {
  name: string;
  status?: CompactOnePageTaskChipUtilityStatus;
  priority?: CompactOnePageTaskChipUtilityPriority;
  visibility?: CompactOnePageTaskChipUtilityVisibility;
  notes?: string;
  category?: string;
}

const STATUS_VALUES: ReadonlySet<CompactOnePageTaskChipUtilityStatus> = new Set([
  'active',
  'done',
  'archived',
]);

const PRIORITY_VALUES: ReadonlySet<CompactOnePageTaskChipUtilityPriority> = new Set([
  'low',
  'medium',
  'high',
]);

const VISIBILITY_VALUES: ReadonlySet<CompactOnePageTaskChipUtilityVisibility> = new Set([
  'public',
  'private',
]);

const sanitizeStatus = (value: unknown): CompactOnePageTaskChipUtilityStatus | undefined =>
  typeof value === 'string' && STATUS_VALUES.has(value as CompactOnePageTaskChipUtilityStatus)
    ? (value as CompactOnePageTaskChipUtilityStatus)
    : undefined;

const sanitizePriority = (value: unknown): CompactOnePageTaskChipUtilityPriority | undefined =>
  typeof value === 'string' && PRIORITY_VALUES.has(value as CompactOnePageTaskChipUtilityPriority)
    ? (value as CompactOnePageTaskChipUtilityPriority)
    : undefined;

const sanitizeVisibility = (value: unknown): CompactOnePageTaskChipUtilityVisibility | undefined =>
  typeof value === 'string' && VISIBILITY_VALUES.has(value as CompactOnePageTaskChipUtilityVisibility)
    ? (value as CompactOnePageTaskChipUtilityVisibility)
    : undefined;

const sanitizeName = (value: unknown): string => {
  if (typeof value !== 'string') return 'Untitled Task';
  const trimmed = value.trim();
  return trimmed.length === 0 ? 'Untitled Task' : trimmed;
};

/**
 * Persist the editor's draft. Reads the live selection from `stateRef` via
 * the shared store's actions so the caller doesn't need to thread selection
 * state through. Returns the persisted task id.
 */
export const actSaveRecord = (
  actions: CompactOnePageTaskChipUtilityActions,
  draft: ActSaveRecordInput,
  selectedId: string | null,
): string => {
  const name = sanitizeName(draft.name);
  const status = sanitizeStatus(draft.status);
  const priority = sanitizePriority(draft.priority);
  const visibility = sanitizeVisibility(draft.visibility);
  const notes = typeof draft.notes === 'string' ? draft.notes : undefined;
  const category = typeof draft.category === 'string' && draft.category.length > 0 ? draft.category : undefined;

  if (selectedId) {
    actions.updateTask(selectedId, {
      name,
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
      ...(visibility ? { visibility } : {}),
      ...(notes !== undefined ? { notes } : {}),
      ...(category !== undefined ? { category } : {}),
    });
    actions.selectItem(null, 'operations');
    actions.navigateTo('operations');
    return selectedId;
  }

  const id = actions.createTask({
    name,
    ...(status ? { status } : {}),
    ...(priority ? { priority } : {}),
    ...(visibility ? { visibility } : {}),
    ...(notes !== undefined ? { notes } : {}),
    ...(category !== undefined ? { category } : {}),
  });
  actions.selectItem(null, 'operations');
  actions.navigateTo('operations');
  return id;
};