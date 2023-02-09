import './App.css';
import {Fragment} from "react";
import {createAtom} from "simple-atom";
import Content from "./components/Content";
import IStudent from "./types/IStudent";

export const webpage = createAtom<string>("mainStudentPage")
export const selectedStudent = createAtom<IStudent>({} as IStudent)

function App() {

    const landing = <Fragment>
        <Content/>
    </Fragment>;
    return landing;
}

export default App;

