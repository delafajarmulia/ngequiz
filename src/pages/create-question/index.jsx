import { useAuth } from "../../hooks/AuthContext"

const CreateQuestion = () => {
    const {url, token} = useAuth()


    return(
        <div className="min-h-screen flex flex-col text-black">
            <div className="w-full lg:w-1/3 mx-auto my-2 px-5">
                <p>test</p>
            </div>
        </div>
    )
}

export default CreateQuestion