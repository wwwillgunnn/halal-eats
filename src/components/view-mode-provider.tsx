"use client";

import { createContext, useContext, useMemo, useState } from "react";

type ViewMode = "map" | "list";

type ViewModeContextType = {
  view: ViewMode;
  setView: (view: ViewMode) => void;
};

const ViewModeContext = createContext<ViewModeContextType | undefined>(
  undefined,
);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewMode>("map");

  const value = useMemo(() => ({ view, setView }), [view]);

  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);

  if (!context) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }

  return context;
}

// TODO: switch to URL syncing
