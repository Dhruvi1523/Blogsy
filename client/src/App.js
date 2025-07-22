import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import LOgin from "./pages/login/LOgin";
import Register from "./pages/register/Register";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/contact/contact";
import About from "./pages/about/about";
import Explore from "./pages/explore/explore";  

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link  
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";


// import SinglePost from "./components/singlePost/SinglePost";



function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      < NavBar />
      <Switch >
        <Route exact path="/"><Home /></Route>
        <Route exact path="/register">{user ? <Home/> : <Register /> } </Route>
        <Route exact path="/login"> {user ? <Home/> : <LOgin /> } </Route>
        <Route exact path="/write"> {user ? <Write/> : <Register/> } </Route>
        <Route exact path="/settings"> {user ? <Settings/> : <Register/> } </Route>
        <Route exact path="/post/:postId"><Single /></Route>
        <Route exact path="/about"><About /></Route>
        <Route exact path="/contact"><Contact /></Route>
        <Route exact path="/explore"><Explore /></Route>
        <Route><Footer /></Route>
      </Switch>
    </Router>
  );
}

export default App;
