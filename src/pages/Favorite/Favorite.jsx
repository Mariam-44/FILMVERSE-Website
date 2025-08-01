import React, { useContext, useEffect, useState } from "react";
import { useWishlist } from "../../context/Favorite.Context";
import { Link, useNavigate } from "react-router-dom";
import HeartLoader from "../../components/HeartLoader/HeartLoader"; 
import { UserContext } from "../../context/User.context";
import NotAuth from "../../components/NotAuth/NotAuth";

export default function Favorite() {
  const { wishlist, removeFromWishlistByItemId, loading } = useWishlist();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [filter, setFilter] = useState('all');

   const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/NotAuth");

    }
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bgColor flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <HeartLoader size="normal" />
          <p className="text-white text-lg font-medium">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  const filteredWishlist = wishlist.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const handleRemove = (item, event) => {
    event.stopPropagation();
    const idToRemove = item.id;
    
    if (!idToRemove) {
      console.error("Item ID is undefined", item);
      return;
    }
    
    removeFromWishlistByItemId(idToRemove);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-bgColor flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center ">
            <HeartLoader size="large" opacity={0.8} />
          </div>
          <h2 className="text-3xl font-bold text-gray-300 mb-4 pt-40">Your FavoriteList is Empty</h2>
          <p className="text-gray-400 text-lg mb-8">Start adding movies and shows to your favorites to see them here!</p>
          <Link
            to="/"
            className=" px-6 py-3  bg-primary-500  text-textColor font-semibold rounded-lg hover:bg-primary-600"
          >
            <i className="fas fa-search mr-2"></i>
            Discover Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgColor px-4 py-8">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl pt-16 font-bold text-white mb-4">
            Your <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Favorites</span>
          </h1>
          <p className="text-gray-400 text-lg mx-auto">
            A curated collection of movies and shows that captured your heart
          </p>
        </div>

        <div className="flex justify-center mb-8">
          </div> <div className="flex flex-wrap justify-center gap-2 my-5">
          {['all', 'movie', 'tv'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1 text-sm rounded-full border transition ${
                filter === type
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-primary text-white"
              }`}
            >
              {type === 'all' ? 'All' : type === 'movie' ? 'Movies' : 'TV Shows'}
            </button>
          ))}
        </div>
       

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWishlist.map((item, index) => (
            <div
              key={item.id || `wishlist-item-${index}`}
              className="group relative rounded-2xl overflow-hidden border cursor-pointer border-gray-800 hover:border-red-500/50 transition-all duration-500 hover:scale-105  "
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/400x600?text=No+Image"
                  }
                  alt={item.title}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110 "
                />
                
                
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.type === 'movie' 
                      ? 'bg-gray-800/80 text-white border border-gray-600' 
                      : 'bg-red-500/80 text-white'
                  }`}>
                    {item.type === 'movie' ? 'Movie' : 'TV Show'}
                  </span>
                </div>

                <div className={`absolute inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                  hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Link
                    to={`/CardDetails/movie/${item.id}`} key={item.id}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium hover:bg-red-500/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <i className="fas fa-play text-sm"></i>
                    
                    <span>Watch Now</span>
                  </Link>
                </div>

              </div>

              <div className="p-2 px-4">               
                <div className="flex items-center justify-between pt-2">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-1  transition-colors duration-300">
                  {item.title}
                </h3>
                  <button
                    onClick={(e) => handleRemove(item, e)}
                    className="flex items-center text-lg text-red-400 hover:text-red-300 transition-colors duration-300"
                  >
                    <i className="fas fa-trash text-sm"></i>
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">

          <div className="inline-flex items-center space-x-8 bg-gray-900/30 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-700/50">

            <div className="text-center">
              <div className="text-2xl font-bold text-white">{wishlist.length}</div>
              <div className="text-sm text-gray-400">Total Favorites</div>
            </div>

            <div className="w-px h-8 bg-gray-700"></div>

            <div className="text-center">
              <div className="text-2xl font-bold text-red-400"> {wishlist.filter(item=> item.type === "movie").length}</div>
              <div className="text-sm text-gray-400">Movies</div>
            </div>

            <div className="w-px h-8 bg-gray-700"></div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-300"> {wishlist.filter(item=> item.type === "tv").length}
               
              </div>
              <div className="text-sm text-gray-400">TV Shows</div>
            </div>

          </div>

        </div>
      

      </div>
    </div>
  );
}