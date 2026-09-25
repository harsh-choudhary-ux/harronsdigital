import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserCursor from './components/UserCursor'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <SmoothScroll>
        <Preloader />
        <UserCursor name="You" color="#FFC700" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Home />} />
          <Route path="/services" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/blog" element={<Home />} />
          <Route path="/contact" element={<Home />} />
        </Routes>
      </SmoothScroll>
    </Router>
  )
}

export default App
