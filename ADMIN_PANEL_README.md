# LAAPS Institute - Professional Admin Panel Documentation

## Research Management System

A modern, professional admin panel for managing research publications at LAAPS Institute. Built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

### 🔐 Secure Authentication

- Professional login page with modern UI/UX
- Session management with localStorage
- Password visibility toggle
- Loading states and error handling
- Protected routes via middleware

### 📊 Admin Dashboard

- **Modern Sidebar Navigation**
  - Collapsible sidebar design
  - Icon-based navigation
  - Active state indicators
  - Quick access to all features

- **Dashboard View**
  - 4 Beautiful stat cards with gradients
  - Real-time statistics (Total, Published, Drafts, This Month)
  - Recent research activity feed
  - Quick edit access

- **Research Management View**
  - Professional data table layout
  - Sort and filter capabilities
  - Status badges (Published/Draft)
  - Quick actions (Edit/Delete)
  - Empty state with call-to-action

- **Add/Edit Research Form**
  - Clean, modern form design
  - Real-time validation
  - Rich category selection
  - Draft/Publish toggle
  - Cancel and save actions

### 🎨 Design Features

- **Gradient backgrounds** with animated elements
- **Smooth transitions** and hover effects
- **Responsive design** for all screen sizes
- **Professional color scheme** matching LAAPS branding
- **Font Awesome icons** throughout
- **Loading states** and animations
- **Error handling** with friendly messages

### 📝 Research Fields

Each research entry includes:

- **Title**: Research paper title
- **Authors**: Researcher names (comma-separated)
- **Date**: Publication/completion date
- **Category**: Research classification
  - Applied Research
  - Policy Analysis
  - Evaluation
  - Development
  - Humanitarian
  - Governance
- **Abstract**: Detailed description
- **PDF URL**: Optional download link
- **Status**: Draft or Published

### 🌐 Public Research Page

- Beautiful card-based layout
- Search functionality (title, author, keywords)
- Category filtering
- Responsive grid design
- Direct PDF downloads
- Only shows published research

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:

```bash
npm install
```

2. **Run development server**:

```bash
npm run dev
```

3. **Access the application**:

- Main site: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`
- Admin login: `http://localhost:3000/admin/login`
- Research page: `http://localhost:3000/research`

## 📖 User Guide

### Logging In

1. Navigate to `/admin` or `/admin/login`
2. Enter credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Click "Sign In"

### Dashboard Overview

The dashboard provides:

- **Statistics cards**: Total research count, published count, drafts, and monthly additions
- **Recent activity**: Quick view of latest research entries
- **Navigation**: Easy access to all features

### Managing Research

#### Adding New Research

1. Click "Add New" in the sidebar or "Add New Research" button
2. Fill in all required fields:
   - Title (required)
   - Authors (required)
   - Publication Date (required)
   - Category (required)
   - Abstract (required)
   - PDF URL (optional)
   - Status: Draft or Published
3. Click "Add Research"

#### Editing Research

1. Navigate to "All Research" view or click "Edit" from dashboard
2. Click the edit button (pencil icon)
3. Modify the fields
4. Click "Update Research"

#### Publishing/Unpublishing

- Set status to "Published" to make research visible on public page
- Set status to "Draft" to hide from public view

#### Deleting Research

1. Find the research in the table
2. Click the delete button (trash icon)
3. Confirm deletion

### Viewing Public Page

- Click "View Public Page" in the sidebar
- Opens in a new tab
- Shows all published research
- Users can search and filter

## 🗂️ File Structure

```
app/
├── admin/
│   ├── page.tsx                 # Admin redirect page
│   ├── login/
│   │   └── page.tsx            # Professional login page
│   └── dashboard/
│       └── page.tsx             # Main dashboard with sidebar navigation
├── research/
│   └── page.tsx                 # Public research display page
└── api/
    └── research/
        └── route.ts             # RESTful API endpoints

data/
└── research.json                # JSON database

middleware.ts                     # Route protection
ADMIN_PANEL_README.md            # This file
```

