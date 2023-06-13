import * as React from "react";
import {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

export type AddItemForm = {
    addItem: (title: string) => void
}
export const AddItemForm: FC<AddItemForm>
    = ({
           addItem
       }) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    function onAddTask() {
        if (newTaskTitle.trim() !== "") {
            addItem(newTaskTitle.trim())
            setNewTaskTitle("")
            setError(null)
        } else if (newTaskTitle.trim() === "") {
            setError("Field is required")
        }
    }

    function onChangeNewTaskTitle(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(event.currentTarget.value);
        setError(null)
    }

    function onKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.ctrlKey && e.charCode === 13) {
            onAddTask();
        }
    }

    return <div style={{marginBottom:"20px"}}>
        <Container>
            <Row className="justify-content-lg-between">
                <Col style={{padding:"0px"}}
                    md={10}>
                    <Form.Control
                        placeholder={"Type ..."}
                        aria-label={newTaskTitle}
                        aria-describedby="basic-addon1"
                        onChange={onChangeNewTaskTitle}
                        onKeyPress={onKeyPress}
                        className={error ? "error" : ""}
                        value={newTaskTitle}
                    /></Col>
                <Col style={{padding:"0px"}}
                    md="auto"><Button variant={"primary"} onClick={onAddTask}>+</Button>
                    {error ? <div className="error-message">{error}</div> : ""}</Col>
            </Row>

            {/*<input value={newTaskTitle}*/}
            {/*       onChange={onChangeNewTaskTitle}*/}
            {/*       type="text" placeholder={"Type title"}*/}
            {/*       onChange={onChangeNewTaskTitle}*/}
            {/*       onKeyPress={onKeyPress}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}


        </Container>
    </div>
}