import {useReducer} from "react";
import {TodolistType} from "../App";
import {v1} from "uuid";
import {FilterValuesType} from "../AppWithReducer";


let todolistId1 = v1()
let todolistId2 = v1()

const initialState:Array<TodolistType> = [
    // {id: todolistId1, title: "Where to fly", filter: "all"},
    // {id: todolistId2, title: "What to eat", filter: "all"}
]

export const  todolistReducer = (state:Array<TodolistType> =  initialState, action: ActionsType):Array<TodolistType> => {
    switch (action.type) {
        case'REMOVE-TODOLIST': {
            return state.filter(el=> el.id!== action.payload.id )
        }
        case 'ADD-TODOLIST': {
            const newTodolistId = v1()
            const newTodo: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: "all"}
            // setTodolists([newTodo, ...todolists])
            // setTasks({...tasks, [newTodolistId]: []})
            return [...state, newTodo]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return  state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            // let todolist = todolists.find(tl => tl.id === todolistId);
            // if (todolist) {
            //     todolist.filter = value;
            //     setTodolists([...todolists])
            // }
            return state.map(el=> el.id === action.payload.id ? {...el,filter:action.payload.filter} : el)
        }
        default: return state
    }

}

export type ActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType| ChangeTodolistFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC=(todolistId:string)=> {
    return { type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId
        }
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC=(newTodolistTitle:string)=> {
    return {
        type: 'ADD-TODOLIST',
        payload:{
            title: newTodolistTitle, todolistId: v1()
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof  changeTodolistTitleAC >
export const changeTodolistTitleAC =(id:string, title:string)=> {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            // id: id,
            // title: title
            id, title
        }
    } as const
}
type ChangeTodolistFilterACType = ReturnType<typeof  changeTodolistFilterAC >
export const changeTodolistFilterAC = (filter:FilterValuesType, id:string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            // id: id,
            // filter: filter
            filter, id
        }
    } as const
}