document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const onlineFriendsList = document.getElementById('onlineFriends');
    const newsFeed = document.getElementById('newsFeed');
    const postContent = document.getElementById('postContent');
    const shareWithSelect = document.getElementById('shareWith');
    const friendSelection = document.getElementById('friendSelection');
    const sharePostButton = document.getElementById('sharePost');
    
    // Sample friends data 
    const friends = [
      { id: '2', name: 'Ammar Arshad', avatar: 'images/friend1.jpg', lastActive: new Date(Date.now() - 5 * 60000), rating: 3 },
      { id: '3', name: 'Waleed Mahr', avatar: 'images/friend2.jpg', lastActive: new Date(Date.now() - 15 * 60000), rating: 2 },
      { id: '4', name: 'Haseeb Ahmed', avatar: 'images/friend3.jpg', lastActive: new Date(Date.now() - 60 * 60000), rating: 1 },
      { id: '5', name: 'Muhammad Awais', avatar: 'images/friend4.jpg', lastActive: new Date(Date.now() - 120 * 60000), rating: 3 },
      { id: '6', name: 'Abdullah Shahid', avatar: 'images/friend5.jpg', lastActive: new Date(Date.now() - 180 * 60000), rating: 2 }
    ];
    
    // Sort friends by last active time (most recent first)
    const sortedFriends = [...friends].sort((a, b) => b.lastActive - a.lastActive);
    
    // Sample posts data 
    const posts = [
      {
        id: '1',
        userId: '2',
        content: 'Just finished reading an amazing book about design principles. Highly recommended for anyone interested in UX/UI!',
        timestamp: new Date(Date.now() - 30 * 60000),
        likes: 12,
        dislikes: 2
      },
      {
        id: '2',
        userId: '3',
        content: 'Beautiful day for hiking! Here are some photos from today\'s adventure in the mountains.',
        timestamp: new Date(Date.now() - 3 * 3600000),
        likes: 25,
        dislikes: 0
      },
      {
        id: '3',
        userId: '4',
        content: 'Working on a new project that I\'m really excited about. Can\'t wait to share more details soon!',
        timestamp: new Date(Date.now() - 6 * 3600000),
        likes: 8,
        dislikes: 1
      },
      {
        id: '4',
        userId: '5',
        content: 'Just watched an incredible documentary about sustainable architecture. It\'s amazing how design can help solve environmental challenges.',
        timestamp: new Date(Date.now() - 12 * 3600000),
        likes: 15,
        dislikes: 3
      }
    ];
    
   
    function renderOnlineFriends() {
      onlineFriendsList.innerHTML = '';
      
      sortedFriends.forEach(friend => {
        const li = document.createElement('li');
        li.className = 'friend-item';
        
        // Check if the friend is "online" (active in the last 30 minutes)
        const isOnline = (new Date() - friend.lastActive) < 30 * 60000;
        
        li.innerHTML = `
          <img src="${friend.avatar}" alt="${friend.name}" class="avatar-small">
          <div class="friend-info">
            <span class="friend-name">${friend.name}</span>
            <span class="friend-status">
              ${isOnline ? '<span class="online-indicator"></span>Online' : `Last seen ${timeAgo(friend.lastActive)}`}
            </span>
          </div>
        `;
        
        onlineFriendsList.appendChild(li);
      });
    }
    
    // Render news feed
    function renderNewsFeed() {
      newsFeed.innerHTML = '';
      
      posts.forEach(post => {
        // Find the friend who posted this
        const poster = friends.find(f => f.id === post.userId);
        if (!poster) return;
        
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.dataset.postId = post.id;
        
        postElement.innerHTML = `
          <div class="post-header">
            <img src="${poster.avatar}" alt="${poster.name}" class="avatar-small">
            <div class="post-user-info">
              <span class="post-username">${poster.name}</span>
              <span class="post-time">${timeAgo(post.timestamp)}</span>
            </div>
          </div>
          <div class="post-content">
            ${post.content}
          </div>
          <div class="post-actions">
            <div class="action-buttons">
              <button class="action-button like-button" data-post-id="${post.id}">
                👍 <span class="action-count">${post.likes}</span>
              </button>
              <button class="action-button dislike-button" data-post-id="${post.id}">
                👎 <span class="action-count">${post.dislikes}</span>
              </button>
            </div>
            <div class="rate-friend">
              <span class="rate-label">Rate ${poster.name}:</span>
              <div class="rating-options">
                <span class="rating-option" data-rating="1" data-friend-id="${poster.id}" title="Stupid">😕</span>
                <span class="rating-option" data-rating="2" data-friend-id="${poster.id}" title="Cool">😎</span>
                <span class="rating-option" data-rating="3" data-friend-id="${poster.id}" title="Trustworthy">🤝</span>
              </div>
            </div>
          </div>
        `;
        
        newsFeed.appendChild(postElement);
      });
      
      // Add event listeners to like/dislike buttons
      document.querySelectorAll('.like-button, .dislike-button').forEach(button => {
        button.addEventListener('click', function() {
          const postId = this.dataset.postId;
          const countElement = this.querySelector('.action-count');
          const currentCount = parseInt(countElement.textContent);
          
        
          countElement.textContent = currentCount + 1;
          
         
          console.log(`${this.classList.contains('like-button') ? 'Liked' : 'Disliked'} post ${postId}`);
        });
      });
      
     
      document.querySelectorAll('.rating-option').forEach(option => {
        option.addEventListener('click', function() {
          const friendId = this.dataset.friendId;
          const rating = this.dataset.rating;
          
        
          const rateWidget = this.closest('.rate-friend');
          rateWidget.innerHTML = `<span class="rate-label">Rated as ${getRatingText(rating)}</span>`;
          
         
          console.log(`Rated friend ${friendId} as ${rating}`);
        });
      });
    }
    
   
    function getRatingText(rating) {
      switch(parseInt(rating)) {
        case 1: return 'Stupid';
        case 2: return 'Cool';
        case 3: return 'Trustworthy';
        default: return '';
      }
    }
    
    // Generate friend selection checkboxes
    function generateFriendSelection() {
      friendSelection.innerHTML = '';
      
      friends.forEach(friend => {
        const label = document.createElement('label');
        label.className = 'friend-checkbox';
        
        label.innerHTML = `
          <input type="checkbox" value="${friend.id}"> ${friend.name}
        `;
        
        friendSelection.appendChild(label);
      });
    }
    
    
    shareWithSelect.addEventListener('change', function() {
      if (this.value === 'select') {
        friendSelection.classList.remove('hidden');
        generateFriendSelection();
      } else {
        friendSelection.classList.add('hidden');
      }
    });
    
    // Handle post sharing
    sharePostButton.addEventListener('click', function() {
      const content = postContent.value.trim();
      
      if (!content) {
        alert('Please enter some content to share.');
        return;
      }
      
      // Get the current user
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      // Create a new post
      const newPost = {
        id: 'temp-' + Date.now(),
        userId: currentUser.id,
        content: content,
        timestamp: new Date(),
        likes: 0,
        dislikes: 0
      };
      
     
      posts.unshift(newPost);
      
     
      renderNewsFeed();
      
     
      postContent.value = '';
      
    
      friendSelection.classList.add('hidden');
      shareWithSelect.value = 'all';
      
    
      console.log('Shared new post:', newPost);
    });
   
    renderOnlineFriends();
    renderNewsFeed();
  });
  