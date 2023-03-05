import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../components/PostBox";

const Home = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios.get("api/posts").then(({ data }) => setPosts(data));
  });
  return (
    <div className="mt-7">
      {posts
        ? posts.map((post, index) => {
            return <Post key={index} post={post} />;
          })
        : "Loading"}
    </div>
  );
};

export default Home;
