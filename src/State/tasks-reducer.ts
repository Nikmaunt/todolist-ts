import {useReducer} from "react";
import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, removeTodolistAC, RemoveTodolistACType} from "./todolist-reducer";

const initialState:TasksStateType = {}

export const  tasksReducer = (state:TasksStateType = initialState, action: ActionsType):TasksStateType  => {
    switch (action.type) {
        case "REMOVE-TASK": return  {
            ...state,
                [action.todolistId]:state[action.todolistId].filter(t => t.id != action.taskId)
        }
        case "ADD-TASK":
            return {
            ...state,[action.todolistId]: [{id: v1(), title: action.title, isDone: false},...state[action.todolistId]]
        }
        case "CHANGE-TASK":
           {
                // ...state,
                // [action.todolistId]:state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone:action.isDone}: t)

                const stateCopy = {...state}
                let tasks = stateCopy[action.todolistId]
                stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone:action.isDone}: t)
               return  stateCopy
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el, title: action.updateTitle} : el)
            }
        case "ADD-TODOLIST": {
            // const stateCopy = {...state}
            // stateCopy[v1()] = []
            // return stateCopy
            return  {
                ...state, [action.payload.todolistId]:[]
            }
        }
        case "REMOVE-TODOLIST":
            let {[action.payload.id]: [], ...rest} = {...state}
            let copyState = {...state}
            delete copyState[action.payload.id]
            return rest

        default: return state
    }

}

type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskACType | ChangeTaskTitleACType | AddTodolistACType | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC >



export const removeTaskAC = (taskId:string, todolistId:string) => {
    return { type: 'REMOVE-TASK',
          taskId, todolistId
    } as const
}

export const addTaskAC = (title:string, todolistId:string) => {
    return { type: 'ADD-TASK',
       title, todolistId
    } as const
}


export const changeTaskStatusAC = ( taskId:string, isDone: boolean, todolistId:string) => {
    return { type: 'CHANGE-TASK',
        taskId, isDone, todolistId
    } as const
}

export const changeTaskTitleAC = ( todolistId: string, taskId: string, updateTitle: string) => {
    return { type: 'CHANGE-TASK-TITLE',
        todolistId,  taskId,  updateTitle
    } as const
}

