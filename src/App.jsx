
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Weather from './Pages/Weather'
import './App.css'


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/weather' element={<Weather/>}/>
      <Route/>
    </Routes>
      
    </>
  )
}

export default App
