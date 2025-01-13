import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Registration } from './authentication/Registration';
import { Login } from './authentication/Login';
import { Home } from './student-dashboard/home';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Registration />} />
          <Route index element={<Login />} />
          <Route path='/dashboard' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App