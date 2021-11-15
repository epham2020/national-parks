import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <footer class="py-5 fixed-bottom" style={{"background-color": "#BEBEBE"}}>
        <div class="container d-flex justify-content-around">
          <Link to={{ pathname: "https://www.instagram.com/nationalparkservice/" }} target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" width="50" height="auto" alt=""></img>
          </Link>

          <Link to={{ pathname: "https://www.facebook.com/nationalparkservice/" }} target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/1200px-Facebook_icon_2013.svg.png" width="50" height="auto" alt=""></img>
          </Link>

          <Link to={{ pathname: "https://twitter.com/NatlParkService?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" }} target="_blank">
            <img src="https://bankimooncentre.org/wp-content/uploads/2020/05/twitter-icon-square-logo-108D17D373-seeklogo.com_.png" width="50" height="auto" alt=""></img>
          </Link>

          <Link to={{ pathname: "https://www.youtube.com/nationalparkservice" }} target="_blank">
            <img src="https://cdn0.iconfinder.com/data/icons/web-social-and-folder-icons/512/YouTube.png" width="50" height="auto" alt=""></img>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;