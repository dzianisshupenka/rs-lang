import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AboutTeam from './Pages/AboutTeam/AboutTeam';
import Footer from './components/Footer/Footer';
import Games from './Pages/Games/Games';
import Header from './components/Header/Header';
import MainPage from './Pages/MainPage/MainPage';
import Settings from './Pages/Settings/Settings';
import Statistic from './Pages/Statistic/Statistic';
import TextBook from './Pages/TextBook/TextBook';

const App:React.FC = () => (
  <div className="page-content">
    <BrowserRouter>
      <Header />
      <div className="content-wrapper">
        <Route exact path="/" component={MainPage} />
        <Route path="/about" component={AboutTeam} />
        <Route path="/games" component={Games} />
        <Route path="/settings" component={Settings} />
        <Route path="/statistic" component={Statistic} />
        <Route path="/textbook" component={TextBook} />
      </div>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
