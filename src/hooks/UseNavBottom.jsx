import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const useNavBottom = () => {
    let location = useLocation()
    location = location.pathname

    const [isDashboardActive, setIsDashboardActive] = useState(false)
    const [isQuizDoneActive, setIsQuizDoneActive] = useState(false)
    const [isCreateQuizActive, setIsCreateQuizActive] = useState(false)
    const [isMyQuizSettingActive, setIsMyQuizSettingActive] = useState(false)
    const [isAccountActive, setIsAccountActive] = useState(false)

    useEffect(() => {
        setIsDashboardActive(false)
        setIsQuizDoneActive(false)
        setIsCreateQuizActive(false)
        setIsMyQuizSettingActive(false)
        setIsAccountActive(false)

        switch (location) {
            case '/dashboard':
                setIsDashboardActive(true)
                break;
            case '/my-quiz':
                setIsDashboardActive(true)
                break;
            case '/quiz-done':
                setIsQuizDoneActive(true)
                break;
            case '/create-quiz':
                setIsCreateQuizActive(true)
                break;
            case '/my-quiz-setting':
                setIsMyQuizSettingActive(true)
                break;
            case '/account':
                setIsAccountActive(true)
                break;
            default:
                break;
        }
    }, [location])

    return {
        isDashboardActive,
        isQuizDoneActive,
        isCreateQuizActive,
        isMyQuizSettingActive, 
        isAccountActive
    }
}

export default useNavBottom