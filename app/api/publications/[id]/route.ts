import { NextRequest, NextResponse } from "next/server";
import {
  getPublication,
  updatePublication,
  deletePublication,
  checkPublicationTitleExists,
  Publication,
} from "@/lib/firebase/publications";

/**
 * GET /api/publications/[id] - Get a single publication by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const publication = await getPublication(id);

    if (!publication) {
      return NextResponse.json(
        {
          success: false,
          error: "Publication not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: publication,
    });
  } catch (error: any) {
    console.error("Error fetching publication:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch publication",
      },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/publications/[id] - Update a publication
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
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

    // Check if publication exists
    const existingPublication = await getPublication(id);
    if (!existingPublication) {
      return NextResponse.json(
        {
          success: false,
          error: "Publication not found",
        },
        { status: 404 },
      );
    }

    // If title is being changed, check if new title already exists
    if (title && title !== existingPublication.title) {
      const titleExists = await checkPublicationTitleExists(title, id);
      if (titleExists) {
        return NextResponse.json(
          {
            success: false,
            error: "A publication with this title already exists",
          },
          { status: 409 },
        );
      }
    }

    // Update publication
    const updateData: Partial<
      Omit<Publication, "id" | "createdAt" | "updatedAt">
    > = {};

    if (title !== undefined) updateData.title = title;
    if (abstract !== undefined) updateData.abstract = abstract;
    if (authors !== undefined) updateData.authors = authors;
    if (publicationDate !== undefined)
      updateData.publicationDate = publicationDate;
    if (type !== undefined) updateData.type = type;
    if (journal !== undefined) updateData.journal = journal;
    if (volume !== undefined) updateData.volume = volume;
    if (issue !== undefined) updateData.issue = issue;
    if (pages !== undefined) updateData.pages = pages;
    if (doi !== undefined) updateData.doi = doi;
    if (url !== undefined) updateData.url = url;
    if (keywords !== undefined) updateData.keywords = keywords;
    if (pdfUrl !== undefined) updateData.pdfUrl = pdfUrl;
    if (coverImageUrl !== undefined) updateData.coverImageUrl = coverImageUrl;
    if (citations !== undefined) updateData.citations = citations;
    if (status !== undefined) updateData.status = status;

    await updatePublication(id, updateData);

    return NextResponse.json({
      success: true,
      message: "Publication updated successfully",
      data: {
        id,
        ...existingPublication,
        ...updateData,
      },
    });
  } catch (error: any) {
    console.error("Error updating publication:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update publication",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/publications/[id] - Delete a publication
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Check if publication exists
    const publication = await getPublication(id);
    if (!publication) {
      return NextResponse.json(
        {
          success: false,
          error: "Publication not found",
        },
        { status: 404 },
      );
    }

    await deletePublication(id);

    return NextResponse.json({
      success: true,
      message: "Publication deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting publication:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete publication",
      },
      { status: 500 },
    );
  }
}
