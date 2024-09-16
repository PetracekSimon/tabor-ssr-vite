import create from 'zustand';
import { persist } from 'zustand/middleware';

interface LoggedUser {
  email: string;
  role: string;
  verified: boolean;
}

interface AppState {
  token: string;
  loggedUser: LoggedUser | null;
  loading: boolean;
  error: string | null;
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
      setToken: (token: string) => set({ token }),
      setLoggedUser: (user: LoggedUser | null) => set({ loggedUser: user }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      logout: () => set({ token: '', loggedUser: null }),
    }),
    {
      name: 'app-storage',
      getStorage: () => sessionStorage,
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