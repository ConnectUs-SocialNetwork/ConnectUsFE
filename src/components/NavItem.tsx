import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NavLink } from 'react-router-dom';
import classes from '../styles/NavItem.module.css'; 

interface NavItemProps {
  iconType: IconDefinition; // FontAwesome ikona
  text: string;
  to: string; // Putanja za NavLink
}

const NavItem: React.FC<NavItemProps> = (props) => {
  return (
    <NavLink to={props.to} className={classes['nav-link']} end={props.text === 'Home' ? true : false}>
      <FontAwesomeIcon icon={props.iconType} className={classes['nav-icon']} />
      <p className={classes['nav-text']}>{props.text}</p>
    </NavLink>
  );
};

export default NavItem;
