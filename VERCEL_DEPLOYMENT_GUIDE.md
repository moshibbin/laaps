# Vercel Deployment Guide - Fix Firebase Authentication Error

## Problem

You're getting `Firebase: Error (auth/invalid-api-key)` because your environment variables are not set in Vercel.

## Solution: Add Environment Variables to Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to your Vercel project dashboard**
   - Visit https://vercel.com/dashboard
   - Select your project (laaps)

2. **Navigate to Settings**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the left sidebar

3. **Add each environment variable**

   Add the following variables one by one:

   | Variable Name                              | Value                                       |
   | ------------------------------------------ | ------------------------------------------- |
   | `NEXT_PUBLIC_FIREBASE_API_KEY`             | `AIzaSyDwXhPeUwKbEmD49AHwuJWvQQCRhiwxRWQ`   |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | `laaps-3f9b6.firebaseapp.com`               |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | `laaps-3f9b6`                               |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | `laaps-3f9b6.firebasestorage.app`           |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `662336776453`                              |
   | `NEXT_PUBLIC_FIREBASE_APP_ID`              | `1:662336776453:web:6f61067d3c501c0a98ef6c` |
   | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`      | `G-BG3C6CFMEQ`                              |
   | `CLOUDINARY_CLOUD_NAME`                    | `djaashv5e`                                 |
   | `CLOUDINARY_API_KEY`                       | `149514464127346`                           |
   | `CLOUDINARY_API_SECRET`                    | `D4fR2eh3gD4YwmQGAn5_SjztBNU`               |

4. **Important: Select environments**
   - For each variable, select all three checkboxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

5. **Save and Redeploy**
   - Click "Save" for each variable
   - After adding all variables, go to "Deployments" tab
   - Click the "..." menu on your latest deployment
   - Select "Redeploy"

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
# When prompted, paste: AIzaSyDwXhPeUwKbEmD49AHwuJWvQQCRhiwxRWQ

vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
# When prompted, paste: laaps-3f9b6.firebaseapp.com

vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production
# When prompted, paste: laaps-3f9b6

vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production
# When prompted, paste: laaps-3f9b6.firebasestorage.app

vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production
# When prompted, paste: 662336776453

vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production
# When prompted, paste: 1:662336776453:web:6f61067d3c501c0a98ef6c

vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production
# When prompted, paste: G-BG3C6CFMEQ

vercel env add CLOUDINARY_CLOUD_NAME production
# When prompted, paste: djaashv5e

vercel env add CLOUDINARY_API_KEY production
# When prompted, paste: 149514464127346

vercel env add CLOUDINARY_API_SECRET production
# When prompted, paste: D4fR2eh3gD4YwmQGAn5_SjztBNU

# Repeat for preview and development environments
# Just replace 'production' with 'preview' or 'development'

# Redeploy
vercel --prod
```

### Method 3: Bulk Import via Vercel CLI

Create a file named `.env.production` with all variables:

```bash
# Create .env.production file
cat > .env.production << EOF
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDwXhPeUwKbEmD49AHwuJWvQQCRhiwxRWQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=laaps-3f9b6.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=laaps-3f9b6
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=laaps-3f9b6.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=662336776453
NEXT_PUBLIC_FIREBASE_APP_ID=1:662336776453:web:6f61067d3c501c0a98ef6c
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BG3C6CFMEQ
CLOUDINARY_CLOUD_NAME=djaashv5e
CLOUDINARY_API_KEY=149514464127346
CLOUDINARY_API_SECRET=D4fR2eh3gD4YwmQGAn5_SjztBNU
EOF

# Pull and push environment variables
vercel env pull .env.vercel.local
vercel env add < .env.production
```

## Verification

After adding the environment variables:

1. **Check in Vercel Dashboard**
   - Go to Settings → Environment Variables
   - Verify all 10 variables are listed

2. **Redeploy**
   - Go to Deployments tab
   - Click "Redeploy" on your latest deployment
   - OR push a new commit to trigger auto-deployment

3. **Monitor Build Logs**
   - Watch the build logs in Vercel
   - The Firebase error should no longer appear
   - Build should complete successfully

## Troubleshooting

### If you still get the error:

1. **Double-check variable names** - They must match exactly:
   - Start with `NEXT_PUBLIC_` for client-side Firebase variables
   - No quotes around values in Vercel dashboard

2. **Verify all environments are selected**
   - Production ✅
   - Preview ✅
   - Development ✅

3. **Clear Vercel cache**
   - Settings → Advanced → Clear Cache
   - Redeploy

4. **Check Firebase Console**
   - Go to Firebase Console
   - Project Settings
   - Verify API key is still valid
   - Check if domain is authorized under Authentication → Settings → Authorized domains

## Important Security Notes

⚠️ **NEVER** commit `.env.local` or `.env.production` to Git!

✅ These files should be in your `.gitignore`:

```
.env.local
.env.production
.env*.local
```

✅ Only commit `.env.example` with placeholder values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... etc
```

## Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
