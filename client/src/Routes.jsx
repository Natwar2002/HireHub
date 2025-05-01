import { Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Auth/Auth"
import { SignupContainer } from "./component/Auth/SignupContainer"
import { SigninContainer } from "./component/Auth/SigninContainer"
import { Home } from "./pages/Home/Home"
import SiteLoader from "./component/siteLoader/SiteLoader"
import { AdminSigninCard } from "./component/Auth/AdminAuth"
import { AdminRequest } from "./component/Auth/AdminRequest"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<SiteLoader/>} />
            <Route path='/auth/signup' element={<Auth><SignupContainer /></Auth>} />
            <Route path='/auth/signin' element={<Auth><SigninContainer /></Auth>} />
            <Route path='/admin/signin' element={<Auth><AdminSigninCard /></Auth>} />
            <Route path='/admin/invite' element={<Auth><AdminRequest /></Auth>} />
            <Route path='/home' element={<Home />} />
        </Routes>
    )
}