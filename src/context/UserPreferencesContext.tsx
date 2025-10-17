import { createContext, useContext, useEffect, useState } from "react";

interface PreferencesContextType {
  page: number;
  itemsPerPage: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search: string;
  favorites: number[];
  setPage: (p: number) => void;
  setItemsPerPage: (n: number) => void;
  setSortBy: (s: string) => void;
  setSortOrder: (s: "asc" | "desc") => void;
  setSearch: (s: string) => void;
  toggleFavorite: (id: number) => void;
  resetPreferences: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

const DEFAULT_STATE = {
  page: 1,
  itemsPerPage: 10,
  sortBy: "firstName",
  sortOrder: "asc" as "asc" | "desc",
  search: "",
  favorites: [] as number[],
};

const STORAGE_KEY = "userPreferences";

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx)
    throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
};

const getInitialState = (): typeof DEFAULT_STATE => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<typeof DEFAULT_STATE>;
      return { ...DEFAULT_STATE, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load preferences from localStorage:", e);
  }
  return DEFAULT_STATE;
};

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(getInitialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever state changes

  useEffect(() => {
    if (isHydrated) {
      try {
        const { search, ...stateToPersist } = state;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
      } catch (e) {
        console.error("Failed to save preferences to localStorage:", e);
      }
    }
  }, [state, isHydrated]);

  const value: PreferencesContextType = {
    ...state,
    setPage: (p) => setState((s) => ({ ...s, page: p })),
    setItemsPerPage: (n) =>
      setState((s) => ({ ...s, itemsPerPage: n, page: 1 })),
    setSortBy: (s) => setState((st) => ({ ...st, sortBy: s })),
    setSortOrder: (s) => setState((st) => ({ ...st, sortOrder: s })),
    setSearch: (s) => setState((st) => ({ ...st, search: s, page: 1 })),
    toggleFavorite: (id) =>
      setState((s) => ({
        ...s,
        favorites: s.favorites.includes(id)
          ? s.favorites.filter((fid) => fid !== id)
          : [...s.favorites, id],
      })),
    resetPreferences: () =>
      setState({
        page: 1,
        itemsPerPage: 10,
        sortBy: "firstName",
        sortOrder: "asc",
        search: "",
        favorites: state.favorites,
      }),
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};
