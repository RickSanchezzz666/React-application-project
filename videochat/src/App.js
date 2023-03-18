import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Content from './Components/Content';
import Room from './Components/Room';
import NotFoundPage from './Components/NotFoundPage';
import ContactForm from './Components/ContactForm';
import SignInPage from './Components/SignInPage';
import DoctorsCabinet from './Components/DoctorsCabinet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Content />} />
        <Route path='/room/:id' element={<Room />} />
        <Route path='/contact' element={<ContactForm />} />
        <Route path='/doctor/login' element={<SignInPage />} />
        <Route path='/doctor/cabinet' element={<DoctorsCabinet />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
