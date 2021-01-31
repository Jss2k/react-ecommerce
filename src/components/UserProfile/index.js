import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUserPicture, fetchUserPicture } from './../../redux/User/user.actions'
import FormInput from './../../components/forms/FormInput'

import './styles.scss'
import userIMG from './../../assets/user.png'

const UserProfile = props => {
  const dispatch = useDispatch()
  const { currentUser, currentPicture } = props
  const { displayName } = currentUser
  const { pictureURL } = currentPicture
  const [picture, setPicture] = useState(null)
  const [error, setError] = useState('')

  
  useEffect(() => {
      dispatch(fetchUserPicture({
        id: currentUser.id
      }))
    }, [])

  useEffect(() => {
    if (picture) {
      dispatch(addUserPicture({
        picture,
        id: currentUser.id
    }))
  }
  }, [picture])

  const uploadPicture = e => {
    const file = e.target.files[0]
    const fileType = file['type']
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
  
    validImageTypes.includes(fileType) ? setPicture(file) : setError('Please select an image to upload')

  }

  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            {pictureURL
              ? <img src={pictureURL } alt="User's picture"/>
              : <img src={userIMG} alt="User's picture"/>}
              <div className="uploadImg">
              <label for="picture"> Upload user's picture <i class="fas fa-arrow-alt-circle-down"></i></label>
              <FormInput
                type="file"
                name="picture"
                handleChange={uploadPicture}
                id="picture"
              />
              </div>
              <div className="error">
                <span>{error}</span>
              </div>
          </div>
        </li>
        <li>
          <span className="displayName">
            {displayName && displayName}
          </span>
        </li>
      </ul>
    </div>
  )
}

export default UserProfile