import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import "./index.css"

const BudgetItem = (props) => {
    const {details, deleteItem, updateText, updateAmount, updateDate} = props
    const {type,id,amount, text, date} = details;
    const [showMenu, setShowMenu] = useState(false);

    // selectedCategoryId is passed from the parent Budget component
    const { selectedCategoryId } = props; 

    const handleDateChange = (event) => {
        updateDate(event.target.value, id, selectedCategoryId)
    }

    const handleDeleteItem = () => {
        deleteItem(id, selectedCategoryId)
        setShowMenu(false);
    }

    const changeInText = (event) => {
        updateText(event.target.value, id, selectedCategoryId)
    }

    const changeInAmount = (event) => {
        updateAmount(event.target.value, id, selectedCategoryId)
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <li className={`budget-list-item ${type}`}>
            <input placeholder={type === "income" ? "eg: Salary" : "eg: Groceries"} type="text" className="input-element" value={text} onChange={changeInText}/>
            <div className="amount-container">
                <span className={type}>{type === "expense"? "-" : "+"}</span>
                <input type="number" className="input-element" placeholder="Amount" value={amount} onChange={changeInAmount}/>
            </div>
            <input id="date" type="date" className="input-element date" onChange={handleDateChange} value={date}/>
            <div className="menu-container">
                <button type="button" className="menu-btn" onClick={toggleMenu}><FiMoreVertical/></button>
                {showMenu && (
                    <div className="menu">
                        <button type="button" className="menu-item" onClick={handleDeleteItem}>
                            <MdOutlineDelete/> Delete
                        </button>
                    </div>
                )}
            </div>
        </li>
    )
}

export default BudgetItem;