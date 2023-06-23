// @flow
import * as React from 'react';
import {ChangeEvent, FC, useState} from 'react';
import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    todolistId: string,
    removeTodolist: (todolistId: string) => void
    onChangeTitle: (value: string, todolistId: string) => void
    onChangeTaskTitle: (title: string, taskId: string, todolistId: string) => void
};

export const Todolist: FC<TodolistType> =
    ({
         title,
         tasks,
         removeTask,
         changeFilter,
         addTask,
         changeStatus,
         filter,
         todolistId,
         removeTodolist,
         onChangeTitle,
         onChangeTaskTitle
     }) => {

        function onFilterAll() {
            changeFilter("all", todolistId)
        }

        function onFilterActive() {
            changeFilter("active", todolistId)
        }

        function onFilterCompleted() {
            changeFilter("completed", todolistId)
        }

        function onAddTask(title: string) {
            addTask(title, todolistId)
        }

        function changeTodolistTitle(value: string) {
            onChangeTitle(value, todolistId)
        }


        return (
            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>
                            <h1 style={{fontSize: "24px",marginBottom:"40px"}}>
                                <EditableSpan
                                    title={title}
                                    itemId={todolistId}
                                    removeItem={removeTodolist}
                                    onChangeText={changeTodolistTitle}
                                />
                            </h1>
                        </Card.Title>
                        <Card.Text as='div'>
                            <div><AddItemForm addItem={onAddTask}/></div>
                            <ul style={{padding: "0px", margin: "0px"}}>
                                {tasks?.map(t => {

                                    const onRemoveTask = () => removeTask(t.id, todolistId);
                                    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                        changeStatus(t.id, e.currentTarget.checked, todolistId)
                                    };
                                    const changeTaskTitle = (value: string) => {
                                        onChangeTaskTitle(value, t.id, todolistId)
                                    }

                                    return <li key={t.id}
                                               style={{
                                                   listStyle: "none",
                                                   marginBottom: "20px"
                                               }}>
                                        <Form>
                                            <Container fluid>
                                                <Row className="justify-content-lg-between">
                                                    <Col style={{padding: "0px"}} md={1}>
                                                        <Form.Check
                                                            type={"checkbox"}
                                                            id={t.id}
                                                            checked={t.isDone}
                                                            onChange={onChangeStatus}
                                                        /></Col>

                                                    <Col style={{padding: "0px"}}>
                                                        <EditableSpan
                                                            title={t.title}
                                                            itemId={t.id}
                                                            removeItem={onRemoveTask}
                                                            onChangeText={changeTaskTitle}/>

                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Form>

                                    </li>
                                })}
                            </ul>
                        </Card.Text>
                        <div>
                            <Container>
                                <Row className="justify-content-lg-between">
                                    <Col md={"auto"}
                                        style={{padding: "0px"}}>
                                        {filter === "all" ?
                                            <Button variant={"primary"} onClick={onFilterAll}>All</Button>
                                            : <Button variant={"outline-primary"} onClick={onFilterAll}>All</Button>}
                                    </Col>

                                    <Col md={"auto"}
                                        style={{padding: "0px"}}>
                                        {filter === "completed" ?
                                            <Button variant={"warning"} onClick={onFilterCompleted}>Completed</Button>
                                            : <Button variant={"outline-warning"}
                                                      onClick={onFilterCompleted}>Completed</Button>}
                                    </Col>

                                    <Col md={"auto"}
                                        style={{padding: "0px"}}>
                                        {filter === "active" ?
                                            <Button variant={"success"} onClick={onFilterActive}>Active</Button>
                                            : <Button variant={"outline-success"}
                                                      onClick={onFilterActive}>Active</Button>}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Card.Body>
                </Card>

            </div>
        )
    }

