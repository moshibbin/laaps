# Case Studies Integration Guide

This guide will help you integrate the Case Studies CRUD system into the admin dashboard.

## Step 1: Import the CaseStudyModal Component

At the top of `app/admin/dashboard/page.tsx`, add this import after the TiptapEditor import:

```typescript
import TiptapEditor from "../../components/TiptapEditor";
import CaseStudyModal from "../../components/CaseStudyModal";
```

## Step 2: Update the ActiveTab Type

Find the line that declares `activeTab` state (around line 85-87) and update it to:

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

## Step 3: Add Case Study State Variables

After the `newsFormData` state declaration (around line 151), add:

```typescript
// Case Studies State
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

## Step 4: Update useEffect for Tab Switching

Find the useEffect that handles `activeTab` changes (around line 162-170) and update it to:

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

## Step 5: Add Case Study CRUD Functions

After the `resetNewsForm()` function (around line 608), add these functions:

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

## Step 6: Add Sidebar Navigation Item

Find the sidebar navigation section (around line 1441-1450) and add this nav item after the News item:

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

## Step 7: Add Case Studies Table Section

After the News Management section (around line 2073), add:

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
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
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

## Step 8: Add the CaseStudyModal Component

At the very end of the component, after all other modals (after the Publication Modal closing tag around line 2998), add:

```jsx
{
  /* Case Study Add/Edit Modal */
}
<CaseStudyModal
  show={showCaseStudyModal}
  onClose={() => setShowCaseStudyModal(false)}
  onSubmit={handleCaseStudySubmit}
  formData={caseStudyFormData}
  setFormData={setCaseStudyFormData}
  editingId={editingCaseStudyId}
  imageUploading={imageUploading}
  onImageUpload={handleImageUpload}
/>;
```

## Testing

After completing all steps:

1. Navigate to Admin Dashboard
2. Click on "Impact & Case Studies" in the sidebar
3. Click "New Case Study" button
4. Fill in case study details with rich text editor
5. Upload an image
6. Add impact metrics and testimonials
7. Save and verify it appears in the table
8. Test Edit and Delete functionality

## Summary of Changes

- ✅ Created Firebase functions for case studies CRUD
- ✅ Created API routes `/api/case-studies` and `/api/case-studies/[id]`
- ✅ Added CaseStudy interface to dashboard
- ✅ Added case study state management
- ✅ Created CaseStudyModal component with rich text editor
- ✅ Added sidebar navigation
- ✅ Added case studies table
- ✅ Integrated image upload reusing existing handler

## Next Features (Optional)

- Add sector-based filtering in the UI
- Add search functionality to the case studies table
- Create a public-facing case studies page
- Add export to PDF functionality
- Add related case studies linking
