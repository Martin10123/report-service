/**
 * Tipos generados desde Supabase (Dashboard > Project Settings > API > Generate Types)
 * Ejecuta: npx supabase gen types typescript --project-id TU_PROJECT_ID > src/types/database.types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Añade aquí las tablas cuando generes los tipos desde Supabase
      // [key: string]: { Row: {}; Insert: {}; Update: {} };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
