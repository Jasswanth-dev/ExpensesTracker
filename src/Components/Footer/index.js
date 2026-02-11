import "./index.css"

const Footer = (props) => {
    const {totalIncome, totalExpenses, balance} = props
    return (
        <footer className="footer">
            <div className="calculation-container">
                <h5>Income</h5>
                <p className="income">+{totalIncome}</p>
            </div>
            <div className="calculation-container">
                <h5>Expenses</h5>
                <p className="expenses">-{totalExpenses}</p>
            </div>
            <div className="calculation-container">
                <h5>Balance</h5>
                <p className={balance < 0 ? "expenses" : "income"}>{balance}</p>
            </div>
        </footer>
    )}

export default Footer;