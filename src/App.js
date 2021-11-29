import ExpenseItem from "./components/ExpenseItem"

function App() {
  const expenses = [
    {id: 'e1', title: 'Car Insurance', amt: 80.00, date: new Date(2021, 10, 15).toDateString()},
    {id: 'e2', title: 'Property Tax', amt: 252, date: new Date(2021, 10, 21).toDateString()},
    {id: 'e3', title: 'Credit Card Bill', amt: 308.33, date: new Date(2021, 10, 22).toDateString()},
    {id: 'e4', title: 'Groceries', amt: 74.32, date: new Date(2021, 10, 22).toDateString()},
  ]
  return (
    <div>
      <h2>Let's get started!</h2>
      {expenses.map((expense, i) => {
        return <ExpenseItem id={expense.id} key={i} title={expense.title} amount={expense.amt} date={expense.date}></ExpenseItem>
      })}
    </div>
  );
}

export default App;
