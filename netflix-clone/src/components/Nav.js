import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className="nav_avatar"
        src="https://occ-0-64-58.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfbUufzrmfRsdANqSictkngrWowz70xmkZl3xIrEQvQ525x2YSCxRxJxuh54gqa6rarNEothuXQYmIjrcZZLSlKGhs_w.png?r=f80"
        alt="Avatar"
      />
    </div>
  );
}

export default Nav;
