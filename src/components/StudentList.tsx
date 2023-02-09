import React, {Fragment, useEffect, useState} from 'react';
import {Button, Paper} from '@material-ui/core';
import IStudent from '../types/IStudent';
import {addStudentEvent} from "./StudentPage";
import {useAtom} from "simple-atom";
import {selectedStudent, webpage} from "../App";


const StudentList = () => {
    const paperStyle = {padding: '50px 20px', width: 600, margin: "20px auto"}
    const [webState, setWebState] = useAtom(webpage);
    const [students, setStudents] = useState(new Array<IStudent>());
    const [student, setStudent] = useAtom(selectedStudent)

    const getStudents = async () => {
        const getStudents = await fetch("http://localhost:8080/student/getAll");
        const students = await getStudents.json();
        setStudents(students);
    }

    useEffect(() => {
        getStudents()
    }, [])

    addStudentEvent.subscribe((value) => {
        getStudents()
    })

    const deleteStudent = async (id: number | undefined) => {
        if ((typeof (id) == "number")) {
            const deleteStudents = await fetch("http://localhost:8080/student/" + id, {
                method: 'DELETE'
            });
            getStudents();
        }

    }

    function navigateToEditStudent(student: IStudent) {
        setStudent(student);
        setWebState("edit");
    }

    function getStudentList() {
        let paper = <Paper elevation={3} style={paperStyle}>

            {students.map(student => (
                <Paper id="1" key={student.id}
                       style={{margin: "10px", padding: "15px", textAlign: "left", display: "inline-flex"}}>
                    <Paper elevation={6}>
                        Id:{student.id}<br/>
                        Name:{student.name}<br/>
                        Address:{student.address}
                    </Paper>
                    <div style={{
                        margin: "10px",
                        padding: "15px",
                        textAlign: "left",
                    }}><Button onClick={() => navigateToEditStudent(student)}>Edit</Button><Button
                        onClick={() => deleteStudent(student.id)}>Delete</Button>
                    </div>
                </Paper>
            ))
            }
        </Paper>;
        return <Fragment>
            <h1>Students</h1>
            {paper}
        </Fragment>;
    }

    return getStudentList();
}

export default StudentList;