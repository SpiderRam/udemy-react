import { React, useState} from 'react'
import './Expenses.css'
import ExpenseItem from "../Expenses/ExpenseItem"
import Card from '../UI/Card'
import ExpensesFilter from './ExpensesFilter'

const Expenses = (props) => {
    const expenses = props.expenses

    const [selectedYear, setSelectedYear] = useState('2021')
    const yearSelectedHandler = (year) => {
        setSelectedYear(year)
    }
    console.log(selectedYear)
    
    return (
        <div>
            <Card className="expenses">
            <ExpensesFilter year={selectedYear} onYearSelected={yearSelectedHandler} />
                {expenses.map((expense, i) => {
                    return <ExpenseItem id={expense.id} key={i} title={expense.title} amount={expense.amt} date={expense.date} />
                })} 
            </Card>
        </div>
    )
}

export default Expenses
