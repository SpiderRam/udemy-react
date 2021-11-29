# ONE

> Covers sections 28-

## Issues encountered:

- You _should_ be able to run `npx create-react-app appName --use-npm`, but it seemed to be broken with the use-npm flag.
  - When googling the error, found several suggestions to run `npm cache clean --force`.  npm docs indicated it would have no effect, which turned out to be true.
  - Omitting the flag, create-react-app worked as expected.  For the purposes of this course, I deleted the yarn-lock file and ran `npm i`, and the app is running as expected -- though npm is already flagging vulnerable dependencies.
  - Would like to investigate this further in the future, it should work as described in the docs.

## Notes:

### Functional vs. Class Components

Originally, I was letting my snippets extension create class components for me, because #lazy, and because it is more familiar to me.  But I began to wonder if the syntax used in the course was intentional and potentially advantageous.

After realizing that the functional component is more recent and intentional, I switched my syntax to match that used in the course.  One helpful article is [here](https://www.telerik.com/blogs/react-class-component-vs-functional-component-how-choose-whats-difference).

### Casing
- by convention, file names are in Pascal case
- it is required that custom component tag names are in Pascal case, to distinguish them from built in tags.

### Composition

- In order to render content with a custom tag, you must use props.children.
- `className` is a reserved keyword that works on elements like `<div>`, but for custom components, you must configure them to apply a value passed that way.

Example: Card.js
```javascript
export default class Card extends Component {
    constructor(props) {
        super(props)
        this.classList = 'card ' + props.className
    }
    render() {
        return (
            <div className={this.classList}>{this.props.children}</div>
        )
    }
}

// in Expenses.js:
    render() {
        return (
            <Card className="expenses">
                {this.expenses.map((expense, i) => {
                    return <ExpenseItem id={expense.id} key={i} title={expense.title} amount={expense.amt} date={expense.date} />
                })} 
            </Card>
        )
    }
```


## Extras

- commit e643a21:
  - Used `toDateString()` to format dates
  - Used `Intl.NumberFormat()` to format amounts