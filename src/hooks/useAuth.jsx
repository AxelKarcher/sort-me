const useAuth = () => {

  const disconnect = () => {
    localStorage.removeItem('userToken')
    window.location.href = '/auth'
  }

  const setUserToken = (data) => {
    localStorage.setItem('userToken', data)
    window.location.href = '/home'
  }

  const getUserToken = () => {
    return localStorage.getItem('userToken')
  }

  const setUserInfos = (data) => {
    localStorage.setItem('userInfos', JSON.stringify(data))
  }

  const getUserInfos = () => {
    return JSON.parse(localStorage.getItem('userInfos'))
  }

  return {
    disconnect,
    setUserToken, getUserToken,
    setUserInfos, getUserInfos
  }
}

export default useAuth