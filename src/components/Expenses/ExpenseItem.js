import React, { useState } from 'react'
import './ExpenseItem.css'
import './ExpenseDate'
import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'

const ExpenseItem = (props) => {
    const [expenseTitle, setExpenseTitle] = useState(props.title)

    const expenseAmount = () => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        return formatter.format(props.amount)
    }
    const onChangeTitle = (e) => {
        setExpenseTitle('UPDATED')
    }

    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date} />
            <div className="expense-item__description">
                <h2>{expenseTitle}</h2>
                <div className="expense-item__price">{expenseAmount()}</div>
                <button onClick={onChangeTitle}>Change Title</button>
            </div>
        </Card>
    )
}

export default ExpenseItem
