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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/room/:id' element={<RoomExistVerify><RedirectPage><Room /></RedirectPage></RoomExistVerify>} />
        <Route path='/contact' element={<ContactForm />} />
        <Route path='/login' element={<SignInPage />} />
        <Route path='/account' element={<PrivateRoute />} />
        <Route path='/room-not-found' element={<NotFoundPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
