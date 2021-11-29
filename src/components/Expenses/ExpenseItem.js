import './ExpenseItem.css'
import './ExpenseDate'
import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'

const ExpenseItem = (props) => {
    const expenseTitle = props.title
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
            <div className="expense-item__description">
                <h2>{expenseTitle}</h2>
                <div className="expense-item__price">{expenseAmount()}</div>
            </div>
        </Card>
    )
}

export default ExpenseItem
