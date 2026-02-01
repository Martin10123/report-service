export { supabase } from './client';
export {
  signInWithPassword,
  signUp,
  signInWithGoogle,
  signOut,
  getSession,
  AUTH_RETURN_TO_KEY,
} from './auth';
export type { AuthError } from './auth';
