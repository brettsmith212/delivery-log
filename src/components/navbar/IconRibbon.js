import React, { useContext, useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./IconRibbon.css";
import AuthContext from "../../auth-context";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

function IconRibbon() {
  const ctx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  return (
    <div className="topbarIconContainer">
      <NotificationsNoneIcon className="iconBadge" />
      <SettingsRoundedIcon className="iconBadge" />
      <NavItem
        open={open}
        setOpen={setOpen}
        source={ctx.user.photoURL}
        alt={"Profile"}
        class={"topAvatar"}
      >
        <DropdownMenu open={open} setOpen={setOpen} />
      </NavItem>
    </div>
  );
}

function NavItem(props) {
  console.log(`Profile Image Open: ${props.open}`);

  return (
    <>
      <img
        src={props.source}
        className={props.class}
        alt={props.alt}
        onClick={() => {
          props.setOpen(!props.open);
        }}
      />

      {props.open && props.children}
    </>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const ctx = useContext(AuthContext);
  console.log(`DropDown Open: ${props.open}`);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="/#"
        className="menu-item"
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
        }}
      >
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown-menu" style={{ height: menuHeight }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => {
          props.setOpen(!props.open);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        onClick={() => ctx.signOut()}
      >
        <div className="menu">
          <DropdownItem>Sign Out</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default IconRibbon;
