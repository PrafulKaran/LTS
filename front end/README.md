# CollegeMate - College Dating & Social Platform

A modern, responsive college dating and social connection platform built with React, Material-UI, and Framer Motion. Find your perfect match, chat with compatible people, and build meaningful relationships.

## 🎯 Project Overview

CollegeMate is a Tinder-like dating platform specifically designed for college students. Connect with fellow students based on shared interests, preferences, and location. Real-time messaging, smart matching algorithm, and verified profiles ensure a safe and enjoyable experience.

## ✨ Features

### 🔐 Authentication & Profiles
- User registration and login with email verification
- Comprehensive profile creation with photos and bio
- Interest selection from predefined categories
- Age and education verification
- Privacy settings and account management

### 💝 Discovery & Matching
- Card-based swiping interface (Tinder-style)
- Like/Pass/Super Like functionality
- Smart algorithm-based matching
- Distance-based filtering
- Advanced filters (age, interests, major, year)
- Real-time match notifications

### 💬 Real-Time Chat
- Instant messaging between matches
- Online/offline status indicators
- Typing indicators
- Message timestamps
- Image sharing in conversations
- Conversation management

### 👥 User Features
- Detailed profile customization
- Interest and hobby management
- Preference settings for discovery
- Block/Report functionality
- Privacy controls
- Activity feed

### 🔒 Safety & Security
- Photo verification system
- Report and block users
- Safety tips and guidelines
- Privacy-first design
- Secure authentication with JWT
- Encrypted messaging

## 📊 Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Lightning-fast build tool
- **Material-UI 5.14** - Component library
- **React Router 6.20** - Client-side routing
- **Framer Motion 10.16** - Animations
- **Axios 1.6** - HTTP client
- **React Icons 4.12** - Icon library
- **Emotion** - CSS-in-JS styling

### Backend (To be implemented)
- **Python Flask/FastAPI** - Web framework
- **PostgreSQL** - Database
- **Redis** - Caching & real-time features
- **WebSocket** - Real-time chat
- **JWT** - Authentication
- **Cloudinary** - Image hosting

## 📁 Project Structure

```
front end/
├── public/                      # Static assets
├── src/
│   ├── components/             # Reusable components
│   │   ├── Navbar.jsx         # Navigation bar with auth
│   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   │
│   ├── pages/                  # Page components
│   │   ├── HomePage.jsx        # Landing page
│   │   ├── LoginPage.jsx       # Login form
│   │   ├── SignupPage.jsx      # Registration form
│   │   ├── DiscoveryPage.jsx   # Swiping interface
│   │   ├── MatchesPage.jsx     # View matches list
│   │   ├── ChatPage.jsx        # Messaging interface
│   │   ├── ProfilePage.jsx     # User profile editing
│   │   ├── SettingsPage.jsx    # App settings
│   │   └── NotFoundPage.jsx    # 404 page
│   │
│   ├── context/                # Global state management
│   │   └── AuthContext.jsx     # Authentication context
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useAuth.js          # Auth hook
│   │
│   ├── services/               # API and external services
│   │   └── api.js              # Axios instance & interceptors
│   │
│   ├── styles/                 # Global styling
│   │   └── theme.js            # Material-UI theme
│   │
│   ├── utils/                  # Utility functions
│   │   ├── validators.js       # Form validation
│   │   ├── constants.js        # App constants
│   │   ├── helpers.js          # Helper functions
│   │   └── formatters.js       # Data formatting
│   │
│   ├── App.jsx                 # Main app component with routing
│   ├── App.css                 # Global animations
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
│
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/collegemate.git
   cd collegemate/front end
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env
   # Edit .env with your backend URL
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   ```
   http://localhost:5173
   ```

## 📝 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🎨 Customization

### Colors & Theme
Edit theme in `src/styles/theme.js`:
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B',  // Change primary color
      // ...
    },
    // ...
  },
})
```

### Content & Copy
Update text and descriptions in individual page components:
- `src/pages/HomePage.jsx` - Landing page content
- `src/pages/DiscoveryPage.jsx` - Discovery interface
- Add new pages as needed

