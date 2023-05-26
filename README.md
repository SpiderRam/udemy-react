# THREE

> Covers sections 63-72 Rendering Lists and Conditional Content

---

## Keys

Any element may be given a `key` prop in a React app - whether it is a custom component or a built-in HTML element.

In some cases, the `key` prop is _required_ by React. Specifically, when rendering lists.

-   [React docs](https://reactjs.org/docs/lists-and-keys.html)
-   The key should be a unique, stable string.
-   The key must be unique within the single array, not the entire app.
-   The purpose of the key is to enable React to keep track of the specific array element, even as the order or length of the array changes.
-   If no other value is available, you can use the index as the key, but this is discouraged, as the index can also change when the array is mutated.

As seen in Expenses.js:

Best practice:

```javascript
{
    expenses.map((expense) => {
        return (
            <ExpenseItem
                key={expense.id}
                title={expense.title}
                amount={expense.amt}
                date={expense.date}
            />
        );
    });
}
```

Discouraged practice:

```javascript
{
    expenses.map((expense, index) => {
        return (
            <ExpenseItem
                key={index}
                title={expense.title}
                amount={expense.amt}
                date={expense.date}
            />
        );
    });
}
```

## Conditionals

-   For loops and if/else statements are not allowed in JSX, but ternary expressions are.
-   JS trick for keeping conditions brief: if the preceding condition(s) are met in a combined condition, the last condition will be returned.

    -   For example, in the expression `(a > 0 && a < 10)`, what is actually returned from that is `a < 10`, which compiles to true.
    -   So in the expression `(isLoaded && <p>Hello World!</p>)`, the html is what is returned, hence the shortcut shown below.

        Example - these will both render the same effect:

        ```javascript
        // Using ternary
        {
            filteredExpenses(expenses).length === 0 ? (
                <p>{zeroMessage}</p>
            ) : (
                filteredExpenses(expenses).map((expense) => {
                    return <ExpenseItem key={expense.id} />;
                })
            );
        }
        ```

        ```javascript
        // Using shortcut
        {
            filteredExpenses(expenses).length === 0 && <p>{zeroMessage}</p>;
        }
        {
            filteredExpenses(expenses).length > 0 &&
                filteredExpenses(expenses).map((expense) => {
                    return <ExpenseItem key={expense.id} />;
                });
        }
        ```

-   Complex logic is better done outside of the JSX template, however, as with `expensesContent` in Expenses.js.
