import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'SuperAdmin' | 'Admin' | 'User';
interface LoggedUser {
  email: string;
  role: UserRole;
  verified: boolean;
}

interface AppState {
  token: string;
  loggedUser: LoggedUser | null;
  loading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  setToken: (token: string) => void;
  setLoggedUser: (user: LoggedUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      token: '',
      loggedUser: null,
      loading: false,
      error: null,
      theme: "dark",
      // Funkce pro nastavení tokenu
      setToken: (token: string) => set({ token }),
      setLoggedUser: (user: LoggedUser | null) => set({ loggedUser: user }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      logout: () => set({ token: '', loggedUser: null }),
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
    }),
    {
      name: 'app-storage',
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);

// Funkce pro načtení tokenu při inicializaci aplikace
export const initializeAuth = () => {
  const storedState = JSON.parse(sessionStorage.getItem('app-storage') || '{}');
  if (storedState.state && storedState.state.token) {
    useAppStore.getState().setToken(storedState.state.token);
  }
};