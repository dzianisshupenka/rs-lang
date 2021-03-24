import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AboutTeam from './components/AboutTeam/AboutTeam';
import Footer from './components/Footer/Footer';
import Games from './components/Games/Games';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import Settings from './components/Settings/Settings';
import Statistic from './components/Statistic/Statistic';
import TextBook from './components/TextBook/TextBook';

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
