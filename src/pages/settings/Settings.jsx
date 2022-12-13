import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const [file, serFile] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const PF = "https://bloging-aplication-new-app.onrender.com/images/";

  const { user, dispatch } = useContext(Context);

  const handaleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const userUpdate = {
      id: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      userUpdate.profilePuncture = filename;
      try {
        await axios.post(
          "https://bloging-aplication-new-app.onrender.com/api/v1/upload",
          data
        );
      } catch (error) {}
      try {
       const res =  await axios.put(
          "https://bloging-aplication-new-app.onrender.com/api/v1/" + user._id,
          userUpdate,
          
        );
        setSuccess(true)
          dispatch({type:"UPDATE_SUCCESS", payload: res.data})
      } catch (error) {
        dispatch({type:"UPDATE_FAILURE"})
      }
    }
  };


  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handaleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF + user.profilePuncture} alt="" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => serFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{color:"gean", textAlign:"center", margin:"20px"}}>Your Profile Update Success</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
