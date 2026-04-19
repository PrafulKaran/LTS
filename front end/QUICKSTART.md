# QuickStart Guide - CollegeMate

Get up and running with CollegeMate in 5 minutes!

## ⚡ Quick Setup

### Step 1: Clone & Install (2 min)
```bash
cd "E:\GIT\Fronend_College\LTS\front end"
npm install
```

### Step 2: Environment Setup (1 min)
```bash
# Copy example env file
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=CollegeMate
```

### Step 3: Start Development Server (1 min)
```bash
npm run dev
```

You'll see:
```
VITE v5.0.8 ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Step 4: Open in Browser (1 min)
```
http://localhost:5173
```

## 📖 Project Structure at a Glance

```
src/
├── components/        # Reusable UI components (Navbar, ProtectedRoute)
├── pages/            # Full pages (Home, Login, Discovery, Chat, etc.)
├── context/          # Global state (AuthContext)
├── hooks/            # Custom hooks (useAuth)
├── services/         # API calls (api.js)
├── styles/           # Theme configuration
├── utils/            # Helpers, validators, constants
├── App.jsx           # Main router
└── main.jsx          # React entry point
```

## 🔑 Key Files Explained

| File | Purpose |
|------|---------|
| `App.jsx` | Main router with all routes & layout |
| `src/styles/theme.js` | MUI theme (colors, typography, spacing) |
| `src/context/AuthContext.jsx` | Authentication state (user, login, logout) |
| `src/hooks/useAuth.js` | Hook to access auth state |
| `src/services/api.js` | Axios HTTP client |
| `src/utils/validators.js` | Form validation functions |
| `src/utils/constants.js` | App constants (routes, interests, etc.) |

## 🧭 Routes & Pages

| Route | Page | Auth Required | Purpose |
|-------|------|---------------|---------|
| `/` | HomePage | ❌ | Landing page |
| `/login` | LoginPage | ❌ | User login |
| `/signup` | SignupPage | ❌ | User registration |
| `/discovery` | DiscoveryPage | ✅ | Swipe profiles |
| `/matches` | MatchesPage | ✅ | View matches |
| `/chat` | ChatPage | ✅ | Send messages |
| `/profile` | ProfilePage | ✅ | Edit profile |
| `/settings` | SettingsPage | ✅ | User settings |
| `*` | NotFoundPage | ❌ | 404 error |

## 🎨 Color System

```javascript
// Primary Colors (used in buttons, links, primary actions)
#FF6B6B - Red (Love)
#E63946 - Dark Red (Hover)

// Secondary Colors (background, secondary actions)
#457B9D - Blue (Trust)
#1F3A5C - Dark Blue (Hover)

// Success Colors (positive actions)
#06D6A0 - Green

// Status Colors
#FFB703 - Warning
#E63946 - Error
```

## 📝 Common Tasks

### Add a New Page
1. Create file in `src/pages/NewPage.jsx`
2. Add route in `App.jsx`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

### Add Authentication Check
```jsx
import { useAuth } from './hooks/useAuth'

function MyComponent() {
  const { isAuthenticated, user } = useAuth()
  
  if (!isAuthenticated) {
    return <p>Please log in</p>
  }
  
  return <p>Welcome, {user.firstName}!</p>
}
```

### Make API Call
```jsx
import api from './services/api'

// In component or hook
const fetchData = async () => {
  try {
    const response = await api.get('/discovery/cards')
    console.log(response.data)
  } catch (error) {
    console.error('Error:', error.message)
  }
}
```

### Validate Form Input
```jsx
import { validateEmail, validatePassword } from './utils/validators'

const email = 'user@example.com'
if (validateEmail(email)) {
  console.log('Valid email!')
} else {
  console.log('Invalid email!')
}
```

### Use Custom Hook
```jsx
import { useAuth } from './hooks/useAuth'

function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  
  return (
    <>
      {isAuthenticated && <button onClick={logout}>Logout</button>}
    </>
  )
}
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Port 5173 already in use" | `npm run dev -- --port 3000` |
| "Module not found" | `npm install` and restart dev server |
| "Hot reload not working" | Clear browser cache, hard refresh |
| "Styles not applying" | Check `src/styles/theme.js` |
| "API calls failing" | Check `.env` VITE_API_URL is correct |

## 🔄 Git Commands

```bash
# Create feature branch
git checkout -b feature/my-feature

# Stage changes
git add .

# Commit
git commit -m "feat: Add my feature"

# Push
git push origin feature/my-feature

# Create pull request on GitHub
```

## 📦 Useful npm Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Maintenance
npm install              # Install dependencies
npm update               # Update packages
npm list                 # Show installed packages
npm outdated             # Show outdated packages
```

## 🎯 Next Steps

1. **Understand the structure**: Explore files in `src/` directory
2. **Test the app**: Navigate through all pages
3. **Login with demo credentials**: Any email + "Password123"
4. **Play with components**: Try swiping, messaging, profile editing
5. **Start coding**: Create your first feature branch

## 📚 Learning Resources

- [React Docs](https://react.dev/) - React fundamentals
- [Material-UI Docs](https://mui.com/) - Component library
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Router](https://reactrouter.com/) - Routing
- [Vite Docs](https://vitejs.dev/) - Build tool

## 💬 Need Help?

- Check README.md for full documentation
- Review PLANNING.md for architecture details
- Check console for error messages
- Ask in code comments/issues

---

**Happy coding! 🚀**
