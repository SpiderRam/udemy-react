import { React, useState } from 'react'
import './Expenses.css'
import ExpenseItem from "../Expenses/ExpenseItem"
import Card from '../UI/Card'
import ExpensesFilter from './ExpensesFilter'

const Expenses = (props) => {
    const expenses = props.expenses
    const filteredExpenses = exps => {
        if(selectedYear === 'All') {
            return expenses
        } else {
            return exps.filter(expense => {
                return String(expense.date.getFullYear()) === selectedYear
            })
        }
    }

    const [selectedYear, setSelectedYear] = useState('All')
    const yearSelectedHandler = (year) => {
        setSelectedYear(year)
    }
    
    return (
        <div>
            <Card className="expenses">
            <ExpensesFilter year={selectedYear} onYearSelected={yearSelectedHandler} />
            {filteredExpenses(expenses).map((expense) => {
                return <ExpenseItem key={expense.id} title={expense.title} amount={expense.amt} date={expense.date} />
            })} 
            </Card>
        </div>
    )
}

export default Expenses
