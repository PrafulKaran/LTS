# Project Structure Documentation

Complete breakdown of every file in the CollegeMate frontend project.

## 📁 Root Level Files

### `index.html`
- **Purpose**: HTML entry point for the React application
- **Contains**: Script tag linking to `src/main.jsx`, meta tags for SEO
- **Unique Traits**: Single page that hosts the React app

### `vite.config.js`
- **Purpose**: Vite configuration for build tool
- **Contains**: React plugin setup, development server config
- **Unique Traits**: Handles hot module replacement (HMR) for fast development

### `package.json`
- **Purpose**: Project metadata and dependency management
- **Contains**: Dependencies (React, MUI, Axios, etc.), dev dependencies, scripts
- **Unique Traits**: Version pinning for consistent installs across machines

### `.env.example`
- **Purpose**: Template for environment variables
- **Contains**: Sample API URL, app settings, feature flags
- **Unique Traits**: Used to create `.env` (which is in `.gitignore`)

### `.gitignore`
- **Purpose**: Tell Git which files to ignore
- **Contains**: node_modules/, .env, dist/, .DS_Store
- **Unique Traits**: Prevents sensitive data and build files from being committed

### `README.md`
- **Purpose**: Comprehensive project documentation
- **Contains**: Setup instructions, tech stack, features, API endpoints
- **Unique Traits**: Main documentation file for users and developers

### `QUICKSTART.md`
- **Purpose**: Fast setup guide for getting started
- **Contains**: 5-minute setup, common tasks, troubleshooting
- **Unique Traits**: Quick reference for common questions

### `PLANNING.md`
- **Purpose**: Complete project planning and architecture
- **Contains**: Goals, flows, API endpoints, database schema, timeline
- **Unique Traits**: Reference for understanding full project scope

---

## 📂 Public Directory

### `public/`
- **Purpose**: Static assets that don't get processed by the build tool
- **Contains**: Favicon, manifest, static images
- **Unique Traits**: Files served directly without modification

---

## 📂 Src Directory Structure

### `src/main.jsx`
**Purpose**: React application entry point  
**Unique Traits**: 
- Creates React root with `ReactDOM.createRoot()`
- Renders main `App` component
- Only runs once when app starts

---

## 📂 `src/components/` - Reusable Components

### `Navbar.jsx`
**Purpose**: Navigation bar displayed on every page  
**Unique Traits**:
- Sticky positioning at top
- Shows different UI based on authentication status
- Contains user menu with profile dropdown
- Logo with gradient text effect
- Responsive hamburger menu for mobile

**Used On**:
- Every page (imported in App.jsx wrapper)

### `ProtectedRoute.jsx`
**Purpose**: Wrapper component to protect authenticated routes  
**Unique Traits**:
- Checks if user is authenticated
- Shows loading spinner while checking auth status
- Redirects to login if not authenticated
- Wraps protected pages in App.jsx routes

**Used On**:
- Discovery, Matches, Chat, Profile, Settings pages

---

## 📂 `src/pages/` - Full Page Components

### `HomePage.jsx`
**Purpose**: Landing page for new visitors  
**Unique Traits**:
- Hero section with CTA button
- 4 feature cards (Love, Safety, Community, Growth)
- Conditional rendering based on auth status
- Smooth scroll animations
- Call-to-action buttons leading to signup/login

**Route**: `/` (public)

### `LoginPage.jsx`
**Purpose**: User login form  
**Unique Traits**:
- Email and password fields
- Form validation
- Error state handling
- Link to signup page
- Redirects to discovery on successful login

**Route**: `/login` (public)

### `SignupPage.jsx`
**Purpose**: User registration form  
**Unique Traits**:
- 5 input fields (name, email, password, confirm password)
- Password confirmation validation
- College email verification ready
- Form data state management
- Redirects to discovery on signup

**Route**: `/signup` (public)

### `DiscoveryPage.jsx`
**Purpose**: Swipe card interface for profile discovery  
**Unique Traits**:
- Card-based UI with profile info
- Like/Pass action buttons
- Interest chips display
- Distance calculation display
- Mock data with 2 sample profiles
- Smooth card transitions

**Route**: `/discovery` (protected)

### `MatchesPage.jsx`
**Purpose**: View all mutual matches  
**Unique Traits**:
- List view of matched profiles
- Online/offline status indicator (green/gray dot)
- Last message preview
- Click to navigate to chat
- Empty state when no matches

**Route**: `/matches` (protected)

