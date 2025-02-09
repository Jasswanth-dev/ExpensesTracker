import "./index.css"

const Footer = (props) => {
    const {handleAddExpense, handleAddIncome, totalIncome, totalExpenses, balance} = props
    return (
    <footer className="footer">
        <div className="expenses-btns text-center d-flex justify-content-around">
            <button type="button" onClick={() => handleAddIncome()} className="btn btn-outline-success custom-btn-style w-50">
                Add Income
            </button>
            <button type="button" onClick={() => handleAddExpense()} className="btn btn-outline-danger custom-btn-style w-50">
                Add Expenses
            </button>
        </div>
        <div className="d-flex justify-content-around calculation-container">
            <div className="m-1">
                <p className="m-0">Income: <span className="income">{totalIncome}</span></p>
                <p className="m-0">Expenses: <span className="expenses">{totalExpenses}</span></p>
            </div>
            <hr/>
            <div className="m-1">
                <p className="m-0">Balance</p>
                <h4 className={`m-0 text-right ${balance < 0 ? "expeses" : "income"}`}>{balance}</h4>
            </div>

        </div>
        
    </footer>
)}

export default Footer;