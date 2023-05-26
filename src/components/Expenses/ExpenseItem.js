import './ExpenseItem.css'
import './ExpenseDate'
import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'

const ExpenseItem = (props) => {
    const expenseAmount = () => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        return formatter.format(props.amount)
    }

    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date} />
            <li className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">{expenseAmount()}</div>
            </li>
        </Card>
    )
}

export default ExpenseItem
