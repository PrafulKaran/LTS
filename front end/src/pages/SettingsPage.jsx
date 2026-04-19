import { Box, Container, Paper, Typography, Switch, FormControlLabel, Button, Divider, TextField, Grid } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'

const MotionBox = motion(Box)

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    privateProfile: false,
    showDistance: true,
    showAge: true,
  })

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Settings
        </Typography>

        {/* Notifications */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Notifications
          </Typography>
          <FormControlLabel
            control={<Switch checked={settings.notifications} onChange={() => handleToggle('notifications')} />}
            label="Push Notifications"
            sx={{ display: 'block', mb: 1 }}
          />
          <FormControlLabel
            control={<Switch checked={settings.emailNotifications} onChange={() => handleToggle('emailNotifications')} />}
            label="Email Notifications"
            sx={{ display: 'block' }}
          />
        </Paper>

        {/* Privacy */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Privacy
          </Typography>
          <FormControlLabel
            control={<Switch checked={settings.privateProfile} onChange={() => handleToggle('privateProfile')} />}
            label="Private Profile"
            sx={{ display: 'block', mb: 1 }}
          />
          <FormControlLabel
            control={<Switch checked={settings.showDistance} onChange={() => handleToggle('showDistance')} />}
            label="Show Distance"
            sx={{ display: 'block', mb: 1 }}
          />
          <FormControlLabel
            control={<Switch checked={settings.showAge} onChange={() => handleToggle('showAge')} />}
            label="Show Age"
            sx={{ display: 'block' }}
          />
        </Paper>

        {/* Preferences */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Preferences
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Min Age" type="number" defaultValue={18} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Max Age" type="number" defaultValue={30} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Max Distance (km)" type="number" defaultValue={50} />
            </Grid>
          </Grid>
        </Paper>

        {/* Account */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#E63946' }}>
            Account
          </Typography>
          <Button fullWidth variant="outlined" sx={{ mb: 1, color: '#E63946', borderColor: '#E63946' }}>
            Change Password
          </Button>
          <Button fullWidth variant="outlined" sx={{ color: '#E63946', borderColor: '#E63946' }}>
            Delete Account
          </Button>
        </Paper>

        {/* Save */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
            py: 1.5,
            mt: 4,
          }}
        >
          Save Settings
        </Button>
      </MotionBox>
    </Container>
  )
}
