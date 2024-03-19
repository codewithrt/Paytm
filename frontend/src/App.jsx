import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./components/Signup"
import Signin from "./components/Signin"

function App() {

  return (
    <>
    <div className="bg-[#7f7f7f] h-screen flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          {/* <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="send" element={<SendMoney/>}/> */}
        </Routes >
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
