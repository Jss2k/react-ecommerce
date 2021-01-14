import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetPassword, resetAllAuthForms } from './../../redux/User/user.actions'
import './styles.scss'

import FormInput from './../../components/forms/FormInput'
import Button from './../../components/forms/Button'
import AuthWrapper from './../AuthWrapper'

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
})

const EmailPassword = props => {
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  
  useEffect(() => {
    if (resetPasswordError) {
      dispatch(resetAllAuthForms())
      props.history.push('/login')
    }
  }, [resetPasswordSuccess])

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError)
    }
  }, [resetPasswordError])

  const handleFormSubmit = event => {
    event.preventDefault()
    dispatch(resetPassword({ email }))
  }

    const configAuthWrapper = {
      headline: 'Email Password'
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
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={e => setEmail(e.target.value)}
            />
            <Button type="submit">
              recovered password
            </Button>
          </form>
        </div>
      </AuthWrapper>
    )
}

export default withRouter(EmailPassword)