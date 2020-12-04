import React, { useState } from "react";

import AppBar from "sections/AppBar";
import Menu from "sections/Menu";

function Navigation(handleLogout) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log("navigation");
  console.log(handleLogout);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Menu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onOpen={handleMenuOpen}
      />
      <AppBar
        isMenuOpen={isMenuOpen}
        onMenuOpen={handleMenuOpen}
        props={handleLogout}
      />
    </>
  );
}

export default Navigation;
