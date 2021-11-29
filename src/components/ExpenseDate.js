import React, { Component } from 'react'
import './ExpenseDate.css'

export default class ExpenseDate extends Component {
    constructor(props) {
        super(props)
        this.month = props.date.toLocaleString('en-US', { month: 'long' })
        this.day = props.date.toLocaleString('en-US', { day: '2-digit' })
        this.year = props.date.getFullYear()
    }
    render() {
        return (
            <div className="expense-date">
                <div className="expense-date__month">{this.month}</div>
                <div className="expense-date__day">{this.day}</div>
                <div className="expense-date__year">{this.year}</div>
            </div>
        )
    }
}
