import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Content from './Components/Content';
import Room from './Components/Room';
import NotFoundPage from './Components/NotFoundPage/notFoundPage';
import NotFoundRoom from './Components/NotFoundPage/notFoundRoom';
import ContactForm from './Components/ContactForm';
import SignInPage from './Components/SignInPage';
import PrivateRoute from './Components/PrivateRoute';
import RoomExistVerify from './Components/Room/RoomAcess/RoomExistValidation'
import RedirectPage from './Components/Redirect';
import RedirectingPage from './Components/RedirectingPage';
import { MyProvider } from './Components/GlobalContext';

function App() {
  return (
  <MyProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/room/:id' element={<RoomExistVerify><RedirectingPage><RedirectPage><Room /></RedirectPage></RedirectingPage></RoomExistVerify>} />
        <Route path='/contact' element={<ContactForm />} />
        <Route path='/login' element={<SignInPage />} />
        <Route path='/account' element={<PrivateRoute />} />
        <Route path='/room-not-found' element={<NotFoundRoom />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </MyProvider>
    
  );
}

export default App;
