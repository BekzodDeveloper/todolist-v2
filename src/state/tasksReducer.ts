import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolistsReducer";

export type TasksActionType =
    AddNewTaskType
    | RemoveTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: TasksActionType) => {
    switch (action.type) {
        case "ADD-NEW-TASK":
            const stateCopy = {...state};
            const t = {id: v1(), title: action.title, isDone: false};
            if (stateCopy[action.todolistId])
                stateCopy[action.todolistId] = [t, ...stateCopy[action.todolistId]]
            // console.log("stateCopy: " + {...stateCopy})
            // console.log("stateCopy[action.todolistId] tasks: " + {...stateCopy[action.todolistId]})
            console.log(`action.todolistId in tasks: ${action.todolistId}`)
            return stateCopy;

        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].filter(t => action.taskId !== t.id)]
            }
        case "CHANGE-TASK-STATUS":
            // const copySt = {...state};
            //
            // return copySt;
        let index = state[action.todolistId].findIndex(t => t.id === action.taskId);
        const task = state[action.todolistId][index]
        if (task) task.isDone = action.isDone;

        return {
            ...state,
            [action.todolistId]: [
                ...state[action.todolistId].slice(0, index),
                task,
                ...state[action.todolistId].slice(index + 1),
            ]
        }
        case "CHANGE-TASK-TITLE":
            const copy = {...state};

            copy[action.todolistId].find(t => {
                if (action.taskId === t.id) {
                    t.title = action.taskTitle;
                }
            })
            return copy;
        case "ADD-TODOLIST":

            let copyOfState = {...state};
            // copyOfState[action.todolistId] = [];
            copyOfState = {...copyOfState, [action.todolistId]: []}

            // console.log("copyOfState: " + {...state})
            console.log("action.todolistId in todo: " + action.todolistId)
            return copyOfState;

        case "REMOVE-TODOLIST":
            const sCopy = {...state};
            delete sCopy[action.todolistId];
            return sCopy;

        default:
            throw new Error()
    }
}

export type AddNewTaskType = { type: "ADD-NEW-TASK", title: string, todolistId: string };
export type RemoveTaskType = { type: "REMOVE-TASK", taskId: string, todolistId: string };
export type ChangeTaskStatusType = { type: "CHANGE-TASK-STATUS", taskId: string, isDone: boolean, todolistId: string };
export type ChangeTaskTitleType = { type: "CHANGE-TASK-TITLE", taskTitle: string, taskId: string, todolistId: string };


export const addNewTaskAC = (title: string, todolistId: string): AddNewTaskType => {
    return {type: "ADD-NEW-TASK", title, todolistId};
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskTitle: string, taskId: string, todolistId: string): ChangeTaskTitleType => {
    return {type: "CHANGE-TASK-TITLE", taskTitle, taskId, todolistId};
}
