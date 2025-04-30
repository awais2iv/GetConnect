document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      
      // Simulate authentication (in a real app, this would be a server request)
      if (username && password) {
        // Store user info in localStorage (simulating a session)
        const userData = {
          id: '1',
          username: username,
          name: 'Muhammad Awais',
          avatar: 'images/user-avatar.jpg',
          tagline: 'Full Stack Web Developer',
          email: 'mohamadawais942@gmail.com',
          location: 'Islamabad, Pakistan',
          joined: 'March 21,2025'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Redirect to home page
        window.location.href = 'home.html';
      } else {
        alert('Please enter both username and password');
      }
    });
  });
  