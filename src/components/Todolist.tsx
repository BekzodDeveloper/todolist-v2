// @flow
import * as React from 'react';
import {ChangeEvent, FC, useState} from 'react';
import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
                <div>
                    <h1>
                        <EditableSpan
                            title={title}
                            itemId={todolistId}
                            removeItem={removeTodolist}
                            onChangeText={changeTodolistTitle}
                        />
                    </h1>

                    <AddItemForm addItem={onAddTask}/>
                </div>
                <ul>
                    {tasks.map(t => {
                        const onRemoveTask = () => removeTask(t.id, todolistId);
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(t.id, e.currentTarget.checked, todolistId)
                        };
                        const changeTaskTitle = (value:string) => {
                            onChangeTaskTitle(value, t.id, todolistId)
                        }

                        return <li key={t.id}>
                            <input type={"checkbox"}
                                   checked={t.isDone}
                                   onChange={onChangeStatus}
                            />
                            <EditableSpan title={t.title}
                                          itemId={t.id}
                                          removeItem={onRemoveTask}
                                          onChangeText={changeTaskTitle}/>
                        </li>
                    })}
                </ul>
                <div>
                    <button className={filter === "all" ? "activeFilter" : ""} onClick={onFilterAll}>All</button>
                    <button className={filter === "completed" ? "activeFilter" : ""}
                            onClick={onFilterCompleted}>Completed
                    </button>
                    <button className={filter === "active" ? "activeFilter" : ""} onClick={onFilterActive}>Active
                    </button>
                </div>
            </div>
        )
    }

