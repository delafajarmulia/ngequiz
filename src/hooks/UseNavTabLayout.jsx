import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const useNavTabLayout = () => {
    let location = useLocation()
    location = location.pathname
    const [isDashboardActive, setIsDashboardActive] = useState(false)
    const [isMyQuizActive, setIsMyQuizActive] = useState(false)

    useEffect(() => {
        setIsDashboardActive(false)
        setIsMyQuizActive(false)
        
        switch (location) {
            case '/dashboard':
                setIsDashboardActive(true)
                break;
            case '/my-quiz':
                setIsMyQuizActive(true)
                break;
            default:
                break;
        }
    },[location])

    return {
        isDashboardActive,
        isMyQuizActive
    }
}

export default useNavTabLayout