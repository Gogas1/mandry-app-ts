import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './components/auth/AuthenticationContext';
import Home from './components/Home';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Features from './components/Features';
import { ModalProvider } from './components/app/ModalContext';
import Modal from './components/app/Modal';

function App() {

  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/profile/my' element={<Profile />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/features' element={<Features />} />
            </Routes>
            <Modal />
          </Router>
        </ModalProvider>
        
      </AuthProvider>
    </>
  )
}

export default App
