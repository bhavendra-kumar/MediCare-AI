# 🏥 MediCare AI

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![React Native](https://img.shields.io/badge/React_Native-Mobile-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-54-black?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Python](https://img.shields.io/badge/Python-3.x-yellow?logo=python)
![License](https://img.shields.io/badge/License-MIT-green)

### AI-Powered Healthcare Platform for Intelligent Medical Assistance

*MediCare AI combines Artificial Intelligence, Medical Report Analysis, Skin Disease Detection, Voice Assistance, Appointment Management, and Health Insights into a unified healthcare ecosystem across Web and Mobile platforms.*

</div>

---

# 📖 Overview

**MediCare AI** is an AI-powered healthcare platform designed to simplify healthcare management and provide intelligent medical assistance.

The platform enables users to:

* 🤖 Chat with an AI Medical Assistant
* 📄 Analyze medical reports using OCR & AI
* 🩺 Detect skin diseases from uploaded images
* 📅 Book and manage appointments
* 📊 Track health statistics
* 🎙 Use voice-enabled conversations
* 🔔 Receive health notifications
* 📱 Access services from both Web and Mobile

> **Disclaimer:** MediCare AI is developed for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment.

---

# ✨ Features

## 🤖 AI Medical Assistant

* AI-powered healthcare chatbot
* Symptom-based health guidance
* Disease information
* Medical question answering
* Context-aware conversations
* Real-time responses

---

## 📄 Medical Report Analysis

Upload:

* Medical Reports
* Lab Reports
* PDF Documents
* Images

AI automatically:

* Extracts text using OCR
* Summarizes reports
* Explains medical terms
* Highlights abnormal values
* Generates easy-to-understand insights

---

## 🩺 Skin Disease Detection

Users can upload skin images to:

* Detect possible skin conditions
* Receive AI predictions
* View confidence score
* Learn disease information
* Get precautionary recommendations

---

## 📅 Appointment Management

* Schedule appointments
* Manage appointments
* Appointment history
* Status tracking
* Upcoming reminders

---

## 📊 Health Dashboard

Track:

* Health summary
* Appointment statistics
* Medical reports
* AI interactions
* Health insights
* Personal profile

---

## 🔔 Notifications

* Appointment reminders
* Health alerts
* AI recommendations
* System notifications

---

## 🎤 Voice Assistant

* Speech-to-Text
* Text-to-Speech
* Voice-enabled AI conversations
* Hands-free interaction

---

## 🌍 Multilingual Support

* Multiple language support
* Localized interface
* Voice language support

---

## 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected APIs
* Secure Sessions

---

## 📱 Cross Platform

* Responsive Web Platform
* Android Application
* iOS Application (Expo)
* Mobile-first experience

---

# 🏗 Project Architecture

```
                    MediCare AI

           ┌─────────────────────────┐
           │     Web Platform        │
           │   Next.js 16 + React    │
           └──────────┬──────────────┘
                      │
             REST APIs │ Socket.IO
                      │
           ┌──────────▼──────────────┐
           │     FastAPI Backend     │
           │        Python           │
           └──────────┬──────────────┘
                      │
     ┌────────────────┼─────────────────┐
     │                │                 │
     ▼                ▼                 ▼

 AI Chat      Report Analysis     Skin Detection

     │                │                 │
     └────────────────┼─────────────────┘
                      │
                Health Services

                      ▲
                      │

        React Native Mobile Application
```

---

# 📂 Repository Structure

```
MediCare-AI/

├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── main.py
│   └── requirements.txt
│
├── web-platform/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── styles/
│   └── package.json
│
├── mobile-platform/
│   ├── app/
│   ├── components/
│   ├── assets/
│   ├── services/
│   ├── utils/
│   ├── hooks/
│   └── package.json
│
└── README.md
```

---

# 🛠 Technology Stack

## Frontend (Web)

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4
* React Hook Form
* Zod
* Axios
* Motion
* Recharts
* jsPDF
* html2canvas

---

## Mobile

* React Native
* Expo SDK 54
* Expo Router
* React Navigation
* Async Storage
* Expo Speech
* Image Picker
* Socket.IO Client
* i18next

---

## Backend

* FastAPI
* Python
* Socket.IO
* REST APIs
* CORS Middleware

---

## AI Integration

* Google Gemini AI
* OCR Processing
* Medical Report Analysis
* Skin Disease Detection
* AI Chat Assistant

---

## Development Tools

* Git
* GitHub
* VS Code
* Postman
* Docker

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/MediCare-AI.git

cd MediCare-AI
```

---

# Backend Setup

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn main:app --reload
```

Backend runs on

```
http://localhost:8000
```

---

# Web Platform Setup

```bash
cd web-platform

npm install

npm run dev
```

Runs on

```
http://localhost:3000
```

---

# Mobile App Setup

```bash
cd mobile-platform

npm install

npx expo start
```

---

# Environment Variables

Create a `.env` file inside the backend.

```env
GEMINI_API_KEY=

JWT_SECRET=

DATABASE_URL=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

For the web application:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For Expo:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

---

# API Endpoints

| Endpoint           | Description            |
| ------------------ | ---------------------- |
| `/health`          | Health Check           |
| `/auth/*`          | Authentication         |
| `/chat/*`          | AI Chat                |
| `/reports/*`       | Medical Reports        |
| `/skin/*`          | Skin Disease Detection |
| `/appointments/*`  | Appointment APIs       |
| `/dashboard/*`     | Dashboard              |
| `/notifications/*` | Notifications          |

---

# Screens

* Login
* Register
* Dashboard
* AI Chat
* Report Analysis
* Skin Detection
* Appointment Booking
* Notifications
* Profile
* Settings
* Health Dashboard

---

# Security

* JWT Authentication
* Protected Routes
* Secure API Access
* Input Validation
* Environment Variables
* Secure File Uploads

---

# Future Enhancements

* AI Prescription Analysis
* Medicine Reminder
* Wearable Device Integration
* Doctor Video Consultation
* Health Risk Prediction
* Emergency SOS
* Electronic Health Records (EHR)
* AI Nutrition Recommendations
* Smart Health Monitoring

---

# Performance

* FastAPI asynchronous APIs
* Optimized React rendering
* Responsive UI
* Modular architecture
* Mobile-first design
* Efficient API communication

---

# Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# License

This project is licensed under the MIT License.

---

# Developer

## 👨‍💻 Bhavendra Kumar Yarramalla

Full Stack Developer passionate about building scalable AI-powered healthcare applications.

### Skills

* Next.js
* React
* React Native
* FastAPI
* Python
* TypeScript
* Tailwind CSS
* AI Integration
* REST APIs
* Modern UI/UX

---

# Acknowledgements

Special thanks to the open-source community and AI technologies that made this project possible.

---

# Support

If you found this project helpful:

⭐ Star this repository

🍴 Fork this repository

🐛 Report issues

💡 Suggest improvements

---

<div align="center">

## ❤️ Built with AI to Make Healthcare Smarter, Faster, and More Accessible.

**Made with ❤️ by Bhavendra Kumar Yarramalla**

</div>
