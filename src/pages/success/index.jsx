import { Link, useLocation, useNavigate } from "react-router-dom"

const Success = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const score = location.state?.score
    const resultId = parseInt(location.state?.resultId)
    const quizId = parseInt(location.state?.quizId)

    const goToResult = () => {
        return navigate(`/quiz/${quizId}/result/${resultId}`)
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
                <div className="text-6xl mb-4 animate-bounce">🥳</div>
                <h1 className="text-2xl font-bold text-blue-600">Yeay, kamu udah selesai!</h1>
                <p className="text-lg font-semibold text-gray-700 mt-2">Score kamu: <span className="text-green-600">{score}</span></p>
                
                <p className="text-gray-500 mt-4 leading-relaxed">
                    Terima kasih udah ngerjain kuisnya.<br />
                    Semoga seru dan menambah pengetahuan.<br />
                    Sampai jumpa di kuis berikutnya!
                </p>

                <div className="mt-6 flex flex-col space-y-3">
                    <button 
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 font-semibold cursor-pointer"
                        onClick={goToResult}>
                        Lihat Hasil
                    </button>
                    <Link
                        to="/dashboard"
                        className="text-gray-500 hover:text-gray-700">
                        Kembali
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Success