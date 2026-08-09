import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../assets/aitreasurer-navbar-logo.webp";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="w-full px-3 pt-1 sticky top-1 z-50">
      <div className="relative flex h-14 w-full items-center rounded-xl bg-[#292727] px-4 sm:px-5">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
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
          <a
            href="/#home"
            className="transition hover:text-[#79ff70] text-base"
          >
            Home
          </a>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-[#79ff70]" : "hover:text-[#79ff70] text-base"
              }`
            }
          >
            About Us
          </NavLink>

          <a
            href="/#how-it-works"
            className="transition hover:text-[#79ff70] text-base"
          >
            How it Works
          </a>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `font-bold transition ${
                isActive ? "text-[#79ff70]" : "hover:text-[#79ff70] text-base"
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
