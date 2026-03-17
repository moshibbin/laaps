# News CRUD Operations - Firebase Integration

Complete CRUD (Create, Read, Update, Delete) operations for News management, integrated into the admin dashboard.

## Features

### News Management

- ✅ View all news articles in a table
- ✅ Create new news articles
- ✅ Edit existing news articles
- ✅ Delete news articles
- ✅ Search functionality
- ✅ Filter by status (draft/published)
- ✅ Filter by category
- ✅ Featured news support
- ✅ View count tracking

### News Fields

- **Title** (required)
- **Content** (required - full article content)
- **Excerpt** (optional - brief summary)
- **Author** (optional)
- **Publish Date**
- **Category** (Research, Events, Announcements, Press Release, General)
- **Tags** (comma-separated keywords)
- **Image URL** (header/featured image)
- **Status** (Draft, Published)
- **Featured** (boolean - mark as featured article)
- **View Count** (auto-tracked)

## Setup Instructions

### 1. Firebase Collection

The news articles are stored in a Firestore collection named `news`. The collection will be created automatically when you add your first news article.

### 2. Collection Structure

```
Firestore
└── news (collection)
    └── {newsId} (document)
        ├── title: string
        ├── content: string
        ├── excerpt: string
        ├── author: string
        ├── publishDate: string (ISO 8601)
        ├── category: string
        ├── tags: string[]
        ├── imageUrl: string
        ├── status: "draft" | "published"
        ├── featured: boolean
        ├── viewCount: number
        ├── createdAt: string (ISO 8601)
        └── updatedAt: string (ISO 8601)
```

## File Structure

### Firebase Functions

- [`lib/firebase/news.ts`](lib/firebase/news.ts:1) - News CRUD functions
- [`lib/firebase/index.ts`](lib/firebase/index.ts:1) - Exports all Firebase functions

### API Routes

- [`app/api/news/route.ts`](app/api/news/route.ts:1) - GET all news, POST new news
- [`app/api/news/[id]/route.ts`](app/api/news/[id]/route.ts:1) - GET/PUT/DELETE individual news article

### Admin Dashboard

- [`app/admin/dashboard/page.tsx`](app/admin/dashboard/page.tsx:1) - Admin dashboard with News tab

## Usage

### Accessing News Management

1. Navigate to `/admin/dashboard`
2. Click on the "News" tab in the sidebar
3. Use the "+ New News Article" button to create news
4. Click "Edit" or "Delete" buttons on each news row

### Adding a News Article

1. Click "+ New News Article" button
2. Fill in the news details:
   - **Title** (required) - Main headline
   - **Content** (required) - Full article text
   - **Excerpt** - Brief summary for listings
   - **Author** - Author name
   - **Publish Date** - Publication date
   - **Category** - Select category
   - **Tags** - Comma-separated keywords
   - **Image URL** - Featured image URL
   - **Status** - Draft or Published
   - **Featured** - Check to mark as featured
3. Click "Create" to save

### Editing a News Article

1. Click the "Edit" icon on any news article
2. Modify the fields as needed
3. Click "Update" to save changes

### Deleting a News Article

1. Click the "Delete" icon on any news article
2. Confirm the deletion
3. The article will be permanently removed from Firestore

## API Endpoints

### GET /api/news

Get all news articles or filter by criteria

**Query Parameters:**

- `search` (optional) - Search by title, content, excerpt, or category
- `status` (optional) - Filter by status: "draft" or "published"
- `category` (optional) - Filter by category
- `featured` (optional) - Set to "true" to get featured articles only

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "news-id",
      "title": "Breaking Research News",
      "content": "Full article content...",
      "excerpt": "Brief summary",
      "author": "Dr. Jane Doe",
      "publishDate": "2026-03-14",
      "category": "Research",
      "tags": ["policy", "research", "somalia"],
      "imageUrl": "https://example.com/image.jpg",
      "status": "published",
      "featured": true,
      "viewCount": 150,
      "createdAt": "2026-03-14T10:00:00Z",
      "updatedAt": "2026-03-14T10:00:00Z"
    }
  ],
  "count": 1
}
```

### POST /api/news

Create a new news article

**Request Body:**

```json
{
  "title": "New Research Initiative Launched",
  "content": "Full article content goes here...",
  "excerpt": "Brief summary of the news",
  "author": "Dr. Ahmed Ali",
  "publishDate": "2026-03-14",
  "category": "Research",
  "tags": ["research", "initiative", "somalia"],
  "imageUrl": "https://example.com/news.jpg",
  "status": "published",
  "featured": false
}
```

**Response:**

```json
{
  "success": true,
  "message": "News article created successfully",
  "data": {
    "id": "new-news-id",
    "title": "New Research Initiative Launched",
    ...
  }
}
```

### GET /api/news/[id]

Get a single news article by ID

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "news-id",
    "title": "News Article Title",
    ...
  }
}
```

### PUT /api/news/[id]

Update a news article

**Request Body:** (all fields optional)

```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "published",
  "featured": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "News article updated successfully",
  "data": { ... }
}
```

### DELETE /api/news/[id]

Delete a news article

**Response:**

```json
{
  "success": true,
  "message": "News article deleted successfully"
}
```

## TypeScript Interface

