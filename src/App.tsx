import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthenticationPage from './pages/Authentication'

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <AuthenticationPage />
  }
])

function App() {

  return (<RouterProvider router={router} />)
}

export default App
