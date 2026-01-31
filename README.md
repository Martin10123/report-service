# Reporte de servicios

React + TypeScript + Vite + Supabase.

## Estructura del proyecto (`src/`)

```
src/
├── components/     # Componentes reutilizables
│   ├── ui/         # Componentes base (ej. shadcn/ui)
│   └── layout/     # Header, Sidebar, layouts
├── features/       # Módulos por funcionalidad (componentes + lógica por feature)
├── pages/          # Vistas/páginas (una por ruta)
├── hooks/          # Custom hooks (useAuth, useLocalStorage, etc.)
├── services/       # Servicios externos
│   └── supabase/   # Cliente y helpers de Supabase
├── types/          # Tipos TypeScript (database.types desde Supabase)
├── stores/         # Estado global (Zustand)
├── constants/      # Constantes y rutas
├── config/         # Configuración de la app
├── lib/            # Utilidades (cn, etc.)
├── images/         # Assets estáticos
├── App.tsx
├── main.tsx
└── index.css
```

## Supabase

1. Copia `.env.example` a `.env`.
2. En [Supabase Dashboard](https://app.supabase.com) → tu proyecto → **Settings** → **API** copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`
3. Para generar tipos de la DB: `npx supabase gen types typescript --project-id TU_PROJECT_ID > src/types/database.types.ts`

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
