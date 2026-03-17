# Case Studies & Impact CRUD System

## Overview

Complete CRUD (Create, Read, Update, Delete) implementation for managing Case Studies and Impact Stories in the LAAPS admin dashboard.

## Files Created

1. **Firebase Functions**: `lib/firebase/case-studies.ts`
2. **API Routes**:
   - `app/api/case-studies/route.ts` (GET, POST)
   - `app/api/case-studies/[id]/route.ts` (GET, PUT, DELETE

## API Documentation

### Endpoints

#### GET `/api/case-studies`

Retrieve all case studies or filter by parameters.

**Query Parameters:**

- `search` - Search by title, content, client, or sector
- `status` - Filter by `draft` or `published`
- `sector` - Filter by sector
- `featured` - Set to `true` to get only featured case studies

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "title": "Impact Project Title",
      "content": "Detailed case study content...",
      "summary": "Brief summary",
      "client": "Client Name",
      "location": "Somalia",
      "sector": "Healthcare",
      "tags": ["health", "impact"],
      "imageUrl": "https://example.com/image.jpg",
      "impactMetrics": {
        "beneficiaries": 5000,
        "costSavings": "30%",
        "timeframe": "6 months",
        "successRate": "95%"
      },
      "challenges": "Main challenges faced...",
      "solutions": "Solutions implemented...",
      "outcomes": "Results achieved...",
      "testimonial": {
        "quote": "This project transformed our community",
        "author": "John Doe",
        "position": "Community Leader"
      },
      "status": "published",
      "featured": true,
      "publishDate": "2024-01-15",
      "viewCount": 150,
      "createdAt": "2024-01-10T10:00:00Z",
      "updatedAt": "2024-01-15T15:30:00Z"
    }
  ]
}
```

#### POST `/api/case-studies`

Create a new case study.

**Request Body:**

```json
{
  "title": "New Impact Story",
  "content": "Detailed content with rich text...",
  "summary": "Brief summary",
  "client": "Organization Name",
  "location": "Mogadishu, Somalia",
  "sector": "Education",
  "tags": ["education", "youth", "capacity-building"],
  "imageUrl": "https://cloudinary.com/image.jpg",
  "impactMetrics": {
    "beneficiaries": 1000,
    "costSavings": "25%",
    "timeframe": "12 months",
    "successRate": "90%"
  },
  "challenges": "Initial challenges...",
  "solutions": "Implemented solutions...",
  "outcomes": "Achieved outcomes...",
  "testimonial": {
    "quote": "Excellent results",
    "author": "Jane Smith",
    "position": "Director"
  },
  "status": "published",
  "featured": false,
  "publishDate": "2024-03-14"
}
```

**Response:**

```json
{
  "success": true,
  "id": "new123",
  "message": "Case study created successfully"
}
```

#### GET `/api/case-studies/[id]`

Get a single case study by ID.

**Parameters:**

- `id` - Case study ID

**Response:**

```json
{
  "success": true,
  "data": {
    /* case study object */
  }
}
```

#### PUT `/api/case-studies/[id]`

Update an existing case study.

**Parameters:**

- `id` - Case study ID

**Request Body:** (partial update supported)

```json
{
  "title": "Updated Title",
  "status": "published",
  "featured": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Case study updated successfully"
}
```

#### DELETE `/api/case-studies/[id]`

Delete a case study.

**Parameters:**

- `id` - Case study ID

**Response:**

```json
{
  "success": true,
  "message": "Case study deleted successfully"
}
```

## Dashboard Integration

### Phase 1: Add State Management

Add the following after the `news` state in `app/admin/dashboard/page.tsx`:

```typescript
const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
const [caseStudiesLoading, setCaseStudiesLoading] = useState(false);
const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);
const [editingCaseStudyId, setEditingCaseStudyId] = useState<string | null>(
  null,
);

const [caseStudyFormData, setCaseStudyFormData] = useState({
  title: "",
  content: "",
  summary: "",
  client: "",
  location: "",
  sector: "",
  tags: "",
  imageUrl: "",
  beneficiaries: 0,
  costSavings: "",
  timeframe: "",
  successRate: "",
  challenges: "",
  solutions: "",
  outcomes: "",
  testimonialQuote: "",
  testimonialAuthor: "",
  testimonialPosition: "",
  status: "draft" as "draft" | "published",
  featured: false,
  publishDate: "",
});
```

### Phase 2: Update Active Tab Type

Change the activeTab type to include "case-studies":

```typescript
const [activeTab, setActiveTab] = useState<
  | "dashboard"
  | "publications"
  | "authors"
  | "news"
  | "case-studies"
  | "analytics"
  | "settings"
