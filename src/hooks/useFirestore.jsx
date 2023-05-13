import {
  setDoc, doc, getDoc,
  arrayUnion, updateDoc, getFirestore
} from 'firebase/firestore'
import {auth} from '../../firebase'

const useFirestore = () => {

  const currentUser = auth?.currentUser

  const db = getFirestore()

  const createUserDoc = async (userId) => {
    await setDoc(doc(db, 'users', userId), {friends: [], tests: []})
  }

  const creatingNewTestWithSong = async (testName, {name, artists, album, preview_url}) => {
    await updateDoc(doc(db, 'users', currentUser.uid), {
      tests: arrayUnion({
        name: testName,
        songs: [{
          title: name,
          artist: artists?.[0]?.name,
          album: album?.name,
          cover: album?.images?.[1]?.url,
          sample: preview_url
        }]
      })
    })
  }

  const getTests = () => {
    return new Promise((resolve) => {
      getDoc(doc(db, 'users', currentUser.uid))
        .then((res) => resolve(res.data()?.tests))
    })
  }

  return {createUserDoc, creatingNewTestWithSong, getTests}
}

export default useFirestore