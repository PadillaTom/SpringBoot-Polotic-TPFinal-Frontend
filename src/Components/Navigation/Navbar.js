import React from "react";
import { Link } from "react-router-dom";

import { navLinks } from "../../Utils/constants";

const Navbar = () => {
  return (
    <div className="navigationContainer">
      <div className="navigationCenter">
        <div className="nav-logoContainer">
          <Link to="/">
            <h1>Mi Hotel</h1>
          </Link>
        </div>
        <div className="nav-linksContainer">
          <ul className="nav-links">
            {navLinks.map((singleLink) => {
              const { id, name, url } = singleLink;
              return (
                <li key={id} className="nav-singleLink">
                  <Link to={url}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
