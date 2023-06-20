import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type TodolistsActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}

export const todolistsReducer = (
    state: Array<TodolistType>,
    action: TodolistsActionType
): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case "ADD-TODOLIST": {
            return [
                ...state,
                {id: v1(), title: action.title, filter: "all"},
            ]
        }
        case "CHANGE-TODOLIST-TITLE": {
            state.find(tl => {
                if (tl.id === action.id) tl.title = action.title;
            })
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            state.find(tl => {
                if (tl.id === action.id) tl.filter = action.filter;
            })
            return [...state]
        }
        default:
            throw new Error("Can't understand!")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId};
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title};
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title};
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter};
}

