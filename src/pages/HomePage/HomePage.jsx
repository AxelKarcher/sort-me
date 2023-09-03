import axios from 'axios'
import {useState, useEffect} from 'react'

import './HomePage.scss'
import Button from 'components/Button/Button'
import PlaylistCard from './PlaylistCard/PlaylistCard'

const clientId = '1571f14b8ba047e3936c8e0d6e35addc'
const clientSecret = '125182fc307c40af93bf9a159b8f4a64'
const redirectUri = 'http://localhost:3000/'
const apiEndpointBase = 'https://api.spotify.com/v1/'

const spotifyAuthUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=playlist-read-private playlist-read-collaborative&state=azertytreza`

const HomePage = ({}) => {

  const [userCode, setUserCode] = useState()
  const [userToken, setUserToken] = useState()
  const [userInfos, setUserInfos] = useState()
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    let localUserToken = localStorage.getItem('userToken')
    if (localUserToken !== null) {setUserToken(localUserToken)}

    let str = window.location.href
    let parsedLocation = str?.substring(
      str?.indexOf('code=') + 5,
      str?.indexOf('&state')
    )

    if (parsedLocation?.length > 10) {setUserCode(parsedLocation)}
  }, [])

  useEffect(() => {if (userCode !== undefined) {getUserToken()}}, [userCode])

  useEffect(() => {
    if (userToken !== undefined) {
      localStorage.setItem('userToken', userToken)
      getuserInfos()
    }
  }, [userToken])

  useEffect(() => {
    if (userInfos !== undefined) {
      localStorage.setItem('userInfos', userInfos)
      getUserPlaylists()
    }
  }, [userInfos])

  const handleConnect = () => {window.location.href = spotifyAuthUri}

  const getUserToken = () => {
    axios.post('https://accounts.spotify.com/api/token',
      {'grant_type': 'authorization_code', 'code': userCode, 'redirect_uri': redirectUri},
      {headers: {
        'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }}
    )
      .then(({data}) => console.log(setUserToken(data?.access_token)))
  }

  const getuserInfos = () => {
    axios({
      method: 'get',
      url: `${apiEndpointBase}me`,
      headers: {'Authorization': `Bearer ${userToken}`}
    })
      .then(({data}) => console.log(setUserInfos(data)))
  }

  const getUserPlaylists = () => {
    axios({
      method: 'get',
      url: `${apiEndpointBase}users/${userInfos?.id}/playlists`,
      headers: {'Authorization': `Bearer ${userToken}`}
    })
      .then(({data}) => setPlaylists(data?.items))
  }

  console.log('userInfos:', userInfos)

  return (
    <div id='home-page-container'>
      <span>{userInfos?.display_name}</span>
      <span>{userInfos?.id}</span>
      <Button label='Connexion' onClick={handleConnect} />
      <div id='playlists'>
        {playlists?.map((playlist, i) => (
          <PlaylistCard key={i} data ={playlist} />
        ))}
      </div>
    </div>
  )
}

export default HomePage