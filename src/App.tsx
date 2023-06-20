import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {Col, Container, Row} from "react-bootstrap";


export type FilterValueType = "all" | "active" | "completed";
export type TodolistType = { id: string, title: string, filter: FilterValueType };
export type TasksStateType = { [key: string]: Array<TaskType> }


function App() {

    const todolist1 = v1();
    const todolist2 = v1();

    let [todolists, setTodolists]
        = useState<Array<TodolistType>>([
        {id: todolist1, title: "Backlogs", filter: "all"},
        {id: todolist2, title: "To Do", filter: "all"},
    ])


    const [tasks, setTasks]
        = useState<TasksStateType>({
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
        tasks[todolistId] = tasks[todolistId].filter(t => id !== t.id);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        tasks[todolistId] = [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]];
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let task = tasks[todolistId].find(t => t.id === taskId);
        if (task) task.isDone = isDone;
        setTasks({...tasks})
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
        setTodolists([...filteredTodolists])
        delete tasks[todolistId];
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        const todolistId = v1();
        setTodolists([...todolists, {id: todolistId, title: title, filter: "all"}]);

        tasks[todolistId] = [];
        setTasks({...tasks})
    }

    function onChangeTitle(value: string, todolistId: string) {
        todolists.find(tl => {
            if (tl.id === todolistId) tl.title = value;
        });
        return setTodolists([...todolists])
    }

    function onChangeTaskTitle(taskTitle: string, taskId: string, todolistId: string) {
        tasks[todolistId].find(t => {
            if (taskId === t.id) {
                t.title = taskTitle;
                return setTasks({...tasks});
            }

        })
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


                                function changeFilter(filterValue: FilterValueType, todolistId: string) {
                                    let todolist = todolists.find(tl => tl.id === todolistId);
                                    if (todolist) todolist.filter = filterValue;
                                    setTodolists([...todolists]);
                                }

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
                                                 onChangeTitle={onChangeTitle}
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

export default App;
