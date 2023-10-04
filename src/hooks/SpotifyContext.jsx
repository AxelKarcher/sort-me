import {createContext, useContext, useState} from 'react'

const SpotifyContext = createContext()

export const useSpotify = () => {return useContext(SpotifyContext)}

export const SpotifyProvider = ({children}) => {

  const [target, setTarget] = useState()
  const [historyData, setHistoryData] = useState([])

  return (
    <SpotifyContext.Provider value={{
      target, setTarget,
      historyData, setHistoryData
    }}>
      {children}
    </SpotifyContext.Provider>
  )
}