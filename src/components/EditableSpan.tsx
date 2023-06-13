import * as React from "react";
import {ChangeEvent, FC, useState} from "react";

export type EditableSpanType = {
    title: string
    onChangeText: (value: string) => void
    itemId: string
    removeItem: (itemId: string) => void

}
export const EditableSpan: FC<EditableSpanType> =
    ({
         title,
         onChangeText,
         itemId,
         removeItem,
     }) => {
        const [text, setText] = useState("")

        const [editMode, setEditMode] = useState(false)


        function activateEditMode() {
            setEditMode(true);
            setText(title)
        }

        function activateViewMode() {
            debugger
            setEditMode(false);
            setText(text)
            onChangeText(text)
        }

        function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
            setText(e.currentTarget.value)
        }

        function onRemoveItem() {
            removeItem(itemId)
        }

        return <span style={{margin: "0px 0px 10px"}}>
            {editMode ?
                <input autoFocus
                       value={text}
                       onBlur={activateViewMode}
                       onChange={onChangeInput} type="text"/>
                :
                <span onDoubleClick={activateEditMode}>
                    {title}
                </span>
            }


            <button onClick={onRemoveItem}>X</button>
        </span>
    }