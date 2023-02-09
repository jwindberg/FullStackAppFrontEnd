import React, {useState} from 'react';
import {Button, Paper} from "@material-ui/core";
import {addStudentEvent} from "./StudentPage";
import {selectedStudent, webpage} from "../App";
import {useAtom} from "simple-atom";
import IStudent from "../types/IStudent";
import TextField from "@material-ui/core/TextField";

const EditStudentPage = () => {

    const [student, setStudent] = useAtom(selectedStudent)
    const [webState, setWebState] = useAtom(webpage);
    const [studentName, setStudentName] = useState(student?.name)
    const [studentAddress, setStudentAddress] = useState(student?.address)
    addStudentEvent.subscribe((value) => {
        //@ts-ignore
        if (value !== null && value !== undefined && value.name != null)
            setStudent(value)
    })

    function navigateToMainStudentPage() {
        setStudent({} as IStudent);
        setWebState("mainStudentPage");
    }

    const updateStudent = async (student: IStudent) => {
        const addStudent = await fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        })
        if (addStudent.ok) {
            // setStudentSemaphore(null);
            navigateToMainStudentPage();
        }
    }


    function setName(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        student.name = e.target.value
        setStudentName(student.name);
    }

    function setAddress(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        student.address = e.target.value
        setStudentAddress(student.address);
    }

    const editableStudent = () => {
        const paper = <Paper elevation={6}
            // style={{margin: "10px", padding: "15px", textAlign: "left"}}
                             key={student.id}>
            <form noValidate autoComplete="off">

                <TextField id="outlined-basic" label="StudentPage Name" variant="outlined" fullWidth
                           value={studentName}
                           onChange={(e) => {
                               setName(e);
                           }}
                />
                <TextField id="outlined-basic" label="StudentPage Address" variant="outlined" fullWidth
                           value={studentAddress}
                           onChange={(e) => {
                               setAddress(e);
                           }}
                />
                <Button onClick={() => navigateToMainStudentPage()}>Cancel</Button>
                <Button onClick={() => updateStudent(student)}>Save</Button>
            </form>


        </Paper>;
        return paper;
    }

    return editableStudent()
}
export default EditStudentPage;