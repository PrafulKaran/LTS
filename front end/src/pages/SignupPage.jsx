import { Box, Container, Paper, TextField, Button, Typography, Link, Grid, Avatar } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'sonner'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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
    profilePicture: null,
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB')
        return
      }

      // Read file as base64
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }))
        setPreviewImage(reader.result)
        toast.success('Image selected successfully')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.username || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill all fields')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      setLoading(false)
      return
    }

    const toastId = toast.loading('Creating account...')

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
          profile_picture: formData.profilePicture,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.detail || 'Signup failed', { id: toastId })
        setLoading(false)
        return
      }

      const userData = await response.json()
      
      // Store user data and navigate
      signup(
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
      toast.success('Account created successfully!', { id: toastId })
      setLoading(false)
      navigate('/discovery')
    } catch (err) {
      toast.error(err.message || 'An error occurred during signup', { id: toastId })
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

                {/* Profile Picture Upload */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Profile Picture (Optional)
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {previewImage && (
                      <Avatar
                        src={previewImage}
                        sx={{ width: 80, height: 80 }}
                      />
                    )}
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      sx={{ textTransform: 'none' }}
                    >
                      Upload Photo
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Box>
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
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
                  py: 1.5,
                  mt: 2,
                  mb: 2,
                }}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
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
