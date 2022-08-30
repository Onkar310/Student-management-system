import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Studdy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span id="mail">{user.email}</span>
              <div>
                <button className="mail" onClick={handleClick}>
                  Logout
                </button>{" "}
              </div>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/Login">Login</Link>
              <Link to="/Signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
