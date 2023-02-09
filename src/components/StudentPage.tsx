import React from 'react';
import {Container} from '@material-ui/core';
import AddStudentForm from "./AddStudentForm";
import StudentList from "./StudentList";
import {createAtom} from "simple-atom";
import IStudent from "../types/IStudent";

export const addStudentEvent = createAtom(null);

export const selectedStudentEvent = createAtom<IStudent>({} as IStudent);
const StudentPage = () => {
    function getContainer() {
        return (
            <Container>
                <AddStudentForm/>
                <StudentList/>
            </Container>
        );
    }

    return getContainer();

}
export default StudentPage;
