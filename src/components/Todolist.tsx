// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, FC, useState,} from "react";
import {FilterValueType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filterValue: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
};

export const Todolist: FC<TodolistType> =
    ({
         title,
         tasks,
         removeTask,
         changeFilter,
         addTask,
         changeStatus,
         filter
     }) => {

        const [newTaskTitle, setNewTaskTitle] = useState("")

        const [error, setError] = useState<string | null>(null)

        function onAddTask() {
            if (newTaskTitle.trim() !== "") {
                addTask(newTaskTitle.trim())
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

        function onFilterAll() {
            changeFilter("all")
        }

        function onFilterActive() {
            changeFilter("active")
        }

        function onFilterCompleted() {
            changeFilter("completed")
        }


        return (
            <div>
                <div>
                    <h1>{title}</h1>
                    <div>
                        <input value={newTaskTitle}
                               onChange={onChangeNewTaskTitle}
                               onKeyPress={onKeyPress}
                               type="text" placeholder={"Type title"}
                               className={error ? "error" : ""}
                        />

                        <button onClick={onAddTask}>+</button>
                        {error ? <div className="error-message">{error}</div> : ""}

                    </div>
                </div>
                <ul>
                    {tasks.map(t => {
                        const onRemoveTask = () => removeTask(t.id);
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(t.id, e.currentTarget.checked)
                        };

                        return <li key={t.id}>
                            <input type={"checkbox"}
                                   checked={t.isDone}
                                   onChange={onChangeStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveTask}>X
                            </button>
                        </li>
                    })}
                </ul>
                <div>
                    <button className={filter === "all" ? "activeFilter" : ""} onClick={onFilterAll}>All</button>
                    <button className={filter === "completed" ? "activeFilter" : ""} onClick={onFilterCompleted}>Completed</button>
                    <button className={filter === "active" ? "activeFilter" : ""} onClick={onFilterActive}>Active
                    </button>
                </div>
            </div>
        )
    }