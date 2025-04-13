import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const data = [
    {
      icon: "fas fa-fire-alt",
      name: "Homme",
      link: "/",
      id: 1,
    },

    {
      icon: "fas fa-tv",
      name: "constact",
      link: "/tv",
      id: 2,
    },
    {
      icon: "fas fa-search",
      name: "Search",
      link: "/search",
      id: 3,
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center space-x-4">
          {data.map((item) => (
            <NavLink
              to={item.link}
              key={item.id}
              className="flex flex-col items-center text-center text-gray-400 hover:text-white transition duration-300"
            >
              <i className={`${item.icon} text-2xl`}></i>
              <span className="mt-1 text-sm">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Navbar;