// App constants
export const APP_NAME = 'CollegeMate'
export const APP_VERSION = '1.0.0'

// User interests
export const INTERESTS = [
  'Sports',
  'Music',
  'Movies',
  'Gaming',
  'Photography',
  'Traveling',
  'Reading',
  'Cooking',
  'Art',
  'Fitness',
  'Outdoors',
  'Technology',
  'Fashion',
  'Volunteering',
  'Study Groups',
  'Coffee',
]

// Gender options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-Binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

// Looking for
export const LOOKING_FOR = [
  { value: 'dating', label: 'Dating' },
  { value: 'relationship', label: 'Relationship' },
  { value: 'friends', label: 'Friends' },
  { value: 'not-sure', label: 'Not Sure' },
]

// Age range
export const MIN_AGE = 18
export const MAX_AGE = 65

// Distance range (km)
export const MIN_DISTANCE = 1
export const MAX_DISTANCE = 100

// Match types
export const MATCH_TYPES = {
  LIKE: 'like',
  PASS: 'pass',
  SUPER_LIKE: 'super_like',
}

// Message types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  TYPING: 'typing',
  READ: 'read',
}

// Status
export const USER_STATUS = {
  ACTIVE: 'active',
  IDLE: 'idle',
  OFFLINE: 'offline',
}

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please try again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User not found.',
  EMAIL_ALREADY_EXISTS: 'Email already exists.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SERVER_ERROR: 'Server error. Please try again later.',
}

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  MESSAGE_SENT: 'Message sent!',
  PROFILE_DELETED: 'Profile deleted successfully!',
}

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DISCOVERY: '/discovery',
  MATCHES: '/matches',
  CHAT: '/chat',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '/404',
}

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',

  // User
  PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  UPLOAD_PHOTO: '/users/photos',
  DELETE_ACCOUNT: '/users/delete',

  // Discovery
  GET_CARDS: '/discovery/cards',
  LIKE: '/discovery/like',
  PASS: '/discovery/pass',
  SUPER_LIKE: '/discovery/super-like',

  // Matches
  GET_MATCHES: '/matches',
  GET_MATCH_DETAIL: '/matches/:id',

  // Chat
  GET_CONVERSATIONS: '/chat/conversations',
  GET_MESSAGES: '/chat/messages/:matchId',
  SEND_MESSAGE: '/chat/messages',
  DELETE_CONVERSATION: '/chat/conversations/:id',
}

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const CARD_LOAD_SIZE = 5

// Image upload
export const ALLOWED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

// Debounce timing
export const DEBOUNCE_DELAY = 300
export const SEARCH_DEBOUNCE = 500
