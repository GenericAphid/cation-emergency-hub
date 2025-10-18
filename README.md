# 🛡️ Cation Emergency Hub

A comprehensive emergency safety and security application built with React, TypeScript, and Capacitor.

## 🌟 Features

- **🚨 Emergency Panic Button** - Instant emergency alert with location
- **🎤 Voice Emergency Commands** - Hands-free emergency activation
- **📍 Real-time Location Tracking** - GPS with breadcrumb trail
- **📞 Emergency Contacts** - Quick access to emergency services
- **🏥 Medical Information** - Store critical medical data
- **🏢 Security Companies** - Local security service contacts
- **🗺️ Crime Hotspot Mapping** - Area safety information
- **🌙 Dark/Light Theme** - Comfortable viewing in any condition
- **🔐 Demo Authentication** - Secure app access
- **📱 Mobile Optimized** - Safe area support for Android

## 🚀 Live Demo

Visit the live application: [https://your-username.github.io/cation-emergency-hub](https://your-username.github.io/cation-emergency-hub)

## 📱 Mobile App

### Android APK
- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Installation
1. Download the APK to your Android device
2. Enable "Install from Unknown Sources" in Settings
3. Tap the APK file to install
4. Open "Cation Emergency Hub"

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Android Studio (for mobile builds)

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/cation-emergency-hub.git
cd cation-emergency-hub

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build Android APK
cd android
./gradlew assembleDebug
```

### Project Structure
```
├── components/          # React components
├── hooks/              # Custom React hooks
├── pages/              # App screens
├── types/              # TypeScript definitions
├── lib/                # Utility functions
├── public/             # Static assets
├── android/            # Android native project
└── dist/               # Built web assets
```

## 🎨 Design Features

- **Glassmorphic UI** - Modern, translucent design
- **Beige Theme** - Soft, comfortable color scheme
- **Responsive Layout** - Works on all screen sizes
- **Safe Area Support** - Android navigation bar compatibility
- **Smooth Animations** - Polished user experience

## 🔧 Technologies

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: Jotai, React Query
- **Mobile**: Capacitor
- **Build Tools**: Vite, Gradle
- **Deployment**: GitHub Pages, GitHub Actions

## 📋 Demo Credentials

- **Username**: demo
- **Password**: demo123

## 🚨 Emergency Features

### Panic Button
- Hold to activate emergency alert
- Automatically sends location to emergency services
- Visual and audio feedback

### Voice Commands
- "Call police" - Direct police contact
- "Call ambulance" - Medical emergency
- "Call fire" - Fire department
- "Emergency" - General emergency services

### Location Services
- Real-time GPS tracking
- Breadcrumb trail for safety
- Automatic location sharing during emergencies

## 🏢 Security Integration

- Local security company contacts
- Crime hotspot mapping
- Emergency response coordination
- Medical information storage

## 📱 Mobile Features

- **Safe Area Support** - No overlap with Android navigation
- **Custom App Icon** - Professional branding
- **Optimized Performance** - Fast loading and smooth operation
- **Offline Capability** - Core features work without internet

## 🔄 Updates

To update the app:
```bash
# Update web app
npm run build
npx cap sync android

# Rebuild APK
cd android
./gradlew assembleDebug
```

## 📄 License

Built by **Maagric Tech and Teeza Robotics**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support or questions, please contact the development team.

---

**Your Safety, Our Priority** 🛡️