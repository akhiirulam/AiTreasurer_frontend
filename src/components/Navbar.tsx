import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../assets/aitreasurer-navbar-logo.webp";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="w-full px-3 pt-2 font-mono">
      <div className="relative flex h-14 w-full items-center rounded-xl bg-[#292727] px-4 sm:px-5">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
        >
          <img
            src={logo}
            alt="AiTreasurer"
            className="h-12 w-20 object-contain bg-[#f5ffc2] rounded-xl"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden items-center gap-6 text-sm text-white sm:gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
              }`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
              }`
            }
          >
            How it Works
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `font-bold transition ${
                isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
              }`
            }
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="ml-auto flex items-center justify-center text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-xl bg-[#292727] p-5 shadow-xl md:hidden">
            <div className="flex flex-col gap-5 text-sm text-white">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `transition ${
                    isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `transition ${
                    isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/how-it-works"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `transition ${
                    isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
                  }`
                }
              >
                How it Works
              </NavLink>

              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `font-bold transition ${
                    isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
                  }`
                }
              >
                Login
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
