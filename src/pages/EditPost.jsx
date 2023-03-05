import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`api/posts/${id}`).then(({ data }) => {
      setTitle(data.title);
      setSummary(data.summary);
      setCategory(data.category);
      setContent(data.content);
    });
  }, []);

  const handleEditPost = async (e) => {
    e.preventDefault();

    const dataFrom = new FormData();
    dataFrom.set("title", title);
    dataFrom.set("summary", summary);
    dataFrom.set("category", category);
    dataFrom.set("content", content);
    if (files?.[0]) {
      dataFrom.set("file", files?.[0]);
    }

    try {
      await axios.put(`api/editPost/${id}`, dataFrom);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleEditPost} className="mt-7 mb-5">
      <div className="mb-2 font-semibold">
        <label className="mb-1" htmlFor="">
          Title
        </label>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2 font-semibold">
        <label className="mb-1" htmlFor="">
          Summary
        </label>
        <input
          type="text"
          placeholder="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <div className="mb-2 font-semibold">
        <label className="mb-1" htmlFor="">
          Category
        </label>
        <input
          type="text"
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="mb-2 font-semibold">
        <label className="mb-1" htmlFor="">
          Content
        </label>
        <ReactQuill
          theme={"snow"}
          modules={modules}
          className="bg-white rounded-md border-0"
          value={content}
          onChange={setContent}
        />
      </div>
      <div className="mb-2 font-semibold">
        <label className="mb-1" htmlFor="">
          Cover
        </label>
        <input
          type="file"
          placeholder="cover"
          onChange={(e) => setFiles(e.target.files)}
        />
      </div>
      <button
        type="submit"
        className="p-1 w-full bg-gray-700 rounded-md text-white font-semibold mt-2"
      >
        Create
      </button>
    </form>
  );
};

export default EditPost;
