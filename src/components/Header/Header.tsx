/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import './Header.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/store';
import Avatar from '../Avatar';
import { clearUserStateAction } from '../../redux/user-reducer';

const Header:React.FC = () => {
  const { isLoged, name, imgSecureUrl } = useTypedSelector((store) => store.user);
  const dispatch = useDispatch();
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
          <div className="header-user-info">
            <NavLink style={{ marginRight: '35px' }} className="header-links user-name" to="/user">{name}</NavLink>
            <Avatar src={imgSecureUrl} width={40} height={40} />
            <div className="header-user-menu" onClick={() => { dispatch(clearUserStateAction()); localStorage.removeItem('refreshToken'); }}>Logout</div>
          </div>
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
