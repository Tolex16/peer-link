# 🚀 PeerLink

PeerLink is a high-performance, full-stack social networking platform engineered for real-time interaction, meaningful connections, and modern content sharing.

It combines a sleek user experience with a scalable architecture — built to simulate production-level social media systems.

---

## 🌍 Overview

PeerLink enables users to:
- Connect and build meaningful relationships
- Share posts with images and real-time interactions
- Engage through likes, comments, and shares
- Chat instantly with other users
- Manage dynamic user profiles

This project is designed to reflect real-world system design, combining performance, scalability, and user-centric features.

---

## ⚡ Key Features

### 🧑‍🤝‍🧑 Social Interaction
- Create, edit, and delete posts
- Like, comment, and share posts
- Follow / unfollow users
- Real-time UI updates

### 💬 Messaging System
- Real-time chat interface
- Conversation threads
- Unread message indicators
- Scalable messaging architecture

### 👤 User Profiles
- Profile customization (image, bio, posts)
- Followers / following system
- Interactive profile grid

### 🔐 Authentication & Security
- Secure login & registration
- Password validation & encryption
- Protected routes (authenticated access)

### 📸 Media Handling
- Image upload with preview
- Base64 / file handling support
- Optimized UI rendering

---

## 🧠 Architecture

PeerLink is built with a **modern full-stack architecture**:

### Frontend
- ⚛️ React (with Hooks)
- 🎨 Tailwind CSS (modern UI/UX)
- 🔄 State management via React state/hooks
- 📡 Axios for API communication

### Backend (Pluggable)
- 🌱 Spring Boot *(current implementation)*
- 🟢 Node.js (optional/extendable)
- 🔐 REST APIs for authentication & data handling
- 📦 Scalable service-based architecture

### Database
- 🐘 PostgreSQL
- Relational data modeling for users, posts, comments, and messages
- Optimized queries for performance and scalability

### Future Enhancements
- WebSocket integration (real-time messaging)
- Microservices architecture
- Cloud deployment (AWS / Docker)
- Push notifications

---

## 🏗️ Project Structure
peer-link/
│
├── frontend/ # React UI (components, pages, assets)
├── backend/ # Spring Boot / Node backend
├── assets/ # Images and static resources
└── README.md


---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/Tolex16/peer-link.git
cd peer-link
2. Install frontend dependencies
cd frontend
npm install
npm run dev
3. Run backend
cd backend
# Spring Boot
mvn spring-boot:run
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/peerlink

# OR Node (if implemented)
npm install
npm run dev