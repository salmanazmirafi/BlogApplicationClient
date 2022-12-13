import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const PF = "https://bloging-aplication-new-app.onrender.com/images/";
  const [post, setPost] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mode, setMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        "https://bloging-aplication-new-app.onrender.com/api/v1/posts/find/" +
          path
      );
      setPost(res.data);
      setDesc(res.data.desc);
      setTitle(res.data.title);
    };
    getPost();
  }, [path]);

  // Delete
  const trashClick = async () => {
    try {
      await axios.delete(
        `https://bloging-aplication-new-app.onrender.com/api/v1/posts/${post._id}`,
        { data: { username: user.username } }
      );
      window.location.replace("/");
    } catch (error) {}
  };

  const handaleSubmit = async () => {
    try {
      await axios.put(
        `https://bloging-aplication-new-app.onrender.com/api/v1/posts/${post._id}`,
        { username: user.username, title, desc }
      );
      // window.location.reload();
      setMode(false);
    } catch (error) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.image && (
          <img className="singlePostImg" src={PF + post.image} alt="" />
        )}
        {mode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={trashClick}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post?.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {mode ? (
          <textarea
            type="text"
            value={desc}
            className="singlePostDescInput"
            onChange={(e) => setDesc(e.target.value)}
            rows={7}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}

        {mode && (
          <button className="updateButton" onClick={handaleSubmit}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
