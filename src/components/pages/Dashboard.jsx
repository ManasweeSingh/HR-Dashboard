import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Star, Bookmark, Eye, TrendingUp,
  ChevronDown, X, ChevronLeft, ChevronRight
} from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [promotedUser, setPromotedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;
  const generateRating = () => Math.floor(Math.random() * 5) + 1;

  /* ------------------ Fetch Users ------------------ */
  useEffect(() => {
  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('https://dummyjson.com/users?limit=50');
    const data = await res.json();
   const extendedUsers = [];

for (let i = 0; i < 5; i++) {
  extendedUsers.push(
    ...data.users.map(u => ({
      ...u,
      id: u.id + i * 1000, // unique IDs
      rating: generateRating()
    }))
  );
}

setUsers(extendedUsers);
setFilteredUsers(extendedUsers);

    setLoading(false);
  };
  fetchUsers();
}, []);

  /* ------------------ Filtering ------------------ */
  useEffect(() => {
    const filtered = users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const department = user.company?.department || '';
      return (
        fullName.includes(searchTerm.toLowerCase()) &&
        (selectedDepartments.length === 0 || selectedDepartments.includes(department)) &&
        (selectedRatings.length === 0 || selectedRatings.includes(user.rating))
      );
    });
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedDepartments, selectedRatings, users]);

  const departments = [...new Set(users.map(u => u.company?.department).filter(Boolean))];
  const ratings = [1, 2, 3, 4, 5];

  /* ------------------ Pagination ------------------ */
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  /* ------------------ Bookmark ------------------ */
  const toggleBookmark = user => {
    const updated = new Set(bookmarks);
    updated.has(user.id) ? updated.delete(user.id) : updated.add(user.id);
    setBookmarks(updated);
  };

  /* ------------------ Promote ------------------ */
  const handlePromote = user => {
    setPromotedUser(user);
    setTimeout(() => setPromotedUser(null), 3000);
  };

  /* ------------------ Stars ------------------ */
  const renderStars = rating => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'text-[#c9a26a] fill-[#c9a26a]'
              : 'text-gray-300 dark:text-[#5c4a3a]'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600 dark:text-[#cbb8a0]">
        ({rating}/5)
      </span>
    </div>
  );

  /* ------------------ Loading ------------------ */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-[#0b0b0b]">
        <div className="h-12 w-12 animate-spin border-b-2 border-[#7a5a40] rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="
      min-h-screen p-4 sm:p-6
      bg-gray-50
      dark:bg-gradient-to-br dark:from-[#0b0b0b] dark:to-[#1c140d]
    ">

      {/* ------------------ Header ------------------ */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-[#f6efe6]">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-[#cbb8a0]">
          Manage your team’s performance and employee data
        </p>
      </div>

      {/* ------------------ Search & Filters ------------------ */}
      <div className="
        mb-6 p-4 rounded-xl border
        bg-white border-gray-200
        dark:bg-gradient-to-br dark:from-[#1a120c] dark:to-[#23170e]
        dark:border-[#3a2a1a]
      ">
        <div className="flex flex-wrap gap-4">

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#cbb8a0]" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search employees..."
              className="
                w-full pl-10 py-2 rounded-lg border
                bg-white border-gray-300 text-gray-900
                dark:bg-[#120d08] dark:border-[#3a2a1a]
                dark:text-[#f6efe6]
                focus:ring-2 focus:ring-[#7a5a40]
              "
            />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <button
              onClick={() => setShowDepartmentFilter(!showDepartmentFilter)}
              className="
                px-4 py-2 rounded-lg border flex items-center gap-2
                bg-white border-gray-300 text-gray-700
                dark:bg-[#120d08] dark:border-[#3a2a1a] dark:text-[#cbb8a0]
              "
            >
              <Filter className="w-4 h-4" />
              Department
              <ChevronDown className="w-4 h-4" />
            </button>

            {showDepartmentFilter && (
              <div className="
                absolute mt-2 w-56 rounded-lg p-3 z-10
                bg-white border border-gray-200
                dark:bg-[#1a120c] dark:border-[#3a2a1a]
              ">
                {departments.map(dept => (
                  <label key={dept} className="flex items-center gap-2 text-sm dark:text-[#cbb8a0]">
                    <input
                      type="checkbox"
                      checked={selectedDepartments.includes(dept)}
                      onChange={() =>
                        setSelectedDepartments(prev =>
                          prev.includes(dept)
                            ? prev.filter(d => d !== dept)
                            : [...prev, dept]
                        )
                      }
                    />
                    {dept}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="relative">
            <button
              onClick={() => setShowRatingFilter(!showRatingFilter)}
              className="
                px-4 py-2 rounded-lg border flex items-center gap-2
                bg-white border-gray-300 text-gray-700
                dark:bg-[#120d08] dark:border-[#3a2a1a] dark:text-[#cbb8a0]
              "
            >
              <Star className="w-4 h-4" />
              Rating
              <ChevronDown className="w-4 h-4" />
            </button>

            {showRatingFilter && (
              <div className="
                absolute mt-2 w-40 rounded-lg p-3 z-10
                bg-white border border-gray-200
                dark:bg-[#1a120c] dark:border-[#3a2a1a]
              ">
                {ratings.map(r => (
                  <label key={r} className="flex items-center gap-2 text-sm dark:text-[#cbb8a0]">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(r)}
                      onChange={() =>
                        setSelectedRatings(prev =>
                          prev.includes(r)
                            ? prev.filter(x => x !== r)
                            : [...prev, r]
                        )
                      }
                    />
                    {r} Stars
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------ Employee Cards ------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-6">

        {currentUsers.map(user => (
          <div
            key={user.id}
            className="
              rounded-xl p-5 border transition-all
              bg-white border-gray-200 shadow-sm
              dark:bg-gradient-to-br dark:from-[#14100b] dark:to-[#25180f]
              dark:border-[#3a2a1a]
              hover:shadow-lg
            "
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-3">
                <img src={user.image} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-[#f6efe6]">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-[#cbb8a0]">
                    {user.company?.department}
                  </p>
                </div>
              </div>

              <button onClick={() => toggleBookmark(user)}>
                <Bookmark
                  className={`w-5 h-5 ${
                    bookmarks.has(user.id)
                      ? 'fill-[#7a5a40] text-[#7a5a40]'
                      : 'text-gray-400 dark:text-[#cbb8a0]'
                  }`}
                />
              </button>
            </div>

            {renderStars(user.rating)}

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onNavigate('employees', { employeeId: user.id })}
                className="
                  flex-1 py-2 rounded-lg text-sm font-medium text-white
                  bg-gradient-to-r from-[#5a402a] to-[#7a5a40]
                "
              >
                <Eye className="inline w-4 h-4 mr-1" />
                View
              </button>

              <button
                onClick={() => handlePromote(user)}
                className="
                  flex-1 py-2 rounded-lg text-sm font-medium
                  border border-[#7a5a40]
                  text-[#7a5a40]
                  hover:bg-[#7a5a40] hover:text-[#0b0b0b]
                "
              >
                <TrendingUp className="inline w-4 h-4 mr-1" />
                Promote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------ Pagination ------------------ */}
      <div className="flex justify-center mt-10 gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`
              px-3 py-1 rounded-lg border
              ${currentPage === i + 1
                ? 'bg-[#7a5a40] text-[#0b0b0b] border-[#7a5a40]'
                : 'border-gray-300 dark:border-[#3a2a1a] dark:text-[#cbb8a0]'}
            `}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ------------------ Promote Toast ------------------ */}
      {promotedUser && (
        <div className="
          fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg
          bg-[#5a402a] text-white
        ">
          🎉 {promotedUser.firstName} promoted!
        </div>
      )}
    </div>
  );
};

export default Dashboard;
