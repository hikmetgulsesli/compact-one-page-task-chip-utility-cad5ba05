// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Short Operations - Compact One Page Task Chip Utility
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { ClipboardList, Eye, History, Pencil, Plus, Search, Settings, User } from "lucide-react";


export type ShortOperationsCompactOnePageTaskChipUtilityActionId = "operations-1" | "settings-2" | "recovery-3" | "create-task-4" | "create-task-5" | "all-6" | "active-7" | "done-8" | "archive-9" | "edit-10" | "edit-11" | "visibility-12" | "operations-1-2" | "settings-2-2" | "recovery-3-2" | "cache-status-4" | "json-export-5";

export interface ShortOperationsCompactOnePageTaskChipUtilityProps {
  actions?: Partial<Record<ShortOperationsCompactOnePageTaskChipUtilityActionId, () => void>>;

}

export function ShortOperationsCompactOnePageTaskChipUtility({ actions }: ShortOperationsCompactOnePageTaskChipUtilityProps) {
  return (
    <>
      {/* TopNavBar (Mobile Only) */}
      <nav className="md:hidden bg-surface text-primary font-body-md fixed top-0 w-full z-50 border-b border-outline-variant flex items-center justify-between px-space-lg h-12">
      <div className="flex items-center gap-space-md">
      <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Task Chip Utility</span>
      </div>
      <div className="flex gap-space-md">
      <button className="text-primary border-b-2 border-primary pb-1" type="button" data-action-id="operations-1" onClick={actions?.["operations-1"]}>Operations</button>
      <button className="text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 duration-150" type="button" data-action-id="settings-2" onClick={actions?.["settings-2"]}>Settings</button>
      <button className="text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 duration-150" type="button" data-action-id="recovery-3" onClick={actions?.["recovery-3"]}>Recovery</button>
      </div>
      <button className="bg-primary-container text-on-primary-container px-3 py-1 rounded font-label-md text-label-md" type="button" data-action-id="create-task-4" onClick={actions?.["create-task-4"]}>Create Task</button>
      </nav>
      {/* SideNavBar (Web Only) */}
      <aside className="hidden md:flex flex-col bg-surface-container-low text-primary font-label-md text-label-md fixed left-0 top-0 h-full w-sidebar-width border-r border-outline-variant p-space-md space-y-space-xs z-40">
      <div className="mb-space-xl flex items-center gap-space-md pl-space-xs">
      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden shrink-0">
      <User className="text-on-surface-variant" aria-hidden={true} focusable="false" />
      </div>
      <div>
      <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">Task Chip Utility</h1>
      <p className="font-label-sm text-label-sm text-on-surface-variant">Utility v1.0</p>
      </div>
      </div>
      <button className="w-full text-left bg-primary-container text-on-primary text-body-md font-body-md rounded-xl py-2 px-4 mb-space-lg shadow-sm hover:opacity-90 transition-opacity flex justify-center items-center gap-2" type="button" data-action-id="create-task-5" onClick={actions?.["create-task-5"]}>
      <Plus className="text-sm" aria-hidden={true} focusable="false" /> Create Task
              </button>
      <nav className="flex-1 flex flex-col space-y-1">
      <a className="flex items-center gap-3 px-3 py-2 bg-secondary-container text-on-secondary-container rounded-xl transition-colors duration-200 ease-in-out" href="#" data-action-id="operations-1-2" onClick={(event) => { event.preventDefault(); actions?.["operations-1-2"]?.(); }}>
      <ClipboardList aria-hidden={true} focusable="false" />
      <span>Operations</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-highest rounded-xl transition-colors duration-200 ease-in-out" href="#" data-action-id="settings-2-2" onClick={(event) => { event.preventDefault(); actions?.["settings-2-2"]?.(); }}>
      <Settings aria-hidden={true} focusable="false" />
      <span>Settings</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-highest rounded-xl transition-colors duration-200 ease-in-out" href="#" data-action-id="recovery-3-2" onClick={(event) => { event.preventDefault(); actions?.["recovery-3-2"]?.(); }}>
      <History aria-hidden={true} focusable="false" />
      <span>Recovery</span>
      </a>
      </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 md:ml-[240px] pt-16 md:pt-0 pb-16 flex flex-col min-h-screen">
      <div className="p-space-xl max-w-5xl w-full mx-auto flex flex-col gap-space-xl">
      {/* Header & Search */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md">
      <div>
      <h2 className="font-headline-sm text-headline-sm text-on-surface">Short Operations</h2>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage and track active utility tasks.</p>
      </div>
      <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" aria-hidden={true} focusable="false" />
      <input className="w-full h-8 pl-9 pr-3 rounded border border-outline-variant bg-surface text-body-sm font-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Search tasks..." type="text" />
      </div>
      </header>
      {/* Metrics Bento */}
      <section className="grid grid-cols-3 gap-space-md">
      <div className="bg-surface border border-outline-variant rounded p-space-md flex flex-col gap-space-xxs">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total</span>
      <span className="font-mono-sm text-mono-sm text-on-surface text-lg">12</span>
      </div>
      <div className="bg-surface border border-outline-variant rounded p-space-md flex flex-col gap-space-xxs border-l-4 border-l-primary-container">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active</span>
      <span className="font-mono-sm text-mono-sm text-on-surface text-lg">5</span>
      </div>
      <div className="bg-surface border border-outline-variant rounded p-space-md flex flex-col gap-space-xxs border-l-4 border-l-secondary">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Done</span>
      <span className="font-mono-sm text-mono-sm text-on-surface text-lg">7</span>
      </div>
      </section>
      {/* Filters */}
      <div className="flex gap-space-sm border-b border-outline-variant pb-space-sm">
      <button className="px-3 py-1 bg-surface-variant text-on-surface rounded-full font-label-md text-label-md border border-outline-variant" type="button" data-action-id="all-6" onClick={actions?.["all-6"]}>All</button>
      <button className="px-3 py-1 bg-surface text-on-surface-variant rounded-full font-label-md text-label-md border border-outline-variant hover:bg-surface-variant transition-colors" type="button" data-action-id="active-7" onClick={actions?.["active-7"]}>Active</button>
      <button className="px-3 py-1 bg-surface text-on-surface-variant rounded-full font-label-md text-label-md border border-outline-variant hover:bg-surface-variant transition-colors" type="button" data-action-id="done-8" onClick={actions?.["done-8"]}>Done</button>
      <button className="px-3 py-1 bg-surface text-on-surface-variant rounded-full font-label-md text-label-md border border-outline-variant hover:bg-surface-variant transition-colors ml-auto" type="button" data-action-id="archive-9" onClick={actions?.["archive-9"]}>Archive</button>
      </div>
      {/* Task List */}
      <div className="flex flex-col gap-space-sm">
      {/* Task Item 1 */}
      <div className="group bg-surface border border-outline-variant rounded p-space-md flex items-center justify-between hover:bg-surface-bright transition-colors cursor-pointer">
      <div className="flex items-center gap-space-md">
      <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
      <div className="flex flex-col">
      <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Update API docs</span>
      <span className="font-mono-sm text-mono-sm text-on-surface-variant mt-1">10:45 AM</span>
      </div>
      </div>
      <div className="flex items-center gap-space-md">
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-container/10 text-primary-container font-label-md text-label-md border border-primary-container/20">
      <div className="w-1.5 h-1.5 rounded-full bg-primary-container"></div>
                                  Active
                              </div>
      <button className="text-on-surface-variant hover:text-on-surface opacity-0 group-hover:opacity-100 transition-opacity" type="button" aria-label="Edit" data-action-id="edit-10" onClick={actions?.["edit-10"]}>
      <Pencil className="text-sm" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </div>
      {/* Task Item 2 */}
      <div className="group bg-surface border border-outline-variant rounded p-space-md flex items-center justify-between hover:bg-surface-bright transition-colors cursor-pointer">
      <div className="flex items-center gap-space-md">
      <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
      <div className="flex flex-col">
      <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">Fix UI bug in layout</span>
      <span className="font-mono-sm text-mono-sm text-on-surface-variant mt-1">09:12 AM</span>
      </div>
      </div>
      <div className="flex items-center gap-space-md">
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-error-container/10 text-error border border-error-container/20 font-label-md text-label-md">
      <div className="w-1.5 h-1.5 rounded-full bg-error"></div>
                                  Urgent
                              </div>
      <button className="text-on-surface-variant hover:text-on-surface opacity-0 group-hover:opacity-100 transition-opacity" type="button" aria-label="Edit" data-action-id="edit-11" onClick={actions?.["edit-11"]}>
      <Pencil className="text-sm" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </div>
      {/* Task Item 3 (Done) */}
      <div className="group bg-surface-container-lowest border border-outline-variant rounded p-space-md flex items-center justify-between opacity-75">
      <div className="flex items-center gap-space-md">
      <input checked={true} className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" disabled={true} type="checkbox" />
      <div className="flex flex-col">
      <span className="font-body-md text-body-md text-on-surface-variant line-through">Compile weekly report</span>
      <span className="font-mono-sm text-mono-sm text-on-surface-variant mt-1">Yesterday</span>
      </div>
      </div>
      <div className="flex items-center gap-space-md">
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-variant text-secondary font-label-md text-label-md">
      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                  Done
                              </div>
      <button className="text-on-surface-variant hover:text-on-surface opacity-0 group-hover:opacity-100 transition-opacity" disabled={true} type="button" aria-label="Visibility" data-action-id="visibility-12" onClick={actions?.["visibility-12"]}>
      <Eye className="text-sm" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </div>
      </div>
      </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface-container-lowest text-secondary font-mono-sm text-mono-sm fixed bottom-0 w-full border-t border-outline-variant flex justify-between items-center px-space-lg py-space-xs z-50 md:pl-[256px]">
      <div className="font-label-sm text-label-sm font-bold">Task Chip Utility © 2024</div>
      <div className="flex gap-space-md">
      <a className="text-on-surface-variant hover:text-primary underline cursor-pointer transition-opacity" href="#" data-action-id="cache-status-4" onClick={(event) => { event.preventDefault(); actions?.["cache-status-4"]?.(); }}>Cache Status</a>
      <a className="text-on-surface-variant hover:text-primary underline cursor-pointer transition-opacity" href="#" data-action-id="json-export-5" onClick={(event) => { event.preventDefault(); actions?.["json-export-5"]?.(); }}>JSON Export</a>
      </div>
      </footer>
    </>
  );
}