```typescript
interface News {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  publishDate?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  status?: "draft" | "published";
  featured?: boolean;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
```

## Firebase Functions

Located in [`lib/firebase/news.ts`](lib/firebase/news.ts:1):

### `createNews(newsData)`

Creates a new news article in Firestore.

**Parameters:**

- `newsData`: News data (without id, createdAt, updatedAt)

**Returns:** News document ID

**Example:**

```typescript
import { createNews } from "@/lib/firebase";

const newsId = await createNews({
  title: "New Research Findings",
  content: "Full article content...",
  excerpt: "Brief summary",
  author: "Dr. Ahmed",
  category: "Research",
  status: "published",
});
```

### `getNews(newsId)`

Retrieves a single news article by ID.

**Parameters:**

- `newsId`: The news document ID

**Returns:** News object or null if not found

### `getAllNews()`

Retrieves all news articles, ordered by publish date (newest first).

**Returns:** Array of News objects

### `getNewsByStatus(status)`

Retrieves news articles filtered by status.

**Parameters:**

- `status`: "draft" or "published"

**Returns:** Array of News objects

### `getNewsByCategory(category)`

Retrieves news articles filtered by category.

**Parameters:**

- `category`: Category name

**Returns:** Array of News objects

### `searchNews(searchTerm)`

Searches news articles by title, content, excerpt, or category.

**Parameters:**

- `searchTerm`: Search string

**Returns:** Array of matching News objects

### `getFeaturedNews()`

Retrieves only featured and published news articles.

**Returns:** Array of News objects

### `updateNews(newsId, newsData)`

Updates an existing news article.

**Parameters:**

- `newsId`: The news document ID
- `newsData`: Partial news data to update

**Returns:** void

### `deleteNews(newsId)`

Deletes a news article from Firestore.

**Parameters:**

- `newsId`: The news document ID

**Returns:** void

### `incrementNewsViewCount(newsId)`

Increments the view count for a news article.

**Parameters:**

- `newsId`: The news document ID

**Returns:** void

## Usage Example

### Frontend: Using the News API

```typescript
// Fetch all news
const response = await fetch("/api/news");
const { data: newsArticles } = await response.json();

// Search news
const searchResponse = await fetch("/api/news?search=research");
const { data: results } = await searchResponse.json();

// Get featured news
const featuredResponse = await fetch("/api/news?featured=true");
const { data: featured } = await featuredResponse.json();

// Create news
const createResponse = await fetch("/api/news", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Breaking News",
    content: "Full article content...",
    status: "published",
    featured: true,
  }),
});

// Update news
const updateResponse = await fetch("/api/news/news-id", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Updated Title",
    status: "published",
  }),
});

// Delete news
const deleteResponse = await fetch("/api/news/news-id", {
  method: "DELETE",
});
```

### Backend: Direct Firebase Usage

```typescript
import {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
  searchNews,
  getFeaturedNews,
  incrementNewsViewCount,
} from "@/lib/firebase";

// Create news article
const newsId = await createNews({
  title: "New Development",
  content: "Article content...",
  category: "Announcements",
  status: "published",
});

// Get all news
const allNews = await getAllNews();

// Search news
const results = await searchNews("policy");

// Get featured news
const featured = await getFeaturedNews();

// Update news
await updateNews(newsId, { featured: true });

// Increment view count
await incrementNewsViewCount(newsId);

// Delete news
await deleteNews(newsId);
```

## Security Considerations

1. **Authentication**: Ensure only authenticated admin users can access these endpoints
2. **Authorization**: Implement role-based access control
3. **Validation**: Always validate input data on the server side
4. **Content Security**: Sanitize HTML content to prevent XSS attacks
5. **Firestore Rules**: Configure appropriate security rules

### Recommended Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /news/{newsId} {
      // Allow anyone to read published news
      allow read: if resource.data.status == 'published' ||
        (request.auth != null &&
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');

      // Only allow write for admin users
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Integration with Frontend

### Display News on Public Pages

```typescript
// Fetch published news for display
const response = await fetch("/api/news?status=published");
const { data: publishedNews } = await response.json();

// Display featured news
const featuredResponse = await fetch("/api/news?featured=true");
const { data: featuredNews } = await featuredResponse.json();

// Track views when article is read
await fetch(`/api/news/${newsId}/increment-views`, { method: "POST" });
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common error codes:

- `400`: Bad request (missing required fields)
- `404`: News article not found
- `500`: Internal server error

## Next Steps

1. **Frontend Integration**: Create public-facing news pages
2. **Rich Text Editor**: Integrate WYSIWYG editor for content
3. **Image Upload**: Add image upload functionality
4. **Categories Management**: Create dynamic category management
5. **Email Notifications**: Send notifications for new articles
6. **RSS Feed**: Generate RSS feed for news articles
7. **Social Sharing**: Add social media sharing buttons
8. **Comments System**: Implement news comments feature

## Related Documentation

- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Firebase configuration guide
- [ADMIN_PANEL_README.md](ADMIN_PANEL_README.md) - Admin panel overview
- [PUBLICATIONS_CRUD.md](PUBLICATIONS_CRUD.md) - Publications management
- [AUTHORS_CRUD.md](AUTHORS_CRUD.md) - Authors management
