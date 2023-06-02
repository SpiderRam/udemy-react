import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// The redundant reducers here could be combined into one
// reducer for the entire form, this will be part of a 
// future lesson.

const emailReducer = (stateSnapshot, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: stateSnapshot.value,
      isValid: stateSnapshot.value.includes('@')
    }
  }
  return {
    value: '',
    isValid: false
  }
}

const passwordReducer = (stateSnapshot, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: stateSnapshot.value,
      isValid: stateSnapshot.value.trim().length > 6
    }
  }
  return {
    value: '',
    isValid: false
  }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false
  })

  // alias assignment
  const {isValid: emailIsValid} = emailState
  const {isValid: passwordIsValid} = passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  // This would work just as well:
  // }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
