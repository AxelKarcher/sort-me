import {useState} from 'react'

const usePromise = (promise) => {

  const [loading, setIsLoading] = useState(false)
  const [res, setRes] = useState()

  const call = () => {
    setIsLoading(true)

    promise()
      .then((res) => setRes(res))
      .finally(() => setIsLoading(false))
  }

  return {loading, res, call}
}

export default usePromise