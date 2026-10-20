import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/base.css';
import App from './App.tsx';
import { applySavedWallpaper } from './lib/wallpaper';

applySavedWallpaper();

// /?preview shows the component preview page. It only exists in development builds.
const ComponentPreview = import.meta.env.DEV
  ? lazy(() => import('./dev/ComponentPreview/ComponentPreview.tsx'))
  : null;
const showPreview = ComponentPreview && new URLSearchParams(location.search).has('preview');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {showPreview && ComponentPreview ? (
      <Suspense fallback={null}>
        <ComponentPreview />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
