import { NextRequest } from "next/server";
import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";
import clientPromise from "@/lib/mongodb";
import { DB_NAME } from "@/config/constants";

export const GET = withApiHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.json(error("Id is required"), {
      status: 400,
    });
  }
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection("posts");
  const post = await collection.findOne({ id });
  return Response.json(success(post), {
    status: 200,
  });
});

export const PATCH = withApiHandler(async (request: NextRequest) => {
  const { id, title, content } = await request.json();
  if (!id || !title || !content) {
    return Response.json(error("Missing fields"), { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection("posts");
  await collection.updateOne({ id }, { $set: { title, content } });
  return Response.json(success({}), { status: 200 });
});
