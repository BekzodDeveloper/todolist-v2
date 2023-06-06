// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, FC, useState} from "react";
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
};
type State = {};

export const Todolist: FC<TodolistType> =
    ({
         title,
         tasks,
         removeTask,
         changeFilter,
         addTask,
     }) => {

        const [newTaskTitle, setNewTaskTitle] = useState("")



        function onAddTask() {
            if (newTaskTitle.trim() !== "") {
                addTask(newTaskTitle)
                setNewTaskTitle("")
            }

        }

        function onChangeNewTaskTitle(event: ChangeEvent<HTMLInputElement>) {
            setNewTaskTitle(event.currentTarget.value);
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
                        />
                        <button onClick={onAddTask}>+</button>
                    </div>
                </div>
                <ul>
                    {tasks.map(t => {
                        function onRemoveTask(){
                            removeTask(t.id)
                        }

                        return <li key={t.id}>
                            <input type={"checkbox"} checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveTask}>X
                            </button>
                        </li>
                    })}
                </ul>
                <div>
                    <button onClick={onFilterAll}>All</button>
                    <button onClick={onFilterCompleted}>Completed</button>
                    <button onClick={onFilterActive}>Active</button>
                </div>
            </div>
        )
    }