import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {v1} from "uuid";

test("Added todolist id should be equal in todolist and tasks states", () => {
    const todolist1 = v1();
    const todolist2 = v1();
    const TodolistsState: Array<TodolistType> = [
        {id: todolist1, title: "Backlogs", filter: "all"},
        {id: todolist2, title: "To Do", filter: "all"},
    ];
    const TasksState: TasksStateType = {
        [todolist1]: [
            {id: v1(), title: "Task 1", isDone: true},
            {id: v1(), title: "Task 2", isDone: true},
            {id: v1(), title: "Task 311", isDone: false},
            {id: v1(), title: "Task 4", isDone: false},
            {id: v1(), title: "Task 5", isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: "Task 1", isDone: true},
            {id: v1(), title: "Task 2", isDone: true},
            {id: v1(), title: "Task 3", isDone: false},
            {id: v1(), title: "Task 4", isDone: false},
            {id: v1(), title: "Task 5111", isDone: false},
        ]};

    const todoId = v1()
    const action = addTodolistAC("Neeew todo",todoId);
    const newTodolistState = todolistsReducer(TodolistsState, action)
    const newTasksState = tasksReducer(TasksState, action)

    const keys = Object.keys(newTasksState);
    const idFromTasks = keys[2];
    const idFromTodolists = newTodolistState[2].id;

    expect(idFromTasks).toEqual(action.todolistId);
    expect(idFromTodolists).toEqual(action.todolistId);

})