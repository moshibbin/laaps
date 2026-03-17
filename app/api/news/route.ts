import { NextRequest, NextResponse } from "next/server";
import {
  createNews,
  getAllNews,
  searchNews,
  getNewsByStatus,
  getNewsByCategory,
  getFeaturedNews,
} from "@/lib/firebase";
import type { News } from "@/lib/firebase";

// GET all news or search news
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const status = searchParams.get("status") as "draft" | "published" | null;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    let news: News[] = [];

    if (featured === "true") {
      news = await getFeaturedNews();
    } else if (search) {
      news = await searchNews(search);
    } else if (status) {
      news = await getNewsByStatus(status);
    } else if (category) {
      news = await getNewsByCategory(category);
    } else {
      news = await getAllNews();
    }

    return NextResponse.json({
      success: true,
      data: news,
      count: news.length,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
      },
      { status: 500 },
    );
  }
}

// POST create a new news article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        {
          success: false,
          error: "Title and content are required",
        },
        { status: 400 },
      );
    }

    const newsData: Omit<News, "id" | "createdAt" | "updatedAt"> = {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt || "",
      author: body.author || "",
      publishDate: body.publishDate || new Date().toISOString(),
      category: body.category || "",
      tags: body.tags || [],
      imageUrl: body.imageUrl || "",
      status: body.status || "draft",
      featured: body.featured || false,
      viewCount: body.viewCount || 0,
    };

    const newsId = await createNews(newsData);

    return NextResponse.json({
      success: true,
      message: "News article created successfully",
      data: { id: newsId, ...newsData },
    });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create news article",
      },
      { status: 500 },
    );
  }
}
