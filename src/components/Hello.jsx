import hello from '../assets/hello.svg'

const Hello = ({name}) => {
    return(
        <div className="my-3 flex gap-3 items-center">
            <img 
                src={hello} 
                alt="hello"
                className="w-12"    
            />
            <h1 className="font-bold md:text-md">
                Hallo {name}! Mau NgeQuiz apa hari ini?
            </h1>
        </div>
    )
}

export default Hello