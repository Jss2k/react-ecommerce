import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.scss'

import { auth } from './../../firebase/utils'

import FormInput from './../../components/forms/FormInput'
import Button from './../../components/forms/Button'
import AuthWrapper from './../AuthWrapper'

// const initialState = {
//   email: '',
//   errors: []
// }

const EmailPassword = props => {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  
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

  const handleFormSubmit = async event => {
    event.preventDefault()

    try {

      const config = {
        url: 'http://localhost:3000/login'
      }

      await auth.sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push('/login')
        })
        .catch(() => {
          const err = ['Email not found. Please try again.']
          setErrors(err)
        })

    } catch(err) {
      // console.log(err)
    }
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