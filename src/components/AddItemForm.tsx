import * as React from "react";
import {ChangeEvent, FC, KeyboardEvent, useState} from "react";

export type AddItemForm = {
    addItem: (title: string) => void
}
export const AddItemForm: FC<AddItemForm>
    = ({
           addItem
       }) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    function onAddTask() {
        if (newTaskTitle.trim() !== "") {
            addItem(newTaskTitle.trim())
            setNewTaskTitle("")
            setError(null)
        } else if (newTaskTitle.trim() === "") {
            setError("Field is required")
        }
    }

    function onChangeNewTaskTitle(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(event.currentTarget.value);
        setError(null)
    }

    function onKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.ctrlKey && e.charCode === 13) {
            onAddTask();
        }
    }

    return <div>
        <input value={newTaskTitle}
               onChange={onChangeNewTaskTitle}
               onKeyPress={onKeyPress}
               type="text" placeholder={"Type title"}
               className={error ? "error" : ""}
        />

        <button onClick={onAddTask}>+</button>
        {error ? <div className="error-message">{error}</div> : ""}

    </div>
}