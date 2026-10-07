import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import Catalog from './components/Catalog';
import Reset from './components/Reset';

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <div>Hello World</div>
        },
        {
          path: "/catalog",
          element: <Catalog />
        },
        {
          path: "/reset",
          element: <Reset />
        }
      ]
    }
  ]);
  return (
    <div>
      
    </div>
  )
}

export default App
