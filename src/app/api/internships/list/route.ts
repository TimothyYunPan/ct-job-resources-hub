import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { withApiHandler } from "@/utils/withApiHandler";

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const limit = 5;
  const skip = (page - 1) * limit;

  const client = await clientPromise;
  const db = client.db("internships");
  const collection = db.collection("summer2026_internships");

  // Build search query
  let query = {};
  if (search.trim()) {
    query = {
      $or: [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ],
    };
  }

  const [internships, total] = await Promise.all([
    collection
      .find(query)
      .sort({ scraped_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    collection.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({
    internships,
    totalPages,
    currentPage: page,
    total,
    search,
  });
};

export const GET = withApiHandler(handler); 