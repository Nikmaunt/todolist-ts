import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./Components/Input";
import EditableSpan from "./Components/EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import Checkbox from "./Components/checkbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store/store";
import {TasksStateType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./State/tasks-reducer";
import Checkbox from "@mui/material/Checkbox";
// import {Checkbox} from '@mui/material';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTodolist: (todolistId: string, updateTitle: string) => void
}

export function Todolist(props: PropsType) {
    let tasks = useSelector<AppRootStateType,Array<TaskType>> (state => state.tasks[props.id])
    const dispatch = useDispatch()

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id,isDone,todolistId))
    }
    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId,taskId,updateTitle))
    }


    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);


    const updateTodolistHandler = (updateTitle: string) => {
        props.updateTodolist(props.id, updateTitle)
    }

    // const updateTaskHandler = (updateTitle: string, taskId: string) => {
    //     props.updateTask(props.id, taskId, updateTitle)
    // }
    // const changeTaskStatusHandler = (checkedValue:boolean, taskId:string)=> {
    //     props.changeTaskStatus(taskId,checkedValue,props.id )
    // }

    let allTodolistTasks = tasks;
    let  tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }
    return <div>
        <h3>

            <EditableSpan callback={updateTodolistHandler} title={props.title}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <DeleteIcon/>
            </IconButton>

        </h3>
        <Input callBack = { (newTitle)=>   dispatch (addTaskAC(newTitle,props.id))}/>

        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id,newIsDoneValue,props.id))
                    }
                    const updateTaskHandler = (updateTitle:string) => {
                        dispatch(changeTaskTitleAC(t.id, updateTitle, props.id))
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />
                        {/*<Checkbox callback={onChangeHandler} isDone={t.isDone}/>*/}
                        <EditableSpan callback={updateTaskHandler} title={t.title}/>
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