### Features
Enable/disable features in `.env`:
```bash
VITE_ENABLE_CHAT=true
VITE_ENABLE_VIDEO_CALL=false
VITE_ENABLE_LOCATION=true
```

## 🔌 API Integration

### Backend Setup Required
The app needs a backend API. Below is the expected structure:

```javascript
// Example API calls from src/services/api.js
import api from './api'

// Authentication
api.post('/auth/login', { email, password })
api.post('/auth/signup', userData)

// Discovery
api.get('/discovery/cards')
api.post('/discovery/like', { profileId })

// Messaging
api.get('/chat/conversations')
api.get('/chat/messages/:matchId')
api.post('/chat/messages', { matchId, message })
```

### CORS Configuration
Ensure backend allows CORS:
```python
# Flask example
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
```

## 🧪 Testing

### Login Credentials (Demo)
For testing the app, use any email/password:
```
Email: test@college.edu
Password: Password123
```

### Test Features
- Swipe through profiles in Discovery
- Like/Pass profiles
- View matches
- Send messages
- Edit profile
- Update settings

## 📱 Responsive Design

The app is fully responsive across:
- **Mobile**: < 600px (optimized touch interface)
- **Tablet**: 600px - 960px
- **Desktop**: > 960px (full features)

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Secure token storage
- ✅ HTTPS-ready
- ✅ XSS protection via React
- ✅ CSRF token support
- ✅ Input validation

## 📚 File Descriptions

### Component Files
- **Navbar.jsx**: Navigation bar with user menu and authentication controls
- **ProtectedRoute.jsx**: Wrapper to protect authenticated routes

### Page Files
- **HomePage.jsx**: Landing page with features overview
- **LoginPage.jsx**: User login form with validation
- **SignupPage.jsx**: User registration form
- **DiscoveryPage.jsx**: Swipe card interface for profile discovery
- **MatchesPage.jsx**: List of mutual matches
- **ChatPage.jsx**: Real-time messaging interface
- **ProfilePage.jsx**: User profile editor
- **SettingsPage.jsx**: App settings and preferences
- **NotFoundPage.jsx**: 404 error page

### Service Files
- **api.js**: Axios instance with interceptors for API calls

### Context Files
- **AuthContext.jsx**: Global authentication state and methods

### Hook Files
- **useAuth.js**: Custom hook to access auth context

### Utility Files
- **validators.js**: Form validation functions
- **constants.js**: App-wide constants and enums
- **helpers.js**: Utility helper functions
- **theme.js**: Material-UI theme configuration

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- --port 3000
```

### Dependencies not installing
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Module not found errors
```bash
# Check import paths are correct
# Verify files exist in expected locations
# Reinstall dependencies
npm install
```

### Hot reload not working
- Clear browser cache
- Restart dev server
- Check Vite configuration

## 📖 Learning Resources

- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/AmazingFeature`
2. Commit changes: `git commit -m 'Add AmazingFeature'`
3. Push to branch: `git push origin feature/AmazingFeature`
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team
- Check existing documentation

## 🎉 What's Next

### Future Features
- [ ] Video chat functionality
- [ ] Advanced matching algorithm
- [ ] User activity feed
- [ ] Notifications system
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Social media integration

### Improvements
- [ ] Performance optimization
- [ ] Enhanced testing
- [ ] Analytics integration
- [ ] Admin dashboard
- [ ] Moderation tools

---

**Happy matching! 💝**

Made with ❤️ by the CollegeMate Team


A modern, responsive, and animated React frontend for the College LTS (Learning Through Systems) application built with **Material-UI**, **Vite**, and **Framer Motion**.

## 🎨 Key Features

- **Material-UI Components**: Professional, accessible UI components
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Responsive Design**: Perfect on all devices (mobile, tablet, desktop)
- **Modern Stack**: React 18, Vite, Material-UI v5
- **Custom Theme**: Custom Material-UI theme with gradients and smooth transitions
- **Form Handling**: Fully functional contact form with validation
- **Icon Library**: React Icons for beautiful, scalable icons
- **SEO Optimized**: Proper semantic HTML and meta tags
- **Dark Mode Ready**: Built with theming in mind

## 📦 Technologies & Libraries

