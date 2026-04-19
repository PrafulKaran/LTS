import { Box, Container, Typography, Button, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const MotionBox = motion(Box)

export const HomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f0f0 100%)' }}>
      <Container maxWidth="lg" sx={{ pt: 6, pb: 6 }}>
        {/* Hero Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <FavoriteBorderIcon sx={{ fontSize: 80, color: '#FF6B6B' }} />
          </Box>
          <Typography variant="h1" sx={{ mb: 2, color: '#1D3557' }}>
            Find Your College Love
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: '#6C757D', fontWeight: 400 }}>
            Connect with fellow students. Make meaningful relationships. Your story starts here.
          </Typography>

          {!isAuthenticated && (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/signup')}
                sx={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderColor: '#FF6B6B',
                  color: '#FF6B6B',
                }}
              >
                Login
              </Button>
            </Box>
          )}

          {isAuthenticated && (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/discovery')}
              sx={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
              }}
            >
              Start Discovering
            </Button>
          )}
        </MotionBox>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 3,
            mt: 6,
          }}
        >
          {[
            {
              title: 'Smart Matching',
              description: 'Connect with people based on interests and compatibility',
            },
            {
              title: 'Real-time Chat',
              description: 'Message instantly with your matches',
            },
            {
              title: 'Verified Profiles',
              description: 'Safe and secure dating environment',
            },
            {
              title: 'Privacy First',
              description: 'Your privacy is our top priority',
            },
          ].map((feature, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: 3,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography variant="h5" sx={{ mb: 1, color: '#FF6B6B', fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6C757D' }}>
                  {feature.description}
                </Typography>
              </Paper>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
