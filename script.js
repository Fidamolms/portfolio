document.addEventListener('DOMContentLoaded', () => {
  // Generate random stars
  const starsContainer = document.querySelector('.stars');
  for (let i = 0; i < 15; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }

  // Typing animation
  const typingText = document.querySelector('.typing-text');
  const text = typingText.textContent;
  typingText.textContent = '';
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 100);

  // Mobile navigation toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileNavLinks = document.querySelector('.mobile-nav .nav-links');
  
  hamburger.addEventListener('click', () => {
    mobileNavLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.mobile-nav .nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNavLinks.classList.remove('active');
    });
  });

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Contact Form Submission
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = "Sending your message...";
    formStatus.style.color = "#007bff";

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        formStatus.textContent = "Message sent successfully!";
        formStatus.style.color = "green";
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    })
    .catch(error => {
      formStatus.textContent = "Oops! Something went wrong. Please try again.";
      formStatus.style.color = "red";
      console.error(error);
    });
  });
});
// Add these CSS variables to your root or dark mode toggle
document.documentElement.style.setProperty('--bg-color', '#fff');
document.documentElement.style.setProperty('--dark-bg', '#0a192f');
document.documentElement.style.setProperty('--form-bg', '#fff');
document.documentElement.style.setProperty('--dark-form-bg', '#112240');
document.documentElement.style.setProperty('--text-color', '#555');
document.documentElement.style.setProperty('--dark-text', '#ccd6f6');
document.documentElement.style.setProperty('--border-color', '#ddd');
document.documentElement.style.setProperty('--dark-border', '#1e2a47');
document.documentElement.style.setProperty('--input-bg', '#fff');
document.documentElement.style.setProperty('--dark-input-bg', '#112240');
document.documentElement.style.setProperty('--btn-bg', '#0a192f');
document.documentElement.style.setProperty('--dark-btn-bg', '#64ffda');
document.documentElement.style.setProperty('--btn-text', '#fff');
document.documentElement.style.setProperty('--dark-btn-text', '#0a192f');
document.documentElement.style.setProperty('--btn-hover', '#172a45');
document.documentElement.style.setProperty('--dark-btn-hover', '#52e3c2');