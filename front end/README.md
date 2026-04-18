# College LTS - React Frontend

This is a modern React frontend for the College LTS (Learning Through Systems) application built with Vite.

## Project Structure

```
front end/
├── src/
│   ├── App.jsx          # Main App component with homepage
│   ├── App.css          # App styling
│   ├── main.jsx         # React entry point
│   ├── index.css        # Global styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies
└── .gitignore          # Git ignore file
```

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional homepage with multiple sections
- **React Components**: Built with functional components and hooks
- **Vite**: Fast build tool and development server
- **CSS Styling**: Beautiful gradient backgrounds and smooth animations

### Homepage Sections

1. **Navigation Bar**: Sticky header with navigation links
2. **Hero Section**: Eye-catching welcome banner with CTA button
3. **Programs**: Four feature cards showcasing different programs
4. **About Us**: Statistics and information about the college
5. **Contact Form**: Simple contact form for inquiries
6. **Footer**: Copyright information

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)

### Steps to Run

1. **Navigate to the project directory**:
   ```bash
   cd "front end"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - The application will be available at `http://localhost:5173`
   - Development server will auto-reload on file changes

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling with modern features

## Customization

### Modify Colors
Edit the CSS variables in `src/App.css`:
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  /* ... other colors ... */
}
```

### Update Content
Edit the content in `src/App.jsx` to customize:
- Program descriptions
- Statistics
- Contact information
- Navigation links

### Add More Sections
You can add new sections by:
1. Creating new components in `src/`
2. Importing them in `App.jsx`
3. Adding corresponding CSS styles

## Backend Integration

To connect with the Python backend:
1. Update API endpoints in components
2. Use `fetch()` or `axios` for API calls
3. Ensure CORS is properly configured on backend

Example:
```javascript
const response = await fetch('http://localhost:5000/api/endpoint');
const data = await response.json();
```

## Deployment

To build for production:
```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

## Troubleshooting

### npm install fails
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json`
- Try installing again: `npm install`

### Port 5173 already in use
- Change port: `npm run dev -- --port 3000`

### Module not found errors
- Ensure all imports have correct paths
- Check that files are in the correct locations
- Reinstall dependencies: `npm install`

## License

This project is part of the College LTS system. All rights reserved.

## Support

For issues or questions, please contact the development team.
