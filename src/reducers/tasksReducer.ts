import {TasksStateType} from "../App";
import {v1} from "uuid";

export type TasksActionType = AddNewTaskType | RemoveTaskType | ChangeTaskStatusType | ChangeTaskTitleType


export const tasksReducer = (state: TasksStateType, action: TasksActionType) => {
    switch (action.type) {
        case "ADD-NEW-TASK":
            state[action.todolistId] = [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]];
            return {...state}
        case "REMOVE-TASK":
            state[action.todolistId] = state[action.todolistId].filter(t => action.taskId !== t.id);
            return {...state}
        case "CHANGE-TASK-STATUS":
            let task = state[action.todolistId].find(t => t.id === action.taskId);
            if (task) task.isDone = action.isDone;
            return {...state}
        case "CHANGE-TASK-TITLE":
            state[action.todolistId].find(t => {
                if (action.taskId === t.id) {
                    t.title = action.taskTitle;
                }
            })
            return {...state}

        default:
            throw new Error()
    }
}

export type AddNewTaskType = { type: "ADD-NEW-TASK", title: string, todolistId: string };
export type RemoveTaskType = { type: "REMOVE-TASK", taskId: string, todolistId: string };
export type ChangeTaskStatusType = { type: "CHANGE-TASK-STATUS", taskId: string, isDone: boolean, todolistId: string };
export type ChangeTaskTitleType = { type: "CHANGE-TASK-TITLE", taskTitle: string, taskId: string, todolistId: string };


export const addNewTaskAC = (title: string, todolistId: string): AddNewTaskType => {
    return {type: "ADD-NEW-TASK", title: title, todolistId: todolistId};
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", taskId: taskId, isDone: isDone, todolistId: todolistId}
}
export const changeTaskTitleAC = (taskTitle: string, taskId: string, todolistId: string): ChangeTaskTitleType => {
    return {type: "CHANGE-TASK-TITLE", taskTitle: taskTitle, taskId: taskId, todolistId: todolistId};
}
