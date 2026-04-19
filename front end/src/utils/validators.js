// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Password validation (min 8 chars, 1 uppercase, 1 number)
export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
  return regex.test(password)
}

// Phone validation
export const validatePhone = (phone) => {
  const regex = /^[\d\s\-\+\(\)]{10,}$/
  return regex.test(phone)
}

// Age validation (18+)
export const validateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age >= 18
}

// College email validation
export const validateCollegeEmail = (email) => {
  const collegeDomains = ['.edu', 'student.', 'college.']
  return collegeDomains.some((domain) => email.toLowerCase().includes(domain))
}

// Bio validation
export const validateBio = (bio) => {
  return bio && bio.trim().length >= 10 && bio.trim().length <= 500
}

// Form validation helper
export const validateForm = (data, rules) => {
  const errors = {}

  Object.keys(rules).forEach((field) => {
    const rule = rules[field]
    const value = data[field]

    if (rule.required && !value) {
      errors[field] = `${field} is required`
    } else if (rule.validate && value && !rule.validate(value)) {
      errors[field] = rule.message || `${field} is invalid`
    }
  })

  return errors
}
