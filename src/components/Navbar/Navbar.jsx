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
              <div className="absolute -right-20 mt-3 bg-bgColor/80  rounded-lg shadow-2xl border border-gray-700/50 py-2 w-48 z-50">
                {token ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                          <i className="fa-solid fa-user text-white text-sm"></i>
                        </div>
                        <div>
                          <p className="text-textColor text-sm font-medium">
                            Welcome back!
                          </p>
                          
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-grayColor hover:text-textColor  transition-all duration-150 group"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setShowDropdown(false);
                        }}
                      >
                        <i className="fa-regular fa-user w-4 text-center mr-3 group-hover:text-primary-500 transition-all duration-150"></i>
                        <span className="text-sm">View Profile</span>
                      </Link>

                      <Link
                        to="/Favorite"
                        className="flex items-center px-4 py-2 text-grayColor hover:text-textColor transition-all duration-150 group"
                        onClick={() => setShowDropdown(false)}
                      >
                        <i className="fa-regular fa-heart w-4 text-center mr-3 group-hover:text-primary-500 transition-all duration-150"></i>
                        <span className="text-sm">My Favorites</span>
                      </Link>

                      <Link
                        to="/watchlater"
                        className="flex items-center px-4 py-2 text-grayColor hover:text-textColor transition-all duration-150 group"
                        onClick={() => setShowDropdown(false)}
                      >
                        <i className="fa-regular fa-circle-play w-4 text-center mr-3 group-hover:text-primary-500 transition-all duration-150"></i>
                        <span className="text-sm">Watch Later</span>
                      </Link>

                      <hr className="my-1 border-gray-700/50" />

                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                          setShowDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-grayColor hover:text-primary-400  transition-all duration-150 group"
                      >
                        <i className="fa-solid fa-sign-out-alt w-3 text-center mr-3 group-hover:text-primary-400 transition-all duration-150"></i>
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-1">
                    <Link
                      to="/login"
                      className="flex items-center px-4 py-2 text-grayColor hover:text-textColor hover:bg-gray-800/50 transition-all duration-150 group"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowDropdown(false);
                      }}
                    >
                      <i className="fa-solid fa-sign-in-alt w-3 text-center mr-3 group-hover:text-primary-400 transition-all duration-150"></i>
                      <span className="text-sm">Sign In</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center px-4 py-2 text-grayColor hover:text-textColor hover:bg-gray-800/50 transition-all duration-150 group"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowDropdown(false);
                      }}
                    >
                      <i className="fa-solid  fa-user text-center mr-3 group-hover:text-primary-400 transition-all duration-150"></i>
                      <span className="text-sm">Sign Up</span>
                    </Link>
                  </div>
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
