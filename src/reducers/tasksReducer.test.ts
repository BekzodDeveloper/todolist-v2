import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";


test("Task should be added", () => {
    const todolist1 = v1();
    const todolist2 = v1();
    const tasks: TasksStateType = {
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
        ]
    }

    const newState = tasksReducer(tasks, addNewTaskAC("Neeew Task", todolist2));

    expect(newState[todolist2].length).toBe(6);
    expect(newState[todolist2][0].title).toBe("Neeew Task");
    expect(newState[todolist2][0].isDone).toBe(false);

})

test("Task should be removed", () => {
    const todolist1 = v1();
    const todolist2 = v1();
    const tasks: TasksStateType = {
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
        ]
    }

    const newState = tasksReducer(tasks, removeTaskAC(tasks[todolist1][0].id, todolist1));

    expect(newState[todolist1].length).toBe(4);
});

test("Task status should be changed", () => {
    const todolist1 = v1();
    const todolist2 = v1();
    const tasks: TasksStateType = {
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
        ]
    }

    const newState = tasksReducer(tasks, changeTaskStatusAC(
        tasks[todolist1][0].id, false, todolist1));

    expect(newState[todolist1][0]).toBeDefined()
    expect(newState[todolist1][0].isDone).toBe(false);
})


test("Task title should be changed", () => {
    const todolist1 = v1();
    const todolist2 = v1();
    const tasks: TasksStateType = {
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
        ]
    }
    const newState = tasksReducer(tasks, changeTaskTitleAC(
        "NENENE",
        tasks[todolist1][0].id,
        todolist1));

    expect(newState[todolist1][0].title).toBe("NENENE");
})
