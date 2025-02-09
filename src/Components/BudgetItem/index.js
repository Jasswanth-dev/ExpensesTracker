import { MdOutlineDelete } from "react-icons/md";
import "./index.css"

const BudgetItem = (props) => {
    const {details,deleteBudget, updateText, updateAmount, updateDate, calculateExpenses} = props
    const {type,id,amount, text, date} = details;

    const handleDateChange = (event) => {
        updateDate(event.target.value, id)
    }

    const handleDeleteBudget = () => {
        deleteBudget(id)
    }

    const changeInText = (event) => {
        updateText(event.target.value, id)
    }

    const changeInAmount = (event) => {
        updateAmount(event.target.value, id)
    }

    return (
        <li className={`budget-list-item ${type} d-flex align-items-center mb-2`}>
            <input placeholder={type === "income" ? "eg: Salary" : "eg: Groceries"} type="text" className={`input-element ${type} w-75 text-left`} value={text} onChange={changeInText}/>
            <hr className="splitter"/>
            <div className="d-flex align-items-center amount-container">
                <span className={`${type}`}>{type === "expenses"? "-" : "+"}</span>
                <input type="number" className={`input-element ${type} text-right`} placeholder="Amount" value={amount} onChange={changeInAmount} onBlur={() => calculateExpenses()}/>
            </div>
            <hr className="splitter"/>
            <div className="d-flex align-items-center date-container">
                <input id="date" type="date" className="input-element date" onChange={handleDateChange} value={date}/>
            </div>
            
            
            <hr className="splitter"/>
            <button type="button" className="btn delete-btn" onClick={handleDeleteBudget}><MdOutlineDelete/></button>
        </li>
    )
}

export default BudgetItem;