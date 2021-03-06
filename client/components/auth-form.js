import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Button, Form} from 'semantic-ui-react'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const nameField = (
    <div>
      <Form.Field width={12}>
        <label htmlFor="name">
          <small>name</small>
        </label>
        <input name="fullName" type="text" />
      </Form.Field>
    </div>
  )
  const isSignUpForm = displayName === 'Sign Up' ? nameField : null

  return (
    <div id="AuthBox">
      <Form onSubmit={handleSubmit} name={name}>
        <div>
          <Form.Field width={12}>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </Form.Field>
        </div>

        {isSignUpForm}

        <Form.Field>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </Form.Field>
        <Form.Field>
          <Button type="submit">{displayName}</Button>
        </Form.Field>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const fullName = evt.target.fullName ? evt.target.fullName.value : null
      const password = evt.target.password.value
      dispatch(auth(email, password, fullName, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
