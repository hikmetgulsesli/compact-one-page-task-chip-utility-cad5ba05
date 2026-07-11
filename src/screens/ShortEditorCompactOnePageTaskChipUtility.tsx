// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Short Editor - Compact One Page Task Chip Utility
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ClipboardList, History, Settings, User } from "lucide-react";


export type ShortEditorCompactOnePageTaskChipUtilityActionId = "create-task-1" | "cancel-2" | "save-task-3" | "operations-1" | "settings-2" | "recovery-3" | "operations-4" | "settings-5" | "recovery-6" | "cache-status-7" | "json-export-8";

export interface ShortEditorCompactOnePageTaskChipUtilityProps {
  actions?: Partial<Record<ShortEditorCompactOnePageTaskChipUtilityActionId, () => void>>;

}

export function ShortEditorCompactOnePageTaskChipUtility({ actions }: ShortEditorCompactOnePageTaskChipUtilityProps) {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex items-center justify-between px-space-lg h-12 shadow-sm">
      <div className="flex items-center gap-space-md">
      <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Task Chip Utility</span>
      </div>
      {/* Web Nav Links (Hidden on mobile as per TopAppBar cluster rules) */}
      <div className="hidden md:flex items-center space-x-space-md">
      <a className="text-primary border-b-2 border-primary pb-1 font-label-md text-label-md" href="#" data-action-id="operations-1" onClick={(event) => { event.preventDefault(); actions?.["operations-1"]?.(); }}>Operations</a>
      <a className="text-on-surface-variant hover:bg-surface-container transition-colors font-label-md text-label-md px-2 py-1 rounded" href="#" data-action-id="settings-2" onClick={(event) => { event.preventDefault(); actions?.["settings-2"]?.(); }}>Settings</a>
      <a className="text-on-surface-variant hover:bg-surface-container transition-colors font-label-md text-label-md px-2 py-1 rounded" href="#" data-action-id="recovery-3" onClick={(event) => { event.preventDefault(); actions?.["recovery-3"]?.(); }}>Recovery</a>
      </div>
      <div className="flex items-center gap-space-md">
      <button className="bg-primary-container text-on-primary-container font-label-md text-label-md px-space-md py-1.5 rounded-lg active:scale-95 duration-150" type="button" data-action-id="create-task-1" onClick={actions?.["create-task-1"]}>Create Task</button>
      </div>
      </nav>
      <div className="flex flex-1 pt-12">
      {/* SideNavBar (Hidden on mobile) */}
      <aside className="fixed left-0 top-12 h-[calc(100vh-48px)] w-sidebar-width bg-surface-container-low border-r border-outline-variant flex-col p-space-md space-y-space-xs hidden md:flex z-40">
      <div className="mb-space-lg flex items-center gap-space-md p-space-xs">
      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center">
      <User  style={{fontSize: "16px"}} className="text-on-surface-variant" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <div className="font-label-md text-label-md font-bold text-on-surface">Utility v1.0</div>
      </div>
      </div>
      <a className="flex items-center gap-space-sm p-space-sm bg-secondary-container text-on-secondary-container rounded-xl transition-colors duration-200 ease-in-out" href="#" data-action-id="operations-4" onClick={(event) => { event.preventDefault(); actions?.["operations-4"]?.(); }}>
      <ClipboardList aria-hidden={true} focusable="false" />
      <span className="font-label-md text-label-md">Operations</span>
      </a>
      <a className="flex items-center gap-space-sm p-space-sm text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 ease-in-out rounded-xl" href="#" data-action-id="settings-5" onClick={(event) => { event.preventDefault(); actions?.["settings-5"]?.(); }}>
      <Settings aria-hidden={true} focusable="false" />
      <span className="font-label-md text-label-md">Settings</span>
      </a>
      <a className="flex items-center gap-space-sm p-space-sm text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 ease-in-out rounded-xl" href="#" data-action-id="recovery-6" onClick={(event) => { event.preventDefault(); actions?.["recovery-6"]?.(); }}>
      <History aria-hidden={true} focusable="false" />
      <span className="font-label-md text-label-md">Recovery</span>
      </a>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 md:ml-sidebar-width p-space-xl overflow-y-auto">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto mb-space-lg flex items-center justify-between">
      <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Task Editor</h1>
      {/* Unsaved Changes Badge (Task Chip Style) */}
      <div className="inline-flex items-center gap-1.5 px-[6px] py-[2px] bg-tertiary-container/10 border border-tertiary-container/20 rounded-md">
      <span className="w-[6px] h-[6px] rounded-full bg-tertiary"></span>
      <span className="font-label-sm text-label-sm text-tertiary">Unsaved changes</span>
      </div>
      </div>
      {/* Editor Form Card */}
      <div className="max-w-3xl mx-auto bg-surface border border-outline-variant rounded-xl p-space-xl shadow-sm">
      <form className="space-y-space-lg">
      {/* Task Name (with inline error validation) */}
      <div>
      <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs" htmlFor="taskName">Task Name *</label>
      <input className="block w-full h-[36px] px-space-md border border-error focus:border-error focus:ring-1 focus:ring-error rounded-md bg-surface font-body-md text-body-md text-on-surface" id="taskName" name="taskName" placeholder="Enter task name" type="text" defaultValue="" />
      <p className="font-label-md text-label-md text-error mt-space-xs">Task Name is required</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
      {/* Status */}
      <div>
      <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs" htmlFor="status">Status</label>
      <select className="block w-full h-[36px] px-space-md border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-md bg-surface font-body-md text-body-md text-on-surface" id="status" name="status">
      <option value="active">Active</option>
      <option value="done">Done</option>
      <option value="archived">Archived</option>
      </select>
      </div>
      {/* Priority */}
      <div>
      <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs" htmlFor="priority">Priority</label>
      <select className="block w-full h-[36px] px-space-md border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-md bg-surface font-body-md text-body-md text-on-surface" id="priority" name="priority">
      <option value="low">Low</option>
      <option selected={true} value="medium">Medium</option>
      <option value="high">High</option>
      </select>
      </div>
      </div>
      {/* Notes */}
      <div>
      <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs" htmlFor="notes">Notes</label>
      <textarea className="block w-full px-space-md py-space-sm border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-md bg-surface font-body-md text-body-md text-on-surface" id="notes" name="notes" placeholder="Add additional context or notes..." rows={4}></textarea>
      </div>
      {/* Actions */}
      <div className="pt-space-md border-t border-outline-variant flex justify-end gap-space-md">
      <button className="px-space-lg py-1.5 bg-surface border border-outline-variant text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors" type="button" data-action-id="cancel-2" onClick={actions?.["cancel-2"]}>
                                  Cancel
                              </button>
      <button className="px-space-lg py-1.5 bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg hover:bg-primary-container/90 active:scale-95 transition-colors" type="button" data-action-id="save-task-3" onClick={actions?.["save-task-3"]}>
                                  Save Task
                              </button>
      </div>
      </form>
      </div>
      <div className="h-16"></div> {/* Spacer for footer */}
      </main>
      </div>
      {/* Footer */}
      <footer className="fixed bottom-0 md:ml-sidebar-width w-full md:w-[calc(100%-240px)] bg-surface-container-lowest border-t border-outline-variant flex justify-between items-center px-space-lg py-space-xs z-50">
      <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">Task Chip Utility © 2024</span>
      <div className="flex gap-space-md">
      <a className="font-mono-sm text-mono-sm text-secondary hover:text-primary underline cursor-pointer transition-opacity" href="#" data-action-id="cache-status-7" onClick={(event) => { event.preventDefault(); actions?.["cache-status-7"]?.(); }}>Cache Status</a>
      <a className="font-mono-sm text-mono-sm text-secondary hover:text-primary underline cursor-pointer transition-opacity" href="#" data-action-id="json-export-8" onClick={(event) => { event.preventDefault(); actions?.["json-export-8"]?.(); }}>JSON Export</a>
      </div>
      </footer>
    </>
  );
}
