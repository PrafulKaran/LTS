import { AppBar, Toolbar, Button, Box, Avatar, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState, useEffect } from 'react'
import { getInitials } from '../utils/helpers'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)

  useEffect(() => {
    // Fetch user profile picture from backend
    const fetchProfilePicture = async () => {
      try {
        if (user?.id) {
          const response = await fetch(`http://localhost:8000/users/${user.id}`)
          if (response.ok) {
            const data = await response.json()
            if (data.profile_picture) {
              // Construct image URL from filename
              setProfilePicture(`http://localhost:8000/uploads/profile_pictures/${data.profile_picture}`)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error)
      }
    }

    if (isAuthenticated) {
      fetchProfilePicture()
    }
  }, [user?.id, isAuthenticated])

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleLogout = () => {
    logout()
    handleMenuClose()
    navigate('/login')
  }

  const navigateTo = (path) => {
    navigate(path)
    handleMenuClose()
  }

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <FavoriteBorderIcon sx={{ fontSize: 28 }} />
          <Box
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CollegeMate
          </Box>
        </Box>

        {/* Actions */}
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              color="inherit"
              onClick={() => navigate('/discovery')}
              sx={{ fontWeight: 600, '&:hover': { opacity: 0.8 } }}
            >
              Discover
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/matches')}
              sx={{ fontWeight: 600, '&:hover': { opacity: 0.8 } }}
            >
              Matches
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/chat')}
              sx={{ fontWeight: 600, '&:hover': { opacity: 0.8 } }}
            >
              Chat
            </Button>

            {/* User Avatar Menu - Show profile picture or initials */}
            <Avatar
              src={profilePicture}
              onClick={handleMenuOpen}
              sx={{
                cursor: 'pointer',
                bgcolor: '#457B9D',
                width: 40,
                height: 40,
                '&:hover': { opacity: 0.8 },
              }}
            >
              {!profilePicture && getInitials(user?.firstName + ' ' + user?.lastName)}
            </Avatar>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => navigateTo('/profile')}>My Profile</MenuItem>
              <MenuItem onClick={() => navigateTo('/settings')}>Settings</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: '#E63946' }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontWeight: 600 }}>
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/signup')}
              sx={{
                backgroundColor: 'white',
                color: '#FF6B6B',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
