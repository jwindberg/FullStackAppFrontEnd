import React, {Fragment, useEffect, useState} from 'react';
import {Button, Paper} from '@material-ui/core';
import IStudent from '../types/IStudent';
import {addStudentEvent} from "./StudentPage";

const StudentList = () => {
    const paperStyle = {padding: '50px 20px', width: 600, margin: "20px auto"}
    const [students, setStudents] = useState(new Array<IStudent>());

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

    function getStudentList() {
        let paper = <Paper elevation={3} style={paperStyle}>

            {students.map(student => (
                <Paper id="1" style={{margin: "10px", padding: "15px", textAlign: "left", display: "inline-flex"}}>
                    <Paper elevation={6}
                        // style={{margin: "10px", padding: "15px", textAlign: "left"}}
                           key={student.id}>
                        Id:{student.id}<br/>
                        Name:{student.name}<br/>
                        Address:{student.address}
                    </Paper>
                    <div style={{
                        margin: "10px",
                        padding: "15px",
                        textAlign: "left",
                    }}><Button>Edit</Button><Button onClick={() => deleteStudent(student.id)}>Delete</Button>
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