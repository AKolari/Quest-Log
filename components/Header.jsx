import React from "react";

const Header = ({ children }) => {
  return (
    <section className="flex gap-4 bg-stone-600">
      <nav className="flex items-baseline justify-between  gap-4  text-size-3xl text-white">
        {children}
      </nav>
    </section>
  );
};

export default Header;
