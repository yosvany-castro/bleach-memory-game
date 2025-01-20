import "./taskAdd.css"
import { useState } from "react"

function TaskForm({onSubmit, inputValue, inputValueState}) {
    return (
            <form onSubmit={onSubmit} 
            className="formularios">
                <input type="text" name="task" id="task" onChange={inputValue} value={inputValueState}/>
                <Button>
                    Agregar tareas
                </Button>
            </form>
    )
}

function Button({children}) {
    return (
        <button type="submit">
            {children}
        </button>
    )
}

export default function TaskList() {
    const [taskList, SetTaskList] = useState([]);
    const [task, SetTask] = useState("")

    function handleSubmit(e) {
        if (task.trim() === "") return e.preventDefault();
        e.preventDefault()
        SetTaskList([
            ...taskList,
            task
        ]);
        SetTask("")

    }

    function handleChangeInput(e) {
        SetTask(e.target.value)
    }
    return (
        <>
            <TaskForm 
            onSubmit={handleSubmit} 
            inputValue={handleChangeInput}
            inputValueState={task}
            ></TaskForm>
            <ol>
                {taskList.map((e) => {
                    return <li>{e}</li>
                })}
            </ol>
        </>

    )
}