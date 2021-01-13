import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, signInWithGoogle } from './../../firebase/utils'
import AuthWrapper from './../AuthWrapper'
import Button from './../../components/forms/Button'
import FormInput from './../../components/forms/FormInput'
import './styles.scss'

// const initialState = {
//   email: '',
//   password: ''
// }
const SignIn = props => {
  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setErrors([])
  } 
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

  const handleSubmit = async e => {
    e.preventDefault()

    try {

      await auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        resetForm()
      })
      .catch(() => {
        const err = ['Email or password not found. Please try again.']
        setErrors(err)
      })


    } catch(err) {
      // console.log(err)
    }
  }


    // const { email, password } = this.state

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
                <Button onClick={signInWithGoogle}>
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

export default SignIn