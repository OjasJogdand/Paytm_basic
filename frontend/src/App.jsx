import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Signin from "./pages/signin.jsx";
import Send from "./pages/send.jsx";
function App() {

  return (
    <div className="w-screen min-h-screen">
     <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/send" element={<Send/>}></Route>
     </Routes>
    </div>
  )
}

export default App
