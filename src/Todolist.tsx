import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./Components/Input";
import EditableSpan from "./Components/EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox} from '@mui/material';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolist: (todolistId: string, updateTitle: string) => void
}

export function Todolist(props: PropsType) {
    //  let [title, setTitle] = useState("")
    //   let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     let newTitle = title.trim();
    //     if (newTitle !== "") {
    //         props.addTask(newTitle, props.id);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const AddTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }

    const updateTodolistHandler = (updateTitle: string) => {
        props.updateTodolist(props.id, updateTitle)
    }

    const updateTaskHandler = (updateTitle: string, taskId: string) => {
        props.updateTask(props.id, taskId, updateTitle)
    }

    return <div>
        <h3>

            <EditableSpan callback={updateTodolistHandler} title={props.title}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon/>
            </IconButton>

        </h3>
        <Input callBack={AddTaskHandler}/>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    // const updateTaskHandler = (updateTitle:string) => {props.updateTask(props.id, t.id, updateTitle)}

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan callback={(updateTitle) => updateTaskHandler(updateTitle, t.id)} title={t.title}/>
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button size={'small'} variant={ props.filter === 'all' ? "outlined" : "contained"} color="success" onClick={onAllClickHandler}>All</Button>
            <Button size={'small'} variant={ props.filter === 'active' ? "outlined" : "contained"} color="error" onClick={onActiveClickHandler}>Active</Button>
            <Button size={'small'}  variant={ props.filter === 'completed' ? "outlined" : "contained"} onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
}


