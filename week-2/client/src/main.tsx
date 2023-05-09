import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/root.tsx';
import ErrorPage from './error-page.tsx';
import Team from './routes/team.tsx';
import Player from './routes/player.tsx';
import Index from './routes/index.tsx';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'teams/:teamId',
        element: <Team />,
        children: [
          {
            path: 'player/:playerId',
            element: <Player />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
