# udemy-react

> Section 10 (116-119): `useReducer`

> Section 10 (120-125): Context API

> Section 10 (126-128): Rules of hooks, `forwardRef`, `useImperativeHandle`

---

## useState vs. useReducer

There is no hard rule or clear wrong or right about when to use one or the other. But in general, you need to use `useReducer` if `useState` has become cumbersome or you're getting a lot of bugs or unintended behaviors.

<!-- prettier-ignore-start -->
| `useState` | `useReducer` |
| ----------- | ----------- |
| The primary state management tool. | Great if you need more 'power'. |
| Great for independent pieces of state/data. | Ideal when you have related pieces of state/data. |
| Great if state updates are easy and limited to a few kinds of updates. | Helpful when you have more complex state updates |
<!-- prettier-ignore-end -->

---

## Context API

The React context API allows you to avoid prop forwarding. It is component-wide, behind the scenes state storage.

For example, in the starter code of this project, the `<App />` component sent the `isLoggedIn` and `onLogout` props to `<MainHeader />`. That component has no use for those props, it only forwarded them to `<Navigation />`, where they are needed.

In a case as simple as this, that is not awful, but in more complex apps this pattern would become obnoxious very quickly.

### Slightly more complex example

Given a structure such as this:

```mermaid
  graph TD
    App[App]
    Auth[Auth]
    Shop[Shop]
    Cart[Cart]
    LoginForm[LoginForm]
    Products[Products]
    Product[Product]

    App --> Auth
    App --> Shop
    App --> Cart
    Auth --> LoginForm
    Shop --> Products
    Products --> Product
```

The Cart component would likely need data from both the LoginForm and the Product components. But this component structure means there is no immediate connection between them.

Passing that data up through the tree and over and down into the Cart would be 🙄.

Using React context, that data can be made available to the Cart from its sibling/cousin components as needed.

### Solution

You can create any number of contexts (i.e. [src/store/auth-context.js](src/store/auth-context.js)).

```js
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
});

export default AuthContext;
```

Import that context, and wrap any component which will need the values it provides. Notes:

-   children of the wrapped component can also access the provided values.
-   the wrapper around the element _providing_ the context to components must implement the `.Provider` element. `AuthContext` itself not a valid jsx element.
-   code not shown in this repo, but some of the logic and features can be moved to a custom content provider component; see lesson 124 for details.

```js
import AuthContext from './store/auth-context'

...

const [isLoggedIn, setIsLoggedIn] = useState(false)
...

return (
    <AuthContext.Provider value={{isLoggedIn, onLogout: logoutHandler}}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  )
```

And the child component which requires the _provided_ value can now access it and _consume_ it directly, instead of the value being passed via props through the MainHeader, which did not have a need for it at all.

There are two viable options for consuming a context:

-   `useContext`
-   `<AuthContext.Consumer>`
    -   NOTE: this approach will work, but it is not the most elegant option. Generally, it is better to use the `useContext` hook.

```js
import AuthContext from '../../store/auth-context'
import {useContext} from 'react'

const Navigation = () => {
  // the useContext hook (best option)
  const context = useContext(AuthContext)

    return (
      // the .Consumer element (acceptable option)
        // <AuthContext.Consumer>
        //     {(context) => {
                return (
                    <nav className={classes.nav}>
                        <ul>
                            {context.isLoggedIn && (
                                <li>
                                    <a href="/">Users</a>
                                </li>
                            )}
                            {context.isLoggedIn && (
                                <li>
                                    <a href="/">Admin</a>
                                </li>
                            )}
                            {context.isLoggedIn && (
                                <li>
                                    <button onClick={context.onLogout}>
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                )
            // }}
        // </AuthContext.Consumer>
    )
}
```

### Limitations

Don't overuse Context. Things to keep in mind:

-   It is not optimized for high frequency changes.
    -   Values that change multiple times per second should not be managed via context.
    -   Redux is the tool for these kinds of changes, instead.
-   Context should not be used to replace all communications and props.
    -   Even short prop chains might be acceptable, evaluate on a case by case basis.

---

## useImperativeHandle

> Example: focusing with `useRef`

If you have a reusable input component, and you want to control the focus behavior of its instances, the usual way is to call that method in the parent.

```js
/** parent */

const emailRef = useRef()

// in handler
emailRef.current.focus()

<Input
    inputRef={emailRef}
/>
```

```js
/** custom input component */

<input ref={props.inputRef} />
```

You can alternatively use a hook called `useImperativeHandle` in conjunction with `forwardRef` to expose custom methods or properties.

🚩 NOTE: this hook should rarely if ever be used. This example is only to show a working implementation.

```js
/** parent */

const emailRef = useRef()

// in handler
emailRef.current.focusField() // <-- 🔶 now using custom name

<Input
    ref={emailRef} // <-- 🔶 now `ref`, not `inputRef`
/>
```

```js
/** custom input component */
import { forwardRef, useImperativeHandle, useRef } from 'react'

const Input = (props, ref) => { // <-- 🔶 IMPORTANT: rare use of optional second arg
    const inputRef = useRef()

    const activate = () => {
        inputRef.current.focus()
    }

    /**
     * @param ref The first param is the ref you are overriding. The second arg
     * of the component function is the ref that would normally be assigned to it.
     *
     * @param () => {} A method which will return any methods or values
     * your component needs to expose.
     *
     * @param [] Optional third arg: a dependency array which works exactly the
     * same way as that of `useEffect`.  If null, method runs on every render.
    */
    useImperativeHandle(ref, () => { // <-- 🔶 must return an object
        return {
            focusField: activate // <-- 🔶 names can be anything
        }
    })

    <input
        ref={inputRef} // <-- 🔶 now `inputRef`, not `props.inputRef`
    />
}

export default forwardRef(Input) // <-- 🔶 IMPORTANT: component function must be wrapped with `forwardRef`
```

---

## Rules of Hooks

-   Only call react hooks in react function components, or custom hooks.
-   Only call react hooks at the top level of these. Do not call in block statements or nested functions. For example:
    -   you cannot use another hook inside of a useEffect method.
    -   you cannot use a hook inside of an if block.
