import { Box, Container, Paper, TextField, Button, Typography, Link } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'sonner'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const MotionBox = motion(Box)

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields')
      setLoading(false)
      return
    }

    const toastId = toast.loading('Logging in...')

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.detail || 'Login failed', { id: toastId })
        setLoading(false)
        return
      }

      const userData = await response.json()
      
      // Store user data and navigate
      login(
        {
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          username: userData.username,
          profilePicture: userData.profile_picture,
        },
        'user-token'
      )
      toast.success('Login successful!', { id: toastId })
      setLoading(false)
      navigate('/discovery')
    } catch (err) {
      toast.error(err.message || 'An error occurred during login', { id: toastId })
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f0f0 100%)' }}>
      <Container maxWidth="sm">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            {/* Logo */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <FavoriteBorderIcon sx={{ fontSize: 50, color: '#FF6B6B', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1D3557' }}>
                CollegeMate
              </Typography>
              <Typography variant="body2" sx={{ color: '#6C757D', mt: 0.5 }}>
                Find your perfect match
              </Typography>
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 1 }}
              />

              {/* Forgot Password Link */}
              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link
                  href="/forgot-password"
                  sx={{
                    color: '#FF6B6B',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              {error && (
                <Typography variant="body2" sx={{ color: '#E63946', mb: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
                  py: 1.5,
                  mb: 2,
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Signup Link */}
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#6C757D' }}>
              Don't have an account?{' '}
              <Link
                href="/signup"
                sx={{
                  color: '#FF6B6B',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  )
}
