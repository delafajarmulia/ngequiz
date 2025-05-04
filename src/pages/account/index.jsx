import { BottomNavbar } from "../../components/BottomNavbar"
import { ContentLayout } from "../../components/ContentLayout"
import Navbar from "../../components/Navbar"

const Account = () => {
    return(
        <ContentLayout>
            <Navbar />
            <p>account</p>
            <BottomNavbar />
        </ContentLayout>
    )
}

export default Account