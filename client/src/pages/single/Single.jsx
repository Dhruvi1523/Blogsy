import "./Single.css";
import SinglePost from "../../components/singlePost/SinglePost";
import Footer from "../../components/Footer/Footer";

export default function Single() {
  return (
    <div>
      <div className="single">
          <SinglePost />
      </div>
      <Footer />
    </div>
  )
}
