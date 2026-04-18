import { Box, Container, Paper, Button, TextField, Typography, Grid, Chip, Avatar } from '@mui/material'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import EditIcon from '@mui/icons-material/Edit'

const MotionBox = motion(Box)

export const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: '#FF6B6B',
              fontSize: '2rem',
              margin: '0 auto',
              mb: 2,
            }}
          >
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6C757D', mb: 2 }}>
            {user?.email}
          </Typography>
          <Button variant="contained" startIcon={<EditIcon />} fullWidth sx={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)' }}>
            Edit Profile
          </Button>
        </Paper>

        {/* Profile Info */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Bio" multiline rows={3} defaultValue="Add a bio about yourself" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Interests
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['Music', 'Travel', 'Coffee', 'Photography'].map((interest, idx) => (
                  <Chip key={idx} label={interest} onDelete={() => {}} />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth sx={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)' }}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </MotionBox>
    </Container>
  )
}
