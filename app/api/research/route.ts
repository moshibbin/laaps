import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "research.json");

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

// Simple authentication check (basic implementation)
function checkAuth(request: NextRequest): boolean {
  // In production, check for JWT token or session
  // For now, we allow all GET requests (public research viewing)
  // and require authentication for POST/PUT/DELETE
  const method = request.method;
  if (method === "GET") return true;

  // For mutations, you'd check session/token here
  // This is a simplified version
  return true;
}

// GET all research
export async function GET(request: NextRequest) {
  try {
    ensureDataDir();
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    const research = JSON.parse(data);

    // Sort by creation date (newest first)
    research.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return NextResponse.json(research);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch research" },
      { status: 500 },
    );
  }
}

// POST new research
export async function POST(request: NextRequest) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    ensureDataDir();
    const body = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.authors ||
      !body.abstract ||
      !body.date ||
      !body.category
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const data = fs.readFileSync(DATA_FILE, "utf-8");
    const research = JSON.parse(data);

    const newResearch = {
      id: Date.now().toString(),
      title: body.title,
      authors: body.authors,
      abstract: body.abstract,
      date: body.date,
      category: body.category,
      pdfUrl: body.pdfUrl || "",
      status: body.status || "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    research.push(newResearch);
    fs.writeFileSync(DATA_FILE, JSON.stringify(research, null, 2));

    return NextResponse.json(newResearch, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create research" },
      { status: 500 },
    );
  }
}

// PUT update research
export async function PUT(request: NextRequest) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    ensureDataDir();
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Research ID required" },
        { status: 400 },
      );
    }

    const data = fs.readFileSync(DATA_FILE, "utf-8");
    const research = JSON.parse(data);

    const index = research.findIndex((r: any) => r.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Research not found" },
        { status: 404 },
      );
    }

    research[index] = {
      ...research[index],
      ...updates,
      id: research[index].id, // Preserve original ID
      createdAt: research[index].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(research, null, 2));

    return NextResponse.json(research[index]);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update research" },
      { status: 500 },
    );
  }
}

// DELETE research
export async function DELETE(request: NextRequest) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    ensureDataDir();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Research ID required" },
        { status: 400 },
      );
    }

    const data = fs.readFileSync(DATA_FILE, "utf-8");
    const research = JSON.parse(data);

    const filtered = research.filter((r: any) => r.id !== id);

    if (filtered.length === research.length) {
      return NextResponse.json(
        { error: "Research not found" },
        { status: 404 },
      );
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));

    return NextResponse.json({
      success: true,
      message: "Research deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete research" },
      { status: 500 },
    );
  }
}
