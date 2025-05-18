import { Link } from "react-router-dom"
import useNavTabLayout from "../hooks/UseNavTabLayout"

export const TabLayout = () => {
    const {isDashboardActive, isLeaderboardActive} = useNavTabLayout()
    return(
        <div className="w-full mx-auto bg-primary opacity-60 rounded-md p-3">
            <div className="grid grid-cols-2 text-white gap-5 text-center font-semibold">
                {isDashboardActive ? (
                    <div className="bg-white text-primary py-1.5 rounded-md opacity-100">
                        <button>
                            <Link to={'/dashboard'}>Main Kuis</Link>
                        </button>
                    </div>
                ) : (
                    <div className="bg-primary py-1.5 rounded-md opacity-100">
                        <button>
                            <Link to={'/dashboard'}>Main Kuis</Link>
                        </button>
                    </div>
                )}
                {isLeaderboardActive ? (
                    <div className="bg-white text-primary py-1.5 rounded-md opacity-100">
                        <button>
                            <Link to={'/leaderboard'}>Peringkat</Link>
                        </button>
                    </div>
                ) : (
                    <div className="bg-primary py-1.5 rounded-md opacity-100">
                        <button>
                            <Link to={'/leaderboard'}>Peringkat</Link>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}