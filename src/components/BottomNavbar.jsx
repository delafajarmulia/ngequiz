import { Link } from "react-router-dom"
import useNavBottom from "../hooks/UseNavBottom"

export const BottomNavbar = () => {
    const {isDashboardActive, isQuizDoneActive, isCreateQuizActive, isMyQuizSettingActive, isAccountActive} = useNavBottom()

    return(
        <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 ">
            <div className="grid w-full lg:w-1/3 h-full grid-cols-5 mx-auto"> 
                <button data-tooltip-target="tooltip-home" type="button" className="cursor-pointer inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group">
                    <Link to={'/dashboard'}>
                        <svg 
                            className={`${isDashboardActive ? "text-primary" : "text-black"} w-6 h-6 mb-1 text-black group-hover:text-primary`} 
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className="sr-only">Home</span>
                    </Link>
                </button>
                <button data-tooltip-target="tooltip-bookmark" type="button" className="cursor-pointer inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group">
                    <Link to={'/quiz-done'}>
                        <svg 
                            className={`${isQuizDoneActive ? "text-primary" : "text-black"} w-6 h-6 mb-1 text-black group-hover:text-primary`}  
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                        </svg>
                        <span className="sr-only">Quiz Done</span>
                    </Link>
                </button>
                <button data-tooltip-target="tooltip-post" type="button" className="cursor-pointer inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group">
                    <Link to={'/create-quiz'}>
                        <svg 
                            className={`${isCreateQuizActive ? "text-primary" : "text-black"} w-6 h-6 mb-1 text-black group-hover:text-primary`}  
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="sr-only">Create Quiz</span>
                    </Link>
                </button>
                <button data-tooltip-target="tooltip-search" type="button" className="cursor-pointer inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group">
                    <Link to={'/my-quiz-setting'}>
                        <svg 
                            className={`${isMyQuizSettingActive ? "text-primary" : "text-black"} w-6 h-6 mb-1 text-black group-hover:text-primary`} 
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <span className="sr-only">My Quiz Setting</span>
                    </Link>
                </button>
                <button data-tooltip-target="tooltip-settings" type="button" className="cursor-pointer inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 group">
                    <Link to={'/account'}>
                        <svg 
                            className={`${isAccountActive ? "text-primary" : "text-black"} w-6 h-6 mb-1 text-black group-hover:text-primary`} 
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <span className="sr-only">Account</span>
                    </Link>
                </button>
            </div>
        </div>


    )
}