import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {todolistsReducer} from "./todolistsReducer";

export type ActionType = {
    type: string
    [key: string]: any
}

test("todolist should be removed", () => {
    const todolist1 = v1();
    const todolist2 = v1();

    let todolists: Array<TodolistType> = [
        {id: todolist1, title: "Backlogs", filter: "all"},
        {id: todolist2, title: "To Do", filter: "all"},
    ];

    const newState = todolistsReducer(
        todolists,
        {type: "REMOVE-TODOLIST", id: todolist1});

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe(todolist2);
})

test("empty todolist should be added", () => {
    const todolist1 = v1();
    const todolist2 = v1();

    const todolists: Array<TodolistType> = [
        {id: todolist1, title: "Backlogs", filter: "all"},
        {id: todolist2, title: "To Do", filter: "all"},
    ];

    // let tasks:TasksStateType={
    //     [todolist1]: [
    //         {id: v1(), title: "Task 1", isDone: true},
    //         {id: v1(), title: "Task 2", isDone: true},
    //         {id: v1(), title: "Task 311", isDone: false},
    //         {id: v1(), title: "Task 4", isDone: false},
    //         {id: v1(), title: "Task 5", isDone: false},
    //     ],
    //     [todolist2]: [
    //         {id: v1(), title: "Task 1", isDone: true},
    //         {id: v1(), title: "Task 2", isDone: true},
    //         {id: v1(), title: "Task 3", isDone: false},
    //         {id: v1(), title: "Task 4", isDone: false},
    //         {id: v1(), title: "Task 5111", isDone: false},
    //     ]
    // }

    const newState = todolistsReducer(
        todolists,
        {type: "ADD-TODOLIST", title: "CCC"});

    expect(newState.length).toBe(3);
    expect(newState[2].title).toBe("CCC");
})

test("todolist title should be changed", () => {
    const todolist1 = v1();
    const todolist2 = v1();

    let todolists: Array<TodolistType> = [
        {id: todolist1, title: "Backlogs", filter: "all"},
        {id: todolist2, title: "To Do", filter: "all"},
    ];

    const newState: Array<TodolistType> = todolistsReducer(todolists, {
            type: "CHANGE-TODOLIST-TITLE",
            id: todolist2,
            title: "New todo TITLE",
            filter: todolists[1].filter
        }
    );

    expect(newState.length).toBe(2);
    expect(newState[1].id).toBe(todolist2);
    expect(newState[1].title).toBe("New todo TITLE");
})
