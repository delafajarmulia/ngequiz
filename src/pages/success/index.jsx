import { useLocation, useNavigate } from "react-router-dom"

const Success = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const score = location.state?.score

    const back = () => {
        return navigate('/dashboard')
    }

    return(
        <div className="w-full lg:w-1/3 h-screen flex flex-col justify-center items-center">
            <div>
                <h1 className="text-7xl">🥳</h1> 
            </div>
            <div className="text-center text-black font-bold text-xl my-3">
                <h1>Yeay, kamu udah selesai!</h1>
                <p className="pt-1 font-medium text-base">Score kamu: {score}</p>
            </div>
            <div className="text-center">
                <p>Terima kasih udah ngerjain kuisnya.</p>
                <p>Semoga seru dan menambah pengetahuan.</p>
                <p>Sampai jumpa dikuis berikutnya!</p>
            </div>
            <div className="mt-5">
                <button 
                    onClick={() => back()}
                    className="text-white bg-primary font-semibold rounded-md py-2.5 px-7 hover:cursor-pointer"
                >
                    Kembali
                </button>
            </div>
        </div>
    )
}

export default Success