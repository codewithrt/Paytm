import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Dashboard from "./components/Dashboard"

function App() {

  return (
    <>
    <div className="bg-[#7f7f7f] h-screen ">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          {/* <Route path="send" element={<SendMoney/>}/> */}
        </Routes >
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
