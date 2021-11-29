import './Expenses.css'
import ExpenseItem from "../Expenses/ExpenseItem"
import Card from '../UI/Card'

const Expenses = (props) => {
    const expenses = props.expenses
    return (
        <Card className="expenses">
            {expenses.map((expense, i) => {
                return <ExpenseItem id={expense.id} key={i} title={expense.title} amount={expense.amt} date={expense.date} />
            })} 
        </Card>
    )
}

export default Expenses
