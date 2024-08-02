import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/molecules';

import {
  GitAdvanced1Page,
  GitCommitPage,
  GitMergePage,
  HomePage,
} from './pages';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/git-merge',
        element: <GitMergePage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/git-commit',
        element: <GitCommitPage />,
        errorElement: <div>Unknown Error</div>,
      },
      {
        path: '/git-advanced-1',
        element: <GitAdvanced1Page />,
        errorElement: <div>Unknown Error</div>,
      },
    ],
  },
]);
