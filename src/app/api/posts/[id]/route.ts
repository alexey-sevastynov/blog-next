import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: GenerateMetadataType
) => {
  const { id } = params;
  try {
    await connect();

    const post = await Post.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(`Error in responce of DB, ${error}`);
    return new NextResponse(`Error in responce of DB, ${error}`);
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: GenerateMetadataType
) => {
  const { id } = params;
  try {
    await connect();
    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: GenerateMetadataType
) => {
  const { title, desc, image, comment } = await request.json();
  const { id } = params;

  try {
    await connect();
    if (comment) {
      console.log(comment, "our comment", id);
      await Post.findByIdAndUpdate(
        id,
        { $push: { comments: comment } },
        { new: true }
      );
    } else {
      console.log("update");
      await Post.updateOne(
        { _id: id },
        {
          title,
          desc,
          image,
        }
      );
    }

    return new NextResponse("Post has been edit", { status: 200 });
  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
};
