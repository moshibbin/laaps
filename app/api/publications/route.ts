import { NextRequest, NextResponse } from "next/server";
import {
  createPublication,
  getAllPublications,
  searchPublications,
  checkPublicationTitleExists,
  Publication,
} from "@/lib/firebase/publications";

/**
 * GET /api/publications - Get all publications or search publications
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");

    let publications: Publication[];

    if (search) {
      publications = await searchPublications(search);
    } else {
      publications = await getAllPublications();
    }

    return NextResponse.json({
      success: true,
      data: publications,
      count: publications.length,
    });
  } catch (error: any) {
    console.error("Error fetching publications:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch publications",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/publications - Create a new publication
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      abstract,
      authors,
      publicationDate,
      type,
      journal,
      volume,
      issue,
      pages,
      doi,
      url,
      keywords,
      pdfUrl,
      coverImageUrl,
      citations,
      status,
    } = body;

    // Validation
    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error: "Title is required",
        },
        { status: 400 },
      );
    }

    // Check if title already exists
    const titleExists = await checkPublicationTitleExists(title);
    if (titleExists) {
      return NextResponse.json(
        {
          success: false,
          error: "A publication with this title already exists",
        },
        { status: 409 },
      );
    }

    // Create publication
    const publicationData: Omit<Publication, "id" | "createdAt" | "updatedAt"> =
      {
        title,
        abstract: abstract || "",
        authors: authors || [],
        publicationDate: publicationDate || "",
        type: type || "Journal Article",
        journal: journal || "",
        volume: volume || "",
        issue: issue || "",
        pages: pages || "",
        doi: doi || "",
        url: url || "",
        keywords: keywords || [],
        pdfUrl: pdfUrl || "",
        coverImageUrl: coverImageUrl || "",
        citations: citations || 0,
        status: status || "Published",
      };

    const publicationId = await createPublication(publicationData);

    return NextResponse.json(
      {
        success: true,
        message: "Publication created successfully",
        data: {
          id: publicationId,
          ...publicationData,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating publication:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create publication",
      },
      { status: 500 },
    );
  }
}
