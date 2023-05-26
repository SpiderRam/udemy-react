import {useState} from 'react'
import './NewExpense.css'
import ExpenseForm from './ExpenseForm'

const NewExpense = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const onSaveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        }
        props.onAddExpense(expenseData)
        stopEditingHandler()
    }

    const startEditingHandler = () => setIsEditing(true)
    const stopEditingHandler = () => setIsEditing(false)
    
    return <div className="new-expense">
        {isEditing
            ? <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} onCancel={stopEditingHandler} />
            : <button onClick={startEditingHandler}>Add New Expense</button>
        }
    </div>
}

export default NewExpense