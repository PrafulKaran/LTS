import { createContext, useState, useCallback, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = useCallback((userData, token) => {
    setUser(userData)
    setIsAuthenticated(true)
    setError(null)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
    setError(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }, [])

  const signup = useCallback((userData, token) => {
    setUser(userData)
    setIsAuthenticated(true)
    setError(null)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
  }, [])

  const updateUser = useCallback((updatedData) => {
    const updated = { ...user, ...updatedData }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }, [user])

  const setAuthError = useCallback((errorMessage) => {
    setError(errorMessage)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        signup,
        updateUser,
        setAuthError,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
