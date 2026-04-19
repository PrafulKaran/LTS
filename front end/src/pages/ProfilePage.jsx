import { Box, Container, Paper, Button, TextField, Typography, Grid, Chip, Avatar, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'sonner'
import EditIcon from '@mui/icons-material/Edit'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const MotionBox = motion(Box)

export const ProfilePage = () => {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = React.useRef(null)

  const fetchProfile = async () => {
    try {
      if (user?.id) {
        const response = await fetch(`http://localhost:8000/users/${user.id}`)
        if (response.ok) {
          const data = await response.json()
          setProfileData(data)
          if (data.profile_picture) {
            // Construct image URL from filename
            setProfilePicture(`http://localhost:8000/uploads/profile_pictures/${data.profile_picture}`)
          }
        }
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching profile:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [user?.id])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    const toastId = toast.loading('Uploading profile picture...')
    
    try {
      // Convert to base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64Image = e.target?.result

        // Send to backend
        try {
          const response = await fetch(`http://localhost:8000/users/${user?.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              profile_picture: base64Image,
            }),
          })

          const data = await response.json()
          
          if (response.ok) {
            // Refresh profile to get updated picture URL
            await fetchProfile()
            toast.success('Profile picture updated successfully!', { id: toastId })
          } else {
            const errorMsg = typeof data.detail === 'string' ? data.detail : 'Unknown error'
            console.error('Backend error:', data)
            toast.error(`Failed to update: ${errorMsg}`, { id: toastId })
          }
        } catch (error) {
          console.error('Request error:', error)
          toast.error('Error uploading picture: ' + error.message, { id: toastId })
        }
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading picture:', error)
      toast.error('Error uploading picture', { id: toastId })
      setUploading(false)
    }
  }

  const getInitials = () => {
    const first = user?.firstName?.[0] || ''
    const last = user?.lastName?.[0] || ''
    return (first + last).toUpperCase()
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3, textAlign: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
            <Avatar
              src={profilePicture}
              sx={{
                width: 120,
                height: 120,
                bgcolor: '#FF6B6B',
                fontSize: '3rem',
                margin: '0 auto',
                border: '4px solid #FF6B6B',
              }}
            >
              {!profilePicture && getInitials()}
            </Avatar>
            <IconButton
              onClick={handleUploadClick}
              disabled={uploading}
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'white',
                border: '2px solid #FF6B6B',
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
              size="small"
            >
              <CloudUploadIcon sx={{ color: '#FF6B6B' }} />
            </IconButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6C757D', mb: 1 }}>
            @{user?.username}
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
              <TextField fullWidth label="Bio" multiline rows={3} defaultValue={profileData?.bio || 'Add a bio about yourself'} variant="outlined" />
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
