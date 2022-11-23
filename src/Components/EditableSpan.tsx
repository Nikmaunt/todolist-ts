import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType ={
    callback: (newTitle:string) => void
    title:string
}

export const EditableSpan = (props:EditableSpanPropsType) => {
    const [updateTitle, setUpdateTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
   const onDoubleClickHandler = () => {
        setEdit(!edit)
       addTask()
   }

    const addTask = () => {
            props.callback(updateTitle);
    }



    return (
        edit
        ? <input onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus value={updateTitle}/>
     :
            <span onDoubleClick={ onDoubleClickHandler}>{props.title}</span>

    );
};

export default EditableSpan;