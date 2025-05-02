import { ContentLayout } from "../../components/ContentLayout"
import Hello from "../../components/Hello"
import { TabLayout } from "../../components/TabLayout"

const MyQuiz = () => {
    return(
        <ContentLayout>
            <Hello />
            <TabLayout />
            <p className="mt-5 font-semibold">Yang udah coba kuis kamu</p>
            <select 
                name="" 
                id=""
                className="w-full mt-2 p-2 border-2 border-border focus:border-border focus:outline-none rounded-md"
            >
                    <option value="">Test 1</option>
                    <option value="">Test 2</option>
                    <option value="">Test 3</option>
                    <option value="">Test 4</option>
                    <option value="">Test 5</option>
            </select>
            <div className="mt-5 mb-16">
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
                <div className="w-full bg-white rounded-lg p-5 pb-6.5 text-black border-2 border-border font-semibold my-2 cursor-pointer hover:opacity-85">
                    <h2 className="text-lg">Pengetahuan Umum</h2>
                    <p className="text-xs">Score: 80</p>
                    <p className="text-xs">Waktu Penyelesaian: 02/02/2025 12:00:00</p>
                </div>
            </div>
        </ContentLayout>
    )
}

export default MyQuiz