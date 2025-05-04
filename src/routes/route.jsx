import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "../pages/landing"
import Login from "../pages/login"
import Registrasi from "../pages/registrasi"
import Dashboard from "../pages/dashboard"
import MyQuiz from "../pages/dashboard/MyQuiz"
import { AuthProvider } from "../hooks/AuthContext"
import QuizDone from "../pages/quiz-done"
import MyQuizSetting from "../pages/my-quiz-setting"
import Account from "../pages/account"
import CreateQuiz from "../pages/create-quiz"

const Router = () => {
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Landing />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registrasi" element={<Registrasi />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-quiz" element={<MyQuiz />} />
                    <Route path="/quiz-done" element={<QuizDone />} />
                    <Route path="/create-quiz" element={<CreateQuiz />} />
                    <Route path="/my-quiz-setting" element={<MyQuizSetting />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Router