import { Box, Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f0f0 100%)' }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 700, color: '#FF6B6B', mb: 2 }}>
            404
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 600, color: '#1D3557', mb: 2 }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: '#6C757D', mb: 4 }}>
            Oops! The page you're looking for doesn't exist. Let's get you back to finding your perfect match!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
              px: 4,
            }}
          >
            Go Home
          </Button>
        </MotionBox>
      </Container>
    </Box>
  )
}
