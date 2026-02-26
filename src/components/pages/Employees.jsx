import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowLeft, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Briefcase, 
  Award, 
  MessageSquare, 
  FolderOpen, 
  User, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye
} from 'lucide-react';

const Employees = ({ employeeId, onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const generateRating = () => Math.floor(Math.random() * 5) + 1;
  
  const generatePerformanceHistory = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.slice(-6).map(month => ({
      month,
      rating: generateRating(),
      feedback: ['Excellent work', 'Good performance', 'Needs improvement', 'Outstanding', 'Satisfactory'][Math.floor(Math.random() * 5)]
    }));
  };

  const generateProjects = () => {
    const projectNames = [
      'Customer Portal Redesign',
      'Mobile App Development',
      'Data Migration Project',
      'API Integration',
      'Security Audit',
      'Performance Optimization',
      'User Experience Research',
      'Marketing Campaign'
    ];
    
    const statuses = ['Completed', 'In Progress', 'On Hold', 'Planning'];
    
    return Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, i) => ({
      id: i + 1,
      name: projectNames[Math.floor(Math.random() * projectNames.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      progress: Math.floor(Math.random() * 100),
      deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      role: ['Lead Developer', 'Team Member', 'Project Manager', 'Consultant'][Math.floor(Math.random() * 4)]
    }));
  };

  const generateFeedback = () => {
    const feedbackTypes = ['Performance Review', 'Peer Feedback', 'Client Feedback', '360 Review'];
    const authors = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Chen', 'David Brown'];
    
    return Array.from({ length: Math.floor(Math.random() * 6) + 4 }, (_, i) => ({
      id: i + 1,
      type: feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)],
      author: authors[Math.floor(Math.random() * authors.length)],
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      rating: generateRating(),
      comment: [
        'Demonstrates excellent leadership skills and consistently delivers high-quality work.',
        'Great team player with strong communication skills. Always willing to help others.',
        'Shows initiative and takes ownership of projects. Reliable and dependable.',
        'Technical skills are outstanding. Needs to work on time management.',
        'Collaborative approach and positive attitude make them a valuable team member.'
      ][Math.floor(Math.random() * 5)]
    }));
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=50');
        const data = await response.json();
        
        const enhancedUsers = data.users.map(user => ({
          ...user,
          rating: generateRating(),
          bio: `Experienced professional with ${Math.floor(Math.random() * 10) + 2} years in ${user.company?.department || 'their field'}. Known for ${['innovation', 'leadership', 'teamwork', 'problem-solving', 'creativity'][Math.floor(Math.random() * 5)]} and ${['attention to detail', 'strategic thinking', 'client relations', 'technical expertise', 'mentoring'][Math.floor(Math.random() * 5)]}.`,
          performanceHistory: generatePerformanceHistory(),
          projects: generateProjects(),
          feedback: generateFeedback()
        }));
        
        setUsers(enhancedUsers);
        setFilteredUsers(enhancedUsers);
        
        if (employeeId) {
          const employee = enhancedUsers.find(user => user.id === parseInt(employeeId));
          if (employee) {
            setSelectedEmployee(employee);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [employeeId]);

  useEffect(() => {
    const filtered = users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const department = user.company?.department?.toLowerCase() || '';
      
      return fullName.includes(searchTerm.toLowerCase()) ||
             email.includes(searchTerm.toLowerCase()) ||
             department.includes(searchTerm.toLowerCase());
    });
    
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setActiveTab('overview');
  };

  const handleBack = () => {
    if (selectedEmployee) {
      setSelectedEmployee(null);
    } else if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
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
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in progress':
        return 'bg-[#f3eee6] text-[#3b2a1a] dark:bg-[#2a1a0e] dark:text-[#e7c9a5]';
      case 'on hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'planning':
       return 'bg-[#f3eee6] text-[#3b2a1a] dark:bg-[#2a1a0e] dark:text-[#e7c9a5]';
      default:
        return 'bg-[#f3eee6] text-[#3b2a1a] dark:bg-[#2a1a0e] dark:text-[#e7c9a5]';
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
     <div className="rounded-lg p-6 border
bg-[#fffaf3] border-[#e0d6c8]
dark:bg-[#14100b] dark:border-[#3a2a1a]">
        <h3 className="text-lg font-semibold text-[#3b2a1a] dark:text-[#fff7ed] mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
           <MapPin className="w-4 h-4 text-[#a86d53] dark:text-[#e7c9a5]" />
<div>
  <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">Address</p>
  <p className="font-medium text-[#3b2a1a] dark:text-[#fff7ed]">
    {selectedEmployee.address.address}, {selectedEmployee.address.city}
  </p>
</div>
</div>

<div className="flex items-center space-x-3">
  <Phone className="w-4 h-4 text-[#a86d53] dark:text-[#e7c9a5]" />
  <div>
    <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">Phone</p>
    <p className="font-medium text-[#3b2a1a] dark:text-[#fff7ed]">
      {selectedEmployee.phone}
    </p>
  </div>
</div>

<div className="flex items-center space-x-3">
  <Mail className="w-4 h-4 text-[#a86d53] dark:text-[#e7c9a5]" />
  <div>
    <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">Email</p>
    <p className="font-medium text-[#3b2a1a] dark:text-[#fff7ed]">
      {selectedEmployee.email}
    </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-[#a86d53] dark:text-[#e7c9a5]" />
<div>
  <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">Birth Date</p>
  <p className="font-medium text-[#3b2a1a] dark:text-[#fff7ed]">
    {selectedEmployee.birthDate}
  </p>
</div>
</div>
</div>
</div>

{/* BIO CARD */}
<div className="rounded-lg p-6 border
bg-[#fffaf3] border-[#e0d6c8]
dark:bg-[#14100b] dark:border-[#3a2a1a]">
  <h3 className="text-lg font-semibold text-[#3b2a1a] dark:text-[#fff7ed] mb-4">
    Bio
  </h3>
  <p className="text-[#5f4b3a] dark:text-[#e7c9a5] leading-relaxed">
    {selectedEmployee.bio}
  </p>
</div>

{/* PERFORMANCE HISTORY */}
<div className="rounded-lg p-6 border
bg-[#fffaf3] border-[#e0d6c8]
dark:bg-[#14100b] dark:border-[#3a2a1a]">
  <h3 className="text-lg font-semibold text-[#3b2a1a] dark:text-[#fff7ed] mb-4 flex items-center">
    <Award className="w-5 h-5 mr-2 text-[#a86d53] dark:text-[#e7c9a5]" />
    Performance History
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {selectedEmployee.performanceHistory.map((entry, index) => (
      <div
        key={index}
        className="rounded-lg p-4
        bg-[#f3eee6]
        dark:bg-[#1a120c]"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-[#3b2a1a] dark:text-[#fff7ed]">
            {entry.month}
          </span>
          {renderStars(entry.rating)}
        </div>

        <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">
          {entry.feedback}
        </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-4">
      {selectedEmployee.projects.map(project => (
        <div
  key={project.id}
  className="rounded-lg p-6 border
  bg-[#fffaf3] border-[#e0d6c8]
  dark:bg-[#14100b] dark:border-[#3a2a1a]"
>
  <div className="flex justify-between items-start mb-4">
    <div>
      <h3 className="text-lg font-semibold text-[#3b2a1a] dark:text-[#fff7ed]">
        {project.name}
      </h3>
      <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">
        Role: {project.role}
      </p>
    </div>

    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
      {project.status}
    </span>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b] mb-1">
        Progress
      </p>

      <div className="w-full bg-[#e7dccf] dark:bg-[#2a1a0e] rounded-full h-2">
        <div
          className="bg-gradient-to-r from-[#3b2a1a] to-[#a86d53] h-2 rounded-full"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>

      <p className="text-xs text-[#7a6a5f] dark:text-[#cbb58b] mt-1">
        {project.progress}% complete
      </p>
    </div>

    <div>
      <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">
        Deadline
      </p>
      <p className="font-medium text-[#3b2a1a] dark:text-[#fff7ed]">
        {project.deadline}
      </p>
    </div>
  </div>

        </div>
      ))}
    </div>
  );

  const renderFeedbackTab = () => (
    <div className="space-y-4">
      {selectedEmployee.feedback.map(feedback => (
        <div
  key={feedback.id}
  className="rounded-lg p-6 border
  bg-[#fffaf3] border-[#e0d6c8]
  dark:bg-[#14100b] dark:border-[#3a2a1a]"
>
  <div className="flex justify-between items-start mb-4">
    <div>
      <h3 className="text-lg font-semibold text-[#3b2a1a] dark:text-[#fff7ed]">
        {feedback.type}
      </h3>
      <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">
        By {feedback.author} • {feedback.date}
      </p>
    </div>
    {renderStars(feedback.rating)}
  </div>

  <p className="text-[#4a3a2b] dark:text-[#e7d3b3]">
    {feedback.comment}
  </p>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a86d53] mx-auto"></div>
          <p className="mt-4 text-[#6f5e4f] dark:text-[#cbb58b]">
  Loading employees...
</p>

        </div>
      </div>
    );
  }

  if (selectedEmployee) {
    return (
      <div className="p-6 bg-[#fbf7f2] dark:bg-[#070707] min-h-screen">

        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2
text-[#6f5e4f] dark:text-[#cbb58b]
hover:text-[#3b2a1a] dark:hover:text-[#fff7ed]
mb-4"

          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Employees</span>
          </button>
          
          <div className="flex items-center space-x-6">
            <img
              src={selectedEmployee.image}
              alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-[#3b2a1a] dark:text-[#fff7ed]">
  {selectedEmployee.firstName} {selectedEmployee.lastName}
</h1>
<p className="text-[#6f5e4f] dark:text-[#cbb58b] text-lg">

                {selectedEmployee.company?.title || 'Employee'} • {selectedEmployee.company?.department || 'Department'}
              </p>
              <div className="mt-2">
                {renderStars(selectedEmployee.rating)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#14100b] rounded-lg border border-[#e0d6c8] dark:border-[#3a2a1a] mb-6">
  <div className="border-b border-[#e0d6c8] dark:border-[#3a2a1a]">

            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'projects', label: 'Projects', icon: FolderOpen },
                { id: 'feedback', label: 'Feedback', icon: MessageSquare }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-[#a86d53] text-[#a86d53] dark:text-[#e7c9a5]'
                        : 'border-transparent text-[#6f5e4f] hover:text-[#3b2a1a] dark:text-[#cbb58b] dark:hover:text-[#fff1dc]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'projects' && renderProjectsTab()}
            {activeTab === 'feedback' && renderFeedbackTab()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#fbf7f2] dark:bg-[#070707] min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#3b2a1a] dark:text-[#fff1dc] mb-2">
  Employees
</h1>
<p className="text-[#6f5e4f] dark:text-[#cbb58b]">
  Search and view detailed employee profiles
</p>
</div>

<div className="bg-[#fffaf3] dark:bg-[#14100b] rounded-lg shadow-sm border border-[#d6c9b8] dark:border-[#3a2a1a] p-6 mb-6">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a86d53] dark:text-[#e7c9a5] w-5 h-5" />

          <input
            type="text"
            placeholder="Search employees by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg text-lg transition
border-[#d6c9b8] bg-[#fffaf3] text-[#3b2a1a]
focus:ring-2 focus:ring-[#a86d53] focus:border-transparent
dark:border-[#3a2a1a] dark:bg-[#14100b] dark:text-[#fff1dc]"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-[#6f5e4f] dark:text-[#6f5e4f]">
          {filteredUsers.length} employees found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            onClick={() => handleEmployeeSelect(user)}
            className="rounded-lg p-6 cursor-pointer transition-all
bg-[#fffaf3] border border-[#e0d6c8] shadow-sm hover:shadow-md
dark:bg-[#14100b] dark:border-[#3a2a1a]"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
               <h3 className="text-lg font-semibold text-[#3b2a1a] dark:text-[#fff7ed] truncate">
                  {user.firstName} S{user.lastName}
                </h3>
               <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">
                  {user.company?.title || 'Employee'}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b] truncate">
📧 {user.email}
</p>

<p className="text-sm text-[#6f5e4f] dark:text-[#cbb58b]">
🏢 {user.company?.department || 'No Department'}
</p>

<p className="text-sm font-medium text-[#3b2a1a] dark:text-[#ffe9c7] mb-1">

                Performance Rating
              </p>
              {renderStars(user.rating)}
            </div>

            <button className="w-full flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-white transition-all
                              bg-gradient-to-r from-[#3b2a1a] to-[#a86d53]
                              hover:from-[#a86d53] hover:to-[#3b2a1a] shadow-md hover:shadow-lg">

              <span>View Details</span>
            </button>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
       <div className="text-center py-12">
  <div className="text-[#a89b8a] dark:text-[#cbb58b] mb-4">
    <Search className="w-16 h-16 mx-auto" />
  </div>
  <h3 className="text-lg font-medium text-[#3b2a1a] dark:text-[#fff1dc] mb-2">
    No employees found
  </h3>
  <p className="text-[#6f5e4f] dark:text-[#cbb58b]">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Employees;