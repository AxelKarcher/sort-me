import {useEffect, useState} from 'react'

import './AuthPage.scss'
import Icon from 'components/Icon/Icon'
import useAxios from 'hooks/useAxios'
import spotifyIcon from 'icons/spotify.svg'

const LENGTH_CODE_WORD = 5

const AuthPage = ({}) => {

  const [userCode, setUserCode] = useState()

  const {res: userTokenRes, loading: userTokenLoading, call: userTokenCall} = useAxios({
    infos: {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      dataPath: 'access_token',
    },
    data: {
      'grant_type': 'authorization_code',
      'code': userCode,
      'redirect_uri': import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    },
    headers: {
      'Authorization': `Basic ${btoa(import.meta.env.VITE_SPOTIFY_CLIENT_ID + ':' + import.meta.env.VITE_SPOTIFY_CLIENT_SECRET)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    dataPath: '.access_token',
  })

  // Check window url for redirect spotify user code
  useEffect(() => {
    // Checks if user token is already in local storage
    let localUserToken = localStorage.getItem('userToken')
    if (localUserToken !== null) {window.location.href = '/home'}

    let str = window.location.href
    let parsedLocation = str?.substring(str?.indexOf('code=') + LENGTH_CODE_WORD, str?.indexOf('&state'))

    setUserCode(parsedLocation)
  }, [])

  // If token is OK, save the value
  useEffect(() => {
    if (userTokenRes === undefined) {return}

    localStorage.setItem('userToken', userTokenRes)
    window.location.href = '/home'
  }, [userTokenRes])

  // If user code is OK, asking for user token
  useEffect(() => {if (userCode !== undefined) {userTokenCall()}}, [userCode])

  const navigateToSpotifyAuth = () => {window.location.href = import.meta.env.VITE_SPOTIFY_AUTH_URI}

  return (
    <div id='auth-page-container'>
      <Icon icon={spotifyIcon} onClick={navigateToSpotifyAuth} size={300} />
    </div>
  )
}

export default AuthPage