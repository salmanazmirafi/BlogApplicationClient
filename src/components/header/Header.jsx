import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://cdn.pixabay.com/photo/2019/09/17/18/48/computer-4484282__340.jpg"
        alt=""
      />
    </div>
  );
}
