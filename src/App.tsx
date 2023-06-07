import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "Task 1", isDone: true},
            {id: v1(), title: "Task 2", isDone: true},
            {id: v1(), title: "Task 3", isDone: false},
            {id: v1(), title: "Task 4", isDone: false},
            {id: v1(), title: "Task 5", isDone: false},
        ]);

    const [filter, setFilter] = useState<FilterValueType>("all");

    function removeTask(id: string) {
        const resultTasks = tasks.filter(t => id !== t.id);
        setTasks(resultTasks)
    }

    function changeFilter(filterValue: FilterValueType) {
        setFilter(filterValue)
    }

    function addTask(title: string) {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([newTask, ...tasks]);
    }


    function changeStatus(taskId: string, isDone: boolean) {
        tasks.find(t => {
            if (t.id === taskId) t.isDone = isDone;
        });
        setTasks([...tasks]);
        console.log(isDone)

    }

    // function changeStatus(taskId: string, isDone: boolean) {
    //     let task = tasks.find(t => t.id === taskId);
    //     if (task) task.isDone = isDone;
    //     setTasks([...tasks]);
    //     console.log(tasks)
    // }


    let tasksForTodolist: Array<TaskType> = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <div className={"todolist__wrapper"}>
                <Todolist title={"Backlogs"}
                          tasks={tasksForTodolist}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeStatus={changeStatus}
                          filter={filter}
                />
            </div>
        </div>
    );
}

export default App;