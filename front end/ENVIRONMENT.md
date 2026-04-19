# Environment & Configuration Guide

Complete guide to setting up and configuring CollegeMate frontend.

## 🔧 Prerequisites

### Required Software
- **Node.js** v16.0 or higher ([Download](https://nodejs.org/))
  - Includes npm (Node Package Manager)
  - Verify: `node --version` and `npm --version`
- **Git** for version control ([Download](https://git-scm.com/))
- **Code Editor** (VS Code recommended) ([Download](https://code.visualstudio.com/))

### Optional Software
- **Postman** for API testing ([Download](https://www.postman.com/downloads/))
- **Git GUI** like GitHub Desktop
- **Browser DevTools** (Chrome/Firefox)

## 📝 Environment Variables

### Setup `.env` File

1. **Navigate to project root:**
   ```bash
   cd "E:\GIT\Fronend_College\LTS\front end"
   ```

2. **Copy template file:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` with your settings:**
   ```bash
   # Open with text editor and modify
   ```

### Available Variables

```env
# ========== API Configuration ==========
VITE_API_URL=http://localhost:5000/api
# Backend API base URL
# Development: http://localhost:5000/api
# Production: https://api.collegemate.com/api

# ========== App Settings ==========
VITE_APP_NAME=CollegeMate
# Application display name

VITE_APP_VERSION=1.0.0
# App version for reference

# ========== Feature Flags ==========
VITE_ENABLE_CHAT=true
# Enable/disable chat feature

VITE_ENABLE_VIDEO_CALL=false
# Enable/disable video calling (not yet implemented)

VITE_ENABLE_LOCATION=true
# Enable/disable location-based features

# ========== Logging ==========
VITE_DEBUG_MODE=false
# Enable console logging for debugging

# ========== Analytics (Optional) ==========
VITE_GA_ID=
# Google Analytics ID (if using analytics)

# ========== Third-party Services (Future) ==========
VITE_CLOUDINARY_KEY=
# Cloudinary image hosting API key

VITE_STRIPE_KEY=
# Stripe payment API key (if implementing payments)
```

## 🚀 Installation Steps

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/collegemate.git
cd collegemate
cd "front end"
```

### Step 2: Install Dependencies
```bash
npm install
```

This creates:
- `node_modules/` folder (3000+ packages)
- `package-lock.json` (dependency lock file)

### Step 3: Setup Environment File
```bash
cp .env.example .env
```

Edit `.env` with your configuration.

### Step 4: Start Development Server
```bash
npm run dev
```

Output:
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 5: Open in Browser
```
http://localhost:5173
```

## 🛠️ Development Commands

### Primary Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Advanced Commands

```bash
# Install new package
npm install package-name

# Install dev dependency
npm install --save-dev package-name

# Update all packages
npm update

# List installed packages
npm list

# Check for outdated packages
npm outdated

# Audit for security issues
npm audit

# Clean cache
npm cache clean --force

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json && npm install
```

## 🌐 Development Server Configuration

### Default Settings
- **Host**: localhost
- **Port**: 5173
- **Protocol**: http
- **Auto-reload**: Enabled (HMR)

### Change Port
```bash
npm run dev -- --port 3000
```

### Change Host
Edit `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Accept from any network
    port: 5173
  }
})
```

## 🔗 Backend Integration

### Expected Backend Structure

The frontend expects these API endpoints:

```
http://localhost:5000/api/
├── auth/
│   ├── login
│   ├── signup
│   └── refresh-token
├── users/
│   ├── profile
│   └── preferences
├── discovery/
│   ├── cards
│   └── like
└── chat/
    ├── conversations
    └── messages
```

### Start Backend (Example - Flask)

```bash
# Terminal 1: Frontend
cd "front end"
npm run dev

# Terminal 2: Backend (create if doesn't exist)
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

## 📦 Dependency Management

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.2.0 | UI library |
| react-dom | 18.2.0 | React DOM |
| react-router-dom | 6.20.0 | Client routing |
| @mui/material | 5.14.13 | Component library |
| @mui/icons-material | 5.14.13 | Icons |
| framer-motion | 10.16.4 | Animations |
| axios | 1.6.2 | HTTP client |
| react-icons | 4.12.0 | Additional icons |
| @emotion/react | 11.11.1 | CSS-in-JS |
| @emotion/styled | 11.11.0 | Styled components |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @vitejs/plugin-react | 4.2.1 | Vite React plugin |
| vite | 5.0.8 | Build tool |
| @types/react | 18.2.43 | React types |
| @types/react-dom | 18.2.17 | React DOM types |

### Adding Packages

```bash
# Add production dependency
npm install lodash

# Add dev dependency
npm install --save-dev @types/lodash

# Specific version
npm install react@18.0.0

# Update package.json and install
npm install
```

## 🔒 Security Configuration

### HTTPS Setup (Local Testing)
```bash
# Install mkcert
npm install -g mkcert

# Create certificate
mkcert localhost

# Update vite.config.js
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem')
    }
  }
})
```

### Environment Secrets
- Never commit `.env` file (it's in `.gitignore`)
- Use `.env.example` for template
- Different `.env` for different environments

## 🧪 Testing Setup

### Run Unit Tests (When Tests Added)
```bash
npm run test
```

### Run E2E Tests (When Tests Added)
```bash
npm run test:e2e
```

## 🔍 Debugging

### Browser DevTools
- Press `F12` to open DevTools
- **Console**: View logs and errors
- **Network**: See API calls
- **Application**: Check localStorage

### VS Code Debugging
Install "Debugger for Chrome" extension, then:

1. Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

2. Press F5 to start debugging

### Console Logging
```javascript
// In any component
console.log('Debug message:', data)
console.error('Error:', error)
console.warn('Warning:', warning)
console.table(arrayOfObjects)
```

## 🐛 Common Issues & Solutions

### Issue: npm command not found
**Solution:**
```bash
# Reinstall Node.js
# or add npm to PATH environment variable
# Verify: npm --version
```

### Issue: Port 5173 already in use
**Solution:**
```bash
# Use different port
npm run dev -- --port 3000

# Or kill process using port
# On Windows: netstat -ano | findstr :5173
```

### Issue: Module not found error
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check import paths in components
# Verify file exists in correct location
```

### Issue: Hot reload not working
**Solution:**
```bash
# Restart dev server
# Clear browser cache (Ctrl+Shift+Delete)
# Hard refresh (Ctrl+Shift+R)
```

### Issue: Styles not applying
**Solution:**
```bash
# Check theme.js is properly imported
# Verify component uses sx prop correctly
# Check CSS specificity conflicts
# Clear cache: npm cache clean --force
```

### Issue: API calls failing
**Solution:**
```bash
# Check backend is running
# Verify VITE_API_URL in .env
# Check browser console for CORS errors
# Verify request/response interceptors
```

## 📊 Performance Configuration

### Vite Optimization

Edit `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  build: {
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Minify
    minify: 'terser',
    
    // Source maps (disable in production)
    sourcemap: false,
    
    // Output directory
    outDir: 'dist'
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
```

## 🚢 Production Build

### Build for Production
```bash
npm run build
```

Creates:
- `dist/` folder with optimized files
- `dist/index.html` - Main entry point
- `dist/assets/` - JS, CSS, images

### Preview Production Build
```bash
npm run preview
```

### Deploy Options

1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Drag `dist/` folder to Netlify

3. **AWS S3 + CloudFront**
   ```bash
   aws s3 sync dist/ s3://bucket-name
   ```

4. **GitHub Pages**
   - Push `dist/` to `gh-pages` branch

## 📚 Configuration Files

### `.env`
Environment variables for the application

### `.env.example`
Template for environment variables

### `vite.config.js`
Vite build tool configuration

### `.gitignore`
Files Git should ignore

### `package.json`
Project metadata and scripts

### `package-lock.json`
Locked dependency versions

### `index.html`
HTML entry point

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Node.js installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] Dependencies installed: `npm list`
- [ ] `.env` file created with API URL
- [ ] Dev server starts: `npm run dev`
- [ ] Browser opens on localhost:5173
- [ ] No console errors
- [ ] Navigation links work
- [ ] Auth context loads
- [ ] Theme applies correctly
- [ ] All pages render

## 🎓 Next Steps

1. Read QUICKSTART.md for common tasks
2. Review FILE_STRUCTURE.md for code organization
3. Check PLANNING.md for architecture details
4. Start modifying components
5. Make your first pull request

---

**Configuration Version**: 1.0  
**Last Updated**: April 18, 2026
