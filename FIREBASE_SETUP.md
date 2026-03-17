# Firebase Setup Guide

This guide will help you set up Firebase for the LAAPS Institute project.

## Installation

First, install the Firebase SDK:

```bash
npm install firebase
```

## Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Click on the Web icon (</>) to add a web app
4. Register your app and copy the configuration values

## Environment Configuration

1. Open the `.env.local` file in the root directory
2. Replace the placeholder values with your actual Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Enable Firebase Services

In the Firebase Console, enable the following services:

### 1. Authentication

- Go to **Build > Authentication**
- Click **Get Started**
- Enable **Email/Password** sign-in method
- (Optional) Enable other providers as needed

### 2. Firestore Database

- Go to **Build > Firestore Database**
- Click **Create Database**
- Start in **Production mode** or **Test mode** (for development)
- Choose your database location

### 3. Storage

- Go to **Build > Storage**
- Click **Get Started**
- Set up security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow authenticated users to upload/read files
      allow read, write: if request.auth != null;
    }
  }
}
```

## Usage Examples

### Authentication

```typescript
import { loginWithEmail, registerWithEmail, logout } from "@/lib/firebase";

// Sign in
const userCredential = await loginWithEmail("user@example.com", "password123");

// Register
const newUser = await registerWithEmail(
  "user@example.com",
  "password123",
  "Display Name",
);

// Sign out
await logout();
```

### Firestore Database

```typescript
import {
  addDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
} from "@/lib/firebase";

// Add a document
const docId = await addDocument("research", {
  title: "Research Title",
  description: "Research description",
  author: "Author Name",
});

// Get all documents
const documents = await getDocuments("research");

// Get documents with query
const filteredDocs = await getDocuments(
  "research",
  where("author", "==", "Author Name"),
  orderBy("createdAt", "desc"),
  limit(10),
);

// Update a document
await updateDocument("research", docId, {
  title: "Updated Title",
});

// Delete a document
await deleteDocument("research", docId);
```

### Storage

```typescript
import { uploadFile, getFileURL, deleteFile } from "@/lib/firebase";

// Upload a file with progress tracking
const handleFileUpload = async (file: File) => {
  const url = await uploadFile(`research/${file.name}`, file, (progress) => {
    console.log(`Upload progress: ${progress}%`);
  });
  console.log("File URL:", url);
};

// Get file URL
const fileUrl = await getFileURL("research/document.pdf");

// Delete file
await deleteFile("research/document.pdf");
```

## Security Rules

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read all documents
    match /{document=**} {
      allow read: if request.auth != null;
    }

    // Only allow authenticated users to write their own data
    match /users/{userId} {
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Admin-only write access for research and other collections
    match /research/{docId} {
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Integration with Admin Panel

The Firebase setup is now ready to be integrated with your admin panel:

1. **Admin Login**: Use [`loginWithEmail()`](lib/firebase/auth.ts) in [`app/admin/login/page.tsx`](app/admin/login/page.tsx)
2. **Research Management**: Use Firestore functions in [`app/api/research/route.ts`](app/api/research/route.ts)
3. **File Uploads**: Use storage functions for uploading research documents and images

## Next Steps

1. Install Firebase: `npm install firebase`
2. Configure your Firebase project in the console
3. Update `.env.local` with your credentials
4. Enable Authentication, Firestore, and Storage in Firebase Console
5. Set up appropriate security rules
6. Test the integration with your admin panel

## Troubleshooting

- **Module not found errors**: Make sure to run `npm install firebase` first
- **Auth errors**: Check that Email/Password authentication is enabled in Firebase Console
- **Permission denied**: Review your Firestore and Storage security rules
- **Environment variables not loading**: Restart your development server after updating `.env.local`

## Documentation

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Cloud Storage](https://firebase.google.com/docs/storage)
