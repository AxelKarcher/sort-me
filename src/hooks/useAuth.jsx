const useAuth = () => {

  const disconnect = () => {
    localStorage.removeItem('userToken')
    window.location.href = '/auth'
  }

  const getUserToken = () => {
    return localStorage.getItem('userToken')
  }

  return {disconnect, getUserToken}
}

export default useAuth