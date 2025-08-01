import React from "react";
import { Link } from "react-router-dom";

export default function ProfileSideBar({ Media = [] }) {
  return (
    <div className="text-white px-4 py-6 pt-0">
      <ul className="space-y-6">
        {Media.slice(0, 6).map((item) => (
          <li
            key={`${item.id}-${item.title || item.name}`}
            className="flex items-center gap-4"
          >
            <Link to={`/CardDetails/${item.media_type || type}/${item.id}`} className="flex items-center gap-4">
              <img
                src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                alt={item.title || item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between">
                <h4 className="text-md font-semibold mb-0.5">
                  {item.title || item.name}
                </h4>
                <p className="text-xs text-gray-400 mb-1 line-clamp-1">
                  {item.overview}
                </p>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <span>★</span>
                  <span>{item.vote_average?.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
