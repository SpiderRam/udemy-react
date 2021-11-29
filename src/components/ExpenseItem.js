import React, { Component } from 'react'
import './ExpenseItem.css'
import './ExpenseDate'
import ExpenseDate from './ExpenseDate'

export default class ExpenseItem extends Component {
    constructor(props) {
        super(props)
        this.expenseTitle = props.title
        this.expenseAmount = () => {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            })
            return formatter.format(props.amount)
        }
    }
    render() {
        return (
            <div className="expense-item">
                <ExpenseDate date={this.props.date} />
                <div className="expense-item__description">
                    <h2>{this.expenseTitle}</h2>
                    <div className="expense-item__price">{this.expenseAmount()}</div>
                </div>
            </div>
        )
    }
}
