// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.href.includes('index.html')) {
      window.location.href = 'index.html';
    }
  }
  
  // Format time difference
  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
  }
  
  // Handle logout
  document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
      });
    }
    
    // Initialize user menu hover behavior
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
      const dropdown = userMenu.querySelector('.dropdown-content');
      
      userMenu.addEventListener('mouseenter', function() {
        dropdown.style.display = 'block';
      });
      
      userMenu.addEventListener('mouseleave', function() {
        dropdown.style.display = 'none';
      });
    }
  });
  