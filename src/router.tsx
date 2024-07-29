import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/molecules';

import { HomePage, QuizPage } from './pages';

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
        path: '/quiz',
        element: <QuizPage />,
        errorElement: <div>Unknown Error</div>,
      },
    ],
  },
]);