## 🔌 API Endpoints

### GET `/api/research`

Fetch all research entries (sorted by newest first)

**Response**:

```json
[
  {
    "id": "1234567890",
    "title": "Research Title",
    "authors": "Author Names",
    "abstract": "Research abstract...",
    "date": "2024-03-10",
    "category": "Applied Research",
    "pdfUrl": "https://example.com/paper.pdf",
    "status": "published",
    "createdAt": "2024-03-10T10:00:00.000Z",
    "updatedAt": "2024-03-10T10:00:00.000Z"
  }
]
```

### POST `/api/research`

Create new research entry

**Request Body**:

```json
{
  "title": "Research Title",
  "authors": "Author Names",
  "abstract": "Research abstract",
  "date": "2024-03-10",
  "category": "Applied Research",
  "pdfUrl": "https://example.com/paper.pdf",
  "status": "published"
}
```

### PUT `/api/research`

Update existing research

**Request Body**:

```json
{
  "id": "1234567890",
  "title": "Updated Title",
  ...
}
```

### DELETE `/api/research?id={id}`

Delete research entry

## 🎨 Customization

### Changing Admin Credentials

Edit [`app/admin/login/page.tsx`](app/admin/login/page.tsx:20):

```typescript
if (username === "your_username" && password === "your_secure_password") {
  // ...
}
```

### Adding Categories

Edit [`app/admin/dashboard/page.tsx`](app/admin/dashboard/page.tsx:463):

```tsx
<option value="New Category">New Category</option>
```

### Modifying Colors

The admin panel uses Tailwind CSS with LAAPS branding:

- Primary Dark: `#1a472a`
- Primary Medium: `#2d5a3d`
- Accent colors: Blue, Green, Orange, Purple gradients

Update colors in the component files or add to [`globals.css`](app/globals.css:1).

## 🔒 Security Considerations

### Current Implementation

- ⚠️ Basic localStorage authentication
- ⚠️ Client-side route protection
- ⚠️ Simple username/password check
- ⚠️ No server-side session management

### Production Recommendations

1. **Implement proper authentication**:
   - JWT tokens
   - Session-based auth
   - OAuth 2.0
   - NextAuth.js

2. **Add server-side protection**:
   - API route authentication
   - Session management
   - CSRF protection

3. **Security enhancements**:
   - Use environment variables for credentials
   - Implement HTTPS
   - Add rate limiting
   - Input sanitization
   - SQL injection protection (if using a database)

4. **Database migration**:
   - Replace JSON file with proper database
   - PostgreSQL, MongoDB, or MySQL
   - Use Prisma or another ORM

## 🎯 Best Practices

### For Administrators

- Always use strong passwords
- Regularly backup the data directory
- Review published research before making it public
- Keep drafts for work in progress

### For Developers

- Test all forms before deployment
- Validate all inputs server-side
- Handle errors gracefully
- Keep dependencies updated
- Follow TypeScript best practices

## 📱 Responsive Design

The admin panel is fully responsive:

- **Desktop**: Full sidebar with labels
- **Tablet**: Collapsible sidebar
- **Mobile**: Icon-only navigation

## 🐛 Troubleshooting

### Can't log in

- Clear browser cache and localStorage
- Check console for errors
- Verify credentials: `admin` / `admin123`

### Research not appearing

- Check status is set to "Published"
- Verify data/research.json file exists
- Check browser console for API errors

### Sidebar not working

- Ensure JavaScript is enabled
- Clear browser cache
- Check for console errors

## 📞 Support

For issues, questions, or feature requests:

- Contact: LAAPS Institute Development Team
- Email: [your-email@laaps.org]

## 📄 License

© 2026 LAAPS Institute. All rights reserved.

---

**Version**: 2.0.0 (Professional Edition)  
**Last Updated**: March 2026  
**Built with**: Next.js 14, TypeScript, Tailwind CSS  
**Design**: Modern Professional Admin Panel
