# ⚡ Quick Start Guide - Cation Emergency Hub

## 🎯 Build APK in 3 Steps

### Step 1: Install Android Studio
Download and install: https://developer.android.com/studio

### Step 2: Open Project
```bash
npx cap open android
```

### Step 3: Build APK
In Android Studio: `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`

**Done!** Your APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔄 Update App After Code Changes

```bash
npm run build
npx cap sync android
```

Then rebuild in Android Studio.

---

## 📱 Install on Your Phone

1. Copy `app-debug.apk` to your Android device
2. Go to Settings > Security > Enable "Unknown Sources"
3. Tap the APK file to install
4. Open "Cation Emergency Hub" app

---

## 🆘 Need Help?

- **Detailed build guide:** See `BUILD_APK.md`
- **Full documentation:** See `README_APK.md`

---

**Built by Maagric Tech and Teeza Robotics** 🚀

