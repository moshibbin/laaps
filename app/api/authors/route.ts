import { NextRequest, NextResponse } from "next/server";
import {
  createAuthor,
  getAllAuthors,
  searchAuthors,
  checkAuthorEmailExists,
  Author,
} from "@/lib/firebase";

/**
 * GET /api/authors - Get all authors or search authors
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");

    let authors: Author[];

    if (search) {
      authors = await searchAuthors(search);
    } else {
      authors = await getAllAuthors();
    }

    return NextResponse.json({
      success: true,
      data: authors,
      count: authors.length,
    });
  } catch (error: any) {
    console.error("Error fetching authors:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch authors",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/authors - Create a new author
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, bio, expertise, profileImage, publications } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and email are required",
        },
        { status: 400 },
      );
    }

    // Check if email already exists
    const emailExists = await checkAuthorEmailExists(email);
    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          error: "An author with this email already exists",
        },
        { status: 409 },
      );
    }

    // Create author
    const authorData: Omit<Author, "id" | "createdAt" | "updatedAt"> = {
      name,
      email,
      bio: bio || "",
      expertise: expertise || [],
      profileImage: profileImage || "",
      publications: publications || 0,
    };

    const authorId = await createAuthor(authorData);

    return NextResponse.json(
      {
        success: true,
        message: "Author created successfully",
        data: {
          id: authorId,
          ...authorData,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating author:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create author",
      },
      { status: 500 },
    );
  }
}
