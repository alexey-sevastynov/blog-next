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
  const { title, desc, image, comment, active, likes, isDelete } =
    await request.json();
  const { id } = params;

  try {
    await connect();

    // Delete a comment by its _id
    if (comment && isDelete === true && comment._id) {
      const post = await Post.findOne({ _id: id });
      const commentIndex = post.comments.findIndex(
        (c: any) => c._id.toString() === comment._id
      );

      if (commentIndex !== -1) {
        post.comments.splice(commentIndex, 1);
        await post.save();
      }
    }

    // Increase or decrease the number of likes for a comment
    if (comment) {
      const updateLikes = active ? 1 : -1;
      if (comment._id) {
        await Post.updateOne(
          { _id: id, "comments._id": comment._id },
          { $inc: { "comments.$.likes": updateLikes } }
        );
      }
    }

    // Update the number of likes of a post
    if (active !== undefined && active !== null && likes >= 0) {
      const updateLikes = active ? 1 : -1;
      await Post.findByIdAndUpdate(
        id,
        { $inc: { likes: updateLikes } },
        { returnDocument: "after" }
      );
    }

    // Add a new comment or update a post
    if (comment && active === undefined && isDelete === undefined) {
      await Post.findByIdAndUpdate(
        id,
        { $push: { comments: comment } },
        { new: true }
      );
    } else {
      // Updating the post
      await Post.updateOne(
        { _id: id },
        {
          title,
          desc,
          image,
        }
      );
    }

    return new NextResponse("Post has been edited", { status: 200 });
  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
};
