import { Box, Container, Paper, TextField, Button, Typography, Link } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const MotionBox = motion(Box)

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState('email') // 'email', 'reset'
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!email) {
      toast.error('Please enter your email')
      setLoading(false)
      return
    }

    const toastId = toast.loading('Sending reset link...')

    try {
      const response = await fetch('http://localhost:8000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.detail || 'Failed to send reset email', { id: toastId })
        setLoading(false)
        return
      }

      const data = await response.json()
      setResetToken(data.reset_token)
      setStep('reset')
      toast.success('Reset link sent! Enter your new password.', { id: toastId })
      setLoading(false)
    } catch (err) {
      toast.error(err.message || 'An error occurred', { id: toastId })
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill all fields')
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      setLoading(false)
      return
    }

    const toastId = toast.loading('Resetting password...')

    try {
      const response = await fetch('http://localhost:8000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          new_password: newPassword,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.detail || 'Failed to reset password', { id: toastId })
        setLoading(false)
        return
      }

      toast.success('Password reset successfully! Redirecting to login...', { id: toastId })
      setLoading(false)
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      toast.error(err.message || 'An error occurred', { id: toastId })
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
            {/* Back Button */}
            <Button
              onClick={() => navigate('/login')}
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 2, color: '#FF6B6B' }}
            >
              Back to Login
            </Button>

            {/* Logo */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <FavoriteBorderIcon sx={{ fontSize: 50, color: '#FF6B6B', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1D3557' }}>
                Reset Password
              </Typography>
              <Typography variant="body2" sx={{ color: '#6C757D', mt: 0.5 }}>
                {step === 'email' ? 'Enter your email to reset password' : 'Enter your new password'}
              </Typography>
            </Box>

            {/* Step 1: Email */}
            {step === 'email' && (
              <form onSubmit={handleForgotPassword}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
                    py: 1.5,
                  }}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            )}

            {/* Step 2: Reset Password */}
            {step === 'reset' && (
              <form onSubmit={handleResetPassword}>
                <Typography variant="body2" sx={{ color: '#6C757D', mb: 2 }}>
                  Email: <strong>{email}</strong>
                </Typography>

                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
                    py: 1.5,
                  }}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            )}
          </Paper>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default ForgotPasswordPage
