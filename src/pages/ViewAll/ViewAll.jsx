import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "../../components/SearchInput/SearchInput";

export default function ViewAll() {
  const location = useLocation();
  const { title, data, type } = location.state || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);

  useEffect(() => {
    if (!data) return;

    const filtered = data.filter((item) => {
      const mediaTitle = item.title || item.name || "";
      return mediaTitle.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredData(filtered);
  }, [searchTerm, data]);

  if (!data || !Array.isArray(data)) return <p className="text-white">No data available.</p>;

  return (
    <div className="container mx-auto px-4 my-12">
      <h2 className="text-3xl text-textColor font-bold pb-6 pt-14 text-center">{title}</h2>

      <div className="max-w-md mx-auto mb-10">
        <SearchInput
        placeholder={`Search In ${title}...`}
          onSearch={(value) => setSearchTerm(value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredData.map((item) => {
          const mediaTitle = item.title || item.name || "Untitled";

          return (
            <Link to={`/CardDetails/${item.media_type || type}/${item.id}`} key={item.id}>
              <div className="text-white text-center">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={mediaTitle}
                  className="w-full h-72 object-cover rounded-lg mb-2 hover:scale-105 transition-transform"
                />
                <p className="font-semibold">{mediaTitle}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