### `ChatPage.jsx`
**Purpose**: Real-time messaging interface  
**Unique Traits**:
- Message bubbles (different colors for user/other)
- Typing indicator animation
- Message input field with send button
- Message timestamps
- Scrollable message history
- Mock messages for demo

**Route**: `/chat` (protected)

### `ProfilePage.jsx`
**Purpose**: User profile editing  
**Unique Traits**:
- Avatar display with initials
- Editable name and email (read-only)
- Bio textarea with character count
- Interest chips with delete buttons
- Add interests functionality
- Save changes button

**Route**: `/profile` (protected)

### `SettingsPage.jsx`
**Purpose**: User preferences and account settings  
**Unique Traits**:
- Notification preferences (toggles)
- Privacy settings (profile visibility, distance display)
- Age and distance range sliders
- Account section with password change
- Delete account button
- Form state management

**Route**: `/settings` (protected)

### `NotFoundPage.jsx`
**Purpose**: 404 error page  
**Unique Traits**:
- Shows 404 error message
- Home button to navigate back
- Centered layout
- Themed with app colors

**Route**: `*` (catch-all)

---

## 📂 `src/context/` - State Management

### `AuthContext.jsx`
**Purpose**: Global authentication state management  
**Unique Traits**:
- Creates AuthProvider component
- Manages user state globally
- Provides methods: login(), logout(), signup(), updateUser()
- Stores JWT token in localStorage
- Persists user data on refresh
- Error state handling
- Provides isAuthenticated boolean

**Used By**: Almost every component that needs auth data

**Key Methods**:
```javascript
login(email, password)          // Set user and token
logout()                         // Clear user and token
signup(userData)                 // Create new user
updateUser(userData)             // Update user profile
setAuthError(error)              // Set error message
```

---

## 📂 `src/hooks/` - Custom React Hooks

### `useAuth.js`
**Purpose**: Custom hook to access authentication context  
**Unique Traits**:
- Simplifies accessing auth context
- Provides error handling
- Returns user, isAuthenticated, login, logout, signup
- Used in almost every component

**Usage**:
```javascript
const { user, isAuthenticated, login, logout } = useAuth()
```

---

## 📂 `src/services/` - API & External Services

### `api.js`
**Purpose**: Centralized Axios HTTP client  
**Unique Traits**:
- Base URL from environment variables
- Request interceptors (adds auth token)
- Response interceptors (handles errors)
- Automatic logout on 401 Unauthorized
- Error handling and formatting
- Consistent error responses

**Exports**: Default axios instance

**Usage**:
```javascript
import api from './services/api'
api.get('/endpoint')
api.post('/endpoint', data)
```

---

## 📂 `src/styles/` - Global Styling

### `theme.js`
**Purpose**: Material-UI theme configuration  
**Unique Traits**:
- Custom color palette (primary, secondary, success, etc.)
- Typography overrides (Segoe UI)
- Component style overrides (buttons, cards, etc.)
- Gradient backgrounds
- Custom border radius and shadows
- Breakpoints for responsive design

**Key Exports**:
```javascript
const theme = createTheme({
  palette: { ... },
  typography: { ... },
  components: { ... }
})
```

---

## 📂 `src/utils/` - Utility Functions

### `validators.js`
**Purpose**: Form validation functions  
**Unique Traits**:
- Email validation (RFC standards)
- Password validation (min 8 chars, uppercase, number)
- Phone validation (10-15 digits)
- Age validation (must be 18+)
- College email validation (*.edu domain)
- Bio validation (10-500 characters)
- Generic form validator

**Key Functions**:
```javascript
validateEmail(email)          // Returns boolean
validatePassword(password)    // Returns boolean
validateAge(dateOfBirth)      // Returns boolean
validateForm(data, rules)     // Generic validator
```

### `constants.js`
**Purpose**: App-wide constants and configuration  
**Unique Traits**:
- 16 predefined interests categories
- Gender options (Male, Female, Non-binary, Prefer not to say)
- "Looking for" relationship types
- Allowed image formats and size limits
- API endpoints organized by feature
- Routes mapping for navigation
- Message types enum

**Key Constants**:
```javascript
INTERESTS = [...]           // Array of 16 interests
GENDER_OPTIONS = [...]      // Array of gender choices
API_ENDPOINTS = {...}       // All API paths
ROUTES = {...}              // All app routes
MAX_BIO_LENGTH = 500        // Character limits
```

### `helpers.js`
**Purpose**: Utility helper functions  
**Unique Traits**:
- Distance calculation (Haversine formula)
- Date formatting (relative and absolute)
- Age calculation from birth date
- Get user initials from name
- Text truncation
- Online status checking
- Debounce/throttle functions
- Local storage helpers

