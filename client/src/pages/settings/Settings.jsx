import "./Settings.css";
import Footer from "../../components/Footer/Footer"; 
// import { img1 } from "../../assets";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Setting() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const {user, dispatch} = useContext(Context);
  const PF = "https://blogsy-jb29.onrender.com/images/"

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
        userId: user._id,
        username : user.username,
        email : user.email,
        password : user.password,
    };
    if(file){
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
        try {
            await axios.post("https://blogsy-jb29.onrender.com/server/upload", data);
        } catch (error) {
            console.error("File upload error:", error);
        }
    }
    try {
        const res = await axios.put("https://blogsy-jb29.onrender.com/server/users/" + user._id, updatedUser);
        setSuccess(true);
        dispatch({type: "UPDATE_SUCCESS", payload: res.data});
    } catch (error) {
      dispatch({type: "UPDATE_FAILURE"});
    }
  };


  return (
    <div>
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdate">Update Your Account</span>
            <span className="settingsDelete">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label className="settingFormPro">Profile Picture</label>
            <div className="settingsPic">
              <img 
                src={file ? URL.createObjectURL(file) : PF + user.profilePic} 
                alt="" 
              />
              <label htmlFor="fileInput">
                <i className="settingsPicIcon"><FaRegUserCircle /></i>
              </label>
              <input 
                type="file" 
                id="fileInput" 
                style={{display:"none"}} 
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input 
              type="text" 
              placeholder={user.username} 
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input 
              type="email" 
              placeholder={user.email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settingsSubmit" type="submit">Update</button>
            {success && (
              <span style={{color: "green", textAlign: "center", marginTop: "20px"}}>Profile has been updated...</span>
            )}
          </form>
        </div>  
        <Footer />
    </div>
  )
}
