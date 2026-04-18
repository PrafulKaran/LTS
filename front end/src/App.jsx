import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">College LTS</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to College LTS</h1>
          <p>Learning Through Systems - Empowering the Next Generation</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="programs">
        <h2>Our Programs</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Computer Science</h3>
            <p>Master modern programming languages and software development practices.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Web Development</h3>
            <p>Build responsive and interactive web applications with React and more.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Cybersecurity</h3>
            <p>Learn to protect digital systems and networks from threats.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Data Science</h3>
            <p>Analyze and visualize data to make informed decisions.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <h2>Why Choose Us?</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              At College LTS, we believe in practical, hands-on learning. Our curriculum is designed 
              by industry professionals to ensure you graduate with real-world skills.
            </p>
            <p>
              Our experienced faculty, state-of-the-art facilities, and supportive community make 
              learning an enjoyable and rewarding experience.
            </p>
            <button className="secondary-button">Learn More</button>
          </div>
          <div className="about-stats">
            <div className="stat">
              <h3>500+</h3>
              <p>Students Graduated</p>
            </div>
            <div className="stat">
              <h3>95%</h3>
              <p>Job Placement Rate</p>
            </div>
            <div className="stat">
              <h3>10+</h3>
              <p>Industry Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Get In Touch</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 College LTS. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
