import Expenses from "./components/Expenses/Expenses"
import NewExpense from "./components/NewExpense/NewExpense"

function App() {
  const addExpenseHandler = (expense) => {
    console.log('In App.js:', expense)
  }
  
  const expenses = [
    {id: 'e1', title: 'Car Insurance', amt: 80.00, date: new Date(2021, 10, 15)},
    {id: 'e2', title: 'Property Tax', amt: 252, date: new Date(2021, 10, 21)},
    {id: 'e3', title: 'Credit Card Bill', amt: 308.33, date: new Date(2021, 10, 22)},
    {id: 'e4', title: 'Groceries', amt: 74.32, date: new Date(2021, 10, 22)},
  ]
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
