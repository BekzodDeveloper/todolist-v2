import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {Col, Container, Row} from "react-bootstrap";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";


export type FilterValueType = "all" | "active" | "completed";
export type TodolistType = { id: string, title: string, filter: FilterValueType };
export type TasksStateType = { [key: string]: Array<TaskType> }


function AppWithReducers() {

    const todolist1 = v1();
    const todolist2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolist1, title: "Backlogs", filter: "all"},
        {id: todolist2, title: "To Do", filter: "all"},
    ])


    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolist1]: [
            {id: v1(), title: "Task 1", isDone: true},
            {id: v1(), title: "Task 2", isDone: true},
            {id: v1(), title: "Task 311", isDone: false},
            {id: v1(), title: "Task 4", isDone: false},
            {id: v1(), title: "Task 5", isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: "Task 1", isDone: true},
            {id: v1(), title: "Task 2", isDone: true},
            {id: v1(), title: "Task 3", isDone: false},
            {id: v1(), title: "Task 4", isDone: false},
            {id: v1(), title: "Task 5111", isDone: false},
        ]
    })

    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addNewTaskAC(title, todolistId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function onChangeTaskTitle(taskTitle: string, taskId: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskTitle, taskId, todolistId))
    }

    function changeFilter(filterValue: FilterValueType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, filterValue))
    }

    function removeTodolist(todolistId: string) {
        dispatchToTasksReducer(removeTodolistAC(todolistId))
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
    }

    function addTodolist(title: string) {
        const todolistId = v1();
        dispatchToTasksReducer(addTodolistAC(title, todolistId))
        dispatchToTodolistsReducer(addTodolistAC(title, todolistId))
    }


    function onChangeTodolistTitle(value: string, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, value))
    }


    return (
        <div className="App">
            <Container fluid style={{padding: "20px"}}>
                <Row>
                    <Col>
                        <div className={"todolist__wrapper"}>

                            {todolists.map(tl => {
                                let tasksForTodolist: Array<TaskType> = tasks[tl.id];

                                if (tl.filter === "completed")
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)

                                if (tl.filter === "active")
                                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)


                                return <Todolist key={tl.id}
                                                 todolistId={tl.id}
                                                 title={tl.title}
                                                 tasks={tasksForTodolist}
                                                 removeTask={removeTask}
                                                 changeFilter={changeFilter}
                                                 addTask={addTask}
                                                 changeStatus={changeStatus}
                                                 filter={tl.filter}
                                                 removeTodolist={removeTodolist}
                                                 onChangeTitle={onChangeTodolistTitle}
                                                 onChangeTaskTitle={onChangeTaskTitle}
                                />
                            })}

                            <AddItemForm addItem={(title: string) => {
                                addTodolist(title)
                            }}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AppWithReducers;
