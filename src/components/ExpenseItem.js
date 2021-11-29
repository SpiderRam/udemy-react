import React, { Component } from 'react'
import './ExpenseItem.css'

export default class ExpenseItem extends Component {
    constructor(props) {
        super(props)
        this.expenseDate = () => {
            const bits = props.date.split(' ')
            return `${bits[1]} ${bits[2]}, ${bits[3]}`
        }
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
                <div>{this.expenseDate()}</div>
                <div className="expense-item__description">
                    <h2>{this.expenseTitle}</h2>
                    <div className="expense-item__price">{this.expenseAmount()}</div>
                </div>
            </div>
        )
    }
}
