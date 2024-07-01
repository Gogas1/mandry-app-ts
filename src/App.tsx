import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './components/auth/AuthenticationContext';
import Home from './components/Home';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/profile/my' element={<Profile />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
