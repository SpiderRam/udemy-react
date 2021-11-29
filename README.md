# ONE

> Covers sections 28-

## Issues encountered:

- You _should_ be able to run `npx create-react-app appName --use-npm`, but it seemed to be broken with the use-npm flag.
  - When googling the error, found several suggestions to run `npm cache clean --force`.  npm docs indicated it would have no effect, which turned out to be true.
  - Omitting the flag, create-react-app worked as expected.  For the purposes of this course, I deleted the yarn-lock file and ran `npm i`, and the app is running as expected -- though npm is already flagging vulnerable dependencies.
  - Would like to investigate this further in the future, it should work as described in the docs.

## Notes:

- casing:
  - by convention, file names are in Pascal case
  - it is required that custom component tag names are in Pascal case, to distinguish them from built in tags.
    ```javascript
    import ExpenseItem from "./components/ExpenseItem"

    function App() {
      return (
        <div>
          <h2>Let's get started!</h2>
          <ExpenseItem></ExpenseItem>
        </div>
      );
    }
    ```
- all JSX code returned by a component must be inside a single tag
  - Option 1: wrap all component code in a \<div> tag
  - Option 2:

## Extras

- commit e643a21:
  - Used `toDateString()` to format dates
  - Used `Intl.NumberFormat()` to format amounts