**Key Functions**:
```javascript
calculateDistance(lat1, lon1, lat2, lon2)  // Returns km
formatDate(date)                            // Returns formatted string
calculateAge(birthDate)                     // Returns number
getInitials(firstName, lastName)            // Returns "AB"
debounce(func, delay)                       // Returns debounced function
localStorageHelper.set/get(key, value)      // Storage helpers
```

---

## 🎯 `src/App.jsx` - Main Application

**Purpose**: Main application component with routing  
**Unique Traits**:
- React Router BrowserRouter setup
- All app routes defined here
- AuthProvider wrapper for global state
- ThemeProvider wrapper for MUI theme
- Protected routes using ProtectedRoute component
- Navigation bar on every page
- CssBaseline for consistent styling

**Route Configuration**:
```
/                     → HomePage (public)
/login                → LoginPage (public)
/signup               → SignupPage (public)
/discovery            → DiscoveryPage (protected)
/matches              → MatchesPage (protected)
/chat                 → ChatPage (protected)
/profile              → ProfilePage (protected)
/settings             → SettingsPage (protected)
*                     → NotFoundPage (404)
```

---

## 🎨 `src/App.css` & `src/index.css`

### `App.css`
**Purpose**: App-level CSS and animations  
**Contains**: Framer Motion animation definitions, custom keyframes, scrollbar styling

### `index.css`
**Purpose**: Global CSS reset and base styles  
**Contains**: Font imports, body reset, scrolling behavior, utility classes

---

## 📋 File Matrix

| Category | File | Purpose | Unique Feature |
|----------|------|---------|-----------------|
| Entry | main.jsx | App bootstrap | React root creation |
| Config | vite.config.js | Build setup | HMR configuration |
| Config | package.json | Dependencies | React 18.2, MUI 5.14 |
| Routes | App.jsx | App structure | Complete routing |
| Components | Navbar.jsx | Navigation | User menu dropdown |
| Components | ProtectedRoute.jsx | Auth guard | Loading spinner |
| Pages | HomePage.jsx | Landing | Hero section |
| Pages | LoginPage.jsx | Auth | Email/password form |
| Pages | SignupPage.jsx | Registration | Full signup flow |
| Pages | DiscoveryPage.jsx | Swiping | Card interface |
| Pages | MatchesPage.jsx | Matches | Online indicators |
| Pages | ChatPage.jsx | Messaging | Chat UI |
| Pages | ProfilePage.jsx | Profile edit | Bio & interests |
| Pages | SettingsPage.jsx | Preferences | Toggle switches |
| Pages | NotFoundPage.jsx | Error page | 404 handling |
| State | AuthContext.jsx | Auth state | User persistence |
| Hooks | useAuth.js | Auth access | Context hook |
| Services | api.js | HTTP client | Token interceptors |
| Styles | theme.js | MUI theme | Gradient palette |
| Utils | validators.js | Form validation | 6+ validators |
| Utils | constants.js | App config | Interests, routes |
| Utils | helpers.js | Utilities | Distance, formatting |
| Docs | README.md | Full docs | Setup guide |
| Docs | QUICKSTART.md | Quick setup | 5-min guide |
| Docs | PLANNING.md | Architecture | Complete plan |

---

## 🔄 Data Flow Example

**User login flow:**
```
LoginPage.jsx (form input)
    ↓
useAuth() hook
    ↓
AuthContext.jsx (login method)
    ↓
api.js (POST /auth/login)
    ↓
Backend returns JWT token + user data
    ↓
AuthContext saves to state + localStorage
    ↓
ProtectedRoute detects authenticated user
    ↓
Navigates to /discovery
```

---

## 🏗️ Component Hierarchy

```
App.jsx
├── AuthProvider
│   └── ThemeProvider
│       └── Navbar.jsx
│           └── Routes
│               ├── HomePage.jsx
│               ├── LoginPage.jsx (+ form)
│               ├── SignupPage.jsx (+ form)
│               ├── ProtectedRoute
│               │   ├── DiscoveryPage.jsx
│               │   ├── MatchesPage.jsx
│               │   ├── ChatPage.jsx
│               │   ├── ProfilePage.jsx
│               │   └── SettingsPage.jsx
│               └── NotFoundPage.jsx
```

---

**Last Updated**: April 18, 2026  
**Total Files**: 21  
**Total Lines of Code**: ~3000+
