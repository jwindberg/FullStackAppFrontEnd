import React from 'react';
import {Container} from '@material-ui/core';
import AddStudentForm from "./AddStudentForm";
import StudentList from "./StudentList";
import {createAtom} from "simple-atom";

export const addStudentEvent = createAtom(null);
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
