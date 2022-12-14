import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from "./Components/Input";
import ButtonAppBar from "./Components/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "Where to fly", filter: "all"},
        {id: todolistId2, title: "What to eat", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: updateTitle} : el)
        })
    }

    const updateTodolist = (todolistId: string, updateTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: updateTitle} : el))
    }


    function removeTask(id: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    const addTodolist = (newTitle: string) => {
        const newTodolistId = v1()
        const newTodo: TodolistType = {id: newTodolistId, title: newTitle, filter: "all"}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
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

export default App;
