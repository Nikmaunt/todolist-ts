import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from "./Components/Input";
import ButtonAppBar from "./Components/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {userReducer} from "./State/user-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./State/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    // let [todolists, dispatchToTodolists] = useReducer(todolistReducer,[
    //     {id: todolistId1, title: "Where to fly", filter: "all"},
    //     {id: todolistId2, title: "What to eat", filter: "all"}
    // ])


    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists )
    const dispatch = useDispatch()


    const updateTodolist = (todolistId: string, updateTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId,updateTitle))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value,todolistId))
    }

    function removeTodolist(id: string) {
        dispatch(removeTodolistAC(id))

    }

    const addTodolist = useCallback ((newTitle: string) =>   {
        dispatch(addTodolistAC(newTitle))
    },[dispatch])

    return (
        <div className="App">
            <Container fixed>
                <ButtonAppBar/>
                <Grid container style={{padding:'20px'}}>
                    <Input callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return <Grid item>
                                <Paper style={{padding:'10px'}}>
                                <Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                changeFilter={changeFilter}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                updateTodolist={updateTodolist}
                            />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
