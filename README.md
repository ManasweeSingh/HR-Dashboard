# 💼 HR Performance Dashboard (Advanced)

A responsive and feature-rich HR Dashboard built using **Next.js (App Router)**, **Tailwind CSS**, and **React**. It allows HR Managers to monitor employee performance, manage bookmarks, view analytics, and more.

---

## 🚀 Live Project

🌐 **Live Demo:** [View Live Dashboard](https://flam-hr-dashboard.vercel.app/)  
🔗 **GitHub Repository:** [View on GitHub](https://github.com/ayyappa53/Flam_Hr_Dashboard)

---

## 📸 Sample Screenshots
![image](https://github.com/user-attachments/assets/79590ca8-c08b-4700-860e-0184b83352a6)
![image](https://github.com/user-attachments/assets/ad4c8d3e-e0a9-4402-a4e1-30f5fee3c9d4)
![image](https://github.com/user-attachments/assets/df030a14-b079-4894-ab4d-356c52f915d7)
![image](https://github.com/user-attachments/assets/53e88d93-c2b5-4871-ac9e-dc1a268318ec)
![image](https://github.com/user-attachments/assets/5c1b298f-1942-411c-95ca-4f797e454ccf)
---
## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS
- **Language:** JavaScript (ES6+)
- **Authentication:** Dummy login (mocked)
- **State Management:** Zustand
- **Charting Library:** Chart.js
- **Theme Support:** Dark/Light Mode with Tailwind

---

## 🔍 Features Implemented

### 🔐 Authentication
- Mock login with dummy credentials
- Route protection and redirection after login

### 🏠 Dashboard (`/dashboard`)
- Fetches user data from `https://dummyjson.com/users?limit=20`
- Displays:
  - Name, Email, Age, Department (mocked)
  - Performance rating stars
  - View, Bookmark, Promote actions

### 🔎 Search & Filter
- Search by name, email, or department
- Multi-select filter by department and rating

### 👤 Employee Details (`/employee/[id]`)
- Detailed profile with:
  - Bio, Address, Phone, Performance History
- Tabbed UI:
  - Overview, Projects, Feedback (mocked content)

### 📌 Bookmarks (`/bookmarks`)
- View all bookmarked employees
- Remove, Promote, or Assign to Project from list

### 📊 Analytics (`/analytics`)
- Charts for:
  - Department-wise average rating
  - Bookmark trends (mocked)
- Built using Chart.js

### 🌙 Dark/Light Mode
- Toggleable theme with Tailwind classes

### ⚛️ Custom Hooks & Components
- `useBookmarks`, `useSearch`
- Reusable Card, Badge, Button, Modal, Tabs

---

## 📱 Responsive Design

- Works across all screen sizes
- Optimized for both desktop and mobile
- Includes keyboard accessibility support

---

## 📦 Getting Started

### 🔧 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/ayyappa53/Flam_Hr_Dashboard.git

# 2. Navigate to the project folder
cd Flam_Hr_Dashboard

# 3. Install dependencies
npm install

# 4. Run the development server
npm start
