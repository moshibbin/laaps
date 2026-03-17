import { NextRequest, NextResponse } from "next/server";
import {
  getCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  CaseStudy,
} from "@/lib/firebase/case-studies";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const result = await getCaseStudy(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Case study not found",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error in case study GET:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data: Partial<CaseStudy> = await request.json();

    const result = await updateCaseStudy(id, data);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Case study updated successfully",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to update case study",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in case study PUT:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const result = await deleteCaseStudy(id);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Case study deleted successfully",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to delete case study",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in case study DELETE:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
