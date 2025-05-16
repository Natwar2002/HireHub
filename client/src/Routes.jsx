import { Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Auth/Auth"
import { SignupContainer } from "./component/Auth/SignupContainer"
import { SigninContainer } from "./component/Auth/SigninContainer"
import { Home } from "./pages/Home/Home"
import SiteLoader from "./component/SiteLoader/SiteLoader"
import { AdminLayout } from "./pages/AdminDashboard/AdminLayout"
import NotFound from "./pages/NotFound/NotFound"
import { HRSigninCard } from "./component/Auth/HRAuth"
import { HRRequest } from "./component/Auth/HRRequest"
import PricePage from "./pages/PricingPage/PricePage"
import QuizContestPage from "./pages/ContestPage/ContestPage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<SiteLoader/>} />
            <Route path='/auth/signup' element={<Auth><SignupContainer /></Auth>} />
            <Route path='/auth/signin' element={<Auth><SigninContainer /></Auth>} />
            <Route path='/recruiter/signin' element={<Auth><HRSigninCard /></Auth>} />
            <Route path='/recruiter/invite' element={<Auth><HRRequest /></Auth>} />
            <Route path='/home' element={<Home />} />
            <Route path='/premium' element={<PricePage />} />
            <Route path='/contests' element={<QuizContestPage />} />
            <Route path="/recruiter/dashboard" element={<AdminLayout /> } />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}