import * as React from "react";
import {ChangeEvent, FC, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

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
            if (text.trim() !== "") {
                setEditMode(false);
                setText(text)
                onChangeText(text)
            }

        }

        function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
            setText(e.currentTarget.value)
        }

        function onRemoveItem() {
            removeItem(itemId)
        }

        return (
            <span style={{margin: "0px 0px 10px"}}>
            <Container fluid>
                <Row className="justify-content-lg-between">
                    <Col style={{padding: "0px"}} md={10}>
                        {editMode ?
                            <Form.Control
                                size={"sm"}
                                placeholder="Type a title"
                                aria-label="Title"
                                aria-describedby="basic-addon1"
                                value={text}
                                autoFocus
                                onBlur={activateViewMode}
                                onChange={onChangeInput} type="text"
                            />
                            :
                            <span onDoubleClick={activateEditMode}>
                            {title}
                        </span>
                        }
                    </Col>
                    <Col style={{padding: "0px"}} md={"auto"}>
                        <Button size="sm" variant={"outline-danger"} onClick={onRemoveItem}>x</Button>

                    </Col>
                </Row>
            </Container>
        </span>)
    }