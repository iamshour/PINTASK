import { useState } from "react"

const AddTask = ({onAdd}) => {

    const [text, setText] = useState('');
    const [day, setDay] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text) {
            alert('Please add a task')
            return
        }

        onAdd({text, day})

        setText('')
        setDay('')
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="row">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="row">
                <label>Date</label>
                <input type="date" placeholder="Add Day &amp; Time" value={day} onChange={(e) => setDay(e.target.value)}/>
            </div>
            <input type="submit" value="Save Task" />
        </form>
    )
}

export default AddTask
