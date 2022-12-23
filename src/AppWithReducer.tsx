import React, {useReducer, useState} from 'react';
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


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistReducer,[
        {id: todolistId1, title: "Where to fly", filter: "all"},
        {id: todolistId2, title: "What to eat", filter: "all"}
    ])

    let [tasks, dispatchToTasks] =  useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "Maldives", isDone: true},
            {id: v1(), title: "Bali", isDone: true},
            {id: v1(), title: "New York", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Hünkar Beğendi", isDone: true},
            {id: v1(), title: "Meatballs", isDone: true}
        ]
    });

    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId,taskId,updateTitle))
    }

    const updateTodolist = (todolistId: string, updateTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId,updateTitle))
    }


    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks (addTaskAC(title,todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id,isDone,todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolists(changeTodolistFilterAC(value,todolistId))
    }

    function removeTodolist(id: string) {
        dispatchToTodolists(removeTodolistAC(id))
        dispatchToTasks(removeTodolistAC(id))
    }

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action )
    }

    return (
        <div className="App">
            {/*<Container fixed>*/}
            {/*    <ButtonAppBar/>*/}
            {/*    <Grid container style={{padding:'20px'}}>*/}
            {/*        <Input callBack={addTodolist}/>*/}
            {/*    </Grid>*/}
            {/*    <Grid container spacing={3}>*/}
            {/*        {*/}
            {/*            todolists.map(tl => {*/}
            {/*                let allTodolistTasks = tasks[tl.id];*/}
            {/*                let tasksForTodolist = allTodolistTasks;*/}

            {/*                if (tl.filter === "active") {*/}
            {/*                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);*/}
            {/*                }*/}
            {/*                if (tl.filter === "completed") {*/}
            {/*                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);*/}
            {/*                }*/}
            {/*                return <Grid item>*/}
            {/*                    <Paper style={{padding:'10px'}}>*/}
            {/*                    <Todolist*/}
            {/*                    key={tl.id}*/}
            {/*                    id={tl.id}*/}
            {/*                    title={tl.title}*/}
            {/*                    tasks={tasksForTodolist}*/}
            {/*                    removeTask={removeTask}*/}
            {/*                    changeFilter={changeFilter}*/}
            {/*                    addTask={addTask}*/}
            {/*                    changeTaskStatus={changeStatus}*/}
            {/*                    filter={tl.filter}*/}
            {/*                    removeTodolist={removeTodolist}*/}
            {/*                    updateTask={updateTask}*/}
            {/*                    updateTodolist={updateTodolist}*/}
            {/*                />*/}
            {/*                    </Paper>*/}
            {/*                </Grid>*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </Grid>*/}
            {/*</Container>*/}
        </div>
    );
}

export default AppWithReducer;
