import {TodolistType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolistsReducer";

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
        RemoveTodolistAC(todolist1));

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

    const newState = todolistsReducer(
        todolists,
        AddTodolistAC("ASD"));

    expect(newState.length).toBe(3);
    expect(newState[2].title).toBe("ASD");
    expect(newState[2].filter).toBe("all");
})

test("todolist title should be changed", () => {
    const todolist1 = v1();
    const todolist2 = v1();

    let todolists: Array<TodolistType> = [
        {id: todolist1, title: "Backlogs", filter: "all"},
        {id: todolist2, title: "To Do", filter: "all"},
    ];

    const newState: Array<TodolistType> = todolistsReducer(
        todolists,
        ChangeTodolistTitleAC(todolist2, "New todo TITLE")
    );

    expect(newState.length).toBe(2);
    expect(newState[1].id).toBe(todolist2);
    expect(newState[1].title).toBe("New todo TITLE");
})
test("todolist filter status should be changed", () => {
    const todolist1 = v1();
    const todolist2 = v1();

    let todolists: Array<TodolistType> = [
        {id: todolist1, title: "Backlogs", filter: "all"},
        {id: todolist2, title: "To Do", filter: "all"},
    ];

    const action = ChangeTodolistFilterAC(todolist1, "active")
    const newState: Array<TodolistType> = todolistsReducer(todolists, action);

    expect(newState.length).toBe(2);
    expect(newState[0].id).toBe(todolist1);
    expect(newState[0].filter).toBe("active");
})
