import { Box, Container, Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const MotionBox = motion(Box)

export const MatchesPage = () => {
  const navigate = useNavigate()
  const matches = [
    { id: 1, name: 'Sarah', status: 'online', lastMessage: 'Hey! How are you?' },
    { id: 2, name: 'Emma', status: 'offline', lastMessage: 'That sounds fun!' },
  ]

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Your Matches
        </Typography>

        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <List sx={{ width: '100%' }}>
            {matches.map((match, idx) => (
              <Box key={match.id}>
                <ListItem
                  button
                  onClick={() => navigate(`/chat?matchId=${match.id}`)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#FF6B6B' }}>
                      {match.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={match.name}
                    secondary={match.lastMessage}
                  />
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: match.status === 'online' ? '#06D6A0' : '#dee2e6' }} />
                </ListItem>
                {idx < matches.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>

        {matches.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <FavoriteBorderIcon sx={{ fontSize: 60, color: '#dee2e6', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#6C757D' }}>
              No matches yet. Start discovering!
            </Typography>
          </Box>
        )}
      </MotionBox>
    </Container>
  )
}
