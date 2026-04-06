INVOICE AI - FRONTEND

Description:
This is a React-based frontend application for uploading, managing, and analyzing invoices using an AI-powered backend.

--------------------------------------------------

Features:
- User Authentication (Login/Register)
- Upload invoices (JPG, PNG, PDF)
- Dashboard with invoice list
- Search invoices by vendor
- Image preview functionality
- Analytics (total invoices & total spend)
- Dark/Light theme toggle
- Fully responsive design

--------------------------------------------------

Technologies Used:
- React.js (Vite)
- JavaScript
- CSS (Custom styling)
- React Router
- React Hot Toast

--------------------------------------------------

Project Structure:

src/
  components/
  pages/
    Login.jsx
    Register.jsx
    Dashboard.jsx
    Landing.jsx
  App.jsx
  main.jsx
  dashboard.css

--------------------------------------------------

Setup Instructions:

1. Clone the repository:
   git clone <repo-link>

2. Navigate to frontend folder:
   cd frontend

3. Install dependencies:
   npm install

4. Run the project:
   npm run dev

--------------------------------------------------

API Configuration:

Update API URL in code:
const API = "http://127.0.0.1:8000";

--------------------------------------------------

Authentication Flow:

- User logs in
- Backend returns JWT token
- Token stored in localStorage
- Token sent with every API request

Header format:
Authorization: Bearer <token>

--------------------------------------------------

Future Enhancements:

- Add charts (Recharts)
- PDF preview support
- Download invoices
- Advanced analytics

--------------------------------------------------

Author:
Akash Pandit
