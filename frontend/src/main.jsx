import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Landing from './pages/Landing.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Landing />} />
      {/* <Route path='dashboard' element={} /> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
