// import { FaTimes } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'


const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.complete ? 'complete' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <div className="task-text">
                <h3>{task.text}</h3>
                <p>{task.day}</p>
            </div>
            <IoCloseOutline className="close-icon" onClick={() => onDelete(task.id)}/>
        </div>
    )
}

export default Task
