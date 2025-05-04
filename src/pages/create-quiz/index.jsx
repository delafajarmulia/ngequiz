import { BottomNavbar } from "../../components/BottomNavbar"
import { ContentLayout } from "../../components/ContentLayout"
import Navbar from "../../components/Navbar"

const CreateQuiz = () => {
    return(
        <ContentLayout>
            <Navbar />
            <p>CreateQuiz</p>
            <BottomNavbar />
        </ContentLayout>
    )
}

export default CreateQuiz