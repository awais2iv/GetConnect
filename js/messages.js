document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const conversationList = document.getElementById('conversationList');
    const messageHeader = document.getElementById('messageHeader');
    const messageContent = document.getElementById('messageContent');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const newMessageBtn = document.getElementById('newMessage');
    
    // Sample contacts data (in a real app, this would come from a server)
    const contacts = [
      { id: '2', name: 'Ammar Arshad', avatar: 'images/friend1.jpg' },
      { id: '3', name: 'Waleed Mahr', avatar: 'images/friend2.jpg' },
      { id: '4', name: 'Haseeb Ahmed', avatar: 'images/friend3.jpg' },
      { id: '5', name: 'Muhammad Awais', avatar: 'images/friend4.jpg' },
      { id: '6', name: 'Abdullah Shahid', avatar: 'images/friend5.jpg' },
      { id: '7', name: 'Murtaza Ali', avatar: 'images/friend6.jpg' },
      { id: '8', name: 'Khalfan Khan', avatar: 'images/friend7.jpg' },
      { id: '9', name: 'Huzaifa Nasir', avatar: 'images/friend8.jpg' }
    ];
    
    // Sample messages data (in a real app, this would come from a server)
    const conversations = {
      '2': [
        { senderId: '2', text: 'Hey there! How are you doing?', timestamp: new Date(Date.now() - 2 * 3600000) },
        { senderId: '1', text: 'I\'m doing well, thanks for asking! How about you?', timestamp: new Date(Date.now() - 1.5 * 3600000) },
        { senderId: '2', text: 'Pretty good! Just working on a new design project.', timestamp: new Date(Date.now() - 1 * 3600000) },
        { senderId: '1', text: 'That sounds interesting. What kind of project is it?', timestamp: new Date(Date.now() - 0.5 * 3600000) }
      ],
      '3': [
        { senderId: '1', text: 'Hey James, did you see that new design tool everyone is talking about?', timestamp: new Date(Date.now() - 5 * 3600000) },
        { senderId: '3', text: 'Not yet, what\'s it called?', timestamp: new Date(Date.now() - 4.8 * 3600000) },
        { senderId: '1', text: 'It\'s called DesignX. Supposedly it makes prototyping much faster.', timestamp: new Date(Date.now() - 4.5 * 3600000) }
      ],
      '4': [
        { senderId: '4', text: 'Hi! I wanted to ask you about that book you recommended last week.', timestamp: new Date(Date.now() - 24 * 3600000) },
        { senderId: '1', text: 'The design thinking one? What do you think of it so far?', timestamp: new Date(Date.now() - 23 * 3600000) },
        { senderId: '4', text: 'It\'s amazing! I\'m already halfway through. The case studies are really insightful.', timestamp: new Date(Date.now() - 20 * 3600000) }
      ]
    };
    
    // Current selected conversation
    let selectedContact = null;
    
    // Check if there's a selected friend from the profile page
    const savedSelectedFriend = localStorage.getItem('selectedFriend');
    if (savedSelectedFriend) {
      selectedContact = savedSelectedFriend;
      localStorage.removeItem('selectedFriend'); // Clear it after use
    }
    
    // Render conversation list
    function renderConversations() {
      conversationList.innerHTML = '';
      
      contacts.forEach(contact => {
        const conversation = conversations[contact.id] || [];
        const lastMessage = conversation[conversation.length - 1] || { text: 'No messages yet', timestamp: new Date() };
        
        const contactElement = document.createElement('div');
        contactElement.className = `conversation-item ${selectedContact === contact.id ? 'active' : ''}`;
        contactElement.dataset.contactId = contact.id;
        
        contactElement.innerHTML = `
          <img src="${contact.avatar}" alt="${contact.name}" class="avatar-small">
          <div class="conversation-info">
            <span class="conversation-name">${contact.name}</span>
            <span class="conversation-preview">${lastMessage.text}</span>
          </div>
        `;
        
        contactElement.addEventListener('click', function() {
          selectedContact = contact.id;
          renderConversations(); // Re-render to update the active state
          renderConversation(contact.id);
        });
        
        conversationList.appendChild(contactElement);
      });
    }
    
    // Render a specific conversation
    function renderConversation(contactId) {
      const contact = contacts.find(c => c.id === contactId);
      if (!contact) return;
      
      // Update the header
      messageHeader.innerHTML = `
        <div class="message-header-info">
          <img src="${contact.avatar}" alt="${contact.name}" class="avatar-small">
          <span>${contact.name}</span>
        </div>
      `;
      
      // Clear the message content
      messageContent.innerHTML = '';
      
      // Get the conversation
      const conversation = conversations[contactId] || [];
      
      // Sort messages by timestamp
      const sortedMessages = [...conversation].sort((a, b) => a.timestamp - b.timestamp);
      
      // Render each message
      sortedMessages.forEach(message => {
        const messageElement = document.createElement('div');
        const isSent = message.senderId === '1'; // '1' is the current user
        
        messageElement.className = `message ${isSent ? 'message-sent' : 'message-received'}`;
        
        messageElement.innerHTML = `
          <div class="message-text">${message.text}</div>
          <div class="message-time">${formatTime(message.timestamp)}</div>
        `;
        
        messageContent.appendChild(messageElement);
      });
      
      // Scroll to the bottom
      messageContent.scrollTop = messageContent.scrollHeight;
    }
    
    // Format time for messages
    function formatTime(date) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Send a new message
    function sendMessage() {
      if (!selectedContact) {
        alert('Please select a conversation first.');
        return;
      }
      
      const text = messageInput.value.trim();
      if (!text) return;
      
      // Create a new message
      const newMessage = {
        senderId: '1', // Current user
        text: text,
        timestamp: new Date()
      };
      
      // Initialize the conversation if it doesn't exist
      if (!conversations[selectedContact]) {
        conversations[selectedContact] = [];
      }
      
      // Add the message
      conversations[selectedContact].push(newMessage);
      
      // Clear the input
      messageInput.value = '';
      
      // Re-render the conversation
      renderConversation(selectedContact);
      
      // Update the conversation list (to show the latest message)
      renderConversations();
    }
    
    // Handle send button click
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // Handle Enter key in the message input
    messageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Handle new message button
    newMessageBtn.addEventListener('click', function() {
      const contactId = prompt('Enter the ID of the contact you want to message:');
      if (contactId && contacts.some(c => c.id === contactId)) {
        selectedContact = contactId;
        renderConversations();
        renderConversation(contactId);
      } else if (contactId) {
        alert('Contact not found.');
      }
    });
    
    // Initialize the page
    renderConversations();
    
    // If there's a selected contact, load that conversation
    if (selectedContact) {
      renderConversation(selectedContact);
    }
  });
  