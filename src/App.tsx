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
import PaymentPage from './components/payment/PaymentPage';
import TravelsPage from './components/account/profile/TravelsPage';
import NewsPage from './components/footer/FooterNews';
import ContactsPage from './components/footer/ContactsPage';
import { UserSettingsProvider } from './components/app/UserSettingsContext';
import FooterInvestments from './components/footer/FooterInvestments';
import ScrollToTop from './components/app/ScrollerToTop';
import FooterFeedback from './components/footer/FooterFeedback';
import FooterCommunityChat from './components/footer/FooterCommunityChat';
import HelpCenter from './components/footer/HelpCenter';
import StartBusiness from './components/footer/FooterStartBusiness';
import MandrySafe from './components/footer/FooterMandrySafe';
import CancelReservation from './components/footer/FooterCancelReservation';
import Disabled from './components/footer/FooterDisabled';
import { APIProvider } from '@vis.gl/react-google-maps';

function App() {
  const GApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;

  return (
    <>
      <APIProvider apiKey={GApiKey}>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <ModalProvider>
              {/* <AuthorizationProvider> */}
                <UserSettingsProvider>
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
                    <Route path='/account/information/temp' element={<ProfileInfoPage />} />

                    <Route path='/investments' element={<FooterInvestments />} />
                    <Route path='/feedback' element={<FooterFeedback />} />
                    <Route path='/community-chat' element={<FooterCommunityChat />} />

                    <Route path='/account' element={<ProtectedRoute element={<AccountPage />} />} />
                    <Route path='/account/profile/my' element={<ProtectedRoute element={<ProfilePage />} />} />
                    <Route path='/account/verification' element={<ProtectedRoute element={<VerificationPage />} />} />
                    <Route path='/account/information' element={<ProtectedRoute element={<ProfileInfoPage />} />} />
                    <Route path='/account/favourites' element={<ProtectedRoute element={<FavouritesPage />} />} />
                    <Route path='/account/notifications' element={<ProtectedRoute element={<NotificationsPage />} />} />
                    <Route path='/housing/payment/:id' element={<ProtectedRoute element={<PaymentPage />} />} />
                    <Route path='/account/travels' element={<ProtectedRoute element={<TravelsPage />} />} />

                    <Route path='/news' element={<NewsPage />} />
                    <Route path='/contact' element={<ContactsPage />} />
                    <Route path='/help' element={<HelpCenter />} />
                    <Route path='/business' element={<StartBusiness />} />
                    <Route path='/mandrysafe' element={<MandrySafe />} />
                    <Route path='/revocation' element={<CancelReservation />} />
                    <Route path='/disabled' element={<Disabled />} />
                </Routes>
                  <Modal />
                </UserSettingsProvider>
              {/* </AuthorizationProvider> */}
            </ModalProvider>
          </Router>
        </AuthProvider>
      </APIProvider>
      
    </>
  )
}

export default App
