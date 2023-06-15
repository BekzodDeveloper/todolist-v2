import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>,
                                 // tasks: TasksStateType,
                                 action: ActionType): Array<TodolistType> => {
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
        default:
            throw new Error("Can't understand!")
    }

}

