import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../redux/store';

const Header:React.FC = () => {
  const { isLoged, name } = useTypedSelector((store) => store.user);
  return (
    <div className="header-wrapper">
      <NavLink className="header-links" to="/">RSLang</NavLink>
      <NavLink className="header-links" to="/textbook">Textbook</NavLink>
      <NavLink className="header-links" to="/games">Games</NavLink>
      <NavLink className="header-links" to="/statistic">Statistic</NavLink>
      <NavLink className="header-links" to="/settings">Settings</NavLink>
      {
      isLoged
        ? (<NavLink className="header-links" to="/user">{name}</NavLink>)
        : (
          <>
            <NavLink className="header-links" to="/signin">Sign in</NavLink>
            <NavLink className="header-links" to="/signup">Sign up</NavLink>
          </>
        )
      }

    </div>
  );
};

export default Header;
