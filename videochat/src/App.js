import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Content from './Components/Content';
import Room from './Components/Room';
import NotFoundPage from './Components/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
        <Route path='/' element={<Content />}>
        </Route>
        <Route path='/room/:id' element={<Room />}>
        </Route>
        <Route path='*' element={NotFoundPage}>

        </Route>
    </BrowserRouter>
  );
}

export default App;
