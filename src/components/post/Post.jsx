import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <img className="postImg" src={post.image} alt="" />
      <div className="postInfo">
        <div className="postCats">
          
          {post.category.map((i) => (
            <span className="postCat">
              <Link className="link" to={`/posts/?cate=${i}`}>
                {i}
              </Link>
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
