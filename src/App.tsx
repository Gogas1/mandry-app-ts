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
import AccountPage from './components/account/AccountPage';
import ProfilePage from './components/account/profile/ProfilePage';
import VerificationPage from './components/account/profile/VerificationPage';
import ProfileInfoPage from './components/account/ProfileInfoPage';
import FavouritesPage from './components/account/FavouritesPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthorizationProvider } from './components/auth/AuthorizationContext';
import SearchPage from './components/search/SearchPage';
import HousingPage from './components/housing/HousingPage';
import NotificationsPage from './components/account/profile/NotificationsPage';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <ModalProvider>
            <AuthorizationProvider>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/profile/my' element={<Profile />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/features' element={<Features />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/housing/:id' element={<HousingPage />} />

                <Route path='/account' element={<ProtectedRoute element={<AccountPage />} /> } />
                <Route path='/account/profile/my' element={<ProtectedRoute element={<ProfilePage />} /> } />
                <Route path='/account/verification' element={<ProtectedRoute element={<VerificationPage />} /> } />
                <Route path='/account/information' element={<ProtectedRoute element={<ProfileInfoPage />} />} />
                <Route path='/account/favourites' element={<ProtectedRoute element={<FavouritesPage />} />} />
                <Route path='/account/notifications' element={<NotificationsPage />} />
              </Routes>
              <Modal />
            </AuthorizationProvider>
          </ModalProvider>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
