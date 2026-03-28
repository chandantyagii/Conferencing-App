import {BrowserRouter ,Routes , Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Home from "./pages/Home";
import ProtectedRoutes from "./services/ProtectedRoutes";
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path="/login" element={ <Login/> }  />
      <Route path="/register" element={<Register/> } />


      <Route path="/" element={<ProtectedRoutes/> }  >
      <Route path="/"  element={<Home/>} />
      </Route>


    </Routes>
    </BrowserRouter>

      </>
  )
}

export default App
