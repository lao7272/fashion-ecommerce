import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import { UserProvider } from "./context/UserProvider"
function App() {
  const router = createBrowserRouter([
    {
      path: "register",
      element: <Register/>
    },
    {
      path: "login",
      element: <Login/>
    },
    
  ])
  return (
    <>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
    </>
  )
}

export default App
