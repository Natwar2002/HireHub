import { Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Auth/Auth"
import { SignupContainer } from "./component/Auth/SignupContainer"
import { SigninContainer } from "./component/Auth/SigninContainer"
import { Home } from "./pages/Home/Home"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/auth/signup' element={<Auth><SignupContainer /></Auth>} />
            <Route path='/auth/signin' element={<Auth><SigninContainer /></Auth>} />
            <Route path='/home' element={<Home />} />
        </Routes>
    )
}