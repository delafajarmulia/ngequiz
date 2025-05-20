import { useNavigate } from 'react-router-dom'
import question from '../../assets/question.png'

const Landing = () => {
    const navigate = useNavigate()

    return(
        <div className='w-full bg-white'>
            {/* Navbar */}
            <div className="fixed top-0 w-full h-fit bg-white shadow-2xs shadow-border py-3 mx-auto">
                <div className='w-full lg:w-3/4 flex justify-between mx-auto px-3'>
                    <div className="flex font-medium text-3xl">
                        <h1>Nge</h1>
                        <h1 className="bg-primary text-white px-1.5 pt-0.5 pb-1 font-bold rounded-md">Q</h1>
                        <h1>uiz</h1>
                    </div>
                    <button 
                        className="bg-primary text-white font-medium py-1.5 px-3.5 rounded-md mt-2 cursor-pointer"
                        onClick={() => navigate('/login')}>
                        Ayo Main!
                    </button>
                </div>
            </div>

            {/* CTA */}
            <div className='my-16 flex justify-between mx-auto w-full lg:w-3/4 px-3'>
                <div className='py-24 lg:pr-12'>
                    <div className='text-3xl font-semibold text-primary'>
                        <h1>Bikin & Main Quiz</h1>
                        <h1>Seru Bareng Teman!</h1>
                    </div>
                    <div className='my-7'>
                        <p>
                            Di <span className='text-primary font-medium'>NgeQuiz</span>, kamu bisa bikin kuis pilihan ganda sendiri dengan mudah, terus ajak teman-teman buat jawab bareng. 
                            Cocok banget buat belajar seru bareng teman atau sekadar adu pengetahuan buat seru-seruan!
                        </p>
                    </div>
                    <button 
                        className="bg-primary text-white font-medium py-2.5 px-3.5 rounded-md mt-2 cursor-pointer"
                        onClick={() => navigate('/login')}>
                        Main Sekarang!
                    </button>
                </div>
                <img 
                    src={question} 
                    alt="question" 
                    className='hidden lg:block w-sm pl-5'
                />
            </div>

            {/* Main Features */}
            <div className='w-full lg:w-3/4 mt-16 px-3 grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-x-4 gap-y-2.5'>
                <div className='p-3 mx-auto border-1 bg-white text-primary rounded-md hover:shadow-border hover:shadow-lg text-center'>
                    <div className='text-5xl pb-3'>
                        📒
                    </div>
                    <h1 className='text-lg font-medium'>Quiz Pilihan Ganda</h1>
                    <p>Buat kuis dengan soal pilihan ganda. Praktis dan cocok buat semua topik.</p>
                </div>
                <div className='p-3 mx-auto border-1 bg-white text-primary rounded-md hover:shadow-border hover:shadow-lg text-center'>
                    <div className='text-5xl pb-3'>
                        👀
                    </div>
                    <h1 className='text-lg font-medium'>Lihat Pembuat Quiz</h1>
                    <p>Tiap kuis menampilkan nama pembuatnya, jadi kamu tahu siapa yang bikin tantangannya.</p>
                </div>
                <div className='p-3 mx-auto border-1 bg-white text-primary rounded-md hover:shadow-border hover:shadow-lg text-center'>
                    <div className='text-5xl pb-3'>
                        🏅
                    </div>
                    <h1 className='text-lg font-medium'>Skor Otomatis</h1>
                    <p>Habis jawab kuis, langsung muncul nilai kamu. Gak perlu tebak-tebakan.</p>
                </div>
            </div>

            {/* Testimony */}
            <div className='w-full lg:w-3/4 my-16 px-3 mx-auto'>
                <h1 className='text-center font-semibold text-2xl text-primary mb-5'>Apa Kata Mereka?</h1>
                <div className='border-b-2 border-border text-primary px-5 py-3'>
                    <p>
                        Aku bikin kuis soal anime favoritku, dan teman-temanku langsung pada semangat mainin. 
                        Seru banget liat siapa yang bener-bener ngerti jalan ceritanya, dan kadang malah jadi bahan ketawaan bareng karena jawabannya nyeleneh!
                    </p>
                    <p className='text-end font-semibold'>— Denis, pengguna NgeQuiz</p>
                </div>
                <div className='border-b-2 border-border text-primary px-5 py-3'>
                    <p>
                        Aku bikin kuis buat belajar bareng temen-temen sebelum ujian, jadi lebih gampang nginget materinya. Belajarnya jadi nggak ngebosenin, malah kayak main bareng!
                    </p>
                    <p className='text-end font-semibold'>— Nadia, pengguna NgeQuiz</p>
                </div>
                <div className='border-b-2 border-border text-primary px-5 py-3'>
                    <p>
                        NgeQuiz ngebantu banget waktu aku jadi tutor sebaya. Tinggal bikin kuis dari materi pelajaran, terus langsung bisa latihan bareng temen-temen. Belajar jadi lebih santai tapi tetep masuk!
                    </p>
                    <p className='text-end font-semibold'>— Fajar, pengguna NgeQuiz</p>
                </div>
                <div className='border-b-2 border-border text-primary px-5 py-3'>
                    <p>
                        Dari pertama buka aja udah langsung ngerti cara pakenya. Tampilan NgeQuiz simple, enak dilihat, dan nggak bikin bingung — cocok banget buat semua orang!
                    </p>
                    <p className='text-end font-semibold'>— Amelia, pengguna NgeQuiz</p>
                </div>
            </div>

            {/* CTA Closing */}
            <div className='w-full lg:w-3/4 grid lg:grid-cols-4 gap-x-5 gap-y-2 my-16 px-3 mx-auto'>
                <p className='col-span-3'>
                    Punya ide kuis seru atau mau tahu seberapa jago temanmu jawab soal buatanmu? 
                    Yuk, mulai bikin kuismu sekarang juga di <span className='font-semibold text-primary'>NgeQuiz</span>! Biar main kuis jadi makin seru dan bisa dinikmati bareng teman-teman!
                </p>
                <button 
                    className="bg-primary text-white font-medium py-2.5 px-3.5 rounded-md mt-2 cursor-pointer"
                    onClick={() => navigate('/login')}>
                    Main Sekarang!
                </button>
            </div>

            {/* Footer */}
            <div className='w-full py-8 mt-16 mx-auto bg-primary'>
                <p className="text-center text-white ">
                    Copyright &copy; NgeQuiz. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Landing