import { BottomNavbar } from "../../components/BottomNavbar"
import { ContentLayout } from "../../components/ContentLayout"
import Navbar from "../../components/Navbar"

const QuizDone = () => {
    return(
        <ContentLayout>
            <Navbar />
            <p>QuizDone</p>
            <BottomNavbar />
        </ContentLayout>
    )
}

export default QuizDone