import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [post, setPost] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fatchPost = async () => {
      const res = await axios.get("https://bloging-aplication-new-app.onrender.com/api/v1/posts"+search);
      setPost(res.data);
    };
    fatchPost();
  }, [search]);


  return (
    <>
      <Header />
      <div className="home">
        <Posts post={post} />
        <Sidebar />
      </div>
    </>
  );
}
