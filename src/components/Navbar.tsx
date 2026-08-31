import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../assets/aitreasurer-navbar-logo.webp";
import { AuthContext } from "../context/AuthContext";
import { authApi } from "../services/auth.api";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const auth = useContext(AuthContext);

  const isAuthenticated = auth?.isAuthenticated ?? false;

  const closeMenu = () => {
    setOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      auth?.clearAuth();
      closeMenu();
    }
  };

  return (
    <nav className="sticky top-1 z-50 w-full px-3 pt-1">
      <div className="relative flex h-14 w-full items-center rounded-xl bg-[#292727] px-4 sm:px-5">
        {/* =================================================
            LOGO
        ================================================= */}

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
            className="h-12 w-20 rounded-xl bg-[#f5ffc2] object-contain"
          />
        </NavLink>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <div className="ml-auto hidden items-center gap-6 text-sm text-white sm:gap-8 md:flex">
          {/* Home */}

          <a
            href="/#home"
            className="text-base transition hover:text-[#79ff70]"
          >
            Home
          </a>

          {/* About */}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-base transition ${
                isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
              }`
            }
          >
            About Us
          </NavLink>

          {/* How it works */}

          <a
            href="/#how-it-works"
            className="text-base transition hover:text-[#79ff70]"
          >
            How it Works
          </a>

          {/* =================================================
              LOGIN / LOGOUT
          ================================================= */}

          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-base font-bold transition hover:text-[#79ff70]"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-base font-bold transition ${
                  isActive ? "text-[#79ff70]" : "hover:text-[#79ff70]"
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="ml-auto flex items-center justify-center text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-xl bg-[#292727] p-5 shadow-xl md:hidden">
            <div className="flex flex-col gap-5 text-sm text-white">
              {/* Home */}

              <NavLink
                to="/"
                onClick={closeMenu}
                className="transition hover:text-[#79ff70]"
              >
                Home
              </NavLink>

              {/* About */}

              <NavLink
                to="/about"
                onClick={closeMenu}
                className="transition hover:text-[#79ff70]"
              >
                About Us
              </NavLink>

              {/* How it works */}

              <a
                href="/#how-it-works"
                onClick={closeMenu}
                className="transition hover:text-[#79ff70]"
              >
                How it Works
              </a>

              {/* Login / Logout */}

              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-left text-base font-bold transition hover:text-[#79ff70]"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="text-base font-bold transition hover:text-[#79ff70]"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
