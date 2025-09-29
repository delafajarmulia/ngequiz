import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import question from '../../assets/question.png';
import testi1 from "../../assets/testi1.jpg";
import testi2 from "../../assets/testi2.jpg";
import testi3 from "../../assets/testi3.jpg";
import fitur1 from "../../assets/fitur1.png";
import fitur2 from "../../assets/fitur2.png";
import fitur3 from "../../assets/fitur3.png";

const Landing = () => {
    const navigate = useNavigate();

    // Varian untuk animasi fade-in sederhana
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    // Varian untuk animasi slide-in dari samping
    const slideInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    };

    return (
        <div className='w-full bg-white'>
            {/* Navbar*/}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 w-full h-fit bg-white shadow-2xs shadow-border py-3 mx-auto z-50"
            >
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
            </motion.div>

            {/* CTA - Animasikan teks dan gambar secara terpisah */}
            <div className='my-16 flex justify-between mx-auto w-full lg:w-3/4 px-3'>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={slideInLeft}
                    viewport={{ once: true, amount: 0.3 }}
                    className='py-24 lg:pr-12'
                >
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
                </motion.div>
                <motion.img
                    initial="hidden"
                    whileInView="visible"
                    variants={slideInRight}
                    viewport={{ once: true, amount: 0.3 }}
                    src={question}
                    alt="question"
                    loading='lazy'
                    className='hidden lg:block w-sm pl-5'
                />
            </div>

            {/* Main Features */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true, amount: 0.3 }}
                className='w-full lg:w-3/4 mt-16 px-3 grid md:grid-cols-2 lg:grid-cols-3 mx-auto gap-x-4 gap-y-2.5'
            >
                <div className='p-3 mx-auto border-1 bg-white text-primary rounded-md hover:shadow-border hover:shadow-lg text-center'>
                    <div className='text-5xl pb-3'>📒</div>
                    <h1 className='text-lg font-medium'>Quiz Pilihan Ganda</h1>
                    <p>Buat kuis dengan soal pilihan ganda. Praktis dan cocok buat semua topik.</p>
                </div>
                <div className='p-3 mx-auto border-1 bg-white text-primary rounded-md hover:shadow-border hover:shadow-lg text-center'>
                    <div className='text-5xl pb-3'>👀</div>
                    <h1 className='text-lg font-medium'>Lihat Pembuat Quiz</h1>
                    <p>Tiap kuis menampilkan nama pembuatnya, jadi kamu tahu siapa yang bikin tantangannya.</p>
                </div>
                <div className='p-3 mx-auto border-1 bg-white text-primary rounded-md hover:shadow-border hover:shadow-lg text-center'>
                    <div className='text-5xl pb-3'>🏅</div>
                    <h1 className='text-lg font-medium'>Skor Otomatis</h1>
                    <p>Habis jawab kuis, langsung muncul nilai kamu. Gak perlu tebak-tebakan.</p>
                </div>
            </motion.div>

            {/* Main Features Beda */}
            <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, amount: 0.3 }}
            className="py-12 bg-white"
        >
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
                Apa yang membuat NgeQuiz BEDA?
            </h2>

            <div className="w-full lg:w-3/4 mx-auto px-2 space-y-12">
                {/* Fitur 1 */}
                <motion.div
                    variants={fadeIn}
                    className="grid md:grid-cols-2 items-center gap-8"
                >
                    <div className="flex justify-center">
                        <div className="w-56 h-56 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                            <img src={fitur1} alt="Puzzle Soal" className="w-40 h-auto" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mb-3">
                            Puzzle soal interaktif
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Ada ribuan puzzle kuis seru yang dirancang untuk melatih
                            pemikiran kritis dan <span className="italic">skill</span> pemecahan masalah.
                        </p>
                    </div>
                </motion.div>

                {/* Fitur 2 */}
                <motion.div
                    variants={fadeIn}
                    className="grid md:grid-cols-2 items-center gap-8"
                >
                    <div className="order-2 md:order-1">
                        <h3 className="text-2xl font-semibold text-primary mb-3">
                            Sistem rating real-time
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Kemajuanmu bisa dipantau dengan rating yang selalu
                            di-update secara <span className="italic">real-time</span>.
                        </p>
                    </div>
                    <div className="flex justify-center order-1 md:order-2">
                        <div className="w-56 h-56 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                            <img src={fitur2} alt="Sistem Rating" className="w-40 h-auto" />
                        </div>
                    </div>
                </motion.div>

                {/* Fitur 3 */}
                <motion.div
                    variants={fadeIn}
                    className="grid md:grid-cols-2 items-center gap-8"
                >
                    <div className="flex justify-center">
                        <div className="w-56 h-56 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                            <img src={fitur3} alt="Leaderboard" className="w-40 h-auto" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-primary mb-3">
                            Leaderboard & kompetisi
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Bersaing dengan teman-temanmu di leaderboard dan lihat
                            siapa yang paling konsisten menjawab kuis dengan benar.
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>


            {/* Testimony */}
            <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-3/4 my-16 px-3 mx-auto mb-10"
            >
            <h1 className="text-center text-3xl text-primary mb-12 font-bold">
                Apa Kata Mereka?
            </h1>
            <div className="grid gap-8 md:grid-cols-3">
                {/* Denis */}
                <motion.div
                variants={fadeIn}
                className="bg-white rounded-2xl shadow-lg p-6 relative md:col-span-1"
                >
                <span className="absolute top-2 left-4 text-6xl text-gray-200">“</span>
                <p className="text-gray-600 relative z-10 mt-6">
                    Aku bikin kuis soal anime favoritku, dan teman-temanku langsung pada
                    semangat mainin. Seru banget liat siapa yang bener-bener ngerti jalan
                    ceritanya, dan kadang malah jadi bahan ketawaan bareng.
                </p>
                <div className="flex items-center mt-6">
                    <img
                    src={testi1}
                    className="w-12 h-12 rounded-full object-cover"
                    alt="Denis"
                    />
                    <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">Denis</h3>
                    <p className="text-sm text-gray-500">Pengguna NgeQuiz</p>
                    </div>
                </div>
                </motion.div>

                {/* Nadia */}
                <motion.div
                variants={fadeIn}
                className="bg-white rounded-2xl shadow-lg p-6 relative md:col-span-1"
                >
                <span className="absolute top-2 left-4 text-6xl text-gray-200">“</span>
                <p className="text-gray-600 relative z-10 mt-6">
                    Aku bikin kuis buat belajar bareng temen sebelum ujian. Belajarnya jadi
                    nggak ngebosenin, malah kayak main bareng!
                </p>
                <div className="flex items-center mt-6">
                    <img
                    src={testi2}
                    className="w-12 h-12 rounded-full object-cover"
                    alt="Nadia"
                    />
                    <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">Nadia</h3>
                    <p className="text-sm text-gray-500">Pengguna NgeQuiz</p>
                    </div>
                </div>
                </motion.div>

                {/* Amelia */}
                <motion.div
                variants={fadeIn}
                className="bg-white rounded-2xl shadow-lg p-6 relative md:col-span-1"
                >
                <span className="absolute top-2 left-4 text-6xl text-gray-200">“</span>
                <p className="text-gray-600 relative z-10 mt-6 italic">
                    Dari pertama buka aja langsung ngerti cara pakenya. Tampilan NgeQuiz
                    simple, enak dilihat, dan nggak bikin bingung!
                </p>
                <div className="flex items-center mt-6">
                    <img
                    src={testi3}
                    className="w-12 h-12 rounded-full object-cover"
                    alt="Amelia"
                    />
                    <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">Amelia</h3>
                    <p className="text-sm text-gray-500">Pengguna NgeQuiz</p>
                    </div>
                </div>
                </motion.div>
            </div>
            </motion.div>

            {/* Social Proof / Highlights */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true, amount: 0.3 }}
                className="w-full bg-white py-16 mt-12"
            >
                <div className="w-full lg:w-3/4 mx-auto px-2 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-12">
                        Kenapa Banyak yang Memilih Kami
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Fitur Interaktif */}
                        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8m-8 6h8m-8 6h8" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-primary">Belajar Interaktif</h2>
                            <p className="text-gray-500 mt-2">
                                Materi disajikan dalam bentuk kuis dan latihan, sehingga lebih mudah dipahami.
                            </p>
                        </div>
                        {/* Akses Fleksibel */}
                        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-primary">Bisa Kapan Saja</h2>
                            <p className="text-gray-500 mt-2">
                                Belajar tanpa batas waktu, bisa diakses dari laptop maupun smartphone.
                            </p>
                        </div>
                        {/* Dukungan AI */}
                        <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition relative overflow-hidden">
                            {/* Label Coming Soon */}
                            <span className="absolute top-2 right-[-40px] bg-yellow-400 text-white text-xs font-bold px-16 py-1 my-5 rotate-45 shadow">
                                Coming Soon
                            </span>

                            <div className="flex justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-primary">Pendamping AI</h2>
                            <p className="text-gray-500 mt-2">
                                Jika bingung, AI tutor siap menjawab pertanyaan dan memberi penjelasan singkat.
                            </p>
                        </div>

                    </div>
                </div>
            </motion.div>


            {/* CTA Closing */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeIn}
                viewport={{ once: true, amount: 0.3 }}
                className='w-full lg:w-3/4 grid lg:grid-cols-4 gap-x-5 gap-y-2 my-16 px-3 mx-auto'
            >
                <p className='col-span-3'>
                    Punya ide kuis seru atau mau tahu seberapa jago temanmu jawab soal buatanmu?
                    Yuk, mulai bikin kuismu sekarang juga di <span className='font-semibold text-primary'>NgeQuiz</span>! Biar main kuis jadi makin seru dan bisa dinikmati bareng teman-teman!
                </p>
                <button
                    className="bg-primary text-white font-medium py-2.5 px-3.5 rounded-md mt-2 cursor-pointer"
                    onClick={() => navigate('/login')}>
                    Main Sekarang!
                </button>
            </motion.div>

            {/* Footer */}
            <div className='w-full py-8 mt-16 mx-auto bg-primary'>
                <p className="text-center text-white">
                    Copyright &copy; NgeQuiz. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Landing;