import { Box, Container, Paper, TextField, Button, Typography, Link, Grid } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const MotionBox = motion(Box)

export const SignupPage = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (Object.values(formData).some((v) => !v)) {
      setError('Please fill all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      // Call backend API to register
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        setError(error.detail || 'Signup failed')
        return
      }

      const userData = await response.json()
      
      // Store user data and navigate
      signup(
        { firstName: formData.firstName, lastName: formData.lastName, email: formData.email },
        'user-token'
      )
      navigate('/discovery')
    } catch (err) {
      setError(err.message || 'An error occurred during signup')
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
                Create your profile
              </Typography>
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a unique username"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              {error && (
                <Typography variant="body2" sx={{ color: '#E63946', my: 2 }}>
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
                  mt: 2,
                  mb: 2,
                }}
              >
                Sign Up
              </Button>
            </form>

            {/* Login Link */}
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#6C757D' }}>
              Already have an account?{' '}
              <Link
                href="/login"
                sx={{
                  color: '#FF6B6B',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Login
              </Link>
            </Typography>
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  )
}
