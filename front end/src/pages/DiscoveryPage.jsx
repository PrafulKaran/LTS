import { Box, Container, Typography, CircularProgress, Paper, Grid, Chip, Button } from '@mui/material'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ClearIcon from '@mui/icons-material/Clear'

const MotionBox = motion(Box)
const MotionCard = motion(Box)

export const DiscoveryPage = () => {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Simulate loading profiles
    setTimeout(() => {
      setProfiles([
        {
          id: 1,
          name: 'Sarah',
          age: 20,
          bio: 'Love hiking and coffee',
          interests: ['Hiking', 'Coffee', 'Art'],
          distance: 2,
          image: 'https://via.placeholder.com/400x500?text=Sarah',
        },
        {
          id: 2,
          name: 'Emma',
          age: 21,
          bio: 'Passionate about music and travel',
          interests: ['Music', 'Travel', 'Photography'],
          distance: 5,
          image: 'https://via.placeholder.com/400x500?text=Emma',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleLike = () => {
    // API call to like profile
    console.log('Liked profile:', profiles[currentIndex].id)
    setCurrentIndex(currentIndex + 1)
  }

  const handlePass = () => {
    console.log('Passed profile:', profiles[currentIndex].id)
    setCurrentIndex(currentIndex + 1)
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (currentIndex >= profiles.length) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          No more profiles
        </Typography>
        <Typography variant="body1" sx={{ color: '#6C757D' }}>
          Check back later for more matches!
        </Typography>
      </Container>
    )
  }

  const profile = profiles[currentIndex]

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <MotionBox
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Profile Image */}
          <Box
            sx={{
              width: '100%',
              height: 500,
              backgroundImage: `url(${profile.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                p: 3,
              }}
            >
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                {profile.name}, {profile.age}
              </Typography>
              <Typography variant="body2" sx={{ color: '#d0d0d0' }}>
                {profile.distance} km away
              </Typography>
            </Box>
          </Box>

          {/* Profile Info */}
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" sx={{ mb: 2, color: '#6C757D' }}>
              {profile.bio}
            </Typography>

            {/* Interests */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Interests
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {profile.interests.map((interest, idx) => (
                  <Chip key={idx} label={interest} variant="outlined" size="small" />
                ))}
              </Box>
            </Box>

            {/* Action Buttons */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={handlePass}
                  sx={{
                    py: 1.5,
                    borderColor: '#dee2e6',
                    color: '#6C757D',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                >
                  Pass
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FavoriteIcon />}
                  onClick={handleLike}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
                  }}
                >
                  Like
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </MotionBox>
    </Container>
  )
}
