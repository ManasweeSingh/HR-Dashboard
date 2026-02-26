import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Users, Filter } from 'lucide-react';

const Analytics = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('6months');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockBookmarkTrends = useMemo(() => ({
    '3months': [
      { date: "2024-03", bookmarks: 22, month: "Mar" },
      { date: "2024-04", bookmarks: 18, month: "Apr" },
      { date: "2024-05", bookmarks: 30, month: "May" },
    ],
    '6months': [
      { date: "2023-12", bookmarks: 8, month: "Dec" },
      { date: "2024-01", bookmarks: 10, month: "Jan" },
      { date: "2024-02", bookmarks: 15, month: "Feb" },
      { date: "2024-03", bookmarks: 22, month: "Mar" },
      { date: "2024-04", bookmarks: 18, month: "Apr" },
      { date: "2024-05", bookmarks: 30, month: "May" },
    ],
    '1year': [
      { date: "2023-06", bookmarks: 5, month: "Jun '23" },
      { date: "2023-07", bookmarks: 7, month: "Jul '23" },
      { date: "2023-08", bookmarks: 12, month: "Aug '23" },
      { date: "2023-09", bookmarks: 9, month: "Sep '23" },
      { date: "2023-10", bookmarks: 14, month: "Oct '23" },
      { date: "2023-11", bookmarks: 6, month: "Nov '23" },
      { date: "2023-12", bookmarks: 8, month: "Dec '23" },
      { date: "2024-01", bookmarks: 10, month: "Jan '24" },
      { date: "2024-02", bookmarks: 15, month: "Feb '24" },
      { date: "2024-03", bookmarks: 22, month: "Mar '24" },
      { date: "2024-04", bookmarks: 18, month: "Apr '24" },
      { date: "2024-05", bookmarks: 30, month: "May '24" },
    ]
  }), []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=100');
        const data = await response.json();

        const departmentMap = {};
        data.users.forEach(user => {
          const department = user.company?.department || 'Unknown';
          const rating = 3.0 + (user.id % 21) / 10;

          if (!departmentMap[department]) {
            departmentMap[department] = { department, totalRating: 0, count: 0 };
          }

          departmentMap[department].totalRating += rating;
          departmentMap[department].count += 1;
        });

        const processedData = Object.values(departmentMap).map(dept => ({
          department: dept.department,
          averageRating: Math.round((dept.totalRating / dept.count) * 10) / 10,
          employeeCount: dept.count,
        }));

        setDepartmentData(processedData);
        setBookmarkData(mockBookmarkTrends[selectedDateRange]);
        setLoading(false);
      } catch {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [mockBookmarkTrends, selectedDateRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf7f2] dark:bg-[#070707] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#a86d53] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6f5e4f] dark:text-[#cbb58b]">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf7f2] dark:bg-[#070707] p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-[#3b2a1a] dark:text-[#fff1dc] mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-[#6f5e4f] dark:text-[#cbb58b] mb-6">
          Comprehensive insights into department performance and engagement trends
        </p>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Total Departments", value: departmentData.length, icon: Users },
            { title: "Avg Rating", value: "4.3", icon: TrendingUp },
            { title: "This Month Bookmarks", value: bookmarkData.at(-1)?.bookmarks, icon: Calendar }
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-[#fffaf3] dark:bg-[#14100b] border border-[#e0d6c8] dark:border-[#3a2a1a] rounded-lg p-6 shadow-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-[#f3eee6] dark:bg-[#2a1a0e]">
                    <Icon className="w-6 h-6 text-[#a86d53]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">{card.title}</p>
                    <p className="text-2xl font-bold text-[#3b2a1a] dark:text-[#fff1dc]">{card.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BAR CHART */}
        <div className="bg-[#fffaf3] dark:bg-[#14100b] border border-[#e0d6c8] dark:border-[#3a2a1a] rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-[#3b2a1a] dark:text-[#fff1dc] mb-4">
            Department Average Ratings
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d6c9b8" />
              <XAxis dataKey="department" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageRating" fill="#a86d53" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AREA CHART */}
        <div className="bg-[#fffaf3] dark:bg-[#14100b] border border-[#e0d6c8] dark:border-[#3a2a1a] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-[#3b2a1a] dark:text-[#fff1dc] mb-4">
            Bookmark Trends
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bookmarkData}>
              <defs>
                <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a86d53" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#a86d53" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#d6c9b8" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="bookmarks" stroke="#a86d53" fill="url(#trend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 lg:mt-8 bg-[#fffaf3] dark:bg-[#14100b] 
border border-[#e0d6c8] dark:border-[#3a2a1a] rounded-lg shadow-lg p-4 lg:p-6">

  <h3 className="text-lg font-bold text-[#3b2a1a] dark:text-[#fff1dc] mb-4">
    Department Details
  </h3>

  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-[#e0d6c8] dark:divide-[#3a2a1a]">

      <thead className="bg-[#f3eee6] dark:bg-[#1a120c]">
        <tr>
          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-[#6f5e4f] dark:text-[#cbb58b] uppercase tracking-wider">
            Department
          </th>
          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-[#6f5e4f] dark:text-[#cbb58b] uppercase tracking-wider">
            Average Rating
          </th>
          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-[#6f5e4f] dark:text-[#cbb58b] uppercase tracking-wider">
            Employees
          </th>
          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-[#6f5e4f] dark:text-[#cbb58b] uppercase tracking-wider">
            Performance
          </th>
        </tr>
      </thead>

      <tbody className="bg-[#fffaf3] dark:bg-[#14100b] divide-y divide-[#e0d6c8] dark:divide-[#3a2a1a]">

        {departmentData.map((dept, index) => (
          <tr
            key={dept.department}
            className={
              index % 2 === 0
                ? 'bg-[#fffaf3] dark:bg-[#14100b]'
                : 'bg-[#f3eee6] dark:bg-[#1a120c]'
            }
          >
            <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3b2a1a] dark:text-[#fff1dc]">
              {dept.department}
            </td>

            <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-[#6f5e4f] dark:text-[#cbb58b]">
              <div className="flex items-center">
                <span className="mr-2">{dept.averageRating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(dept.averageRating)
                          ? 'text-[#a86d53]'
                          : 'text-[#d6c9b8] dark:text-[#5c4a3a]'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </td>

            <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-[#6f5e4f] dark:text-[#cbb58b]">
              {dept.employeeCount}
            </td>

            <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  dept.averageRating >= 4.5
                    ? 'bg-[#e7c9a5] text-[#3b2a1a] dark:bg-[#2a1a0e] dark:text-[#fff1dc]'
                    : dept.averageRating >= 4.0
                    ? 'bg-[#f3eee6] text-[#3b2a1a] dark:bg-[#1f140b] dark:text-[#e7c9a5]'
                    : 'bg-[#fbe9e9] text-[#7a2d2d] dark:bg-[#2a1414] dark:text-[#ffb4b4]'
                }`}
              >
                {dept.averageRating >= 4.5
                  ? 'Excellent'
                  : dept.averageRating >= 4.0
                  ? 'Good'
                  : 'Needs Improvement'}
              </span>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  </div>
</div>


      </div>
    </div>
  );
};

export default Analytics;
