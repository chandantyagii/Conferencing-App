import {BrowserRouter ,Routes , Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Home from "./pages/Home";
import MeetRoom from "./pages/MeetRoom";
import ProtectedRoutes from "./services/ProtectedRoutes";
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* neeche wale route tabhi chalege ager token existhai ager nhi hai to login aaeyga sirf */}


      <Route  path="/login" element={ <Login/> }  />

      <Route path="/register" element={<Register/> } />

      <Route path="/" element={<ProtectedRoutes/> }  >
       <Route path="/"  element={<Home/>} />
        <Route path="/meet/:roomName" element={<MeetRoom />} />
      </Route>


    </Routes>
    </BrowserRouter>

      </>
  )
}

export default App
