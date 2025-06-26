import { Route, Routes } from "react-router-dom"
import { Auth } from "./pages/Auth/Auth"
import { SignupContainer } from "./component/Auth/SignupContainer"
import { SigninContainer } from "./component/Auth/SigninContainer"
import { Home } from "./pages/Home/Home"
import SiteLoader from "./component/SiteLoader/SiteLoader"
import { AdminLayout } from "./pages/AdminDashboard/AdminLayout"
import NotFound from "./pages/NotFound/NotFound"
import QuizContestPage from "./pages/ContestPage/ContestPage"
import PricePage from "./pages/PricingPage/PricePage"
import { RecruiterSigninCard } from "./component/Auth/RecruiterSignIn"
import { RecruiterSignUpCard } from "./component/Auth/RecruiterSignUpCard"
import QuizInstructionsPage from "./pages/ContestPage/QuizInstructionsPage"
import QuizPage from "./pages/ContestPage/QuizPage"
import MainLayout from "./component/Layouting/Layout"
import JobsPage from "./pages/JobsPage/JobsPage"
import { AppliedJobs } from "./pages/AppliedJobs/AppliedJobs"
import ManageJobPosts from "./component/PostedJobs/PostedJobs"
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard/AdminDashboard"
import { ProtectedRoute } from "./component/ProtectedRoute/ProtectedRoute"


export const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<SiteLoader />} />
        <Route path='/auth/signup' element={<Auth><SignupContainer /></Auth>} />
        <Route path='/auth/signin' element={<Auth><SigninContainer /></Auth>} />
        <Route path='/recruiter/signin' element={<Auth><RecruiterSigninCard /></Auth>} />
        <Route path='/recruiter/signup' element={<Auth><RecruiterSignUpCard /></Auth>} />

        <Route element={<ProtectedRoute allowedRoles={["User"]} />}>
          <Route path='/' element={<MainLayout />}>
            <Route path='home' element={<Home />} />
            <Route path='premium' element={<PricePage />} />
            <Route path='contests' element={<QuizContestPage />} />
            <Route path='contests/start' element={<QuizInstructionsPage />} />
            <Route path='contests/quiz' element={<QuizPage />} />
            <Route path='jobs' element={<JobsPage />} />
            <Route path='applied-jobs' element={<AppliedJobs />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["HR"]} />}>
          <Route path='/recruiter' element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path='postedJobs' element={<ManageJobPosts />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}