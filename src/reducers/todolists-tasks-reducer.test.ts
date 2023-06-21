import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

test("Added todolist id should be equal in todolist and tasks states", () => {
    const TodolistsState: Array<TodolistType> = [];
    const TasksState: TasksStateType = {};

    const action = addTodolistAC("Neeew todo");
    const newTodolistState = todolistsReducer(TodolistsState, action)
    const newTasksState = tasksReducer(TasksState, action)

    const keys = Object.keys(newTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = newTodolistState[0].id;

    expect(idFromTasks).toEqual(action.todolistId);
    expect(idFromTodolists).toEqual(action.todolistId);

})