import {useState} from 'react'
import axios from 'axios'

import useAuth from './useAuth'

axios.defaults.baseURL = import.meta.env.VITE_SPOTIFY_ENDPOINT_BASE

const useAxios = ({
  infos, params, data: defaultData,
  debug, headers, onSuccess, onEnd
}) => {

  const {getUserToken} = useAuth()
  axios.defaults.headers.common['Authorization'] = `Bearer ${getUserToken()}`

  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [res, setRes] = useState()

  const strToPath = (obj, str) => {
    if (!str) {return obj}

    str = str.replace(/\[(\w+)\]/g, '.$1')
    str = str.replace(/^\./, '')
    let attribute = str.split('.')

    for (let i = 0, n = attribute.length; i < n; ++i) {
      let key = attribute[i]

      if (key in obj) {obj = obj[key]}
      else {return}
    }
    return obj
  }

  const generateUrl = () => {
    let final = infos.url

    if (!params) {return final}

    Object?.entries(params)?.forEach((param) => {
      final = final.replace(`{${param[0]}}`, param[1])
    })

    return final
  }

  const debugStr = `${infos.method} ${infos.url}`

  const call = (callObj) => {
    debug && console.log(`%cCALL ${debugStr}`, 'color: aqua')

    setIsLoading(true)

    const data = {...defaultData, ...callObj?.data}

    axios({
      method: infos.method,
      url: generateUrl(),
      data: data,
      headers: headers
    })
      .then((res) => {
        debug && console.log(`%cSUCCESS ${debugStr}`, 'color: Aquamarine')
        setRes(strToPath(res?.data, infos?.dataPath))
        if (onSuccess) {onSuccess()}
      })
      .catch((err) => {
        debug && console.log(`%cERROR ${debugStr}`, 'color: Crimson')
        if (err?.response) {
          console.log('Error status:', err?.response.status);
          console.log('Error data:', err?.response.data);
        } else if (err?.request) {
          console.err('Request error:', err?.request);
        } else {
          console.err('Unknown error:', err?.message);
        }
        setError(err?.response)
      })
      .finally(() => {
        setIsLoading(false)
        if (onEnd) {onEnd()}
      })
  }

  return {loading, error, res, call}
}

export default useAxios