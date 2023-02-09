import React, {useState} from 'react';
import {Paper} from "@material-ui/core";
import {addStudentEvent} from "./StudentPage";
import IStudent from "../types/IStudent";

const EditStudent = () => {

    const [student, setStudent] = useState({} as IStudent)
    addStudentEvent.subscribe((value) => {
        //@ts-ignore
        if (value !== null && value !== undefined && value.name != null)
            setStudent(value)
    })


    const editableStudent = () => {
        const paper = <Paper elevation={6}
            // style={{margin: "10px", padding: "15px", textAlign: "left"}}
                             key={student.id}>
            Id:{student.id}<br/>
            Name:{student.name}<br/>
            Address:{student.address}
        </Paper>;
        return paper;
    }

    return editableStudent()
}
export default EditStudent;