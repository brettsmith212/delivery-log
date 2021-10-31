import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../auth-context";
import "./Navbar.css";
import { AddDashModal } from "../featuredInfo/AddDashModal";
import IconRibbon from "./IconRibbon";

function Navbar() {
  const ctx = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="/" className="link">
          <div className="logo-container">
            <h1 className="logo">Delivery Log</h1>
          </div>
        </Link>
        {!ctx.isLoggedIn && (
          <button className="header-login" onClick={() => ctx.signIn()}>
            Log In
          </button>
        )}
        {ctx.isLoggedIn && <IconRibbon />}
      </div>

      {ctx.isLoggedIn && (
        <div className="login-container">
          {ctx.isLoggedIn && (
            <p className="login-email">{`Logged in as ${ctx.user.email}`}</p>
          )}
          {ctx.isLoggedIn && (
            <>
              <button className="login" onClick={openModal}>
                Add Dash
              </button>
              <AddDashModal showModal={showModal} setShowModal={setShowModal} />
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default Navbar;
