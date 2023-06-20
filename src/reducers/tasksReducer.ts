import {TasksStateType} from "../App";
import {v1} from "uuid";

export type TasksActionType = AddNewTaskType | RemoveTaskType | ChangeTaskStatusType


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
        default:
            throw new Error()
    }
}

export type AddNewTaskType = { type: "ADD-NEW-TASK", title: string, todolistId: string };
export type RemoveTaskType = { type: "REMOVE-TASK", taskId: string, todolistId: string };
export type ChangeTaskStatusType = { type: "CHANGE-TASK-STATUS", taskId: string, isDone: boolean, todolistId: string };


export const AddNewTaskAC = (title: string, todolistId: string): AddNewTaskType => {
    return {type: "ADD-NEW-TASK", title: title, todolistId: todolistId};
}
export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
}
export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", taskId: taskId, isDone: isDone, todolistId: todolistId}
}