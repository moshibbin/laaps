import { NextRequest, NextResponse } from "next/server";
import { getNews, updateNews, deleteNews } from "@/lib/firebase";
import type { News } from "@/lib/firebase";

// GET a single news article by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const news = await getNews(params.id);

    if (!news) {
      return NextResponse.json(
        {
          success: false,
          error: "News article not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news article",
      },
      { status: 500 },
    );
  }
}

// PUT update a news article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();

    // Validate that news exists
    const existingNews = await getNews(params.id);
    if (!existingNews) {
      return NextResponse.json(
        {
          success: false,
          error: "News article not found",
        },
        { status: 404 },
      );
    }

    const newsData: Partial<News> = {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      author: body.author,
      publishDate: body.publishDate,
      category: body.category,
      tags: body.tags,
      imageUrl: body.imageUrl,
      status: body.status,
      featured: body.featured,
      viewCount: body.viewCount,
    };

    // Remove undefined fields
    Object.keys(newsData).forEach((key) => {
      if (newsData[key as keyof News] === undefined) {
        delete newsData[key as keyof News];
      }
    });

    await updateNews(params.id, newsData);

    const updatedNews = await getNews(params.id);

    return NextResponse.json({
      success: true,
      message: "News article updated successfully",
      data: updatedNews,
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update news article",
      },
      { status: 500 },
    );
  }
}

// DELETE a news article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Validate that news exists
    const existingNews = await getNews(params.id);
    if (!existingNews) {
      return NextResponse.json(
        {
          success: false,
          error: "News article not found",
        },
        { status: 404 },
      );
    }

    await deleteNews(params.id);

    return NextResponse.json({
      success: true,
      message: "News article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete news article",
      },
      { status: 500 },
    );
  }
}
