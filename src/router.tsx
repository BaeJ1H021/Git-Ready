import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/molecules';

import { GitCommitPage, GitMergePage, HomePage, QuizPage } from './pages';

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
    ],
  },
]);
