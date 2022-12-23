import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


type PropsType = {
    callBack: (newTitle: string) => void
}

export const Input = React.memo ((props: PropsType) => {
    console.log('Input')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error)
        {
            setError(null);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label={error ? "Title is required" : 'type here'}
                       variant="outlined" value={title}
                       onChange={onChangeHandler}
                       size={'small'}
                       error={!!error}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}/>


            <Button onClick={addTask}
                    variant="contained"
                    size="small"
                    style={{maxWidth: '39px', maxHeight: '39px', minWidth: '39px', minHeight: '39px'}}
            >+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
})

