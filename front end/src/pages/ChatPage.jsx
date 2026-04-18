import { Box, Container, Paper, TextField, Button, List, ListItem, Typography, Avatar } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'

const MotionBox = motion(Box)

export const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Hey! How are you?', timestamp: '10:30 AM' },
    { id: 2, sender: 'user', text: 'Hi! I am doing great. How about you?', timestamp: '10:31 AM' },
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'user',
          text: inputValue,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
      setInputValue('')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4, height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {/* Chat Header */}
        <Box sx={{ pb: 2, borderBottom: '1px solid #dee2e6' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#FF6B6B' }}>S</Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Sarah
              </Typography>
              <Typography variant="caption" sx={{ color: '#6C757D' }}>
                Active now
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((msg) => (
            <MotionBox
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Paper
                sx={{
                  p: 1.5,
                  maxWidth: '70%',
                  backgroundColor: msg.sender === 'user' ? '#FF6B6B' : '#f0f0f0',
                  color: msg.sender === 'user' ? 'white' : '#1D3557',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
                  {msg.timestamp}
                </Typography>
              </Paper>
            </MotionBox>
          ))}
        </Box>

        {/* Input */}
        <Box sx={{ display: 'flex', gap: 1, pt: 2, borderTop: '1px solid #dee2e6' }}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            endIcon={<SendIcon />}
            sx={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #E63946 100%)',
            }}
          >
            Send
          </Button>
        </Box>
      </MotionBox>
    </Container>
  )
}
