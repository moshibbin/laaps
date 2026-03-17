import { NextRequest, NextResponse } from "next/server";
import {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudiesByStatus,
  getCaseStudiesBySector,
  searchCaseStudies,
  getFeaturedCaseStudies,
  CaseStudy,
} from "@/lib/firebase/case-studies";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const status = searchParams.get("status") as "draft" | "published" | null;
    const sector = searchParams.get("sector");
    const featured = searchParams.get("featured");

    let result;

    if (search) {
      result = await searchCaseStudies(search);
    } else if (status) {
      result = await getCaseStudiesByStatus(status);
    } else if (sector) {
      result = await getCaseStudiesBySector(sector);
    } else if (featured === "true") {
      result = await getFeaturedCaseStudies();
    } else {
      result = await getAllCaseStudies();
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to fetch case studies",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in case studies GET:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: CaseStudy = await request.json();

    // Basic validation
    if (!data.title || !data.content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 },
      );
    }

    const result = await createCaseStudy(data);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          id: result.id,
          message: "Case study created successfully",
        },
        { status: 201 },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to create case study",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in case studies POST:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
