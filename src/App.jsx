import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Registration } from './authentication/Registration';
import { Login } from './authentication/Login';
import { HomeContent } from './student-dashboard/HomeContent';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route index path='/' element={<HomeContent />} />
          <Route index path='/dashboard' element={<HomeContent />} />
        </Routes>
      </Router>
    </>
  )
}

export default App