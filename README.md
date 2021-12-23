# THREE

> Covers sections 63-

___
## Keys

Any element may be given a `key` prop in a React app - whether it is a custom component or a built-in HTML element.

In some cases, the `key` prop is _required_ by React.  Specifically, when rendering lists.

- [React docs](https://reactjs.org/docs/lists-and-keys.html)
- The key should be a unique, stable string.
- The key must be unique within the single array, not the entire app.
- The purpose of the key is to enable React to keep track of the specific array element, even as the order or length of the array changes.
- If no other value is available, you can use the index as the key, but this is discouraged, as the index can also change when the array is mutated.

As seen in Expenses.js:

Best practice:
```javascript
{expenses.map((expense) => {
    return <ExpenseItem 
        key={expense.id}
        title={expense.title}
        amount={expense.amt}
        date={expense.date}
    />
})}
```

Discouraged practice:
```javascript
{expenses.map((expense, index) => {
    return <ExpenseItem 
        key={index}
        title={expense.title}
        amount={expense.amt}
        date={expense.date}
    />
})}
```
