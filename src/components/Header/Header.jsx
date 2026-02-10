import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn, handleLoginClick, handleSignUpClick, loggedName }) {
  return (
    <div className="header">
      <Navigation isLoggedIn={isLoggedIn} handleLoginClick={handleLoginClick} handleSignUpClick={handleSignUpClick} loggedName={loggedName}/>
    </div>
  );
}

export default Header;
