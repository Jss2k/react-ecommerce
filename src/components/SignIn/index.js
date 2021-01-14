import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInUser, signInWithGoogle, resetAllAuthForms } from './../../redux/User/user.actions'

import './styles.scss'

import AuthWrapper from './../AuthWrapper'
import Button from './../../components/forms/Button'
import FormInput from './../../components/forms/FormInput'

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
  signInError: user.signInError
})

const SignIn = props => {
  const { signInSuccess, signInError } = useSelector(mapState)
  const dispatch = useDispatch()
  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (signInSuccess) {
      resetForm()
      dispatch(resetAllAuthForms())
      props.history.push('/')
    }

  }, [signInSuccess])

  useEffect(() => {
    if (Array.isArray(signInError) && signInError.length > 0) {
      setErrors(signInError)
    }
  }, [signInError])

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setErrors([])
  } 

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(signInUser({ email, password }))
  }

  const handleGooleSignIn = () => {
    dispatch(signInWithGoogle())
  }
  const socialSignIn = async () => {
    await signInWithGoogle()
    props.history.push('/')
  }

    const configAuthWrapper = {
      headline: 'LogIn'
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
         <form onSubmit={handleSubmit}>

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

            <Button type="submit">
              LogIn
            </Button>
            <div className="socialSignIn">
              <div className="row">
                <Button onClick={handleGooleSignIn}>
                   Sign in with Google
                 </Button>
              </div>
            </div>
            
            <div className="links">
              <Link to="/recovery">
                Reset Password
              </Link>
            </div>
         </form>
        </div>
      </AuthWrapper>
    )
}

export default withRouter(SignIn)