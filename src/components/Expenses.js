import React, { Component } from 'react'
import './Expenses.css'
import ExpenseItem from "./ExpenseItem"

export default class Expenses extends Component {
    constructor(props) {
        super(props)
        this.expenses = this.props.expenses
    }
    render() {
        return (
            <div className="expenses">
                {this.expenses.map((expense, i) => {
                    return <ExpenseItem id={expense.id} key={i} title={expense.title} amount={expense.amt} date={expense.date} />
                })} 
            </div>
        )
    }
}
