/**
 * ACT_RETRY_LOAD — Short Operations surface secondary-button handler.
 *
 * Replays the storage bootstrap after a `corrupted` or `error` status. The
 * shared store's `retryLoad` action is the canonical implementation — it
 * re-reads the persisted tasks/preferences, re-seeds fixtures on
 * corruption, and surfaces the result via `state.storageStatus`. This
 * module is the action-prop entry point so the generated Stitch markup can
 * bind a button to it without reaching into the store directly.
 *
 * The handler never throws: a failed reseed produces a user-visible
 * `state.lastError` banner via the store's reducer, and the action prop is
 * a fire-and-forget `() => void` per the generated screen contract.
 */
import type { CompactOnePageTaskChipUtilityActions } from '../compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

/**
 * Re-run the storage bootstrap. Returns the new storage status so callers
 * (tests, integration probes) can synchronously observe the result.
 */
export const actRetryLoad = (
  actions: CompactOnePageTaskChipUtilityActions,
): void => {
  actions.retryLoad();
};