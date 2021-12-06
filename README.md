# TWO

> Covers sections 46-

## Issues encountered:

## Notes:

### `useState(props.prop)`
```javascript
import React, { useState } from 'react'
```

`useState` is a React hook - [docs](https://reactjs.org/docs/hooks-state.html#declaring-a-state-variable)

Basic usage is in [Expenses/ExpenseItem.js](src/components/Expenses/ExpenseItem.js)

For managing multiple properties at once, alternate syntax (not commonly used):
```javascript
// _____ Most common approach: define props independently _____
// const [enteredTitle, setEnteredTitle] = useState('')
// const [enteredAmount, setEnteredAmount] = useState('')
// const [enteredDate, setEnteredDate] = useState('')

// const titleChangeHandler  = (e) => { setEnteredTitle(e.target.value) }
// const amountChangeHandler  = (e) => { setEnteredAmount(e.target.value) }
// const dateChangeHandler  = (e) => { setEnteredDate(e.target.value) }

// _____ Alternate syntax _____

// create reference
const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredDate: '',
    enteredAmount: ''
})

// define method
const inputChangeHandler = (e) => {
    // _____ will usually work but but may fail (stale reference), bad practice _____
    // setUserInput({
    //     ...userInput,
    //     [e.target.id]: e.target.value
    // })

    // _____ preferred syntax when you must depend on previous state _____
    setUserInput((prevState) => {
        return { ...prevState, [e.target.id]: e.target.value }
    })
}

// set listeners
<div className="new-expense__control">
    <label>Title</label>
    <input id="enteredTitle" type="text" onChange={inputChangeHandler} />
</div>
<div className="new-expense__control">
    <label>Amount</label>
    <input id="enteredAmount" type="number" onChange={inputChangeHandler} min="0.01" step="0.01" />
</div>
<div className="new-expense__control">
    <label>Date</label>
    <input id="enteredDate" type="date" onChange={inputChangeHandler} min="2019-01-01" max="2022-12-31" />
</div>

```

## Extras
