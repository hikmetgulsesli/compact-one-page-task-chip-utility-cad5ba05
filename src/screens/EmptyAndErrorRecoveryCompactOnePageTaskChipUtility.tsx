// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Empty and Error Recovery - Compact One Page Task Chip Utility
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { BadgeAlert, BadgeHelp, ClipboardList, History, Plus, RefreshCw, Settings } from "lucide-react";


export type EmptyAndErrorRecoveryCompactOnePageTaskChipUtilityActionId = "create-task-1" | "create-task-2" | "retry-load-3" | "create-your-first-task-4" | "operations-1" | "settings-2" | "recovery-3" | "operations-4" | "settings-5" | "recovery-6" | "cache-status-7" | "json-export-8";

export interface EmptyAndErrorRecoveryCompactOnePageTaskChipUtilityProps {
  actions?: Partial<Record<EmptyAndErrorRecoveryCompactOnePageTaskChipUtilityActionId, () => void>>;

}

export function EmptyAndErrorRecoveryCompactOnePageTaskChipUtility({ actions }: EmptyAndErrorRecoveryCompactOnePageTaskChipUtilityProps) {
  return (
    <>
      {/* TopNavBar (Mobile Only) */}
      <header className="md:hidden bg-surface text-primary font-body-md text-body-md fixed top-0 w-full z-50 border-b border-outline-variant flat no shadows flex items-center justify-between px-space-lg h-12 w-full">
      <div className="font-headline-sm text-headline-sm font-bold text-on-surface">Task Chip Utility</div>
      <nav className="flex space-x-space-md">
      <a className="text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 duration-150 px-2 py-1 rounded" href="#" data-action-id="operations-1" onClick={(event) => { event.preventDefault(); actions?.["operations-1"]?.(); }}>Operations</a>
      <a className="text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 duration-150 px-2 py-1 rounded" href="#" data-action-id="settings-2" onClick={(event) => { event.preventDefault(); actions?.["settings-2"]?.(); }}>Settings</a>
      <a className="text-primary border-b-2 border-primary pb-1 hover:bg-surface-container transition-colors active:scale-95 duration-150 px-2 py-1" href="#" data-action-id="recovery-3" onClick={(event) => { event.preventDefault(); actions?.["recovery-3"]?.(); }}>Recovery</a>
      </nav>
      <button className="bg-primary text-on-primary font-label-md text-label-md px-3 py-1 rounded-DEFAULT hover:bg-primary-container transition-colors active:scale-95" type="button" data-action-id="create-task-1" onClick={actions?.["create-task-1"]}>Create Task</button>
      </header>
      {/* SideNavBar (Desktop Only) */}
      <aside className="hidden md:flex bg-surface-container-low text-primary font-label-md text-label-md fixed left-0 top-0 h-full w-sidebar-width border-r border-outline-variant flat no shadows flex flex-col p-space-md space-y-space-xs transition-colors duration-200 ease-in-out">
      <div className="mb-space-lg px-2">
      <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Task Chip Utility</h1>
      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Utility v1.0</p>
      </div>
      <nav className="flex-1 space-y-1">
      <a className="flex items-center px-3 py-2 text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 ease-in-out rounded-xl" href="#" data-action-id="operations-4" onClick={(event) => { event.preventDefault(); actions?.["operations-4"]?.(); }}>
      <ClipboardList  style={{fontVariationSettings: "'FILL' 0"}} className="mr-3" aria-hidden={true} focusable="false" />
                      Operations
                  </a>
      <a className="flex items-center px-3 py-2 text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 ease-in-out rounded-xl" href="#" data-action-id="settings-5" onClick={(event) => { event.preventDefault(); actions?.["settings-5"]?.(); }}>
      <Settings  style={{fontVariationSettings: "'FILL' 0"}} className="mr-3" aria-hidden={true} focusable="false" />
                      Settings
                  </a>
      <a className="flex items-center px-3 py-2 bg-secondary-container text-on-secondary-container rounded-xl transition-colors duration-200 ease-in-out" href="#" data-action-id="recovery-6" onClick={(event) => { event.preventDefault(); actions?.["recovery-6"]?.(); }}>
      <History  style={{fontVariationSettings: "'FILL' 1"}} className="mr-3" aria-hidden={true} focusable="false" />
                      Recovery
                  </a>
      </nav>
      <div className="mt-auto pt-space-md">
      <button className="w-full bg-primary text-on-primary font-label-md text-label-md py-2 rounded-DEFAULT hover:bg-primary-container transition-colors flex items-center justify-center" type="button" data-action-id="create-task-2" onClick={actions?.["create-task-2"]}>
      <Plus className="mr-2 text-[18px]" aria-hidden={true} focusable="false" />
                      Create Task
                  </button>
      </div>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-[240px] pt-12 md:pt-0 pb-16 min-h-screen flex flex-col relative noise-bg">
      <div className="flex-1 flex flex-col items-center justify-center p-space-xl">
      <div className="max-w-md w-full text-center space-y-space-lg bg-surface border border-outline-variant rounded-xl p-space-xl shadow-sm relative overflow-hidden group hover:border-primary-fixed-dim transition-colors duration-300">
      {/* Decorative background blob */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-error-container rounded-full opacity-20 blur-2xl group-hover:bg-primary-fixed transition-colors duration-500"></div>
      <div className="flex justify-center mb-space-lg relative z-10">
      <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center relative">
      <BadgeHelp  style={{fontVariationSettings: "'FILL' 0"}} className="text-[40px] text-error" aria-hidden={true} focusable="false" />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-error rounded-full flex items-center justify-center border-2 border-surface">
      <BadgeAlert className="text-[14px] text-on-error" aria-hidden={true} focusable="false" />
      </div>
      </div>
      </div>
      <div className="space-y-space-xs relative z-10">
      <h2 className="font-headline-sm text-headline-sm text-on-surface">Failed to load local cache</h2>
      <p className="font-body-sm text-body-sm text-on-surface-variant">Try resetting your filters or clearing the application cache to recover your data. Ensure your connection is stable.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-space-sm justify-center pt-space-sm relative z-10">
      <button className="px-space-lg py-2 bg-primary text-on-primary font-label-md text-label-md rounded-DEFAULT hover:bg-primary-container active:scale-95 transition-colors flex items-center justify-center gap-2" type="button" data-action-id="retry-load-3" onClick={actions?.["retry-load-3"]}>
      <RefreshCw className="text-[16px]" aria-hidden={true} focusable="false" />
                              Retry Load
                          </button>
      <button className="px-space-lg py-2 bg-surface text-on-surface font-label-md text-label-md border border-outline-variant rounded-DEFAULT hover:bg-surface-container-low active:scale-95 transition-colors" type="button" data-action-id="create-your-first-task-4" onClick={actions?.["create-your-first-task-4"]}>
                              Create Your First Task
                          </button>
      </div>
      </div>
      {/* Diagnostic Info (Optional detail for professional feel) */}
      <div className="mt-space-lg text-center">
      <span className="font-mono-sm text-mono-sm text-secondary bg-surface-container-low px-2 py-1 rounded border border-outline-variant">ERR_CACHE_MISS // STATUS_404</span>
      </div>
      </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface-container-lowest text-secondary font-mono-sm text-mono-sm fixed bottom-0 w-full md:pl-[240px] border-t border-outline-variant flat no shadows flex justify-between items-center px-space-lg py-space-xs z-40">
      <div className="font-label-sm text-label-sm font-bold text-on-surface">Task Chip Utility © 2024</div>
      <div className="flex space-x-space-md">
      <a className="text-on-surface-variant hover:text-primary underline cursor-pointer transition-opacity" href="#" data-action-id="cache-status-7" onClick={(event) => { event.preventDefault(); actions?.["cache-status-7"]?.(); }}>Cache Status</a>
      <a className="text-on-surface-variant hover:text-primary underline cursor-pointer transition-opacity" href="#" data-action-id="json-export-8" onClick={(event) => { event.preventDefault(); actions?.["json-export-8"]?.(); }}>JSON Export</a>
      </div>
      </footer>
    </>
  );
}
