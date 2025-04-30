import question from '../../assets/question.jpeg'

const Landing = () => {
    return(
        <div>
            {/* Navbar */}
            <div className="w-full h-fit bg-white border-b-2">
                <div className="w-5xl mx-auto pt-3 pb-4 flex justify-between">
                    <div className="flex">
                        <h1 className="font-bold text-3xl text-black">NgeQuiz</h1>
                        <div className="text-black pl-5 pt-2.5 grid grid-cols-3 gap-2 font-medium text-base">
                            <a href="">Home</a>
                            <a href="">About</a>
                            <a href="">Contact</a>
                        </div>
                    </div>
                    <div>
                        <button className="bg-primary text-white font-medium py-1.5 px-2.5 rounded-md mt-2 cursor-pointer">
                            Let's Play
                        </button>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="w-5xl mx-auto h-dvh flex items-center justify-between">
                <div className="">
                    <h1 className="font-bold text-4xl text-black">Play, Create, and Dominate</h1>
                    <h1 className="font-bold text-4xl text-black">Only on NgeQuiz</h1>
                    <h3 className="pt-3 text-md">Join the quiz community where everyone’s a player and a creator.</h3>
                    <h3 className='text-md'>Discover endless quizzes or build your own in just minutes.</h3>
                    <button className="bg-primary text-white font-medium text-lg py-2 px-3 rounded-md mt-2 cursor-pointer">
                        Let's Play
                    </button>
                </div>
                <div>
                    <img 
                        src={question} 
                        alt="Question" 
                        className='w-96'
                    />
                </div>
            </div>
        </div>
    )
}

export default Landing