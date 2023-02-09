import {useAtom} from "simple-atom";

import {webpage} from "../App";
import MainStudentPage from "./MainStudentPage";
import EditStudentPage from "./EditStudentPage";

const Content = () => {

    const [webState, setWebState] = useAtom(webpage);

    const getContent = () => {
        if (webState == "mainStudentPage") {
            return <MainStudentPage/>
        } else {
            return <EditStudentPage/>
        }
    }

    return getContent();

}
export default Content;