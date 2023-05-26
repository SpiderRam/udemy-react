import { React, useState } from 'react'
import './Expenses.css'
import ExpenseItem from "../Expenses/ExpenseItem"
import Card from '../UI/Card'
import ExpensesFilter from './ExpensesFilter'
import ExpensesChart from './ExpensesChart'

const Expenses = (props) => {
    const [selectedYear, setSelectedYear] = useState('All')
    const yearSelectedHandler = (year) => {
        setSelectedYear(year)
    }
    
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

    const zeroMessage = selectedYear === 'All' ? `No expenses found.` : `No expenses found for ${selectedYear}.`
    let expensesContent = <p>{zeroMessage}</p>

    if (filteredExpenses(expenses).length > 0) {
        expensesContent = filteredExpenses(expenses).length > 0 && filteredExpenses(expenses).map((expense) => {
            return <ExpenseItem key={expense.id} title={expense.title} amount={expense.amt} date={expense.date} />
        })
    }

    const exps = filteredExpenses(expenses)
    
    return (
        <div>
            <Card className="expenses">
            <ExpensesFilter year={selectedYear} onYearSelected={yearSelectedHandler} />
            <ExpensesChart expenses={exps} />
            {expensesContent}
            </Card>
        </div>
    )
}

export default Expenses
