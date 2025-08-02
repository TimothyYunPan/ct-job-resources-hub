import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { withApiHandler } from "@/utils/withApiHandler";

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 5;
  const skip = (page - 1) * limit;

  const client = await clientPromise;
  const db = client.db("internships");
  const collection = db.collection("summer2026_internships");

  const [internships, total] = await Promise.all([
    collection
      .find({})
      .sort({ scraped_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    collection.countDocuments({}),
  ]);

  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({
    internships,
    totalPages,
    currentPage: page,
    total,
  });
};

export const GET = withApiHandler(handler); 