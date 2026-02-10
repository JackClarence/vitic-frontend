import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ isLoggedIn, handleLoginClick, handleSignUpClick, loggedName }) {
  return (
    <div className="navigation">
      <Link to="/">
        <button className="navigation__name navigation__btn">VITIC</button>
      </Link>
      <div className="navigation__links">
        {isLoggedIn ? (
          <Link to="/about">
            <button className="substitute navigation__btn">{loggedName}</button>
          </Link>
        ) : (
          <div className="navigation__authentication navigation__links">
            <Link to="/about" className="navigation__link">
              <button className="navigation__about navigation__btn">
                About Us
              </button>
            </Link>
            <button
              className="navigation__sign_up navigation__btn"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
            <button
              className="navigation__log_in navigation__btn"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
