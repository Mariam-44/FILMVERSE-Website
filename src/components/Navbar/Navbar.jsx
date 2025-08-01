import { Link, NavLink, useLocation } from "react-router-dom";
import FilmverseLogo from "../../assets/imgs/Filmverse-logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../../context/User.context";

export default function Navbar() {
  let { token, logout } = useContext(UserContext);
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (location.pathname === "/login" || location.pathname === "/signup")
    return null;

  const handleCloseMenu = (e) => {
    if (e.target === e.currentTarget) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-bgColor absolute top-0 w-full z-50 bg-opacity-20 shadow-sm py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/">
          <img src={FilmverseLogo} className="w-44" alt="Logo" />
        </Link>

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        <div className="hidden w-full lg:flex items-center ">
          <ul className="flex gap-7 mx-auto  items-center text-grayColor">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                    isActive
                      ? "before:!w-full font-semibold text-textColor"
                      : ""
                  }`
                }
                to=""
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                    isActive
                      ? "before:!w-full font-semibold text-textColor"
                      : ""
                  }`
                }
                to="/movies"
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                    isActive
                      ? "before:!w-full font-semibold text-textColor"
                      : ""
                  }`
                }
                to="Tvshows"
              >
                TV Shows
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative me-24 before:absolute before:w-0 before:h-0.5 before:bg-primary-500 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                    isActive
                      ? "before:!w-full font-semibold text-textColor"
                      : ""
                  }`
                }
                to="/Series"
              >
                Series
              </NavLink>
            </li>
          </ul>
          <Link to="/Favorite" className="cursor-pointer relative me-6">
            <i className="fa-regular fa-heart text-lg text-gray-200"></i>
            <div className="counter text-white flex justify-center items-center translate-x-1/2 -translate-y-1/2 absolute right-0 top-1 bg-primary-500 h-2 w-2 rounded-full">
              <span className="text-xs font-semibold"></span>
            </div>
          </Link>
          <div className="relative">
            <button
              className="text-white text-xl"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <i className="fa-regular fa-circle-user text-gray-200"></i>
            </button>

            {showDropdown && (
              <div className="absolute -left-10 mt-2 bg-bgColor rounded shadow-lg py-2 w-32 z-50">
                {token ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 text-grayColor py-2 text-sm hover:text-textColor"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 text-grayColor py-2 text-sm hover:text-textColor"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 text-grayColor py-2 text-sm hover:text-textColor"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-90 z-40 pt-20 px-6"
            onClick={handleCloseMenu}
          >
            <div className="flex flex-col items-center gap-8">
              <ul className="flex flex-col gap-8 text-grayColor w-full text-center">
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      `block py-2 text-xl relative ${
                        isActive ? "font-semibold text-textColor" : ""
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                      `block py-2 text-xl relative ${
                        isActive ? "font-semibold text-textColor" : ""
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Tvshows"
                    className={({ isActive }) =>
                      `block py-2 text-xl relative ${
                        isActive ? "font-semibold text-textColor" : ""
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    TV Shows
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Series"
                    className={({ isActive }) =>
                      `block py-2 text-xl relative ${
                        isActive ? "font-semibold text-textColor" : ""
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Series
                  </NavLink>
                </li>
              </ul>

              <div className="flex items-center gap-8 mt-4">
                <Link
                  to="/Favorite"
                  className="cursor-pointer relative"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fa-regular fa-heart text-2xl text-gray-200"></i>
                  <div className="counter text-white flex justify-center items-center translate-x-1/2 -translate-y-1/2 absolute right-0 top-1 bg-primary-500 h-2 w-2 rounded-full">
                    <span className="text-xs font-semibold"></span>
                  </div>
                </Link>

                <div className="relative">
                  <button
                    className="text-white text-2xl"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <i className="fa-regular fa-circle-user text-gray-200"></i>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 bg-bgColor rounded shadow-lg py-2 w-32 z-50">
                      {token ? (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 text-grayColor py-2 text-sm hover:text-textColor"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setShowDropdown(false);
                            }}
                          >
                            View Profile
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setMobileMenuOpen(false);
                              setShowDropdown(false);
                            }}
                            className="block w-full text-left px-4 text-grayColor py-2 text-sm hover:text-textColor"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <Link
                          to="/login"
                          className="block px-4 text-grayColor py-2 text-sm hover:text-textColor"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setShowDropdown(false);
                          }}
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
