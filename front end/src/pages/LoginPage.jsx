import { Box, Container, Paper, TextField, Button, Typography, Link } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const MotionBox = motion(Box)

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please fill all fields')
      return
    }
    // Mock login
    login({ firstName: 'John', lastName: 'Doe', email: formData.email }, 'fake-token')
    navigate('/discovery')
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
                sx={{ mb: 2 }}
              />

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
                sx={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
                  py: 1.5,
                  mb: 2,
                }}
              >
                Login
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
