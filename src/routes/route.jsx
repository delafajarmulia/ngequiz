import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "../pages/landing"
import Login from "../pages/login"
import Registrasi from "../pages/registrasi"
import Dashboard from "../pages/dashboard"
import { AuthProvider } from "../hooks/AuthContext"
import QuizDone from "../pages/quiz-done"
import MyQuizSetting from "../pages/my-quiz-setting"
import Account from "../pages/account"
import CreateQuiz from "../pages/create-quiz"
import CreateQuestion from "../pages/create-question"
import PlayQuiz from "../pages/play-quiz"
import Success from "../pages/success"
import Leaderboard from "../pages/dashboard/Leaderboard"
import QuizResult from "../pages/quiz-result"
import QuizDetail from "../pages/quiz-detail"

const Router = () => {
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Landing />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registrasi" element={<Registrasi />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/play-quiz/:quizId/question" element={<PlayQuiz />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/quiz-done" element={<QuizDone />} />
                    <Route path="/create-quiz" element={<CreateQuiz />} />
                    <Route path="/create-question/:questionNumber" element={<CreateQuestion />} />
                    <Route path="/my-quiz-setting" element={<MyQuizSetting />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/quiz-result/:quizId" element={<QuizResult />} />
                    <Route path="/quiz-detail/:quizId" element={<QuizDetail />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Router