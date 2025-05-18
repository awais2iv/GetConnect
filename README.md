# 🤝 ConnecFriend - Social Networking UI

**ConnecFriend** is a user interface prototype for a modern social networking platform where individuals can connect with friends, view news feeds, exchange messages, and build meaningful online relationships.

---

## 📌 Project Overview

A social networking service is an online platform that enables users to build and manage social relationships. **ConnecFriend** is designed to reflect the essential features of a social platform like profile management, friend connections, content sharing, private messaging, and more.

This UI has been designed for a client **XYZ**, to provide a prototype look-and-feel of their upcoming social networking product.

---

## 🎯 Features Implemented

### ✅ Login Page
- Simple login form for existing users (no registration page required).
- Username and password input fields with login validation logic (frontend only).

### ✅ Profile Page
- Displays user's personal information and profile picture.
- Lists all friends in a clean, scrollable format.

### ✅ Home Page (News Feed)
- Shows posts from friends, including:
  - Friend’s name and profile picture
  - Time since their last login
  - News content

- Friends are displayed in **latest-login-first** order.
- Supports:
  - 👎 Like/Dislike functionality with count display
  - 📨 News sharing (to all or selected friends)
  - ➕ Sending friend requests (unless user is on ignore list)
  - ⭐ Friend rating: Stupid (1), Cool (2), Trustworthy (3)

### ✅ Messaging System (Frontend)
- Private message UI allows chatting with both friends and other members.

---

## 🧪 How to Run

Simply open `index.html` in your browser to start using the interface.

```bash
# If using VSCode or similar
Live Server > index.html
