import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from '../containers/Login/Login';
// import { Register } from '../containers/Register/Register';
import { FlagsPage } from "../containers/FlagsPage/FlagsPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FlagsPage />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}