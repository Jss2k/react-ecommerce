import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { signUpUser, resetAllAuthForms } from './../../redux/User/user.actions'
import './styles.scss'

import { auth, handleUserProfile } from './../../firebase/utils'

import FormInput from './../../components/forms/FormInput'
import Button from './../../components/forms/Button'
import AuthWrapper from './../AuthWrapper'

// const initialState = {
//   displayName: '',
//   email: '',
//   password: '',
//   confirmPassword: '',
//   errors: []
// }
const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})

const Signup = props => {
  const { signUpSuccess, signUpError } = useSelector(mapState)
  const dispatch = useDispatch()
  const [displayName, setDisplayName] = useState('')
  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (signUpSuccess) {
      resetForm()
      dispatch(resetAllAuthForms())
      props.history.push('/')
    }
  }, [signUpSuccess])

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError)
    }
  }, [signUpError])
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     ...initialState
  //   }

  //   this.handleChange = this.handleChange.bind(this)
  // }

  // handleChange(e) {
  //   const { name, value } = e.target

  //   this.setState({
  //     [name]: value
  //   })
  // }
  const resetForm = () => {
    setDisplayName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors([])
  } 
  const handleFormSubmit = event => {
    event.preventDefault()
    dispatch(signUpUser({
      displayName,
      email,
      password,
      confirmPassword 
    }))
    // if(password !== confirmPassword) {
    //   const err = ['Password Don\'t match'];
    //   setErrors(err)
    //   return
    // }

    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(email, password)
    //   await handleUserProfile(user, { displayName })
    //   resetForm()
    //   props.history.push('/')

    // } catch(err) {
    //   // console.log(err)
    // }
  }

    const configAuthWrapper = {
      headline: 'Signup'
    }
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          {errors.length > 0 && (
            <ul className="formError">
              {errors.map((err, index) => {
                return (
                  <li key={index}>
                    {err}
                  </li>
                )
              })}
            </ul>
          )}
            <form onSubmit={handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full name"
                handleChange={e => setDisplayName(e.target.value)}
              />
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={e => setEmail(e.target.value)}
              />
              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                handleChange={e => setPassword(e.target.value)}
              />
              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                handleChange={e => setConfirmPassword(e.target.value)}
              />

              <Button type="submit">
                Register
              </Button>
            </form>
          </div>
      </AuthWrapper>
    )
}

export default withRouter(Signup)