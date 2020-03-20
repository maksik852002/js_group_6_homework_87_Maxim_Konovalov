import React from "react";
import { NavLink } from "react-router-dom";

const AnonymousMenu = () => (
  <li className="nav-item">
    <NavLink className="nav-link" to="/login">
      Login
    </NavLink>
  </li>
);

export default AnonymousMenu;
