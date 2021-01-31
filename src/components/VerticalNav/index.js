import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from './../UserProfile'
import './styles.scss'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  currentPicture: user.currentPicture
})

const VerticalNav = ({ children }) => {
  const { currentUser, currentPicture } = useSelector(mapState);
  const configUserProfile = {
    currentUser, currentPicture
  }

  return (
    <div className="verticalNav">
      <UserProfile {...configUserProfile} />
      <div className="menu">
        {children}
      </div>
    </div>
  );
}

export default VerticalNav