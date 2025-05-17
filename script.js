// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const themePreference = window.matchMedia('(prefers-color-scheme: dark)');

  // Check for saved theme in localStorage or system preference
  function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = themePreference.matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '☀️';
      darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      body.classList.remove('dark-mode');
      darkModeToggle.innerHTML = '🌙';
      darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Initialize theme
  applyTheme();

  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    darkModeToggle.setAttribute('aria-label', 
      isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
  });

  // Listen for system theme changes
  themePreference.addEventListener('change', applyTheme);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  // Form submission handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const form = e.target;
      const formStatus = document.getElementById('formStatus');
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      // Disable button during submission
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      formStatus.textContent = '';
      formStatus.className = '';
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.classList.add('success');
          form.reset();
        } else {
          throw new Error('Server responded with an error');
        }
      } catch (error) {
        formStatus.textContent = 'Oops! Something went wrong. Please try again.';
        formStatus.classList.add('error');
        console.error('Form submission error:', error);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Scroll to form status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Project card hover effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
  });

  // Skills animation and tooltips
  document.querySelectorAll('.skill-card').forEach((card, index) => {
    // Animate on load
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = `all 0.5s ease ${index * 0.1}s`;
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);

    // Add tooltip
    const skill = card.getAttribute('data-skill');
    card.setAttribute('title', `Proficiency: ${getProficiency(skill)}%`);
  });

  // Proficiency levels
  function getProficiency(skill) {
    const proficiency = {
      'html': 90, 'css': 85, 'js': 80, 'react': 75,
      'python': 85, 'django': 80, 'postman': 70,
      'aws': 65, 'github': 85, 'docker': 75,
      'mysql': 75, 'sqlite': 70
    };
    return proficiency[skill] || '70';
  }
});