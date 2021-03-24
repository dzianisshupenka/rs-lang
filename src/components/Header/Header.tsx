import React from 'react';
import { NavLink } from 'react-router-dom';

const Header:React.FC = () => (
  <div className="header-wrapper">
    <NavLink className="header-links" to="/">RSLang</NavLink>
    <NavLink className="header-links" to="/textbook">Textbook</NavLink>
    <NavLink className="header-links" to="/games">Games</NavLink>
    <NavLink className="header-links" to="/statistic">Statistic</NavLink>
    <NavLink className="header-links" to="/settings">Settings</NavLink>
  </div>
);

export default Header;
