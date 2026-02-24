# YouTube Integration Setup Guide

## 🎬 Get Your YouTube Channel ID

1. **Go to your YouTube channel page**
2. **Copy the URL** - it will look like one of these:
   - `https://youtube.com/@yourchannelname` 
   - `https://youtube.com/channel/UC1234567890abcdef`
   - `https://youtube.com/c/yourchannelname`

3. **Find your Channel ID:**
   - If your URL has `/channel/UC...` - that's your Channel ID
   - If not, go to: https://commentpicker.com/youtube-channel-id.php
   - Paste your channel URL and it will show your Channel ID

## 🔑 Get YouTube API Key

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or select existing one)
3. **Enable YouTube Data API v3**:
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. **Create API Key**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API Key
5. **Restrict the API Key** (recommended):
   - Click on your API key to edit
   - Under "API restrictions" → "Restrict key"
   - Select "YouTube Data API v3"
   - Save

## 🔧 Add to Your Website

1. **Update the `.env` file** in your website folder:
   ```
   VITE_YOUTUBE_API_KEY=your_actual_api_key_here
   VITE_YOUTUBE_CHANNEL_ID=your_actual_channel_id_here
   ```

2. **Deploy the update**:
   ```bash
   npm run build
   npx vercel --prod
   ```

3. **Add environment variables to Vercel**:
   - Go to: https://vercel.com/thekemp11-2432s-projects/lukekempvideo-website/settings/environment-variables
   - Add both variables there too

## ✅ What You Get

- **Automatic Updates**: New videos appear on your website when you upload to YouTube
- **Professional Display**: Clean grid showing your latest 6 projects
- **Video Details**: Thumbnails, titles, descriptions, view counts, duration
- **Direct Links**: Visitors can watch on YouTube with one click

## 🎯 Result

Your website will have a "Latest Projects" section that automatically shows your newest YouTube videos, keeping your portfolio fresh and current!