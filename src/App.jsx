import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './screens/Index'
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import Signup from './screens/Signup'
import ResetPassword from './screens/ResetPassword'
import ProtectedRoute from './ProtectedRoute'
import { auth } from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {
  const [user, setUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (isAuthLoading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
  }

  return (
    <>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute user={user}>
          <Index/>
        </ProtectedRoute>
        } />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute user={user}>
            <Dashboard/>
          </ProtectedRoute>
        }
      />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
    </Routes>
    </>
  )
}

export default App