import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SpeedTypeWordGame from './routes/SpeedTypeWordGame';
import SpeedTypeParagraphGame from './routes/SpeedTypeParagraphGame';
import Root from './routes/Root';
import BasicsGame from './routes/BasicsGame';
import WhackALetterGame from './routes/WhackALetterGame';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/game1/:id",
    element: <WhackALetterGame />,
  },
  {
    path: "/game3/:id",
    element: <SpeedTypeWordGame />,
  },
  {
    path: "/game4/:id",
    element: <SpeedTypeParagraphGame />,
  },
  {
    path: "/basics/:id",
    element: <BasicsGame />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
