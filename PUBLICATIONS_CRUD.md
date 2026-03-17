# Publications CRUD Operations

Complete CRUD (Create, Read, Update, Delete) operations for Publications management, integrated into the admin dashboard.

## Features

### Publications Management

- ✅ View all publications in a table
- ✅ Create new publications with comprehensive metadata
- ✅ Edit existing publications
- ✅ Delete publications
- ✅ Search functionality
- ✅ PDF upload via Cloudinary
- ✅ Support for various publication types

### Publication Fields

- **Title** (required)
- **Abstract**
- **Authors** (comma-separated list)
- **Publication Date**
- **Publication Type** (Journal Article, Conference Paper, Book Chapter, Book, Report, Thesis, Other)
- **Journal/Venue**
- **Volume, Issue, Pages**
- **DOI**
- **URL**
- **PDF File** (upload to Cloudinary)
- **Keywords** (comma-separated)
- **Cover Image URL**
- **Citations Count**
- **Status** (Published, In Press, Submitted, Under Review, Draft)

## Setup Instructions

### 1. Install Cloudinary Package

```bash
npm install cloudinary
```

### 2. Configure Environment Variables

Add the following to your [`.env.local`](.env.local:1) file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Get these credentials from your [Cloudinary Dashboard](https://cloudinary.com/console).

### 3. Firestore Collection

The publications are stored in a Firestore collection named `publications`. The collection will be created automatically when you add your first publication.

## File Structure

### Firebase Functions

- [`lib/firebase/publications.ts`](lib/firebase/publications.ts:1) - Publication CRUD funct ions
- [`lib/firebase/index.ts`](lib/firebase/index.ts:1) - Exports all Firebase functions

### API Routes

- [`app/api/publications/route.ts`](app/api/publications/route.ts:1) - GET all publications, POST new publication
- [`app/api/publications/[id]/route.ts`](app/api/publications/[id]/route.ts:1) - GET/PUT/DELETE individual publication
- [`app/api/upload/route.ts`](app/api/upload/route.ts:1) - Upload PDFs to Cloudinary

### Admin Dashboard

- [`app/admin/dashboard/page.tsx`](app/admin/dashboard/page.tsx:1) - Admin dashboard with Publications tab

## Usage

### Accessing Publications Management

1. Navigate to `/admin/dashboard`
2. Click on the "Publications" tab in the sidebar
3. Use the "+ New Publication" button to create publications
4. Click "Edit" or "Delete" buttons on each publication row

### Adding a Publication

1. Click "+ New Publication" button
2. Fill in the publication details:
   - **Title** is required
   - Upload a PDF file (max 10MB) - it will be uploaded to Cloudinary
   - Add authors as comma-separated names
   - Select publication type and status
   - Add optional metadata (DOI, URL, journal details)
3. Click "Create" to save

### Uploading PDFs

- The PDF upload field accepts `.pdf` files only
- Maximum file size: 10MB
- Files are uploaded to Cloudinary in the `publications` folder
- Upload happens automatically when you select a file
- A link to view the uploaded PDF appears once upload is complete

### Editing a Publication

1. Click the "Edit" icon on any publication
2. Modify the fields as needed
3. Upload a new PDF to replace the existing one (optional)
4. Click "Update" to save changes

### Deleting a Publication

1. Click the "Delete" icon on any publication
2. Confirm the deletion
3. The publication will be permanently removed from Firestore

## API Endpoints

### GET /api/publications

Get all publications

**Query Parameters:**

- `search` (optional) - Search by title, abstract, keywords, or authors

**Response:**

```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

### POST /api/publications

Create a new publication

**Body:**

```json
{
  "title": "Publication Title",
  "abstract": "Publication abstract",
  "authors": ["Author 1", "Author 2"],
  "publicationDate": "2024-01-01",
  "type": "Journal Article",
  "journal": "Journal Name",
  "pdfUrl": "https://cloudinary-url",
  "status": "Published"
}
```

### GET /api/publications/[id]

Get a single publication by ID

### PUT /api/publications/[id]

Update a publication

### DELETE /api/publications/[id]

Delete a publication

### POST /api/upload

Upload a file to Cloudinary

**Form Data:**

- `file` - The file to upload (PDF)

**Response:**

```json
{
  "success": true,
  "url": "https://cloudinary-secure-url",
  "publicId": "publications/file-id"
}
```

## TypeScript Interface

```typescript
interface Publication {
  id?: string;
  title: string;
  abstract?: string;
  authors?: string[];
  publicationDate?: string;
  type?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  keywords?: string[];
  pdfUrl?: string;
  coverImageUrl?: string;
  citations?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## Troubleshooting

### Cloudinary Upload Fails

- Verify your environment variables are set correctly
- Check that the `cloudinary` package is installed
- Ensure your Cloudinary credentials have upload permissions
- Check file size is under 10MB
- Verify file format is PDF

### Publications Not Loading

- Check Firestore rules allow read/write access
- Verify Firebase configuration in [`.env.local`](.env.local:1)
- Check browser console for errors

## Security Notes

- All API routes should be protected with authentication
- Firestore security rules should be configured appropriately
- Cloudinary credentials should never be exposed to the client
- PDF uploads are validated for type and size
- Consider adding rate limiting for uploads

## Future Enhancements

- ✨ Bulk import/export publications
- ✨ Link publications to authors from Authors collection
- ✨ Full-text search in PDFs
- ✨ Citation management integration
- ✨ BibTeX export
- ✨ Publication analytics and metrics
