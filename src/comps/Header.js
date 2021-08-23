import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";

const Header = ({onAdd, showAddTask}) => {

    return (
        <header>
            <h1>Pin<span>Task</span></h1>
            <button 
                className={`btn ${showAddTask ? 'close' : 'open'}`}
                onClick={onAdd}
            >
                {showAddTask ? 'Close' : 'Add'}
                {showAddTask ? <IoIosCloseCircleOutline className="icon"/> : <IoIosAddCircleOutline className="icon"/>}
            </button>
        </header>
    )
}

export default Header
