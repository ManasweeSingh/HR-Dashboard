import React, { useState, useEffect } from 'react';
import { Search, Star, Bookmark, Eye, X, BookmarkX, Users, TrendingUp } from 'lucide-react';

const Bookmarks = ({ onNavigate }) => {
  const [bookmarkedEmployees, setBookmarkedEmployees] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [promotedUser, setPromotedUser] = useState(null);

  useEffect(() => {
    const loadBookmarks = () => {
      try {
        const savedBookmarks = localStorage.getItem('bookmarkedEmployees');
        const bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
        setBookmarkedEmployees(bookmarks);
        setFilteredBookmarks(bookmarks);
      } catch {
        setBookmarkedEmployees([]);
        setFilteredBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
    window.addEventListener('bookmarksChanged', loadBookmarks);
    return () => window.removeEventListener('bookmarksChanged', loadBookmarks);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBookmarks(bookmarkedEmployees);
    } else {
      const filtered = bookmarkedEmployees.filter(employee => {
        const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
        const email = employee.email.toLowerCase();
        const department = employee.company?.department?.toLowerCase() || '';
        return fullName.includes(searchTerm.toLowerCase()) ||
               email.includes(searchTerm.toLowerCase()) ||
               department.includes(searchTerm.toLowerCase());
      });
      setFilteredBookmarks(filtered);
    }
  }, [searchTerm, bookmarkedEmployees]);

  const removeBookmark = (id) => {
    const updated = bookmarkedEmployees.filter(e => e.id !== id);
    localStorage.setItem('bookmarkedEmployees', JSON.stringify(updated));
    setBookmarkedEmployees(updated);
    window.dispatchEvent(new CustomEvent('bookmarksChanged'));
  };

  const handlePromote = (user) => {
    setPromotedUser(user);
    setTimeout(() => setPromotedUser(null), 3000);
  };

  const renderStars = (rating) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'text-[#a86d53] fill-[#a86d53]'
              : 'text-[#d6c9b8] dark:text-[#5c4a3a]'
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-[#6f5e4f] dark:text-[#cbb58b]">
        ({rating}/5)
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fbf7f2] dark:bg-[#070707]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a86d53] mx-auto"></div>
          <p className="mt-4 text-[#6f5e4f] dark:text-[#cbb58b]">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#fbf7f2] dark:bg-[#070707] min-h-screen">

      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Bookmark className="w-8 h-8 text-[#a86d53]" />
          <h1 className="text-3xl font-bold text-[#3b2a1a] dark:text-[#fff1dc]">
            Bookmarked Employees
          </h1>
        </div>
        <p className="text-[#6f5e4f] dark:text-[#cbb58b]">
          {bookmarkedEmployees.length} employees bookmarked
        </p>
      </div>

      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBookmarks.map(employee => (
            <div
              key={employee.id}
              className="rounded-lg p-6 border bg-[#fffaf3] border-[#e0d6c8]
dark:bg-[#14100b] dark:border-[#3a2a1a] shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start space-x-4 mb-4">
                <img src={employee.image} className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-[#3b2a1a] dark:text-[#fff7ed]">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">
                    Age: {employee.age}
                  </p>
                </div>
                <button
                  onClick={() => removeBookmark(employee.id)}
                  className="text-[#7a2d2d] hover:text-[#a23b3b]"
                >
                  <BookmarkX />
                </button>
              </div>

              <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">📧 {employee.email}</p>
              <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">🏢 {employee.company?.department}</p>

              <div className="mt-3">
                <p className="text-sm font-medium text-[#3b2a1a] dark:text-[#ffe9c7] mb-1">
                  Performance Rating
                </p>
                {renderStars(employee.rating)}
              </div>

              <div className="flex space-x-2 mt-4">
                <button className="flex-1 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-[#3b2a1a] to-[#a86d53] hover:from-[#a86d53] hover:to-[#3b2a1a]">
                  <Eye className="inline w-4 h-4 mr-1" /> View
                </button>
                <button className="flex-1 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-[#6a4b2f] to-[#d9a06f] hover:from-[#d9a06f] hover:to-[#6a4b2f]">
                  <TrendingUp className="inline w-4 h-4 mr-1" /> Promote
                </button>
              </div>
            </div>
          ))}
        </div>
     ) : (
  <div className="text-center py-16">
    <Users className="w-20 h-20 mx-auto text-[#a86d53]" />
    <h3 className="text-xl font-medium text-[#3b2a1a] dark:text-[#fff1dc] mt-4">
      No bookmarks yet
    </h3>
    <p className="text-[#6f5e4f] dark:text-[#cbb58b] mb-6">
      Start bookmarking employees to track them easily.
    </p>

    <button
      onClick={() => onNavigate('dashboard')}
      className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium
      bg-gradient-to-r from-[#3b2a1a] to-[#a86d53]
      hover:from-[#a86d53] hover:to-[#3b2a1a] transition"
    >
      <Bookmark className="w-5 h-5 mr-2" />
      Go to Dashboard
    </button>
  </div>
)
      }

      {promotedUser && (
        <div className="fixed bottom-4 right-4 bg-gradient-to-r from-[#3b2a1a] to-[#a86d53] text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          🎉 {promotedUser.firstName} promoted!
        </div>
        
      )}
      
    </div>
  );
};

export default Bookmarks;
