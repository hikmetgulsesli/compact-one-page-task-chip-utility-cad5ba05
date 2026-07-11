// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Settings and Preferences - Compact One Page Task Chip Utility
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { CheckCircle2, ClipboardList, Database, Grid3X3, History, Plus, Search, Settings, SlidersHorizontal, Trash2 } from "lucide-react";


export type SettingsAndPreferencesCompactOnePageTaskChipUtilityActionId = "create-task-1" | "clear-cache-2" | "reset-to-defaults-3" | "save-preferences-4" | "operations-1" | "settings-2" | "recovery-3" | "operations-4" | "settings-5" | "recovery-6" | "cache-status-7" | "json-export-8";

export interface SettingsAndPreferencesCompactOnePageTaskChipUtilityProps {
  actions?: Partial<Record<SettingsAndPreferencesCompactOnePageTaskChipUtilityActionId, () => void>>;

}

export function SettingsAndPreferencesCompactOnePageTaskChipUtility({ actions }: SettingsAndPreferencesCompactOnePageTaskChipUtilityProps) {
  return (
    <>
      {/* TopNavBar */}
      <nav className="bg-surface dark:bg-on-background font-body-md text-body-md fixed top-0 w-full z-50 border-b border-outline-variant dark:border-outline flex items-center justify-between px-space-lg h-12 w-full">
      <div className="flex items-center gap-space-lg">
      <span className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-inverse-on-surface">Task Chip Utility</span>
      <div className="hidden md:flex items-center bg-surface-container-low rounded-full px-3 py-1">
      <Search className="text-on-surface-variant text-[18px]" aria-hidden={true} focusable="false" />
      <input className="bg-transparent border-none focus:ring-0 text-body-sm w-48 ml-2" placeholder="Search..." type="text" />
      </div>
      </div>
      <div className="hidden md:flex items-center gap-space-lg h-full">
      <a className="h-full flex items-center px-space-xs text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors active:scale-95 duration-150" href="#" data-action-id="operations-1" onClick={(event) => { event.preventDefault(); actions?.["operations-1"]?.(); }}>Operations</a>
      <a className="h-full flex items-center px-space-xs text-primary dark:text-inverse-primary border-b-2 border-primary pb-1 hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors active:scale-95 duration-150" href="#" data-action-id="settings-2" onClick={(event) => { event.preventDefault(); actions?.["settings-2"]?.(); }}>Settings</a>
      <a className="h-full flex items-center px-space-xs text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors active:scale-95 duration-150" href="#" data-action-id="recovery-3" onClick={(event) => { event.preventDefault(); actions?.["recovery-3"]?.(); }}>Recovery</a>
      </div>
      <button className="bg-primary-container text-on-primary-container font-label-md text-label-md px-4 py-1.5 rounded flex items-center gap-2 hover:opacity-90 transition-opacity" type="button" data-action-id="create-task-1" onClick={actions?.["create-task-1"]}>
      <Plus className="text-[16px]" aria-hidden={true} focusable="false" />
                  Create Task
              </button>
      </nav>
      {/* SideNavBar (Hidden on Mobile) */}
      <aside className="hidden md:flex bg-surface-container-low dark:bg-on-background font-label-md text-label-md fixed left-0 top-0 h-full w-sidebar-width border-r border-outline-variant dark:border-outline flex-col p-space-md space-y-space-xs pt-16 z-40">
      <div className="mb-space-lg px-space-xs">
      <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-full bg-surface-dim overflow-hidden flex-shrink-0">
      <img alt="User Profile" className="w-full h-full object-cover" data-alt="A minimal, professional abstract avatar graphic with a soft blue gradient background and geometric white shapes, representing a user profile icon in a corporate software setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgBIBV4yQGymd_ph0vvZheq2Nqa6W-hVvUMvriipR3nFES1t5J7H-zQkA0hWrfUWdf2ah8Db4BfPtDZKC25yDkCE79Otd_IrUW9aHsRNVBh_syWVL0M4wXuJZhJ0jhao7ZlMrb3ivEX4z2UYdvlcpcPCuKR7yDDIqEeSeKeHTweTnSCh7nKH9Eb3pjY6T_a5Juyhnf2KHYqJu8HDCtpow8Q5r8g6gZRIejHD9b7Cqd0aB6rF5raOoxNuONsGwOlMwbFGWL2a3bJ7N9" />
      </div>
      <div>
      <div className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-inverse-on-surface truncate">Task Chip Utility</div>
      <div className="font-label-sm text-label-sm text-on-surface-variant">Utility v1.0</div>
      </div>
      </div>
      </div>
      <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-highest transition-colors duration-200 ease-in-out rounded-lg" href="#" data-action-id="operations-4" onClick={(event) => { event.preventDefault(); actions?.["operations-4"]?.(); }}>
      <ClipboardList className="text-[20px]" aria-hidden={true} focusable="false" />
      <span>Operations</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 bg-secondary-container dark:bg-on-secondary-fixed-variant text-on-secondary-container dark:text-secondary-fixed rounded-xl transition-colors duration-200 ease-in-out" href="#" data-action-id="settings-5" onClick={(event) => { event.preventDefault(); actions?.["settings-5"]?.(); }}>
      <Settings className="text-[20px]" aria-hidden={true} focusable="false" />
      <span>Settings</span>
      </a>
      <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-highest transition-colors duration-200 ease-in-out rounded-lg" href="#" data-action-id="recovery-6" onClick={(event) => { event.preventDefault(); actions?.["recovery-6"]?.(); }}>
      <History className="text-[20px]" aria-hidden={true} focusable="false" />
      <span>Recovery</span>
      </a>
      </aside>
      {/* Main Content Canvas */}
      <main className="pt-16 pb-16 md:ml-[240px] p-layout-margin md:p-space-xl flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-space-lg">
      <header className="mb-space-md">
      <h1 className="font-headline-sm text-headline-sm text-on-surface">Settings and Preferences</h1>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage your workspace configuration and data defaults.</p>
      </header>
      {/* Grid Layout for Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
      {/* Workflow Defaults */}
      <section className="bg-surface border border-outline-variant rounded-xl p-space-lg flex flex-col gap-space-md">
      <div className="flex items-center gap-2 mb-2 border-b border-surface-variant pb-2">
      <SlidersHorizontal className="text-primary text-[20px]" aria-hidden={true} focusable="false" />
      <h2 className="font-label-md text-label-md text-on-surface">Workflow Defaults</h2>
      </div>
      <div className="flex flex-col gap-1">
      <label className="font-label-sm text-label-sm text-on-surface-variant">Default Filter View</label>
      <select className="bg-surface-bright border border-outline-variant rounded h-[36px] px-3 font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface">
      <option>All Active Tasks</option>
      <option>Assigned to Me</option>
      <option>High Priority Only</option>
      </select>
      </div>
      <div className="flex flex-col gap-1 mt-2">
      <label className="font-label-sm text-label-sm text-on-surface-variant">Default Task Status</label>
      <select className="bg-surface-bright border border-outline-variant rounded h-[36px] px-3 font-body-sm text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface">
      <option>Pending</option>
      <option>In Progress</option>
      <option>Backlog</option>
      </select>
      </div>
      </section>
      {/* Interface Density */}
      <section className="bg-surface border border-outline-variant rounded-xl p-space-lg flex flex-col gap-space-md">
      <div className="flex items-center gap-2 mb-2 border-b border-surface-variant pb-2">
      <Grid3X3 className="text-primary text-[20px]" aria-hidden={true} focusable="false" />
      <h2 className="font-label-md text-label-md text-on-surface">Interface Density</h2>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant">Adjust the vertical spacing and typography density of data tables and lists.</p>
      <div className="flex gap-4 mt-2">
      <label className="flex items-center gap-2 cursor-pointer group">
      <input defaultChecked={true} className="text-primary focus:ring-primary" name="density" type="radio" />
      <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Compact</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer group">
      <input className="text-primary focus:ring-primary" name="density" type="radio" />
      <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Comfortable</span>
      </label>
      </div>
      </section>
      {/* Data Management */}
      <section className="bg-surface border border-outline-variant rounded-xl p-space-lg flex flex-col gap-space-md md:col-span-2">
      <div className="flex items-center gap-2 mb-2 border-b border-surface-variant pb-2">
      <Database className="text-primary text-[20px]" aria-hidden={true} focusable="false" />
      <h2 className="font-label-md text-label-md text-on-surface">Data Management</h2>
      </div>
      <div className="flex items-center justify-between">
      <div>
      <div className="font-body-sm text-body-sm text-on-surface font-medium">Local Cache</div>
      <div className="font-body-sm text-body-sm text-on-surface-variant">Clear cached data to resolve sync issues or free up space. (Current: 24MB)</div>
      </div>
      <button className="bg-surface-bright border border-outline-variant text-on-surface font-label-md text-label-md px-4 py-2 rounded hover:bg-surface-variant transition-colors flex items-center gap-2" type="button" data-action-id="clear-cache-2" onClick={actions?.["clear-cache-2"]}>
      <Trash2 className="text-[16px]" aria-hidden={true} focusable="false" />
                                  Clear Cache
                              </button>
      </div>
      </section>
      </div>
      {/* Action Bar */}
      <div className="flex justify-end gap-space-md mt-space-md pt-space-lg border-t border-outline-variant">
      <button className="bg-surface-bright border border-outline-variant text-on-surface font-label-md text-label-md px-5 py-2 rounded hover:bg-surface-variant transition-colors" type="button" data-action-id="reset-to-defaults-3" onClick={actions?.["reset-to-defaults-3"]}>
                          Reset to Defaults
                      </button>
      <button className="bg-primary text-on-primary font-label-md text-label-md px-5 py-2 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm" type="button" data-action-id="save-preferences-4" onClick={actions?.["save-preferences-4"]}>
                          Save Preferences
                      </button>
      </div>
      </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface-container-lowest dark:bg-on-background font-mono-sm text-mono-sm fixed bottom-0 w-full border-t border-outline-variant dark:border-outline flex justify-between items-center px-space-lg py-space-xs z-50">
      <div className="font-label-sm text-label-sm font-bold text-on-surface">Task Chip Utility © 2024</div>
      <div className="flex gap-space-lg">
      <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary underline cursor-pointer transition-opacity" href="#" data-action-id="cache-status-7" onClick={(event) => { event.preventDefault(); actions?.["cache-status-7"]?.(); }}>Cache Status</a>
      <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary underline cursor-pointer transition-opacity" href="#" data-action-id="json-export-8" onClick={(event) => { event.preventDefault(); actions?.["json-export-8"]?.(); }}>JSON Export</a>
      </div>
      </footer>
      {/* Toast Notification (Hidden by default) */}
      <div className="fixed bottom-16 right-space-lg bg-inverse-surface text-inverse-on-surface font-body-sm text-body-sm px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transform translate-y-20 opacity-0 transition-colors duration-300 z-50" id="toast">
      <CheckCircle2 className="text-green-400 text-[20px]" aria-hidden={true} focusable="false" />
              Settings saved successfully
          </div>
      
    </>
  );
}
