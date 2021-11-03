import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext";
import Button from "./Button.js";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const { getCartCount } = useContext(AppContext);
  const quantity = getCartCount();

  function handleThemeClick() {
    setIsDark(prevState => !prevState);
  }

  useEffect(() => {
    if (isDark) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) setIsDark(true);
  }, []);

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        SuperM
      </NavLink>
      <ul>
        <li className="nav-item">
          <Button className="theme-switcher" onClick={handleThemeClick}>
            {isDark ? "Dark" : "Light"}
          </Button>
        </li>
        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/about">
            About us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
            Cart ({quantity})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}