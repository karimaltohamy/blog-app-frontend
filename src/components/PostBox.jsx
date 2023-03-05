import React from "react";
import { Link } from "react-router-dom";
import InfoBox from "./InfoBox";

const Post = ({ post }) => {
  return (
    <Link
      to={`/posts/${post._id}`}
      className="relative flex flex-col lg:flex-row gap-3 md:gap-5 mb-7"
    >
      <div className="w-full lg:w-1/2">
        <img
          src={"https://blog-app-backend-cmtc.onrender.com/" + post.cover}
          alt=""
          className="w-full h-[200px] md:h-[250px] object-cover rounded-md"
        />
      </div>
      <InfoBox post={post} />
      <div className="mt-3 w-full lg:w-1/2">
        <h1 className="font-semibold md:text-2xl mb-1">{post.title}</h1>
        <p className="text-gray-600 text-[12px] md:text-sm">{post.summary}</p>
      </div>
    </Link>
  );
};

export default Post;
