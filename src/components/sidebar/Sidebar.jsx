import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";


export default function Sidebar() {

  const [category, setCategory] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://bloging-aplication-new-app.onrender.com/api/v1/category"
      );
      setCategory(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://cdn.pixabay.com/photo/2015/01/12/10/45/man-597178__340.jpg" alt="" />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {category.map((i) => (
            <li className="sidebarListItem" key={i._id}>
              <Link className="link" to={`/posts/?cate=${i.name}`}>
                {i.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
