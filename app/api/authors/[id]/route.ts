import { NextRequest, NextResponse } from "next/server";
import {
  getAuthor,
  updateAuthor,
  deleteAuthor,
  checkAuthorEmailExists,
  Author,
} from "@/lib/firebase";

/**
 * GET /api/authors/[id] - Get a single author by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const author = await getAuthor(id);

    if (!author) {
      return NextResponse.json(
        {
          success: false,
          error: "Author not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: author,
    });
  } catch (error: any) {
    console.error("Error fetching author:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch author",
      },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/authors/[id] - Update an author
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, email, bio, expertise, profileImage, publications } = body;

    // Check if author exists
    const existingAuthor = await getAuthor(id);
    if (!existingAuthor) {
      return NextResponse.json(
        {
          success: false,
          error: "Author not found",
        },
        { status: 404 },
      );
    }

    // If email is being changed, check if new email already exists
    if (email && email !== existingAuthor.email) {
      const emailExists = await checkAuthorEmailExists(email, id);
      if (emailExists) {
        return NextResponse.json(
          {
            success: false,
            error: "An author with this email already exists",
          },
          { status: 409 },
        );
      }
    }

    // Update author
    const updateData: Partial<Omit<Author, "id" | "createdAt" | "updatedAt">> =
      {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;
    if (expertise !== undefined) updateData.expertise = expertise;
    if (profileImage !== undefined) updateData.profileImage = profileImage;
    if (publications !== undefined) updateData.publications = publications;

    await updateAuthor(id, updateData);

    return NextResponse.json({
      success: true,
      message: "Author updated successfully",
      data: {
        id,
        ...existingAuthor,
        ...updateData,
      },
    });
  } catch (error: any) {
    console.error("Error updating author:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update author",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/authors/[id] - Delete an author
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Check if author exists
    const author = await getAuthor(id);
    if (!author) {
      return NextResponse.json(
        {
          success: false,
          error: "Author not found",
        },
        { status: 404 },
      );
    }

    await deleteAuthor(id);

    return NextResponse.json({
      success: true,
      message: "Author deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting author:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete author",
      },
      { status: 500 },
    );
  }
}
