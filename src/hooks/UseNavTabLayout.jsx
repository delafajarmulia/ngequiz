import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const useNavTabLayout = () => {
    let location = useLocation()
    location = location.pathname
    const [isDashboardActive, setIsDashboardActive] = useState(false)
    const [isLeaderboardActive, setIsLeaderboardActive] = useState(false)

    useEffect(() => {
        setIsDashboardActive(false)
        setIsLeaderboardActive(false)
        
        switch (location) {
            case '/dashboard':
                setIsDashboardActive(true)
                break;
            case '/leaderboard':
                setIsLeaderboardActive(true)
                break;
            default:
                break;
        }
    },[location])

    return {
        isDashboardActive,
        isLeaderboardActive
    }
}

export default useNavTabLayout