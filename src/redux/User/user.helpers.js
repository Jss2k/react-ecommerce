import { auth, storage } from './../../firebase/utils'

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: 'http://localhost:3000/login'
  }

  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
      .then(() => {
        resolve()
      })
      .catch(() => {
        const err = ['Email not found. Please try again.']
        reject(err)
      })
  })
}

export const handleFetchUserPicture =(id)=> {
  return new Promise((resolve, reject) => {
    storage
    .ref('userpicture')
    .child(id)
    .getDownloadURL()
    .then(url => {
      resolve({
        pictureURL: url
      })
    })
    .catch(err => {
      reject(err)
    })
  })
}


export const handleAddUserPicture = ({id, picture}) => {
  return new Promise((resolve, reject) => {
    storage
    .ref(`userpicture/${id}`)
    .put(picture)
    .then(() => {
      resolve()
    })
      .catch(err => {
        reject(err)
      })
  })
}
