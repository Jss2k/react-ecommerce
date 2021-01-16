import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions'
import './styles.scss'

import FormInput from './../../components/forms/FormInput'
import Button from './../../components/forms/Button'
import AuthWrapper from './../AuthWrapper'

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr
})

const EmailPassword = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { resetPasswordSuccess, userErr } = useSelector(mapState)
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  
  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState())
      history.push('/login')
    }
  }, [resetPasswordSuccess])

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr)
    }
  }, [userErr])

  const handleFormSubmit = event => {
    event.preventDefault()
    dispatch(resetPasswordStart({ email }))
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

export default EmailPassword