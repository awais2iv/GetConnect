document.addEventListener('DOMContentLoaded', function() {
    const profileName = document.getElementById('profileName');
    const profileTagline = document.getElementById('profileTagline');
    const profileEmail = document.getElementById('profileEmail');
    const profileLocation = document.getElementById('profileLocation');
    const profileJoined = document.getElementById('profileJoined');
    const friendGrid = document.getElementById('friendGrid');
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    function updateProfileInfo() {
      if (currentUser) {
        profileName.textContent = currentUser.name;
        profileTagline.textContent = currentUser.tagline;
        profileEmail.textContent = currentUser.email;
        profileLocation.textContent = currentUser.location;
        profileJoined.textContent = currentUser.joined;
        
        const avatars = document.querySelectorAll('.avatar-small, .avatar-large');
        avatars.forEach(avatar => {
          avatar.src = currentUser.avatar;
          avatar.alt = currentUser.name;
        });
      }
    }
    
    const friends = [
      { id: '2', name: 'Ammar Arshad', avatar: 'images/friend1.jpg', rating: 3 },
      { id: '3', name: 'Waleed Mahr', avatar: 'images/friend2.jpg', rating: 2 },
      { id: '4', name: 'Haseeb Ahmed', avatar: 'images/friend3.jpg', rating: 1 },
      { id: '5', name: 'Awais', avatar: 'images/friend4.jpg', rating: 3 },
      { id: '6', name: 'Abdullah Shahid', avatar: 'images/friend5.jpg', rating: 2 },
      { id: '7', name: 'Murtaza Ali', avatar: 'images/friend6.jpg', rating: 3 },
      { id: '8', name: 'Khalfan Khan', avatar: 'images/friend7.jpg', rating: 1 },
      { id: '9', name: 'Huzaifa Nasir', avatar: 'images/friend8.jpg', rating: 2 }
    ];
    
    function renderFriends() {
      friendGrid.innerHTML = '';
      
      friends.forEach(friend => {
        const friendElement = document.createElement('div');
        friendElement.className = 'friend-card';
        
        let ratingDisplay = '';
        for (let i = 0; i < friend.rating; i++) {
          ratingDisplay += `<div class="rating-icon rating-${friend.rating}"></div>`;
        }
        
        friendElement.innerHTML = `
          <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
          <div class="friend-name">${friend.name}</div>
          <div class="rating-display">
            ${ratingDisplay}
          </div>
          <div class="friend-actions">
            <div class="friend-action" title="Message" onclick="navigateToMessages('${friend.id}')">✉️</div>
            <div class="friend-action" title="Rate" onclick="openRatingModal('${friend.id}')">⭐</div>
            <div class="friend-action" title="Remove" onclick="confirmRemoveFriend('${friend.id}')">❌</div>
          </div>
        `;
        
        friendGrid.appendChild(friendElement);
      });
    }
    
    updateProfileInfo();
    renderFriends();
  });
  
  function navigateToMessages(friendId) {
    localStorage.setItem('selectedFriend', friendId);
    window.location.href = 'messages.html';
  }
  
  function openRatingModal(friendId) {
    const rating = prompt('Rate this friend (1: Stupid, 2: Cool, 3: Trustworthy):', '3');
    
    if (rating && ['1', '2', '3'].includes(rating)) {
      alert(`Friend rated as ${getRatingText(parseInt(rating))}`);
    }
  }
  
  function getRatingText(rating) {
    switch(rating) {
      case 1: return 'Stupid';
      case 2: return 'Cool';
      case 3: return 'Trustworthy';
      default: return '';
    }
  }
  
  function confirmRemoveFriend(friendId) {
    const confirmed = confirm('Are you sure you want to remove this friend?');
    
    if (confirmed) {
      alert('Friend removed successfully.');
    }
  }
