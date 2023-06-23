import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {addTodolistAC, removeTodolistAC} from "./todolistsReducer";


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
    expect(newState[todolist2][0].isDone).toBeFalsy();

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

    const newState = tasksReducer(
        tasks,
        changeTaskStatusAC(tasks[todolist1][0].id, false, todolist1)
    );

    expect(newState[todolist2][0].title).toBe("Task 1")
    expect(newState[todolist1][0]).toBeDefined()
    expect(newState[todolist1][0].isDone).toBeFalsy();
    expect(newState[todolist2][0].isDone).toBeTruthy();
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

    expect(newState[todolist2][0].title).toBe("Task 1");
    expect(newState[todolist1][0].title).toBe("NENENE");
})

test("New property should be added when todolist is added", () => {
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

    const newState = tasksReducer(tasks, addTodolistAC("Todolist",v1()));

    const keysOfTodolists = Object.keys(newState);
    const newKey = keysOfTodolists.find(k => k !== todolist1 && k !== todolist2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keysOfTodolists.length).toBe(3);
    expect(newState[newKey]).toStrictEqual([]);
})

test("Tasks should be removed when todolist is removed", () => {
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

    const newState = tasksReducer(tasks, removeTodolistAC(todolist1))

    const keys= Object.keys(newState)

    expect(keys.length).toBe(1)
    expect(newState[todolist1]).toBeUndefined()



})