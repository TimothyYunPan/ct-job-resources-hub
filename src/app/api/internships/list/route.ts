import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { withApiHandler } from "@/utils/withApiHandler";
import { ROLE_CATEGORIES } from "@/config/constants";

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const roleCategory = searchParams.get("roleCategory") || "";
  const limit = 5;
  const skip = (page - 1) * limit;

  const client = await clientPromise;
  const db = client.db("internships");
  const collection = db.collection("summer2026_internships");

  // 建立搜尋查詢
  let query = {};
  const conditions = [];

  if (search.trim()) {
    conditions.push({
      $or: [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ],
    });
  }

  if (roleCategory && roleCategory !== "all") {
    if (roleCategory === "OTHER") {
      // 排除符合其他類別的職位
      const excludeCategories = Object.entries(ROLE_CATEGORIES).filter(([key]) => key !== "OTHER");
      const norConditions = excludeCategories.flatMap(([_, cat]) =>
        cat.keywords.map((keyword: string) => ({ role: { $regex: keyword, $options: "i" } }))
      );
      conditions.push({ $nor: norConditions });
    } else {
      const category = ROLE_CATEGORIES[roleCategory as keyof typeof ROLE_CATEGORIES];
      if (category) {
        const roleConditions = category.keywords.map(keyword => ({
          role: { $regex: keyword, $options: "i" }
        }));
        conditions.push({ $or: roleConditions });
      }
    }
  }

  if (conditions.length > 0) {
    query = { $and: conditions };
  }

  // 使用資料庫排序
  const internships = await collection
    .find(query)
    .sort({ scraped_at: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await collection.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json({
    internships,
    totalPages,
    currentPage: page,
    total,
    search,
    roleCategory,
  });
};

export const GET = withApiHandler(handler); 