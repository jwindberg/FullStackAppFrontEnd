import React, {Fragment, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button, Paper} from '@material-ui/core';
import IStudent from '../types/IStudent';
import {useAtom} from "simple-atom";
import {addStudentEvent} from "./StudentPage";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const AddStudentForm = () => {

    const [studentSemaphore, setStudentSemaphore] = useAtom(addStudentEvent);


    // const studentsContext = useContext(StudentsContext)

    const classes = useStyles();
    const paperStyle = {padding: '50px 20px', width: 600, margin: "20px auto"}
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    const addStudent = async (student: IStudent) => {
        const addStudent = await fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        })
        if (addStudent.ok) {
            setStudentSemaphore(null);
        }
    }

    const handleClick = async (e: any) => {
        e.preventDefault()
        const student = {name, address}
        console.log(student)
        await addStudent(student);
    }

    const getAddStudentForm = () => {
        const form = <Fragment><TextField id="outlined-basic" label="StudentPage Name" variant="outlined" fullWidth
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
        />
            <TextField id="outlined-basic" label="StudentPage Address" variant="outlined" fullWidth
                       value={address}
                       onChange={(e) => setAddress(e.target.value)}
            /></Fragment>;
        return <Paper elevation={3} style={paperStyle}>
            <h1 style={{color: "blue"}}><u>Add StudentPage</u></h1>

            <form className={classes.root} noValidate autoComplete="off">

                {form}
                <Button variant="contained" color="secondary" onClick={handleClick}>
                    Submit
                </Button>
            </form>
        </Paper>;
    }
    
    return getAddStudentForm();
}
export default AddStudentForm;