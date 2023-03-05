import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { mainContext } from "../mainContext";

const PostPage = () => {
  const { id } = useParams();
  const { user } = useContext(mainContext);
  const [post, setPost] = useState();

  useEffect(() => {
    axios.get(`api/posts/${id}`).then(({ data }) => setPost(data));
  }, []);

  return post ? (
    <div className="mt-[70px] mb-5">
      <h1 className="text-lg md:text-[30px] font-bold text-center">
        {post.title}
      </h1>
      <p className="text-center text-sm md:text-md mt-2 text-gray-500">
        {format(new Date(post.createdAt), "dd MMM, yyyy p")}
      </p>
      <span className="text-center block font-semibold">
        by@{post.author.username}
      </span>
      {user?._id === post.author?._id && (
        <div className="text-center mt-3">
          <Link
            to={`/edit/${post._id}`}
            className="bg-gray-700 p-2 px-6 rounded-md text-white "
          >
            Edit post
          </Link>
        </div>
      )}
      <div className="w-full h-[200px] md:h-[300px] my-4">
        <img
          src={"http://localhost:5000/" + post.cover}
          alt=""
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="text-sm md:text-lg"
      />
    </div>
  ) : (
    "Loading"
  );
};

export default PostPage;
