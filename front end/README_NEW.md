# 🎓 College Social Platform - React Frontend

A modern, responsive college social platform built with **React 18**, **Vite**, **Material-UI**, and **Framer Motion**. The frontend connects to a FastAPI backend to provide user authentication, profile management, and social features.

## 🎯 Project Overview

**College Social Platform** is a full-stack application designed for college students to connect and build relationships. Connect with fellow students, discover matches, chat in real-time, and build meaningful relationships through a beautiful, intuitive interface.

### ✨ Current Features (v1.0)

#### ✅ Authentication
- User registration with profile picture upload
- Email/Password login
- Forgot password with 2-step reset
- Session management with localStorage
- Protected routes

#### ✅ User Profiles
- Profile picture upload and display
- Profile editing (name, email, bio)
- Avatar display in navbar
- Real-time profile updates without refresh
- Initials fallback display

#### 🔄 In Development
- Post creation and viewing
- Comments system
- Like/Unlike functionality
- Follow/Unfollow users
- Match discovery
- Real-time chat

## 🏗️ Project Structure

```
front end/
├── src/
│   ├── pages/                 # Page components
│   │   ├── HomePage.jsx           # Landing page
│   │   ├── LoginPage.jsx          # Login form
│   │   ├── SignupPage.jsx         # Registration form
│   │   ├── ForgotPasswordPage.jsx # Password reset
│   │   ├── ProfilePage.jsx        # User profile
│   │   ├── DiscoveryPage.jsx      # Browse users
│   │   ├── MatchesPage.jsx        # Matches list
│   │   ├── ChatPage.jsx           # Messaging
│   │   ├── SettingsPage.jsx       # User settings
│   │   └── NotFoundPage.jsx       # 404 page
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar.jsx             # Top navigation
│   │   └── ProtectedRoute.jsx      # Route protection
│   │
│   ├── context/               # React Context
│   │   └── AuthContext.jsx        # Auth state management
│   │
│   ├── hooks/                 # Custom hooks
│   │   └── useAuth.js             # Auth context hook
│   │
│   ├── utils/                 # Utility functions
│   │   ├── helpers.js             # Helper functions
│   │   └── api.js                 # Axios configuration
│   │
│   ├── styles/                # Styling
│   │   ├── theme.js               # Material-UI theme
│   │   └── ...
│   │
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
│
├── public/                    # Static assets
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── .env.local                 # Environment variables
└── README.md                  # This file
```

## 📦 Dependencies

### Core Libraries
- **react** (18.2) - UI library
- **react-dom** (18.2) - React DOM rendering
- **react-router-dom** (6.20) - Client-side routing
- **vite** (5.0) - Build tool & dev server

### UI & Styling
- **@mui/material** (5.14) - Material Design components
- **@mui/icons-material** (5.14) - Material icons
- **framer-motion** (10.16) - Animation library

### API & Data
- **axios** (1.6) - HTTP client
- **sonner** (1.x) - Toast notifications

### Development
- **@vitejs/plugin-react** - React plugin for Vite
- **eslint** - Code linting

## 🚀 Installation & Setup

### 1. Prerequisites
- Node.js 16+ installed
- npm 7+
- Backend running on http://localhost:8000

### 2. Navigate to Project
```bash
cd "e:\GIT\Fronend_College\LTS\front end"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment

Create `.env.local` file in project root:
```env
VITE_API_URL=http://localhost:8000
```

### 5. Start Development Server
```bash
npm run dev
```

**Output:**
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Access Application:** http://localhost:5173

## 📚 Available Scripts

```bash
# Start development server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint --fix
```

## 🔐 Authentication Flow

### Registration
1. User fills signup form with name, email, password
2. User selects profile picture
3. Picture converts to base64 in frontend
4. Form data sent to backend: `POST /users/register`
5. Backend validates and creates user
6. User data stored in localStorage
7. User redirected to discovery page

### Login
1. User enters email and password
2. Form submitted to backend: `POST /auth/login`
3. Backend validates credentials
4. User data returned with profile picture filename
5. Data stored in localStorage
6. Token stored for session
7. User redirected to discovery page

### Logout
1. User clicks logout
2. localStorage cleared
3. User redirected to home page

### Protected Routes
```jsx
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>
```

## 🎨 UI Components

### Material-UI Components Used
- **AppBar** - Top navigation
- **Button** - CTAs
- **TextField** - Form inputs
- **Card/Paper** - Containers
- **Avatar** - Profile pictures
- **Grid** - Layout system
- **Typography** - Text
- **Menu/MenuItem** - Dropdowns
- **IconButton** - Icon buttons
- **Chip** - Tags/categories
- **Container** - Content wrapper

### Custom Hooks

#### useAuth()
```javascript
const { user, login, logout, isAuthenticated } = useAuth()
```

Access authentication context throughout app.

## 🌐 API Integration

### Axios Configuration

File: `src/utils/api.js`
```javascript
import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

export default API
```

### Making Requests

```javascript
import API from '../utils/api'

// GET request
const response = await API.get('/users/1')

// POST request
const response = await API.post('/auth/login', {
  email: 'user@college.com',
  password: 'password123'
})

// PUT request
const response = await API.put('/users/1', {
  first_name: 'John'
})

// DELETE request
const response = await API.delete('/users/1')
```

## 🎬 Animations

### Framer Motion Integration

```jsx
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

<MotionBox
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</MotionBox>
```

### Page Transitions
- Page fade-in on load
- Smooth animations on interactions
- Loading states with spinners

## 🔔 Notifications

### Sonner Toast Library

```javascript
import { toast } from 'sonner'

// Success toast
toast.success('Operation successful!')

// Error toast
toast.error('Something went wrong')

// Loading toast
const toastId = toast.loading('Processing...')