>("dashboard");
```

### Phase 3: Add useEffect for fetching

```typescript
useEffect(() => {
  if (activeTab === "authors") {
    fetchAuthors();
  } else if (activeTab === "publications") {
    fetchPublications();
  } else if (activeTab === "news") {
    fetchNews();
  } else if (activeTab === "case-studies") {
    fetchCaseStudies();
  }
}, [activeTab]);
```

### Phase 4: Add CRUD Functions

```typescript
// Case Studies CRUD Functions
const fetchCaseStudies = async () => {
  try {
    setCaseStudiesLoading(true);
    const res = await fetch("/api/case-studies");
    const data = await res.json();
    if (data.success) {
      setCaseStudies(data.data);
    }
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
  } finally {
    setCaseStudiesLoading(false);
  }
};

const handleCaseStudySubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const payload = {
      title: caseStudyFormData.title,
      content: caseStudyFormData.content,
      summary: caseStudyFormData.summary,
      client: caseStudyFormData.client,
      location: caseStudyFormData.location,
      sector: caseStudyFormData.sector,
      tags: caseStudyFormData.tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      imageUrl: caseStudyFormData.imageUrl,
      impactMetrics: {
        beneficiaries: Number(caseStudyFormData.beneficiaries),
        costSavings: caseStudyFormData.costSavings,
        timeframe: caseStudyFormData.timeframe,
        successRate: caseStudyFormData.successRate,
      },
      challenges: caseStudyFormData.challenges,
      solutions: caseStudyFormData.solutions,
      outcomes: caseStudyFormData.outcomes,
      testimonial: {
        quote: caseStudyFormData.testimonialQuote,
        author: caseStudyFormData.testimonialAuthor,
        position: caseStudyFormData.testimonialPosition,
      },
      status: caseStudyFormData.status,
      featured: caseStudyFormData.featured,
      publishDate: caseStudyFormData.publishDate,
    };

    const url = editingCaseStudyId
      ? `/api/case-studies/${editingCaseStudyId}`
      : "/api/case-studies";
    const method = editingCaseStudyId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      resetCaseStudyForm();
      fetchCaseStudies();
      setShowCaseStudyModal(false);
    } else {
      alert(data.error || "Operation failed");
    }
  } catch (error) {
    console.error("Failed to save case study:", error);
    alert("Failed to save case study");
  }
};

const handleCaseStudyEdit = (caseStudy: CaseStudy) => {
  setCaseStudyFormData({
    title: caseStudy.title,
    content: caseStudy.content,
    summary: caseStudy.summary || "",
    client: caseStudy.client || "",
    location: caseStudy.location || "",
    sector: caseStudy.sector || "",
    tags: caseStudy.tags?.join(", ") || "",
    imageUrl: caseStudy.imageUrl || "",
    beneficiaries: caseStudy.impactMetrics?.beneficiaries || 0,
    costSavings: caseStudy.impactMetrics?.costSavings || "",
    timeframe: caseStudy.impactMetrics?.timeframe || "",
    successRate: caseStudy.impactMetrics?.successRate || "",
    challenges: caseStudy.challenges || "",
    solutions: caseStudy.solutions || "",
    outcomes: caseStudy.outcomes || "",
    testimonialQuote: caseStudy.testimonial?.quote || "",
    testimonialAuthor: caseStudy.testimonial?.author || "",
    testimonialPosition: caseStudy.testimonial?.position || "",
    status: caseStudy.status || "draft",
    featured: caseStudy.featured || false,
    publishDate: caseStudy.publishDate || "",
  });
  setEditingCaseStudyId(caseStudy.id || null);
  setShowCaseStudyModal(true);
};

const handleCaseStudyDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this case study?")) return;

  try {
    const response = await fetch(`/api/case-studies/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      fetchCaseStudies();
    } else {
      alert(data.error || "Failed to delete case study");
    }
  } catch (error) {
    console.error("Failed to delete case study:", error);
    alert("Failed to delete case study");
  }
};

const resetCaseStudyForm = () => {
  setCaseStudyFormData({
    title: "",
    content: "",
    summary: "",
    client: "",
    location: "",
    sector: "",
    tags: "",
    imageUrl: "",
    beneficiaries: 0,
    costSavings: "",
    timeframe: "",
    successRate: "",
    challenges: "",
    solutions: "",
    outcomes: "",
    testimonialQuote: "",
    testimonialAuthor: "",
    testimonialPosition: "",
    status: "draft",
    featured: false,
    publishDate: "",
  });
  setEditingCaseStudyId(null);
};
```

### Phase 5: Add Sidebar Navigation

Add after the News nav item:

```jsx
<div
  className={`nav-item ${activeTab === "case-studies" ? "active" : ""}`}
  onClick={() => {
    setActiveTab("case-studies");
    setShowMobileSidebar(false);
  }}
>
  <i className="fas fa-briefcase"></i>
  <span>Impact & Case Studies</span>
</div>
```

### Phase 6: Add Table Section

Add after the News Management section:

```jsx
{
  /* CASE STUDIES MANAGEMENT SECTION */
}
{
  activeTab === "case-studies" && (
    <div className="publications-section">
      <div className="section-title">
        <h2>
          <i className="fas fa-briefcase" style={{ color: "#1f5e9e" }}></i>{" "}
          Impact & Case Studies Management
        </h2>
        <button
          className="add-btn"
          onClick={() => {
            resetCaseStudyForm();
            setShowCaseStudyModal(true);
          }}
        >
          <i className="fas fa-plus"></i> New Case Study
        </button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Client</th>
              <th>Sector</th>
              <th>Impact</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseStudiesLoading ? (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  <i
                    className="fas fa-spinner fa-spin"
                    style={{ fontSize: "2rem" }}
                  ></i>
                  <p style={{ marginTop: "1rem" }}>Loading...</p>
                </td>
              </tr>
            ) : caseStudies.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  <i
                    className="fas fa-briefcase"
                    style={{ fontSize: "3rem", color: "#cbd5e1" }}
                  ></i>
                  <p style={{ marginTop: "1rem", color: "#64748b" }}>
                    No case studies yet
                  </p>
                </td>
              </tr>
            ) : (
              caseStudies.map((caseStudy) => (
                <tr key={caseStudy.id}>
                  <td>
                    <strong>{caseStudy.title}</strong>
                    {caseStudy.location && (
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#64748b",
                        }}
                      >
                        📍 {caseStudy.location}
                      </div>
                    )}
                  </td>
                  <td>{caseStudy.client || "-"}</td>
                  <td>
                    {caseStudy.sector ? (
                      <span className="pub-tag">{caseStudy.sector}</span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {caseStudy.impactMetrics?.beneficiaries
                      ? `${caseStudy.impactMetrics.beneficiaries.toLocaleString()} beneficiaries`
                      : "-"}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        caseStudy.status?.toLowerCase() !== "published"
                          ? "draft"
                          : ""
                      }`}
                    >
                      {caseStudy.status || "draft"}
                    </span>
                  </td>
                  <td className="action-icons" style={{ textAlign: "center" }}>
                    <i
                      className="fas fa-edit"
                      title="edit"
                      onClick={() => handleCaseStudyEdit(caseStudy)}
                    ></i>
                    <i
                      className="fas fa-trash-alt"
                      title="delete"
                      style={{ color: "#acb8ca" }}
                      onClick={() =>
                        caseStudy.id && handleCaseStudyDelete(caseStudy.id)
                      }
                    ></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.5rem",
          color: "#7f9bb9",
        }}
      >
        <span>
          <i className="fas fa-chevron-left"></i> 1-{caseStudies.length} of{" "}
          {caseStudies.length} case studies
        </span>
        <span>
          <i className="fas fa-sliders-h"></i> filter
        </span>
      </div>
    </div>
  );
}
```

### Phase 7: Add Modal Form

The modal form is quite extensive. Due to size limitations, I'll provide it in a separate section in the next update.

## Features

- Complete CRUD operations
- Rich text editor support for content
- Impact metrics tracking (beneficiaries, cost savings, timeframe, success rate)
- Testimonials section
- Challenges, Solutions, and Outcomes documentation
- Image upload support
- Featured case studies
- Sector-based filtering
- Status management (draft/published)
- Search functionality

## Sectors

Common sectors for case studies:

- Healthcare
- Education
- Governance
- Economic Development
- Women Empowerment
- Youth Development
- Agriculture
- Humanitarian Response
- Infrastructure
- Research & Policy

## Usage Example

```javascript
// Create a case study
const caseStudy = {
  title: "Transforming Healthcare in Rural Somalia",
  content: "<p>Detailed story...</p>",
  summary: "Brief overview",
  client: "Ministry of Health",
  location: "Baidoa, Somalia",
  sector: "Healthcare",
  impactMetrics: {
    beneficiaries: 10000,
    costSavings: "40%",
    timeframe: "18 months",
    successRate: "92%",
  },
  status: "published",
  featured: true,
};

await fetch("/api/case-studies", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(caseStudy),
});
```

## Next Steps

1. Install Tiptap if not already done (for rich text editing)
2. Add state management code to dashboard
3. Add sidebar navigation item
4. Add table section
5. Add modal form
6. Test all CRUD operations

For the complete modal form code, see the next section of this documentation.
