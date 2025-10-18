# 📱 Building Cation Emergency Hub APK

This guide will help you build an APK for your Android Emergency Hub app.

## 🔧 Prerequisites

Before building the APK, make sure you have:

1. **Java Development Kit (JDK) 17 or higher**
   - Download from: https://adoptium.net/
   - Verify installation: `java -version`

2. **Android Studio**
   - Download from: https://developer.android.com/studio
   - During installation, make sure to install:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

3. **Environment Variables**
   - Set `JAVA_HOME` to your JDK installation path
   - Set `ANDROID_HOME` to your Android SDK path (usually `C:\Users\[YourUsername]\AppData\Local\Android\Sdk`)
   - Add to PATH: `%ANDROID_HOME%\platform-tools` and `%ANDROID_HOME%\tools`

## 🚀 Quick Build Steps

### Method 1: Using Android Studio (Recommended)

1. **Open the Android project in Android Studio:**
   ```bash
   npx cap open android
   ```

2. **Wait for Gradle sync to complete** (this may take a few minutes the first time)

3. **Build the APK:**
   - Go to: `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
   - Or press: `Ctrl+Alt+Shift+K`

4. **Locate your APK:**
   - Once built, click "locate" in the notification
   - Default location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Method 2: Using Command Line

1. **Navigate to the android directory:**
   ```bash
   cd android
   ```

2. **Build the APK:**
   ```bash
   # On Windows
   gradlew.bat assembleDebug
   
   # On Mac/Linux
   ./gradlew assembleDebug
   ```

3. **Find your APK at:**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

## 🔄 Update Workflow

Whenever you make changes to your web code:

1. **Build the web app:**
   ```bash
   npm run build
   ```

2. **Sync changes to Android:**
   ```bash
   npx cap sync android
   ```

3. **Rebuild the APK** using either method above

## 📦 Production/Release Build

For a production-ready APK (smaller, optimized):

1. **Generate a keystore (first time only):**
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing in Android Studio:**
   - Go to: `Build` > `Generate Signed Bundle / APK`
   - Select: `APK`
   - Choose your keystore file
   - Enter your passwords
   - Select `release` build variant

3. **Or use command line:**
   ```bash
   cd android
   gradlew.bat assembleRelease
   ```

## 🐛 Troubleshooting

### "SDK location not found"
- Make sure `ANDROID_HOME` is set correctly
- Or create `android/local.properties`:
  ```
  sdk.dir=C:\\Users\\[YourUsername]\\AppData\\Local\\Android\\Sdk
  ```

### "gradlew: command not found"
- Make sure you're in the `android` directory
- On Windows, use `gradlew.bat` instead of `./gradlew`

### Build fails with "OutOfMemoryError"
- Increase Gradle memory in `android/gradle.properties`:
  ```
  org.gradle.jvmargs=-Xmx4096m
  ```

### App crashes on startup
- Check if you ran `npm run build` before `npx cap sync`
- Make sure all dependencies are installed

## 📱 Testing on Device

### Via USB:
1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Run: `npx cap run android`

### Via APK:
1. Copy the APK to your device
2. Enable "Install from Unknown Sources"
3. Install the APK
4. Open the app

## 🎯 Quick Commands Reference

```bash
# Build web app
npm run build

# Sync to Android
npx cap sync android

# Open in Android Studio
npx cap open android

# Run on device/emulator
npx cap run android

# Build debug APK (from android folder)
cd android && gradlew.bat assembleDebug

# Build release APK (from android folder)
cd android && gradlew.bat assembleRelease
```

## 📝 App Details

- **App Name:** Cation Emergency Hub
- **Package ID:** com.maagric.cation
- **Minimum Android Version:** 5.1 (API 22)
- **Target Android Version:** Latest

## 🔗 Useful Links

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Studio Download](https://developer.android.com/studio)
- [JDK Download](https://adoptium.net/)

---

**Built by Maagric Tech and Teeza Robotics** 🚀