// Update loading toast
toast.success('Done!', { id: toastId })

// Custom duration
toast.success('Message', { duration: 3000 })

// Position
toast('Message', { position: 'top-right' })
```

### Toast Types
- **Success**: Green toast with checkmark
- **Error**: Red toast with error message
- **Loading**: Gray toast with spinner
- **Info**: Blue toast with info icon
- **Warning**: Yellow toast with warning icon

## 📸 Image Handling

### Profile Picture Upload

#### Frontend Process
1. User selects image file
2. FileReader converts to base64
3. Image preview shown immediately
4. Base64 string sent in JSON
5. Success/error feedback with toast

#### Backend Process
1. Receives base64 string
2. Decodes and validates
3. Saves to `uploads/profile_pictures/`
4. Returns filename
5. Filename stored in database

#### Image Display
```javascript
// From profile data
const imageUrl = `http://localhost:8000/uploads/profile_pictures/${data.profile_picture}`

// In Avatar component
<Avatar src={imageUrl}>Fallback</Avatar>
```

#### Supported Formats
- JPEG, PNG, GIF, WebP
- Max size: 5MB
- Recommended: Square (400x400px)

## 🎯 State Management

### Context API - Authentication

File: `src/context/AuthContext.jsx`
```javascript
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const login = (userData, token) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  // ... more methods
}
```

### LocalStorage
- `user` - User profile data
- `token` - Session token (future JWT implementation)

## 🧪 Testing Pages

### Test with Sample Data

#### User 1 (Signup Test)
```
Username: john_doe
Email: john@college.com
Password: password123
First Name: John
Last Name: Doe
```

#### User 2 (Login Test)
```
Email: test@college.com
Password: password123
```

#### Test Profile Picture
Use any image under 5MB (JPEG, PNG, GIF, WebP)

## 🐛 Development Tips

### Enable React DevTools
```bash
# Install React DevTools extension in browser
# Firefox: React DevTools addon
# Chrome: React Developer Tools extension
```

### Console Debugging
```javascript
// Log user state
console.log('Current user:', user)

// Log API response
API.get('/users/1').then(res => console.log(res.data))

// Conditional logging
DEBUG && console.log('Debug info')
```

### Network Debugging (Browser DevTools)
1. Open F12
2. Go to Network tab
3. Make API request
4. See request/response details
5. Check headers, payload, status

### Component Debugging
```jsx
// Add debug output
<>
  <p>Debug: {JSON.stringify(user, null, 2)}</p>
  {/* Component code */}
</>
```

## 🎨 Styling & Theme

### Material-UI Theme

File: `src/styles/theme.js`
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B',
    },
    secondary: {
      main: '#1D3557',
    },
  },
})
```

### Custom Styling
```jsx
<Box sx={{
  background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
  padding: '20px',
  borderRadius: '8px'
}}>
  Content
</Box>
```

### Responsive Design
```jsx
<Box sx={{
  width: { xs: '100%', sm: '80%', md: '60%', lg: '40%' }
}}>
  Content
</Box>
```

## 📱 Responsive Breakpoints

Material-UI breakpoints:
- **xs**: 0px - Extra small devices
- **sm**: 600px - Small devices
- **md**: 960px - Medium devices
- **lg**: 1280px - Large devices
- **xl**: 1920px - Extra large devices

## 🚨 Common Issues & Solutions

### "Cannot find module"
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Port 5173 already in use"
```bash
# Kill process on port 5173
# Windows: netstat -ano | findstr :5173
# Mac/Linux: lsof -i :5173

# Or use different port
npm run dev -- --port 3000
```

### "API not responding"
1. Check backend is running: `http://localhost:8000/docs`
2. Verify `.env.local` has correct API_URL
3. Check browser console for CORS errors
4. Ensure backend has CORS enabled

### "Image not showing"
1. Verify backend is running
2. Check image file exists in `backend/uploads/profile_pictures/`
3. Try hard refresh: Ctrl+Shift+R
4. Check browser network tab for failed requests

### "Context not found"
1. Ensure `<AuthProvider>` wraps `<App>`
2. Check component is inside router
3. Verify `useAuth` import is correct

## 🔄 Updating User Data

### After Login/Signup
```javascript
login({
  id: userData.id,
  firstName: userData.first_name,
  lastName: userData.last_name,
  email: userData.email,
  username: userData.username,
  profilePicture: userData.profile_picture,
}, 'token')
```

### After Profile Update
```javascript
// Fetch fresh data
const response = await fetch(`http://localhost:8000/users/${user.id}`)
const data = await response.json()

// Update context
updateUser(data)
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Material-UI Docs](https://mui.com/)
- [Vite Docs](https://vitejs.dev/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Axios Docs](https://axios-http.com/)
- [Sonner Toast](https://sonner.emilkowal.ski/)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature/feature-name`
6. Create Pull Request

## ⚠️ Important Notes

### Security
- Never commit `.env.local` with sensitive data
- Validate all inputs server-side
- Use HTTPS in production
- Don't store sensitive data in localStorage

### Performance
- Use React.memo for expensive components
- Implement pagination for lists
- Lazy load routes with React.lazy
- Optimize images before upload

### Accessibility
- Use semantic HTML
- Add alt text to images
- Ensure keyboard navigation
- Use ARIA labels where needed

## 🎯 Next Steps

- [ ] Implement post creation
- [ ] Add comments system
- [ ] Build match discovery
- [ ] Implement real-time chat
- [ ] Add notifications
- [ ] Deploy to production
- [ ] Set up monitoring
- [ ] Add analytics

---

**Last Updated**: April 19, 2026
**React Version**: 18.2.0
**Vite Version**: 5.0.0
**Status**: Active Development v1.0.0
