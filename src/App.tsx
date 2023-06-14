import { useState } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Country from './components/Country';



const App = () => {
    const [theme, setTheme] = useState(false);

    return (
        <Router>
            <NavBar theme={theme} setTheme={setTheme} />
            <Routes>
                <Route path='/' element={<Home theme={theme} />} />
                <Route path='/:country' element={<Country theme={theme} />} />
            </Routes>
        </Router>
    )
}

export default App