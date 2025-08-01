import React from "react";
import logo from "../../assets/imgs/Filmverse-logo.png";

export default function Footer() {
  return (
    <footer className="bg-bgColor text-gray-300 py-10 px-6 border-t mt-28 border-t-slate-600">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid gap-10
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-4"
        >

          <div className="flex flex-col gap-3">
            <div className="w-44 sm:w-56">
              <img src={logo} alt="Filmverse Logo" className="object-contain" />
            </div>
            <p className="text-sm ">
              Explore and Track Your Favorite Movies Anytime
            </p>
          </div>

          <div className="lg:text-center ">
            <h3 className="text-lg font-semibold text-white mb-2">Genres</h3>
            <ul className="space-y-1 ">
              {["Action", "Romance", "Horror", "Animation", "Documentary"].map(
                (genre) => (
                  <li key={genre}>
                    <a href="#" className="hover:text-white text-sm">
                      {genre}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="lg:text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Top Countries
            </h3>
            <ul className="space-y-1">
              {["USA", "India", "France", "Japan", "South Korea"].map(
                (country) => (
                  <li key={country}>
                    <a href="#" className="hover:text-white text-sm">
                      {country}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Subscribe for Updates
            </h3>
            <p className="text-sm mb-4">
              Get notified about trending movies and personalized
              recommendations.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-bgColor border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-gray-800 text-center text-xs">
          <p>© 2025 FILMVERSE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
