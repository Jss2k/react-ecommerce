import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions'

import './styles.scss'

import AuthWrapper from './../AuthWrapper'
import Button from './../../components/forms/Button'
import FormInput from './../../components/forms/FormInput'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
})

const SignIn = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser, userErr } = useSelector(mapState)
  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (currentUser) {
      resetForm()
      history.push('/')
    }

  }, [currentUser])

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr)
    }
  }, [userErr])

  const resetForm = () => {
    setEmail('')
    setPassword('')
    // setErrors([])
  } 

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(emailSignInStart({ email, password }))
  }

  const handleGooleSignIn = () => {
    dispatch(googleSignInStart())
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
              <Link to="/registration">
                Register
              </Link>
              {` | `}
              <Link to="/recovery">
                Reset Password
              </Link>
            </div>
         </form>
        </div>
      </AuthWrapper>
    )
}

export default SignIn