import React ,{ useState } from "react"
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Router from '../src/components/Functionality/Router'
import { BrowserRouter } from "react-router-dom";



function App() {

  const [showNav, setShowNav] = useState(false)
  
  return (
    <>
    <BrowserRouter>
      <Router setShowNav={setShowNav}/>
    </BrowserRouter>
    </>
  )
}

export default App