### Core Dependencies
- **React 18.2.0** - UI library
- **Vite 5.0** - Lightning-fast build tool
- **Material-UI (MUI) 5.14** - Component library
- **Framer Motion 10.16** - Animation library
- **React Icons 4.12** - Icon library
- **Emotion** - CSS-in-JS styling (required by MUI)
- **Axios 1.6** - HTTP client for API calls

### Dev Dependencies
- TypeScript types for React
- Vite React plugin

## 📁 Project Structure

```
front end/
├── src/
│   ├── App.jsx          # Main app with all sections
│   ├── App.css          # Global animations
│   ├── main.jsx         # React entry point
│   ├── index.css        # Global styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
└── .gitignore          # Git ignore file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)

### Steps to Run

1. **Navigate to the project directory**:
   ```bash
   cd "front end"
   ```

2. **Install dependencies** (required first time):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - The application will be available at `http://localhost:5173`
   - Hot reload enabled - changes appear instantly!

## 📝 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production (creates optimized dist folder)
npm run build

# Preview the production build locally
npm run preview
```

## 🎯 Features Overview

### Navigation Bar
- Sticky header with logo and navigation links
- Gradient background with smooth hover effects
- Responsive menu design

### Hero Section
- Eye-catching gradient background
- Smooth fade-in animations
- Call-to-action button with hover effects
- Responsive typography

### Programs Section
- 4 feature cards (Computer Science, Web Dev, Cybersecurity, Data Science)
- Icon-based visual representation
- Smooth animations on scroll
- Hover effects with elevation
- Responsive grid layout

### About Section
- Two-column layout with stats
- Animated stat cards with gradient backgrounds
- Educational content
- Call-to-action button

### Contact Section
- Fully functional contact form
- Form validation
- Success message feedback
- Responsive input fields with MUI styling

### Footer
- Copyright information
- Technology credits
- Sticky footer design

## 🎨 Customization

### Change Colors
Edit the theme in `src/App.jsx`:
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',  // Change this
      light: '#60a5fa',
      dark: '#1e40af',
    },
    // ... other colors
  },
})
```

### Modify Content
Edit the JSX in `src/App.jsx`:
- Update program descriptions in the `programs` array
- Change statistics in the `stats` array
- Customize navigation links
- Update social links in footer

### Add New Sections
1. Create a new section component
2. Add it to the main `App()` function
3. Add styling using MUI's `sx` prop or CSS

## 🔌 Backend Integration

To connect with your Python backend:

```javascript
import axios from 'axios'

// Example API call
const submitForm = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/contact', data)
    console.log('Success:', response.data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### CORS Configuration
Ensure your backend allows CORS requests:
```python
# Flask example
from flask_cors import CORS
CORS(app)
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Creates an optimized `dist/` folder ready for deployment to:
- Netlify
- Vercel
- GitHub Pages
- Traditional web servers

### Deploy to Netlify (Free)
```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

## 📱 Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

All components automatically adjust for each breakpoint!

## 🐛 Troubleshooting

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Module not found errors
- Ensure all import paths are correct
- Check that files exist in the correct locations
- Reinstall dependencies: `npm install`

### Animations not working
- Check if Framer Motion is installed: `npm list framer-motion`
- Verify browser supports CSS animations
- Clear browser cache

## 🎓 Learning Resources

- [Material-UI Docs](https://mui.com/)
- [React Documentation](https://react.dev/)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Vite Documentation](https://vitejs.dev/)

## 📄 License

This project is part of the College LTS system. All rights reserved.

## 👥 Support

For issues or questions about the frontend, please contact the development team.

## 🎉 What's New in This Version

✨ **Material-UI Integration**
- Professional component library
- Built-in accessibility
- Customizable theme system

✨ **Framer Motion Animations**
- Smooth page transitions
- Scroll-based animations
- Interactive hover effects

✨ **Enhanced UI**
- Better spacing and typography
- Gradient backgrounds
- Icon-based design

✨ **Form Validation**
- Client-side validation
- Success feedback
- MUI TextField components

✨ **Better Performance**
- Optimized Vite build
- Code splitting
- Lazy loading ready

---

**Happy coding! 🚀**

