import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../redux/store';
import Avatar from '../Avatar';

const Header:React.FC = () => {
  const { isLoged, name, imgSecureUrl } = useTypedSelector((store) => store.user);
  return (
    <div className="header-wrapper">
      <NavLink className="header-links" to="/">RSLang</NavLink>
      <NavLink className="header-links" to="/textbook">Textbook</NavLink>
      <NavLink className="header-links" to="/games">Games</NavLink>
      <NavLink className="header-links" to="/statistic">Statistic</NavLink>
      <NavLink className="header-links" to="/settings">Settings</NavLink>
      {
      isLoged
        ? (
          <>
            <NavLink className="header-links" to="/user">{name}</NavLink>
            <Avatar src={imgSecureUrl} width={40} height={40} />
          </>
        )
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
