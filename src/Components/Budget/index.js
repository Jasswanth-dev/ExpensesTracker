import { Component } from "react"
import {v4 as uuidv4} from "uuid"
import Footer from "../Footer"
import BudgetItem from "../BudgetItem"

import "./index.css"

class Budget extends Component {
    state = {budgets: [], income: 0, expenses:0, balance: 0}

    componentDidMount() {
        this.calculateExpenses()
    }

    calculateExpenses = () =>{
        const {budgets} = this.state;

        let totalIncome = 0
        let totalExpenses = 0
        let totalBalance = 0

        budgets.map(eachBuget => {
            if(eachBuget.type === "expenses") {
                totalExpenses += eachBuget.amount
            }else{
                totalIncome += eachBuget.amount
            }
            return eachBuget
        })
        totalBalance = totalIncome - totalExpenses
        this.setState({income: totalIncome, balance: totalBalance, expenses: totalExpenses})
    }

    findBudget = (id) => {
        const {budgets} = this.state;
        return budgets.find(each => each.id === id)
    }

    updateText = (value,id) => {
        const {budgets} = this.state;

        //finding the budget with given id and updating its text
        const budget = this.findBudget(id)
        budget.text = value

        //generating new budget list
        const newBudgets = budgets.map(each => {
            if(each.id === id) {
                return budget
            }
            return each
        })

        //updates to latest budgets List to the state
        this.setState({budgets: newBudgets})
    }

    updateAmount = (value,id) => {
        const {budgets} = this.state;

        //finding the budget with given id and updating its text
        const budget = this.findBudget(id)
        budget.amount = parseInt(value)

        //generating new budget list
        const newBudgets = budgets.map(each => {
            if(each.id === id) {
                return budget
            }
            return each
        })

        //updates to latest budgets List to the state
        this.setState({budgets: newBudgets})
    }

    updateDate = (value,id) => {
        const {budgets} = this.state;

        //finding the budget with given id and updating its text
        const budget = this.findBudget(id)
        budget.date = value

        //generating new budget list
        const newBudgets = budgets.map(each => {
            if(each.id === id) {
                return budget
            }
            return each
        })

        //updates to latest budgets List to the state
        this.setState({budgets: newBudgets})
    }

    handleAddIncome = () => {
        const newBudgets = [...this.state.budgets, {id: uuidv4(), text: "", amount: "", type: "income"}]
        this.setState({budgets: newBudgets})
    }

    handleAddExpense = () => {
        const newBudgets = [...this.state.budgets, {id: uuidv4(), text: "", amount: "", type: "expenses"}]
        this.setState({budgets: newBudgets})
    }

    deleteBudget = async (id) => {
        const {budgets} = this.state
        const updatedBudgets = budgets.filter(each => each.id!== id)
        await this.setState({budgets: updatedBudgets})
        this.calculateExpenses()
    }


    render() {
        const {budgets,income,expenses,balance} = this.state
        return (
            <div>
                <ul className="budgets-unordered-list">
                    {budgets.map(each => (<BudgetItem key={each.id} details={each} deleteBudget={this.deleteBudget} updateText={this.updateText} updateAmount={this.updateAmount} updateDate={this.updateDate} calculateExpenses={this.calculateExpenses}/>))}
                </ul>
                <Footer handleAddExpense={this.handleAddExpense} handleAddIncome={this.handleAddIncome} totalIncome={income} totalExpenses={expenses} balance={balance}/>
            </div>
        )
    }
}

export default Budget;