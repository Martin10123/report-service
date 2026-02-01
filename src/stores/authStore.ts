import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuth: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  initAuth: () => () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  setAuth: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session?.user,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  initAuth: () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      get().setAuth(newSession);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      get().setAuth(session);
      get().setLoading(false);
    });

    return () => subscription.unsubscribe();
  },
}));

/** Hook: { user, session, isLoading, isAuthenticated }. useShallow evita bucle infinito al devolver objeto estable. */
export function useAuth() {
  return useAuthStore(
    useShallow((state) => ({
      user: state.user,
      session: state.session,
      isLoading: state.isLoading,
      isAuthenticated: state.isAuthenticated,
    }))
  );
}
