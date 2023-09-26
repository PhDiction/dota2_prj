import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HeroList from './features/herolist/HeroList';
import Hero from './features/hero/Hero';
import { hackerLetters } from './util/hacker';
import '../src/the-new-css-reset/css/reset.css';
import '../src/app/Home/home.css'

const App = () => {
  return (
    <Router>
      <div>
        <nav className="main1">
          <ul>
            <li className="nav">
              <Link to="/">-Home-</Link>
            </li>
            <li className="nav">
              <Link to="/heroes">-Heroes-</Link>
            </li>
          </ul>
        </nav>
        <div>
          <h3 className="mid-text">This site is used to display basic information about Dota 2 heroes</h3>
        </div>
        <Routes>
          <Route path="/heroes" element={<HeroList />}>
          </Route>
          <Route path="/heroes/:id" element={<Hero />}>
          </Route>
          <Route path="/">
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
