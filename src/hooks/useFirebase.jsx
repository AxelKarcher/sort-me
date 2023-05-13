import {useState} from 'react'
import {auth} from '../../firebase'
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  updateProfile, signOut
} from 'firebase/auth'

import useFirestore from './useFirestore'

const useFirease = () => {

  const currentUser = auth?.currentUser

  const {createUserDoc} = useFirestore()

  const [authLoading, setAuthLoading] = useState(false)

  const login = (email, password) => {
    setAuthLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => console.error('Error logging user:', err))
      .finally(() => setAuthLoading(false))
  }

  const register = (pseudo, email, password) => {
    setAuthLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(currentUser, {displayName: pseudo})
          .then(() => {
            createUserDoc(currentUser.uid)
              .catch((err) => console.error('Error adding a user doc:', err))
              .finally(() => setAuthLoading(false))
          })
          .catch((err) => console.error('Error adding a displayName:', err))
      })
      .catch((err) => console.error('Error registering user:', err))
  }

  const disconnect = () => {signOut(auth)}

  return {authLoading, auth, login, register, disconnect}
}

export default useFirease