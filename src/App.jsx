import { Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import TableCloudscape from './components/TableCloudscape'
import OrgPage from './components/OrgPage'
import EventPage from './components/EventPage'
import Navbar from './components/Navbar'

// Simple Home component




function App() {
  return (
    <div>

      <Navbar/>
      <Routes>
       
        <Route path="/" element={<TableCloudscape />} />
        
        <Route path="/Organization/:id" element={<OrgPage />} />
        <Route path="/Event/:id" element={<EventPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
